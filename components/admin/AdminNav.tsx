"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/features/admin/AdminAuthProvider";

const LINKS = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/mensajes", label: "Mensajes" },
] as const;

export default function AdminNav() {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  if (!user) return null;

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <nav className="flex gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${pathname === link.href ? "text-brand" : "text-slate-600 hover:text-brand"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted sm:inline">{user.email}</span>
          <button
            type="button"
            onClick={() => void logout()}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
