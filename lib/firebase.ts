import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);

export type OperationType = 'create' | 'read' | 'update' | 'delete' | 'list';

export function handleFirestoreError(error: any, operation: OperationType, path: string) {
  const errMessage = error?.message || String(error);
  const errCode = error?.code || 'unknown';
  const info = {
    operation,
    path,
    code: errCode,
    message: errMessage,
    timestamp: new Date().toISOString()
  };
  console.error(`[Firestore Error] ${operation.toUpperCase()} at ${path}:`, info);
  return info;
}


