"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAdminAuth } from "@/features/admin/AdminAuthProvider";

/**
 * Protege cada página de /admin (menos /admin/login). Redirige a
 * /admin/login si no hay sesión; muestra "no autorizado" si hay sesión pero
 * el usuario no tiene documento en admins/{uid} (ver useIsAdmin).
 */
export default function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/admin/login");
  }, [loading, user, router]);

  if (loading || !user || isAdmin === null) {
    return <div className="px-6 py-16 text-center text-sm text-muted">Cargando…</div>;
  }

  if (isAdmin === false) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-lg font-bold text-slate-900">No autorizado</p>
        <p className="mt-2 text-sm text-muted">Esta cuenta no tiene permisos de administrador.</p>
      </div>
    );
  }

  return <>{children}</>;
}
