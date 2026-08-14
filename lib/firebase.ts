import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// El portal reutiliza el mismo proyecto Firebase de aMerkar, pero solo para
// LEER, sin sesión, las colecciones que ya son públicas por diseño en
// firestore.rules: communityStats/summary y publicReviews/{id} (ver
// lib/community.service.ts). El portal nunca importa "firebase/auth": no
// tiene login (ver spec, sección 3 — "El portal NO debe tener autenticación
// de usuarios").
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function hasFirebaseConfiguration() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
}

function getFirebaseApp(): FirebaseApp {
  if (!hasFirebaseConfiguration()) {
    throw new Error("Firebase no está configurado. Completa .env.local.");
  }
  return getApps()[0] ?? initializeApp(firebaseConfig);
}

export function getFirebaseFirestore(): Firestore {
  return getFirestore(getFirebaseApp());
}
