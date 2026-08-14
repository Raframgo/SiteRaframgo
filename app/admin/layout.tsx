import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import { AdminAuthProvider } from "@/features/admin/AdminAuthProvider";

// El panel de administración no debe indexarse ni aparecer en el sitemap
// público (ver spec sección 23: es una herramienta interna, no una sección
// del portal para visitantes).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </AdminAuthProvider>
  );
}
