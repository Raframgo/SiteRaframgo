"use client";

import { useT } from "@/features/i18n/I18nProvider";

/**
 * Contacto sin formulario propio por ahora (no hay backend para procesarlo
 * de forma segura sin más infraestructura): mailto directo a los correos
 * reales ya definidos para RaframGo/aMerkar. La información empresarial
 * queda pendiente de publicar hasta que exista (no se inventa, ver spec
 * sección 17).
 */
export default function ContactView() {
  const t = useT();
  const generalEmail = t("contact.general.value");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">{t("contact.heading")}</h1>
      <p className="mt-2 text-muted">{t("contact.subheading")}</p>

      <div className="mt-10 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900">{t("contact.general.label")}</h2>
          <a href={`mailto:${generalEmail}`} className="mt-1 block text-brand hover:underline">
            {generalEmail}
          </a>
          <a
            href={`mailto:${generalEmail}`}
            className="mt-4 inline-block rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover"
          >
            {t("contact.emailCta")}
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900">{t("contact.support.label")}</h2>
          <p className="mt-1 text-sm text-muted">{t("contact.support.description")}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900">{t("contact.business.label")}</h2>
          <p className="mt-1 text-sm text-muted">{t("contact.business.value")}</p>
        </div>
      </div>
    </div>
  );
}
