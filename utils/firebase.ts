import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

interface FirebasePublicConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export const getFirebaseConfig = (): FirebasePublicConfig => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.firebase as FirebasePublicConfig;
};

export const hasFirebaseConfig = () => {
  const config = getFirebaseConfig();
  return Boolean(config.apiKey && config.projectId && config.appId);
};

export const getFirebaseApp = (): FirebaseApp => {
  const config = getFirebaseConfig();

  if (!hasFirebaseConfig()) {
    throw new Error("Firebase public runtime config is missing.");
  }

  return getApps().length ? getApp() : initializeApp(config);
};

export const getFirestoreDb = () => getFirestore(getFirebaseApp());

export const getPublicStorageUrl = (path: string) => {
  const bucket = getFirebaseConfig().storageBucket;

  if (!bucket) return "";

  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    path
  )}?alt=media`;
};
