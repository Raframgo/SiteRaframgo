"use client";

import { useLanguage } from "@/features/i18n/I18nProvider";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/lib/i18n/types";

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
};

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      aria-label="Idioma / Language"
      value={language}
      onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
      className={`rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-600 outline-none focus:border-brand ${className}`}
    >
      {SUPPORTED_LANGUAGES.map((code) => (
        <option key={code} value={code}>
          {LANGUAGE_LABELS[code]}
        </option>
      ))}
    </select>
  );
}
