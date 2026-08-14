"use client";

import { useLanguage, useT } from "@/features/i18n/I18nProvider";

const LAST_UPDATED = new Date("2026-08-13");

export default function TermsView() {
  const t = useT();
  const { language } = useLanguage();
  const formattedDate = new Intl.DateTimeFormat(language, { dateStyle: "long" }).format(LAST_UPDATED);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">{t("terms.heading")}</h1>
      <p className="mt-1 text-sm text-muted">{t("terms.updated", { date: formattedDate })}</p>
      <p className="mt-6 text-slate-700">{t("terms.intro")}</p>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">{t("terms.useHeading")}</h2>
        <p className="mt-2 text-muted">{t("terms.useText")}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">{t("terms.productsHeading")}</h2>
        <p className="mt-2 text-muted">{t("terms.productsText")}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">{t("terms.changesHeading")}</h2>
        <p className="mt-2 text-muted">{t("terms.changesText")}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">{t("terms.contactHeading")}</h2>
        <p className="mt-2 text-muted">{t("terms.contactText")}</p>
      </section>
    </div>
  );
}
