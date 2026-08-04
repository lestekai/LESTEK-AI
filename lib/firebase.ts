import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGLvIspjeoXUGu31q7m6Zpdr0AVObTnw4",
  authDomain: "gen-lang-client-0791902841.firebaseapp.com",
  projectId: "gen-lang-client-0791902841",
  storageBucket: "gen-lang-client-0791902841.firebasestorage.app",
  messagingSenderId: "369529813784",
  appId: "1:369529813784:web:64a09bd09f89a93fc7fc6d"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
