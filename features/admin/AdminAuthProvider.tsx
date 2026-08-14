"use client";

import type { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import adminAuthService from "@/services/admin-auth.service";
import { useIsAdmin } from "./useIsAdmin";

type AdminAuthContextValue = {
  user: User | null;
  /** null mientras se resuelve la sesión o el rol; true/false ya resuelto. */
  isAdmin: boolean | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

/** Envuelve únicamente las rutas /admin (ver app/admin/layout.tsx) — nada más del portal necesita esto. */
export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = useIsAdmin(user?.uid);

  useEffect(() => {
    return adminAuthService.subscribe((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login: (email, password) => adminAuthService.login(email, password),
        logout: () => adminAuthService.logout(),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth debe usarse dentro de AdminAuthProvider.");
  return context;
}
