"use client";

import Link from "next/link";
import { useT } from "@/features/i18n/I18nProvider";

const LINK_GROUPS = [
  { href: "/productos", labelKey: "footer.products" },
  { href: "/comunidad", labelKey: "footer.community" },
  { href: "/sobre-raframgo", labelKey: "footer.about" },
  { href: "/contacto", labelKey: "footer.contact" },
  { href: "/privacidad", labelKey: "footer.privacy" },
  { href: "/terminos", labelKey: "footer.terms" },
] as const;

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-bold text-slate-900">{t("nav.brand")}</p>
            <p className="mt-1 text-sm text-muted">{t("footer.tagline")}</p>
          </div>

          <nav aria-label={t("footer.linksHeading")}>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
              {LINK_GROUPS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-600 hover:text-brand">
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-8 border-t border-slate-200 pt-6 text-xs text-muted">
          © {year} {t("nav.brand")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
