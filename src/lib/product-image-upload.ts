import { ProductImageMeta } from '../types/marketplace';
import { getActiveClientLanguage } from './api';
import { auth } from './firebase';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);
const ALLOWED_EXTENSIONS = /\.(jpe?g|png|webp)$/i;
export const MAX_RAW_PRODUCT_IMAGE_BYTES = 12 * 1024 * 1024;
export const MAX_UPLOAD_PRODUCT_IMAGE_BYTES = 5 * 1024 * 1024;

export interface PreparedImageResult {
  blob: Blob;
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp';
  fileName: string;
  width?: number;
  height?: number;
}

export function validateProductImageFile(file: File): void {
  const sw = getActiveClientLanguage() === 'sw';
  const mime = (file.type || '').toLowerCase();
  if (!ALLOWED_MIME_TYPES.has(mime) && !ALLOWED_EXTENSIONS.test(file.name)) {
    throw new Error(
      sw
        ? `Faili "${file.name}" halikubaliwi. Chagua picha ya JPG, JPEG, PNG, au WEBP.`
        : `Unsupported file "${file.name}". Please choose a JPG, JPEG, PNG, or WEBP image.`
    );
  }
  if (file.size === 0) {
    throw new Error(sw ? `Faili "${file.name}" ni tupu.` : `File "${file.name}" is empty.`);
  }
  if (file.size > MAX_RAW_PRODUCT_IMAGE_BYTES) {
    throw new Error(
      sw
        ? `Picha "${file.name}" imezidi kikomo cha MB 12.`
        : `Image "${file.name}" exceeds 12 MB raw upload limit.`
    );
  }
}

export async function optimizeProductImage(file: File): Promise<PreparedImageResult> {
  validateProductImageFile(file);

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error(`Unable to decode image "${file.name}".`));
      el.src = objectUrl;
    });

    const maxEdge = 1600;
    let { width, height } = img;
    const needsResize = width > maxEdge || height > maxEdge;

    if (!needsResize && file.size <= 1.5 * 1024 * 1024 && ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      const normalizedMime =
        file.type.toLowerCase() === 'image/jpg'
          ? 'image/jpeg'
          : (file.type.toLowerCase() as 'image/jpeg' | 'image/png' | 'image/webp');
      return {
        blob: file,
        mimeType: normalizedMime,
        fileName: file.name,
        width,
        height,
      };
    }

    if (needsResize) {
      const scale = Math.min(maxEdge / width, maxEdge / height);
      width = Math.max(1, Math.round(width * scale));
      height = Math.max(1, Math.round(height * scale));
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      const fallbackMime =
        file.type.toLowerCase() === 'image/png'
          ? 'image/png'
          : file.type.toLowerCase() === 'image/webp'
            ? 'image/webp'
            : 'image/jpeg';
      return { blob: file, mimeType: fallbackMime, fileName: file.name, width, height };
    }

    ctx.drawImage(img, 0, 0, width, height);

    const preferPng = file.type.toLowerCase() === 'image/png' && file.size < 2.2 * 1024 * 1024;
    const targetMime: 'image/png' | 'image/webp' | 'image/jpeg' = preferPng
      ? 'image/png'
      : file.type.toLowerCase() === 'image/webp'
        ? 'image/webp'
        : 'image/jpeg';

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), targetMime, targetMime === 'image/png' ? undefined : 0.85)
    );

    if (!blob) {
      throw new Error(`Compression failed for "${file.name}".`);
    }
    if (blob.size > MAX_UPLOAD_PRODUCT_IMAGE_BYTES) {
      throw new Error(`Compressed image "${file.name}" still exceeds 5 MB limit.`);
    }

    return {
      blob,
      mimeType: targetMime,
      fileName: file.name,
      width,
      height,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function uploadViaBackendR2Proxy(
  endpoint: string,
  prepared: PreparedImageResult,
  token: string,
  onProgress: (pct: number) => void,
  extraHeaders?: Record<string, string>
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', prepared.mimeType);
    xhr.setRequestHeader('X-File-Name', encodeURIComponent(prepared.fileName));
    xhr.setRequestHeader('x-language', getActiveClientLanguage());
    if (extraHeaders) {
      for (const [k, v] of Object.entries(extraHeaders)) {
        if (v) xhr.setRequestHeader(k, v);
      }
    }

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable && evt.total > 0) {
        const uploadPct = 25 + Math.round((evt.loaded / evt.total) * 70);
        onProgress(Math.min(95, uploadPct));
      }
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText || '{}');
        if (xhr.status >= 200 && xhr.status < 300) {
          onProgress(100);
          resolve(data);
        } else {
          reject(new Error(data.error || `Image upload failed (${xhr.status})`));
        }
      } catch {
        reject(new Error(`Image upload failed (${xhr.status})`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error while uploading image to Cloudflare R2.'));
    xhr.send(prepared.blob);
  });
}

async function putBinaryToPresignedR2Url(
  uploadUrl: string,
  prepared: PreparedImageResult,
  requiredHeaders: Record<string, string>,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);
    for (const [k, v] of Object.entries(requiredHeaders)) {
      xhr.setRequestHeader(k, v);
    }
    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable && evt.total > 0) {
        const uploadPct = 30 + Math.round((evt.loaded / evt.total) * 55);
        onProgress(Math.min(85, uploadPct));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Direct R2 PUT failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error('CORS_OR_NETWORK_ERROR'));
    xhr.send(prepared.blob);
  });
}

export async function uploadProductImageWithProgress(
  file: File,
  onProgress: (pct: number) => void,
  productId?: string
): Promise<ProductImageMeta> {
  onProgress(5);
  const prepared = await optimizeProductImage(file);
  onProgress(20);

  const token = auth.currentUser ? await auth.currentUser.getIdToken() : '';
  if (!token) {
    throw new Error('Authentication required to upload product images.');
  }

  // Primary R2 Flow: try short-lived presigned PUT + HeadObject verification,
  // seamlessly falling back to authenticated backend-mediated R2 upload if bucket CORS blocks browser PUT.
  try {
    const idempotencyKey = `r2_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    const presignRes = await fetch('/api/supplier/product-images/r2/presign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fileName: prepared.fileName,
        contentType: prepared.mimeType,
        fileSize: prepared.blob.size,
        productId: productId || undefined,
        idempotencyKey,
      }),
    });

    if (presignRes.ok) {
      const presigned = await presignRes.json();
      onProgress(30);
      await putBinaryToPresignedR2Url(
        presigned.uploadUrl,
        prepared,
        presigned.requiredHeaders || { 'Content-Type': prepared.mimeType },
        onProgress
      );
      onProgress(90);
      const confirmRes = await fetch('/api/supplier/product-images/r2/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          imageId: presigned.imageId,
          objectKey: presigned.objectKey,
        }),
      });
      if (confirmRes.ok) {
        const confirmed = await confirmRes.json();
        if (confirmed.image) {
          onProgress(100);
          return {
            ...confirmed.image,
            width: prepared.width,
            height: prepared.height,
          };
        }
      } else {
        const errBody = await confirmRes.json().catch(() => ({}));
        throw new Error(errBody.error || `Image verification failed (${confirmRes.status})`);
      }
    }
  } catch (err: any) {
    // Only fall back on browser CORS/network block during direct R2 PUT; rethrow explicit validation rejections
    const msg = String(err?.message || '');
    if (msg && !msg.includes('CORS_OR_NETWORK_ERROR') && !msg.includes('Direct R2 PUT failed')) {
      throw err;
    }
  }

  // Authenticated backend-mediated Cloudflare R2 upload (stores exclusively in R2)
  const data = await uploadViaBackendR2Proxy(
    '/api/supplier/product-images',
    prepared,
    token,
    onProgress,
    productId ? { 'X-Product-Id': productId } : undefined
  );
  if (!data.image) {
    throw new Error('Failed to upload image to Cloudflare R2.');
  }
  return {
    ...data.image,
    width: prepared.width,
    height: prepared.height,
  };
}

export async function uploadAvatarImage(
  file: File,
  onProgress: (pct: number) => void = () => {}
): Promise<{ avatarUrl: string }> {
  onProgress(10);
  const prepared = await optimizeProductImage(file);
  onProgress(25);
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : '';
  if (!token) {
    throw new Error('Authentication required to upload your profile avatar.');
  }
  const data = await uploadViaBackendR2Proxy('/api/me/avatar', prepared, token, onProgress);
  return { avatarUrl: data.user?.avatarUrl || data.asset?.url };
}

export async function deleteAvatarImage(): Promise<void> {
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : '';
  if (!token) throw new Error('Authentication required.');
  const res = await fetch('/api/me/avatar', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to remove avatar.');
  }
}

export async function uploadAdminMediaImage(
  file: File,
  kind: 'banner' | 'category',
  scopeId: string,
  onProgress: (pct: number) => void = () => {}
): Promise<{ asset: { id: string; url: string; objectKey: string }; settings: any }> {
  onProgress(10);
  const prepared = await optimizeProductImage(file);
  onProgress(25);
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : '';
  if (!token) {
    throw new Error('Super Admin authentication required.');
  }
  return uploadViaBackendR2Proxy('/api/admin/media', prepared, token, onProgress, {
    'X-Media-Kind': kind,
    'X-Media-Scope': scopeId,
  });
}

export async function deleteUploadedProductImage(imageId: string): Promise<void> {
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : '';
  const res = await fetch(`/api/supplier/product-images/${encodeURIComponent(imageId)}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Failed to remove image (${res.status})`);
  }
}

export function extractMediaId(url: string): string | null {
  const match = url.trim().match(/^\/api\/media\/products\/([a-zA-Z0-9_-]{3,80})(?:\?.*)?$/);
  return match ? match[1] : null;
}
