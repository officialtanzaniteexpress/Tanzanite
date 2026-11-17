import fs from 'fs';
import { cert, getApp, getApps, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import firebaseConfig from '../../firebase-applet-config.json';

export const EXPECTED_FIREBASE_PROJECT_ID = 'tanzanite-express';
export const EXPECTED_FIREBASE_APP_ID = '1:175219764302:web:f7cc5918f77b01e170a71f';
export const EXPECTED_FIRESTORE_DATABASE_ID =
  'ai-studio-tanzaniteexpress-486c70da-dda1-41b9-a4e5-8ed163d2f8cf';

export type FirebaseCredentialMode =
  | 'service_account_json'
  | 'service_account_base64'
  | 'service_account_env'
  | 'service_account_file'
  | 'adc_fallback';

export interface FirebaseAdminDiagnostics {
  projectId: string;
  databaseId: string;
  appId: string;
  measurementId: string;
  authDomain: string;
  storageBucket: string;
  credentialMode: FirebaseCredentialMode;
  serviceAccountConfigured: boolean;
  serviceAccountEmailMasked: string | null;
  validationError: string | null;
}

interface ParsedServiceAccountResult {
  credentialMode: FirebaseCredentialMode;
  serviceAccount: ServiceAccount | null;
  clientEmail: string | null;
  validationError: string | null;
}

function assertValidServerFirebaseConfig(): void {
  if (firebaseConfig.projectId !== EXPECTED_FIREBASE_PROJECT_ID) {
    throw new Error(
      `Server Firebase config mismatch: projectId="${firebaseConfig.projectId}", expected "${EXPECTED_FIREBASE_PROJECT_ID}".`
    );
  }
  if (firebaseConfig.appId !== EXPECTED_FIREBASE_APP_ID) {
    throw new Error(
      `Server Firebase config mismatch: appId="${firebaseConfig.appId}", expected "${EXPECTED_FIREBASE_APP_ID}".`
    );
  }
  if (firebaseConfig.firestoreDatabaseId !== EXPECTED_FIRESTORE_DATABASE_ID) {
    throw new Error(
      `Server Firestore database mismatch: firestoreDatabaseId="${firebaseConfig.firestoreDatabaseId}", expected "${EXPECTED_FIRESTORE_DATABASE_ID}".`
    );
  }
}

assertValidServerFirebaseConfig();

export function maskServiceAccountEmail(email: string | null | undefined): string | null {
  if (!email) return null;
  const trimmed = email.trim();
  const atIdx = trimmed.indexOf('@');
  if (atIdx <= 0) return null;
  const local = trimmed.slice(0, atIdx);
  const domain = trimmed.slice(atIdx + 1);
  const prefix = local.slice(0, Math.min(3, local.length));
  return `${prefix}***@${domain}`;
}

function normalizeServiceAccountObject(
  rawObj: Record<string, unknown>,
  sourceLabel: string
): { serviceAccount: ServiceAccount | null; clientEmail: string | null; error: string | null } {
  const projectId =
    typeof rawObj.project_id === 'string'
      ? rawObj.project_id.trim()
      : typeof rawObj.projectId === 'string'
        ? rawObj.projectId.trim()
        : '';

  if (projectId && projectId !== EXPECTED_FIREBASE_PROJECT_ID) {
    return {
      serviceAccount: null,
      clientEmail: null,
      error: `${sourceLabel} targets project "${projectId}", but only "${EXPECTED_FIREBASE_PROJECT_ID}" is permitted.`,
    };
  }

  const clientEmail =
    typeof rawObj.client_email === 'string'
      ? rawObj.client_email.trim()
      : typeof rawObj.clientEmail === 'string'
        ? rawObj.clientEmail.trim()
        : '';

  const emailProjectMatch = clientEmail.match(/@([a-z0-9-]+)\.iam\.gserviceaccount\.com$/i);
  const emailProjectId = emailProjectMatch ? emailProjectMatch[1] : '';
  if (emailProjectId && emailProjectId !== EXPECTED_FIREBASE_PROJECT_ID) {
    return {
      serviceAccount: null,
      clientEmail: null,
      error: `${sourceLabel} client_email targets project "${emailProjectId}", but only "${EXPECTED_FIREBASE_PROJECT_ID}" is permitted.`,
    };
  }

  const privateKeyRaw =
    typeof rawObj.private_key === 'string'
      ? rawObj.private_key
      : typeof rawObj.privateKey === 'string'
        ? rawObj.privateKey
        : '';

  const privateKey = privateKeyRaw.replace(/\\n/g, '\n').trim();

  if (!clientEmail || !privateKey) {
    return {
      serviceAccount: null,
      clientEmail: clientEmail || null,
      error: `${sourceLabel} is missing client_email or private_key.`,
    };
  }

  return {
    serviceAccount: {
      projectId: projectId || emailProjectId || EXPECTED_FIREBASE_PROJECT_ID,
      clientEmail,
      privateKey,
    },
    clientEmail,
    error: null,
  };
}

export function parseOptionAServiceAccount(
  env: Record<string, string | undefined> = process.env
): ParsedServiceAccountResult {
  const rawJsonEnv = (env.FIREBASE_SERVICE_ACCOUNT_JSON || '').trim();
  if (rawJsonEnv) {
    try {
      const jsonText = rawJsonEnv.startsWith('{')
        ? rawJsonEnv
        : Buffer.from(rawJsonEnv, 'base64').toString('utf-8');
      const parsed = JSON.parse(jsonText) as Record<string, unknown>;
      const normalized = normalizeServiceAccountObject(parsed, 'FIREBASE_SERVICE_ACCOUNT_JSON');
      if (normalized.serviceAccount) {
        return {
          credentialMode: rawJsonEnv.startsWith('{')
            ? 'service_account_json'
            : 'service_account_base64',
          serviceAccount: normalized.serviceAccount,
          clientEmail: normalized.clientEmail,
          validationError: null,
        };
      }
      return {
        credentialMode: 'adc_fallback',
        serviceAccount: null,
        clientEmail: normalized.clientEmail,
        validationError: normalized.error,
      };
    } catch {
      return {
        credentialMode: 'adc_fallback',
        serviceAccount: null,
        clientEmail: null,
        validationError: 'FIREBASE_SERVICE_ACCOUNT_JSON could not be parsed as valid JSON.',
      };
    }
  }

  const rawBase64Env = (env.FIREBASE_SERVICE_ACCOUNT_BASE64 || '').trim();
  if (rawBase64Env) {
    try {
      const jsonText = Buffer.from(rawBase64Env, 'base64').toString('utf-8');
      const parsed = JSON.parse(jsonText) as Record<string, unknown>;
      const normalized = normalizeServiceAccountObject(parsed, 'FIREBASE_SERVICE_ACCOUNT_BASE64');
      if (normalized.serviceAccount) {
        return {
          credentialMode: 'service_account_base64',
          serviceAccount: normalized.serviceAccount,
          clientEmail: normalized.clientEmail,
          validationError: null,
        };
      }
      return {
        credentialMode: 'adc_fallback',
        serviceAccount: null,
        clientEmail: normalized.clientEmail,
        validationError: normalized.error,
      };
    } catch {
      return {
        credentialMode: 'adc_fallback',
        serviceAccount: null,
        clientEmail: null,
        validationError:
          'FIREBASE_SERVICE_ACCOUNT_BASE64 could not be decoded as valid service account JSON.',
      };
    }
  }

  const clientEmailEnv = (env.FIREBASE_CLIENT_EMAIL || '').trim();
  const privateKeyEnv = (env.FIREBASE_PRIVATE_KEY || '').trim();
  if (clientEmailEnv || privateKeyEnv) {
    const explicitProjectEnv = (env.FIREBASE_PROJECT_ID || '').trim();
    const normalized = normalizeServiceAccountObject(
      {
        ...(explicitProjectEnv ? { project_id: explicitProjectEnv } : {}),
        client_email: clientEmailEnv,
        private_key: privateKeyEnv,
      },
      'FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY'
    );
    if (normalized.serviceAccount) {
      return {
        credentialMode: 'service_account_env',
        serviceAccount: normalized.serviceAccount,
        clientEmail: normalized.clientEmail,
        validationError: null,
      };
    }
    return {
      credentialMode: 'adc_fallback',
      serviceAccount: null,
      clientEmail: normalized.clientEmail,
      validationError: normalized.error,
    };
  }

  const gacPath = (env.GOOGLE_APPLICATION_CREDENTIALS || '').trim();
  if (gacPath) {
    try {
      if (!fs.existsSync(gacPath)) {
        return {
          credentialMode: 'adc_fallback',
          serviceAccount: null,
          clientEmail: null,
          validationError: 'GOOGLE_APPLICATION_CREDENTIALS file path does not exist.',
        };
      }
      const parsed = JSON.parse(fs.readFileSync(gacPath, 'utf-8')) as Record<string, unknown>;
      const normalized = normalizeServiceAccountObject(parsed, 'GOOGLE_APPLICATION_CREDENTIALS');
      if (normalized.serviceAccount) {
        return {
          credentialMode: 'service_account_file',
          serviceAccount: normalized.serviceAccount,
          clientEmail: normalized.clientEmail,
          validationError: null,
        };
      }
      return {
        credentialMode: 'adc_fallback',
        serviceAccount: null,
        clientEmail: normalized.clientEmail,
        validationError: normalized.error,
      };
    } catch {
      return {
        credentialMode: 'adc_fallback',
        serviceAccount: null,
        clientEmail: null,
        validationError: 'GOOGLE_APPLICATION_CREDENTIALS file could not be read as valid JSON.',
      };
    }
  }

  return {
    credentialMode: 'adc_fallback',
    serviceAccount: null,
    clientEmail: null,
    validationError: null,
  };
}

const parsedCred = parseOptionAServiceAccount();

if (parsedCred.validationError) {
  console.error(`[Firebase Admin] Option A credential validation error: ${parsedCred.validationError}`);
}

const adminApp =
  getApps().length > 0
    ? getApp()
    : parsedCred.serviceAccount
      ? initializeApp({
          credential: cert(parsedCred.serviceAccount),
          projectId: firebaseConfig.projectId,
          storageBucket: firebaseConfig.storageBucket,
        })
      : initializeApp({
          projectId: firebaseConfig.projectId,
          storageBucket: firebaseConfig.storageBucket,
        });

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp, firebaseConfig.firestoreDatabaseId);
export const adminStorage = getStorage(adminApp);
export const FIREBASE_STORAGE_BUCKET = firebaseConfig.storageBucket;

export function getStorageBucket() {
  return adminStorage.bucket(firebaseConfig.storageBucket);
}

export function getFirebaseAdminDiagnostics(): FirebaseAdminDiagnostics {
  return {
    projectId: firebaseConfig.projectId,
    databaseId: firebaseConfig.firestoreDatabaseId,
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.measurementId || '',
    authDomain: firebaseConfig.authDomain,
    storageBucket: firebaseConfig.storageBucket,
    credentialMode: parsedCred.credentialMode,
    serviceAccountConfigured: Boolean(parsedCred.serviceAccount),
    serviceAccountEmailMasked: maskServiceAccountEmail(parsedCred.clientEmail),
    validationError: parsedCred.validationError,
  };
}

export interface FirebaseCredentialSourceStatus {
  source: 'FIREBASE_SERVICE_ACCOUNT_JSON' | 'FIREBASE_SERVICE_ACCOUNT_BASE64' | 'FIREBASE_CLIENT_EMAIL+FIREBASE_PRIVATE_KEY' | 'GOOGLE_APPLICATION_CREDENTIALS';
  priority: number;
  configured: boolean;
  valid: boolean;
  active: boolean;
  targetProjectId: string | null;
  clientEmailMasked: string | null;
  validationError: string | null;
}

export function getFirebaseCredentialInventory(
  env: Record<string, string | undefined> = process.env
): FirebaseCredentialSourceStatus[] {
  const activeMode = parseOptionAServiceAccount(env);

  const inspectSingle = (
    source: FirebaseCredentialSourceStatus['source'],
    priority: number,
    subset: Record<string, string | undefined>,
    isConfigured: boolean,
    matchesActive: boolean
  ): FirebaseCredentialSourceStatus => {
    if (!isConfigured) {
      return {
        source,
        priority,
        configured: false,
        valid: false,
        active: false,
        targetProjectId: null,
        clientEmailMasked: null,
        validationError: null,
      };
    }
    const parsed = parseOptionAServiceAccount(subset);
    return {
      source,
      priority,
      configured: true,
      valid: Boolean(parsed.serviceAccount),
      active: Boolean(parsed.serviceAccount) && matchesActive,
      targetProjectId: parsed.serviceAccount?.projectId || null,
      clientEmailMasked: maskServiceAccountEmail(parsed.clientEmail),
      validationError: parsed.validationError,
    };
  };

  const hasJson = Boolean((env.FIREBASE_SERVICE_ACCOUNT_JSON || '').trim());
  const hasB64 = Boolean((env.FIREBASE_SERVICE_ACCOUNT_BASE64 || '').trim());
  const hasEnvPair = Boolean(
    (env.FIREBASE_CLIENT_EMAIL || '').trim() || (env.FIREBASE_PRIVATE_KEY || '').trim()
  );
  const hasGac = Boolean((env.GOOGLE_APPLICATION_CREDENTIALS || '').trim());

  const activeSourceIndex = hasJson
    ? 1
    : hasB64
      ? 2
      : hasEnvPair
        ? 3
        : hasGac
          ? 4
          : 0;

  return [
    inspectSingle(
      'FIREBASE_SERVICE_ACCOUNT_JSON',
      1,
      { FIREBASE_SERVICE_ACCOUNT_JSON: env.FIREBASE_SERVICE_ACCOUNT_JSON },
      hasJson,
      activeSourceIndex === 1 && Boolean(activeMode.serviceAccount)
    ),
    inspectSingle(
      'FIREBASE_SERVICE_ACCOUNT_BASE64',
      2,
      { FIREBASE_SERVICE_ACCOUNT_BASE64: env.FIREBASE_SERVICE_ACCOUNT_BASE64 },
      hasB64,
      activeSourceIndex === 2 && Boolean(activeMode.serviceAccount)
    ),
    inspectSingle(
      'FIREBASE_CLIENT_EMAIL+FIREBASE_PRIVATE_KEY',
      3,
      {
        FIREBASE_PROJECT_ID: env.FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL: env.FIREBASE_CLIENT_EMAIL,
        FIREBASE_PRIVATE_KEY: env.FIREBASE_PRIVATE_KEY,
      },
      hasEnvPair,
      activeSourceIndex === 3 && Boolean(activeMode.serviceAccount)
    ),
    inspectSingle(
      'GOOGLE_APPLICATION_CREDENTIALS',
      4,
      { GOOGLE_APPLICATION_CREDENTIALS: env.GOOGLE_APPLICATION_CREDENTIALS },
      hasGac,
      activeSourceIndex === 4 && Boolean(activeMode.serviceAccount)
    ),
  ];
}

export const BOOTSTRAP_ADMIN_EMAIL = 'mahelaissa1@gmail.com';
