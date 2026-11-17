import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDocFromServer, getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const EXPECTED_PROJECT_ID = 'tanzanite-express';
const EXPECTED_APP_ID = '1:175219764302:web:f7cc5918f77b01e170a71f';
const EXPECTED_DATABASE_ID = 'ai-studio-tanzaniteexpress-486c70da-dda1-41b9-a4e5-8ed163d2f8cf';

function assertValidClientFirebaseConfig(cfg: typeof firebaseConfig): void {
  if (!cfg || cfg.projectId !== EXPECTED_PROJECT_ID) {
    throw new Error(
      `Invalid Firebase projectId "${cfg?.projectId || ''}". Expected "${EXPECTED_PROJECT_ID}".`
    );
  }
  if (cfg.appId !== EXPECTED_APP_ID) {
    throw new Error(
      `Invalid Firebase appId "${cfg.appId || ''}". Expected "${EXPECTED_APP_ID}".`
    );
  }
  if (!cfg.apiKey || !cfg.authDomain || !cfg.storageBucket) {
    throw new Error('Incomplete Firebase client configuration in firebase-applet-config.json.');
  }
  if (cfg.firestoreDatabaseId !== EXPECTED_DATABASE_ID) {
    throw new Error(
      `Invalid Firestore database ID "${cfg.firestoreDatabaseId || ''}". Expected "${EXPECTED_DATABASE_ID}".`
    );
  }
}

assertValidClientFirebaseConfig(firebaseConfig);

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testFirestoreConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'marketplace_settings', 'default'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
