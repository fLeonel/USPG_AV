import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/**
 * Configuración de Firebase extraída de las variables de entorno.
 * Estas variables deben estar definidas en `.env.local`.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Instancia de la aplicación de Firebase.
 * Si ya existe una instancia, se reutiliza.
 */
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/**
 * Instancia de Firestore asociada a la aplicación de Firebase.
 */
export const db = getFirestore(app);

/**
 * Instancia de autenticación (Firebase Auth) asociada a la aplicación.
 */
export const auth = getAuth(app);

/**
 * Exportación por defecto de la instancia de Firebase App.
 */
export default app;
