"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "@/features/i18n/I18nProvider";

const STORAGE_KEY = "raframgo.cookieConsent";
type ConsentValue = "accepted" | "rejected";

/** Lee la decisión de cookies guardada, si existe. Uso interno de este componente y de cualquier script opcional futuro (analítica) que deba respetar el consentimiento. */
export function getStoredCookieConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "accepted" || raw === "rejected" ? raw : null;
}

/**
 * Banner de cookies (obligatorio, ver spec: "no olvidar la implementación
 * del uso de cookies"). Las cookies esenciales (idioma, esta misma
 * elección) siempre se guardan — no dependen de este banner. Las opcionales
 * (analítica) solo se activarían si el valor guardado es "accepted"; hoy el
 * portal no carga ningún script de analítica todavía, pero la lógica ya
 * queda lista para cuando se agregue uno.
 */
export default function CookieConsentBanner() {
  const t = useT();
  const [consent, setConsent] = useState<ConsentValue | null>("accepted");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(getStoredCookieConsent());
    setReady(true);
  }, []);

  function choose(value: ConsentValue) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  if (!ready || consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 shadow-[0_-4px_16px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          {t("cookies.message")}{" "}
          <Link href="/privacidad" className="font-medium text-brand hover:underline">
            {t("cookies.policyLink")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {t("cookies.rejectNonEssential")}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover"
          >
            {t("cookies.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
