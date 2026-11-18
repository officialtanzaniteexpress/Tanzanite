import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import path from 'path';
import { AllowedImageMime, detectImageMimeFromBuffer, MAX_PRODUCT_IMAGE_BYTES } from './media-storage.ts';

export const R2_PRESIGN_EXPIRY_SECONDS = 180; // Strictly short-lived 3-minute upload window
export const R2_SIGNED_READ_DEFAULT_SECONDS = 300; // Strictly short-lived 5-minute read URL
export const MIN_PRODUCT_IMAGE_BYTES = 12;

export type R2AssetPrefix = 'products' | 'avatars' | 'banners' | 'categories' | 'receipts';

const SAFE_SEGMENT_REGEX = /^[a-zA-Z0-9_-]{1,128}$/;
const SAFE_SUPPLIER_SEGMENT_REGEX = /^[a-zA-Z0-9_-]{3,128}$/;
const SAFE_UNIQUE_FILENAME_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9._-]{2,119}\.(?:jpg|jpeg|png|webp)$/i;
const R2_ACCOUNT_ID_REGEX = /^[a-f0-9]{16,64}$/i;
const R2_BUCKET_NAME_REGEX = /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/;

export interface R2ValidatedConfig {
  accountId: string;
  bucketName: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  storageClass: string;
}

export interface R2Diagnostics {
  configured: boolean;
  bucket: string;
  region: string;
  storageClass: string;
  endpointConfigured: boolean;
  status: 'connected' | 'unconfigured' | 'degraded';
  liveVerified: boolean;
  lastError: string | null;
  lastSuccessAt: string | null;
}

export interface R2ClientLike {
  send(command: unknown): Promise<any>;
}

export type R2PresignerFn = (
  client: S3Client,
  command: PutObjectCommand | GetObjectCommand,
  options: { expiresIn: number }
) => Promise<string>;

const r2Diag: {
  status: 'connected' | 'unconfigured' | 'degraded';
  liveVerified: boolean;
  lastError: string | null;
  lastSuccessAt: string | null;
} = {
  status: 'unconfigured',
  liveVerified: false,
  lastError: null,
  lastSuccessAt: null,
};

let cachedClient: S3Client | null = null;
let cachedConfigKey = '';
let clientOverrideForTests: R2ClientLike | null = null;
let presignerOverrideForTests: R2PresignerFn | null = null;

function redactSecretErrors(msg: string): string {
  return msg
    .replace(/(AKIA|ASIA|[A-Za-z0-9]{20,})[A-Za-z0-9/+=_-]*/g, (match) =>
      match.length > 24 ? '[REDACTED]' : match
    )
    .slice(0, 220);
}

export function validateR2Environment(): {
  valid: boolean;
  config?: R2ValidatedConfig;
  missingVars: string[];
  error?: string;
} {
  const accountId = (process.env.R2_ACCOUNT_ID || '').trim();
  const bucketName = (process.env.R2_BUCKET_NAME || '').trim();
  const endpoint = (process.env.R2_ENDPOINT || '').trim();
  const accessKeyId = (process.env.R2_ACCESS_KEY_ID || '').trim();
  const secretAccessKey = (process.env.R2_SECRET_ACCESS_KEY || '').trim();
  const region = (process.env.R2_REGION || 'auto').trim() || 'auto';
  const storageClass = (process.env.R2_STORAGE_CLASS || 'Standard').trim() || 'Standard';

  const missingVars: string[] = [];
  if (!accountId) missingVars.push('R2_ACCOUNT_ID');
  if (!bucketName) missingVars.push('R2_BUCKET_NAME');
  if (!endpoint) missingVars.push('R2_ENDPOINT');
  if (!accessKeyId) missingVars.push('R2_ACCESS_KEY_ID');
  if (!secretAccessKey) missingVars.push('R2_SECRET_ACCESS_KEY');

  if (missingVars.length > 0) {
    return {
      valid: false,
      missingVars,
      error: `Cloudflare R2 storage is not fully configured (${missingVars.join(', ')} missing).`,
    };
  }

  if (!R2_ACCOUNT_ID_REGEX.test(accountId)) {
    return {
      valid: false,
      missingVars: [],
      error: 'R2_ACCOUNT_ID format is invalid.',
    };
  }

  if (!R2_BUCKET_NAME_REGEX.test(bucketName)) {
    return {
      valid: false,
      missingVars: [],
      error: 'R2_BUCKET_NAME format is invalid.',
    };
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(endpoint);
  } catch {
    return {
      valid: false,
      missingVars: [],
      error: 'R2_ENDPOINT must be a valid HTTPS URL.',
    };
  }

  if (parsedUrl.protocol !== 'https:' || !parsedUrl.hostname.endsWith('.r2.cloudflarestorage.com')) {
    return {
      valid: false,
      missingVars: [],
      error: 'R2_ENDPOINT must be an HTTPS *.r2.cloudflarestorage.com endpoint.',
    };
  }

  if (!parsedUrl.hostname.toLowerCase().startsWith(accountId.toLowerCase())) {
    return {
      valid: false,
      missingVars: [],
      error: 'R2_ENDPOINT hostname does not match R2_ACCOUNT_ID.',
    };
  }

  return {
    valid: true,
    missingVars: [],
    config: {
      accountId,
      bucketName,
      endpoint: parsedUrl.origin,
      accessKeyId,
      secretAccessKey,
      region,
      storageClass,
    },
  };
}

export function getR2Diagnostics(): R2Diagnostics {
  const check = validateR2Environment();
  const bucket = (process.env.R2_BUCKET_NAME || '').trim();
  const region = (process.env.R2_REGION || 'auto').trim() || 'auto';
  const storageClass = (process.env.R2_STORAGE_CLASS || 'Standard').trim() || 'Standard';
  const endpointConfigured = Boolean((process.env.R2_ENDPOINT || '').trim());

  if (!check.valid) {
    return {
      configured: false,
      bucket,
      region,
      storageClass,
      endpointConfigured,
      status: 'unconfigured',
      liveVerified: false,
      lastError: r2Diag.lastError,
      lastSuccessAt: r2Diag.lastSuccessAt,
    };
  }

  return {
    configured: true,
    bucket: check.config!.bucketName,
    region: check.config!.region,
    storageClass: check.config!.storageClass,
    endpointConfigured: true,
    status: r2Diag.status === 'degraded' ? 'degraded' : 'connected',
    liveVerified: r2Diag.liveVerified,
    lastError: r2Diag.lastError,
    lastSuccessAt: r2Diag.lastSuccessAt,
  };
}

export function setR2TestOverrides(overrides?: {
  client?: R2ClientLike | null;
  presigner?: R2PresignerFn | null;
}): void {
  clientOverrideForTests = overrides?.client ?? null;
  presignerOverrideForTests = overrides?.presigner ?? null;
}

function getR2Client(): { client: R2ClientLike; config: R2ValidatedConfig } {
  const check = validateR2Environment();
  if (!check.valid || !check.config) {
    throw new Error(check.error || 'Cloudflare R2 is not configured.');
  }
  const cfg = check.config;

  if (clientOverrideForTests) {
    return { client: clientOverrideForTests, config: cfg };
  }

  const fingerprint = `${cfg.accountId}:${cfg.endpoint}:${cfg.bucketName}:${cfg.region}:${cfg.accessKeyId.slice(0, 4)}`;
  if (!cachedClient || cachedConfigKey !== fingerprint) {
    cachedClient = new S3Client({
      region: cfg.region,
      endpoint: cfg.endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId: cfg.accessKeyId,
        secretAccessKey: cfg.secretAccessKey,
      },
    });
    cachedConfigKey = fingerprint;
  }

  return { client: cachedClient, config: cfg };
}

function isNonRetryableR2Error(err: unknown): boolean {
  const statusCode = Number((err as any)?.$metadata?.httpStatusCode || (err as any)?.statusCode || 0);
  const name = String((err as any)?.name || (err as any)?.Code || '');
  if (statusCode >= 400 && statusCode < 500 && statusCode !== 408 && statusCode !== 429) {
    return true;
  }
  if (
    name === 'AccessDenied' ||
    name === 'InvalidAccessKeyId' ||
    name === 'SignatureDoesNotMatch' ||
    name === 'NoSuchKey' ||
    name === 'NotFound'
  ) {
    return true;
  }
  return false;
}

async function withR2Retry<T>(operationName: string, fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await fn();
      r2Diag.status = 'connected';
      r2Diag.lastError = null;
      r2Diag.lastSuccessAt = new Date().toISOString();
      return result;
    } catch (err) {
      lastErr = err;
      if (isNonRetryableR2Error(err) || attempt >= maxAttempts) {
        const msg = redactSecretErrors(err instanceof Error ? err.message : String(err));
        r2Diag.status = 'degraded';
        r2Diag.lastError = `${operationName}: ${msg}`;
        throw err;
      }
      const backoffMs = Math.min(1200, 150 * Math.pow(2, attempt - 1));
      await new Promise((r) => setTimeout(r, backoffMs));
    }
  }
  throw lastErr;
}

export function normalizeAllowedImageMime(rawMime: string): AllowedImageMime | null {
  const clean = String(rawMime || '').split(';')[0].trim().toLowerCase();
  if (clean === 'image/jpeg' || clean === 'image/jpg') return 'image/jpeg';
  if (clean === 'image/png') return 'image/png';
  if (clean === 'image/webp') return 'image/webp';
  return null;
}

export function validateR2UploadInput(params: {
  fileName: string;
  contentType: string;
  fileSize: number;
  productId?: string;
}): {
  valid: boolean;
  error?: string;
  normalizedMime?: AllowedImageMime;
  sanitizedBaseName?: string;
  normalizedProductId?: string;
} {
  const normalizedMime = normalizeAllowedImageMime(params.contentType);
  if (!normalizedMime) {
    return {
      valid: false,
      error: 'Unsupported file type. Only JPEG, PNG, and WebP product images are allowed.',
    };
  }

  if (!Number.isFinite(params.fileSize) || params.fileSize < MIN_PRODUCT_IMAGE_BYTES) {
    return { valid: false, error: 'Image file is empty or corrupted.' };
  }
  if (params.fileSize > MAX_PRODUCT_IMAGE_BYTES) {
    return { valid: false, error: 'Image file exceeds the 5 MB maximum upload size.' };
  }

  const rawName = String(params.fileName || '').trim();
  if (!rawName || rawName.includes('..') || rawName.includes('/') || rawName.includes('\\')) {
    return { valid: false, error: 'Invalid filename. Path separators and traversal sequences are forbidden.' };
  }

  const ext = path.extname(rawName).toLowerCase();
  const allowedExtByMime: Record<AllowedImageMime, string[]> = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
  };
  if (ext && !allowedExtByMime[normalizedMime].includes(ext)) {
    return {
      valid: false,
      error: `Filename extension (${ext}) does not match declared content type (${normalizedMime}).`,
    };
  }

  const stemRaw = path.basename(rawName, ext).replace(/[^a-zA-Z0-9_-]/g, '_').replace(/^_+|_+$/g, '');
  const safeStem = (stemRaw || 'product-image').slice(0, 48);

  const rawProductId = String(params.productId || '').trim() || 'unassigned';
  if (!SAFE_SUPPLIER_SEGMENT_REGEX.test(rawProductId)) {
    return { valid: false, error: 'Invalid productId format for R2 object key.' };
  }

  return {
    valid: true,
    normalizedMime,
    sanitizedBaseName: safeStem,
    normalizedProductId: rawProductId,
  };
}

export function buildR2ProductObjectKey(params: {
  supplierUid: string;
  productId: string;
  uniqueFileName: string;
}): string {
  const supplierUid = String(params.supplierUid || '').trim();
  const productId = String(params.productId || '').trim();
  const uniqueFileName = String(params.uniqueFileName || '').trim();

  if (!SAFE_SUPPLIER_SEGMENT_REGEX.test(supplierUid)) {
    throw new Error('Invalid supplierUid for R2 object key.');
  }
  if (!SAFE_SUPPLIER_SEGMENT_REGEX.test(productId)) {
    throw new Error('Invalid productId for R2 object key.');
  }
  if (
    !SAFE_UNIQUE_FILENAME_REGEX.test(uniqueFileName) ||
    uniqueFileName.includes('..') ||
    uniqueFileName.includes('/') ||
    uniqueFileName.includes('\\')
  ) {
    throw new Error('Invalid uniqueFileName for R2 object key.');
  }

  return `products/${supplierUid}/${productId}/${uniqueFileName}`;
}

export function buildR2AssetObjectKey(params: {
  prefix: 'avatars' | 'banners' | 'categories' | 'receipts';
  scopeId: string;
  uniqueFileName: string;
}): string {
  const scopeId = String(params.scopeId || '').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  const uniqueFileName = String(params.uniqueFileName || '').trim();
  if (!SAFE_SEGMENT_REGEX.test(scopeId)) {
    throw new Error(`Invalid scopeId for R2 ${params.prefix} object key.`);
  }
  if (
    !SAFE_UNIQUE_FILENAME_REGEX.test(uniqueFileName) ||
    uniqueFileName.includes('..') ||
    uniqueFileName.includes('/') ||
    uniqueFileName.includes('\\')
  ) {
    throw new Error(`Invalid uniqueFileName for R2 ${params.prefix} object key.`);
  }
  return `${params.prefix}/${scopeId}/${uniqueFileName}`;
}

export function isValidR2ProductObjectKey(objectKey: string, expectedSupplierUid?: string): boolean {
  if (!objectKey || typeof objectKey !== 'string') return false;
  if (objectKey.includes('..') || objectKey.includes('\\') || objectKey.startsWith('/')) {
    return false;
  }
  const parts = objectKey.split('/');
  if (parts.length !== 4 || parts[0] !== 'products') return false;
  const [, supplierUid, productId, uniqueFileName] = parts;
  if (!SAFE_SUPPLIER_SEGMENT_REGEX.test(supplierUid)) return false;
  if (!SAFE_SUPPLIER_SEGMENT_REGEX.test(productId)) return false;
  if (!SAFE_UNIQUE_FILENAME_REGEX.test(uniqueFileName)) return false;
  if (expectedSupplierUid && supplierUid !== expectedSupplierUid) return false;
  return true;
}

export function isValidR2ObjectKey(objectKey: string): boolean {
  if (!objectKey || typeof objectKey !== 'string') return false;
  if (objectKey.includes('..') || objectKey.includes('\\') || objectKey.startsWith('/')) {
    return false;
  }
  if (isValidR2ProductObjectKey(objectKey)) return true;

  if (/^backups[/]bak_[0-9]+_[a-f0-9]{6}[.]json$/i.test(objectKey)) {
    return true;
  }

  const parts = objectKey.split('/');
  if (parts.length !== 3) return false;
  const [prefix, scopeId, uniqueFileName] = parts;
  if (prefix !== 'avatars' && prefix !== 'banners' && prefix !== 'categories' && prefix !== 'receipts') {
    return false;
  }
  if (!SAFE_SEGMENT_REGEX.test(scopeId)) return false;
  if (!SAFE_UNIQUE_FILENAME_REGEX.test(uniqueFileName)) return false;
  return true;
}

export function isPresignedR2Url(url: string): boolean {
  const trimmed = String(url || '').trim().toLowerCase();
  return (
    trimmed.includes('r2.cloudflarestorage.com') ||
    trimmed.includes('x-amz-signature=') ||
    trimmed.includes('x-amz-credential=')
  );
}

export function generateUniqueProductImageFileName(
  sanitizedStem: string,
  mimeType: AllowedImageMime
): string {
  const ext = mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg';
  const entropy = crypto.randomBytes(6).toString('hex');
  const cleanStem = sanitizedStem.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40) || 'image';
  return `${Date.now()}-${entropy}-${cleanStem}.${ext}`;
}

export async function createPresignedProductUpload(params: {
  supplierUid: string;
  productId: string;
  uniqueFileName: string;
  contentType: AllowedImageMime;
  fileSize: number;
  existingObjectKey?: string;
}): Promise<{
  objectKey: string;
  uploadUrl: string;
  expiresInSeconds: number;
  requiredHeaders: Record<string, string>;
}> {
  const { client, config } = getR2Client();

  const objectKey = params.existingObjectKey
    ? (() => {
        if (!isValidR2ProductObjectKey(params.existingObjectKey, params.supplierUid)) {
          throw new Error('Existing pending R2 objectKey failed ownership/path validation.');
        }
        return params.existingObjectKey;
      })()
    : buildR2ProductObjectKey({
        supplierUid: params.supplierUid,
        productId: params.productId,
        uniqueFileName: params.uniqueFileName,
      });

  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: objectKey,
    ContentType: params.contentType,
    ContentLength: params.fileSize,
  });

  const signer: R2PresignerFn = presignerOverrideForTests || getSignedUrl;
  const uploadUrl = await signer(client as S3Client, command, {
    expiresIn: R2_PRESIGN_EXPIRY_SECONDS,
  });

  return {
    objectKey,
    uploadUrl,
    expiresInSeconds: R2_PRESIGN_EXPIRY_SECONDS,
    requiredHeaders: {
      'Content-Type': params.contentType,
    },
  };
}

export async function uploadBufferToR2(params: {
  objectKey: string;
  buffer: Buffer;
  contentType: AllowedImageMime;
  maxBytes?: number;
  cacheControl?: string;
  metadata?: Record<string, string>;
}): Promise<{
  objectKey: string;
  contentType: AllowedImageMime;
  sizeBytes: number;
}> {
  if (!isValidR2ObjectKey(params.objectKey)) {
    throw new Error('Rejected attempt to upload invalid R2 object key.');
  }
  const maxBytes = params.maxBytes ?? MAX_PRODUCT_IMAGE_BYTES;
  if (!Buffer.isBuffer(params.buffer) || params.buffer.length < MIN_PRODUCT_IMAGE_BYTES) {
    throw new Error('Image binary is empty or corrupted.');
  }
  if (params.buffer.length > maxBytes) {
    throw new Error(`Image binary exceeds maximum allowed size (${maxBytes} bytes).`);
  }
  const detectedMime = detectImageMimeFromBuffer(params.buffer);
  if (!detectedMime || detectedMime !== params.contentType) {
    throw new Error('Image binary signature does not match declared JPEG, PNG, or WEBP MIME type.');
  }

  const { client, config } = getR2Client();
  await withR2Retry('PutObject', () =>
    client.send(
      new PutObjectCommand({
        Bucket: config.bucketName,
        Key: params.objectKey,
        Body: params.buffer,
        ContentType: detectedMime,
        ContentLength: params.buffer.length,
        CacheControl: params.cacheControl || 'private, max-age=3600',
        Metadata: params.metadata,
      })
    )
  );

  return {
    objectKey: params.objectKey,
    contentType: detectedMime,
    sizeBytes: params.buffer.length,
  };
}


export async function uploadBackupJsonToR2(params: {
  objectKey: string;
  buffer: Buffer;
  sha256: string;
}): Promise<{ objectKey: string; sizeBytes: number }> {
  if (!/^backups[/]bak_[0-9]+_[a-f0-9]{6}[.]json$/i.test(params.objectKey)) {
    throw new Error('Rejected invalid backup object key.');
  }
  if (!isValidR2ObjectKey(params.objectKey)) {
    throw new Error('Rejected attempt to upload invalid R2 backup key.');
  }
  if (!Buffer.isBuffer(params.buffer) || params.buffer.length === 0) {
    throw new Error('Backup JSON is empty or invalid.');
  }
  if (!/^[a-f0-9]{64}$/i.test(params.sha256)) {
    throw new Error('Backup SHA-256 checksum is invalid.');
  }

  const actualSha256 = crypto.createHash('sha256').update(params.buffer).digest('hex');
  if (actualSha256 !== params.sha256.toLowerCase()) {
    throw new Error('Backup SHA-256 checksum does not match its content.');
  }

  const { client, config } = getR2Client();
  await withR2Retry('PutObject', () =>
    client.send(
      new PutObjectCommand({
        Bucket: config.bucketName,
        Key: params.objectKey,
        Body: params.buffer,
        ContentType: 'application/json',
        ContentLength: params.buffer.length,
        CacheControl: 'private, no-store',
        Metadata: { sha256: params.sha256.toLowerCase() },
      })
    )
  );

  return { objectKey: params.objectKey, sizeBytes: params.buffer.length };
}

export async function createPresignedReadUrl(params: {
  objectKey: string;
  expiresInSeconds?: number;
}): Promise<{
  signedUrl: string;
  expiresInSeconds: number;
  expiresAt: string;
}> {
  if (!isValidR2ObjectKey(params.objectKey)) {
    throw new Error('Rejected attempt to sign invalid R2 object key.');
  }
  const ttl = Math.min(900, Math.max(60, Math.floor(params.expiresInSeconds ?? R2_SIGNED_READ_DEFAULT_SECONDS)));
  const { client, config } = getR2Client();
  const command = new GetObjectCommand({
    Bucket: config.bucketName,
    Key: params.objectKey,
  });
  const signer: R2PresignerFn = presignerOverrideForTests || getSignedUrl;
  const signedUrl = await signer(client as S3Client, command, { expiresIn: ttl });
  return {
    signedUrl,
    expiresInSeconds: ttl,
    expiresAt: new Date(Date.now() + ttl * 1000).toISOString(),
  };
}

async function bodyToBuffer(body: unknown): Promise<Buffer> {
  if (!body) return Buffer.alloc(0);
  if (Buffer.isBuffer(body)) return body;
  if (body instanceof Uint8Array) return Buffer.from(body);
  if (typeof (body as any).transformToByteArray === 'function') {
    const arr = await (body as any).transformToByteArray();
    return Buffer.from(arr);
  }
  const chunks: Buffer[] = [];
  for await (const chunk of body as AsyncIterable<Uint8Array | Buffer | string>) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export async function verifyUploadedR2Object(params: {
  objectKey: string;
  expectedSupplierUid?: string;
  expectedContentType: AllowedImageMime;
}): Promise<{
  verified: boolean;
  contentLength: number;
  contentType: AllowedImageMime;
  error?: string;
}> {
  const validKey = params.expectedSupplierUid
    ? isValidR2ProductObjectKey(params.objectKey, params.expectedSupplierUid)
    : isValidR2ObjectKey(params.objectKey);
  if (!validKey) {
    return {
      verified: false,
      contentLength: 0,
      contentType: params.expectedContentType,
      error: 'Invalid or unauthorized R2 object key.',
    };
  }

  const { client, config } = getR2Client();

  let headRes: any;
  try {
    headRes = await withR2Retry('HeadObject', () =>
      client.send(
        new HeadObjectCommand({
          Bucket: config.bucketName,
          Key: params.objectKey,
        })
      )
    );
  } catch (err: any) {
    const status = Number(err?.$metadata?.httpStatusCode || 0);
    if (status === 404 || err?.name === 'NotFound' || err?.name === 'NoSuchKey') {
      return {
        verified: false,
        contentLength: 0,
        contentType: params.expectedContentType,
        error: 'Uploaded image object was not found in Cloudflare R2 storage.',
      };
    }
    throw err;
  }

  const contentLength = Number(headRes?.ContentLength || 0);
  if (contentLength < MIN_PRODUCT_IMAGE_BYTES || contentLength > MAX_PRODUCT_IMAGE_BYTES) {
    await deleteR2Object(params.objectKey).catch(() => {});
    return {
      verified: false,
      contentLength,
      contentType: params.expectedContentType,
      error: `Uploaded object size (${contentLength} bytes) is outside allowed bounds.`,
    };
  }

  const remoteMime = normalizeAllowedImageMime(String(headRes?.ContentType || ''));
  if (remoteMime && remoteMime !== params.expectedContentType) {
    await deleteR2Object(params.objectKey).catch(() => {});
    return {
      verified: false,
      contentLength,
      contentType: params.expectedContentType,
      error: `Uploaded object Content-Type (${remoteMime}) does not match expected (${params.expectedContentType}).`,
    };
  }

  // Spot-check leading magic bytes to block disguised HTML/SVG/scripts
  const headSlice = await withR2Retry('GetObjectHeader', () =>
    client.send(
      new GetObjectCommand({
        Bucket: config.bucketName,
        Key: params.objectKey,
        Range: 'bytes=0-255',
      })
    )
  );
  const headBuf = await bodyToBuffer(headSlice?.Body);
  const detectedMime = detectImageMimeFromBuffer(headBuf);
  if (!detectedMime || detectedMime !== params.expectedContentType) {
    await deleteR2Object(params.objectKey).catch(() => {});
    return {
      verified: false,
      contentLength,
      contentType: params.expectedContentType,
      error: 'Uploaded file magic-byte signature failed validation and was quarantined/deleted.',
    };
  }

  return {
    verified: true,
    contentLength,
    contentType: detectedMime,
  };
}

export async function readR2Object(objectKey: string): Promise<Buffer | null> {
  if (!isValidR2ObjectKey(objectKey)) {
    return null;
  }
  const { client, config } = getR2Client();
  try {
    const res = await withR2Retry('GetObject', () =>
      client.send(
        new GetObjectCommand({
          Bucket: config.bucketName,
          Key: objectKey,
        })
      )
    );
    const buf = await bodyToBuffer(res?.Body);
    return buf.length > 0 ? buf : null;
  } catch (err: any) {
    const status = Number(err?.$metadata?.httpStatusCode || 0);
    if (status === 404 || err?.name === 'NoSuchKey' || err?.name === 'NotFound') {
      return null;
    }
    throw err;
  }
}

export async function readR2ProductObject(objectKey: string): Promise<Buffer | null> {
  if (!isValidR2ProductObjectKey(objectKey)) {
    return null;
  }
  return readR2Object(objectKey);
}

export async function deleteR2Object(objectKey: string): Promise<boolean> {
  if (!isValidR2ObjectKey(objectKey)) {
    throw new Error('Rejected attempt to delete invalid R2 object key.');
  }
  const { client, config } = getR2Client();
  await withR2Retry('DeleteObject', () =>
    client.send(
      new DeleteObjectCommand({
        Bucket: config.bucketName,
        Key: objectKey,
      })
    )
  );
  return true;
}

export async function deleteR2ProductObject(objectKey: string): Promise<boolean> {
  if (!isValidR2ProductObjectKey(objectKey)) {
    throw new Error('Rejected attempt to delete invalid R2 object key.');
  }
  return deleteR2Object(objectKey);
}

/**
 * Performs a non-destructive round-trip live R2 bucket check (PutObject -> HeadObject ->
 * GetObject -> Signed Read URL fetch -> DeleteObject cleanup) on a disposable diagnostic key.
 */
export async function runR2LiveSelfCheck(): Promise<{
  verified: boolean;
  bucket?: string;
  error?: string;
}> {
  const envCheck = validateR2Environment();
  if (!envCheck.valid || !envCheck.config) {
    r2Diag.liveVerified = false;
    return { verified: false, error: envCheck.error };
  }

  const probePng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64'
  );
  const probeKey = buildR2ProductObjectKey({
    supplierUid: 'diag_selfcheck',
    productId: 'probe_check',
    uniqueFileName: generateUniqueProductImageFileName('startup_probe', 'image/png'),
  });

  try {
    await uploadBufferToR2({
      objectKey: probeKey,
      buffer: probePng,
      contentType: 'image/png',
      cacheControl: 'no-store',
    });

    const head = await verifyUploadedR2Object({
      objectKey: probeKey,
      expectedSupplierUid: 'diag_selfcheck',
      expectedContentType: 'image/png',
    });
    if (!head.verified) {
      throw new Error(head.error || 'HeadObject verification failed on live R2 probe.');
    }

    const readBack = await readR2ProductObject(probeKey);
    if (!readBack || !readBack.equals(probePng)) {
      throw new Error('GetObject returned mismatched bytes on live R2 probe.');
    }

    const signed = await createPresignedReadUrl({ objectKey: probeKey, expiresInSeconds: 120 });
    const signedFetch = await fetch(signed.signedUrl);
    if (!signedFetch.ok) {
      throw new Error(`Signed GET URL returned HTTP ${signedFetch.status}`);
    }
    const fetchedBuf = Buffer.from(await signedFetch.arrayBuffer());
    if (!fetchedBuf.equals(probePng)) {
      throw new Error('Signed GET URL bytes did not match uploaded probe.');
    }

    r2Diag.liveVerified = true;
    r2Diag.status = 'connected';
    r2Diag.lastError = null;
    r2Diag.lastSuccessAt = new Date().toISOString();
    console.log(
      `[R2 Live Check] PutObject+HeadObject+GetObject+PresignedRead+DeleteObject PASSED (bucket=${envCheck.config.bucketName})`
    );
    return { verified: true, bucket: envCheck.config.bucketName };
  } catch (err: any) {
    const msg = redactSecretErrors(err instanceof Error ? err.message : String(err));
    r2Diag.liveVerified = false;
    r2Diag.status = 'degraded';
    r2Diag.lastError = `LiveSelfCheck: ${msg}`;
    console.error(`[R2 Live Check] FAILED: ${msg}`);
    return { verified: false, bucket: envCheck.config.bucketName, error: msg };
  } finally {
    await deleteR2ProductObject(probeKey).catch(() => {});
  }
}
