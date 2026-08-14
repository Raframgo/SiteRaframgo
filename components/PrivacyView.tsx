"use client";

import { useLanguage, useT } from "@/features/i18n/I18nProvider";

const LAST_UPDATED = new Date("2026-08-13");

export default function PrivacyView() {
  const t = useT();
  const { language } = useLanguage();
  const formattedDate = new Intl.DateTimeFormat(language, { dateStyle: "long" }).format(LAST_UPDATED);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">{t("privacy.heading")}</h1>
      <p className="mt-1 text-sm text-muted">{t("privacy.updated", { date: formattedDate })}</p>
      <p className="mt-6 text-slate-700">{t("privacy.intro")}</p>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">{t("privacy.responsibleHeading")}</h2>
        <p className="mt-2 text-muted">{t("privacy.responsibleText")}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">{t("privacy.dataHeading")}</h2>
        <p className="mt-2 text-muted">{t("privacy.dataText")}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">{t("privacy.cookiesHeading")}</h2>
        <p className="mt-2 text-muted">{t("privacy.cookiesText")}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">{t("privacy.rightsHeading")}</h2>
        <p className="mt-2 text-muted">{t("privacy.rightsText")}</p>
      </section>

      <p className="mt-10 rounded-2xl bg-slate-50 p-5 text-sm text-muted">{t("privacy.productsNote")}</p>
    </div>
  );
}
