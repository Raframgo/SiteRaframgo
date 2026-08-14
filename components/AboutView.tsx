"use client";

import { useT } from "@/features/i18n/I18nProvider";

export default function AboutView() {
  const t = useT();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">{t("about.heading")}</h1>
      <p className="mt-4 text-lg text-slate-700">{t("about.intro")}</p>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">{t("about.whatIsHeading")}</h2>
        <p className="mt-2 text-muted">{t("about.whatIsText")}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">{t("about.philosophyHeading")}</h2>
        <p className="mt-2 text-muted">{t("about.philosophyText")}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">{t("about.visionHeading")}</h2>
        <p className="mt-2 text-muted">{t("about.visionText")}</p>
      </section>

      <p className="mt-10 rounded-2xl bg-slate-50 p-5 text-sm text-muted">{t("about.stageNote")}</p>
    </div>
  );
}
