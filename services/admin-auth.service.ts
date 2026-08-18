import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

/**
 * Autenticación exclusiva de /admin (el resto del portal no tiene sesión,
 * ver spec sección 3). Reutiliza el mismo proyecto Firebase Auth de
 * Mercaue: cualquier cuenta ya creada ahí puede intentar entrar aquí, pero
 * solo importa si además tiene un documento en admins/{uid} (ver
 * features/admin/useIsAdmin.ts y firestore.rules) — el login por sí solo no
 * da ningún permiso.
 */
class AdminAuthService {
  subscribe(listener: (user: User | null) => void) {
    return onAuthStateChanged(getFirebaseAuth(), listener);
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  }

  async logout() {
    await signOut(getFirebaseAuth());
  }
}

const adminAuthService = new AdminAuthService();

export default adminAuthService;
