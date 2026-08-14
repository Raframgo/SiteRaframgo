"use client";

import Link from "next/link";
import { useState } from "react";
import { useT } from "@/features/i18n/I18nProvider";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ITEMS = [
  { href: "/productos", labelKey: "nav.products" },
  { href: "/comunidad", labelKey: "nav.community" },
  { href: "/sobre-raframgo", labelKey: "nav.about" },
  { href: "/contacto", labelKey: "nav.contact" },
] as const;

/**
 * Navegación principal del portal (ver spec, sección 15). Deliberadamente
 * simple: sin login, sin "Mi espacio" — solo enlaces a las secciones
 * públicas del portal.
 */
export default function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
          {t("nav.brand")}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 hover:text-brand">
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Menú"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 md:hidden"
        >
          <span aria-hidden>{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <LanguageSwitcher className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
