"use client";

import { useState, type FormEvent } from "react";
import { useT } from "@/features/i18n/I18nProvider";
import contactService from "@/lib/contact/service";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Formulario de contacto con backend propio (contactSubmissions en
 * Firestore, ver lib/contact/service.ts y firestore.rules del repo de
 * aMerkar): no hay envío automático de correo porque no hay Cloud Functions
 * en este proyecto, así que el mailto directo se mantiene como alternativa
 * inmediata debajo del formulario.
 */
export default function ContactView() {
  const t = useT();
  const generalEmail = t("contact.general.value");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isValid =
    name.trim().length > 0 &&
    name.trim().length <= 100 &&
    EMAIL_PATTERN.test(email.trim()) &&
    email.trim().length <= 200 &&
    message.trim().length > 0 &&
    message.trim().length <= 2000;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValid || status === "submitting") return;

    setStatus("submitting");
    try {
      await contactService.submit({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">{t("contact.heading")}</h1>
      <p className="mt-2 text-muted">{t("contact.subheading")}</p>

      <div className="mt-10 space-y-6">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-slate-900">
                {t("contact.form.nameLabel")}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={100}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-slate-900">
                {t("contact.form.emailLabel")}
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={200}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-slate-900">
                {t("contact.form.messageLabel")}
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={2000}
                required
                rows={5}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || status === "submitting"}
            className="mt-4 inline-block rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? t("contact.form.submitting") : t("contact.form.submit")}
          </button>

          {status === "success" && (
            <p className="mt-3 text-sm text-brand" role="status">
              {t("contact.form.success")}
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {t("contact.form.error")}
            </p>
          )}

          <p className="mt-4 text-sm text-muted">
            {t("contact.form.orEmail")}{" "}
            <a href={`mailto:${generalEmail}`} className="text-brand hover:underline">
              {generalEmail}
            </a>
          </p>
        </form>

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
