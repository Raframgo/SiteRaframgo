"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { detectBrowserLanguage } from "@/lib/i18n/detect";
import { translate } from "@/lib/i18n/translations";
import { SUPPORTED_LANGUAGES, type LanguagePreference, type SupportedLanguage } from "@/lib/i18n/types";

const STORAGE_KEY = "raframgo.language";

function loadStoredPreference(): LanguagePreference {
  if (typeof window === "undefined") return "auto";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw && (raw === "auto" || (SUPPORTED_LANGUAGES as string[]).includes(raw))) return raw as LanguagePreference;
    return "auto";
  } catch {
    return "auto";
  }
}

function persist(preference: LanguagePreference) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // Almacenamiento no disponible (modo privado, cuota llena): no es
    // crítico, el idioma sigue funcionando en memoria para esta visita.
  }
}

type I18nContextValue = {
  language: SupportedLanguage;
  preference: LanguagePreference;
  setLanguage: (preference: LanguagePreference) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

/**
 * i18n del portal: detecta el idioma del navegador (ver spec, sección 22:
 * "debe identificar el idioma del navegador para presentar la página") y
 * permite sobreescribirlo manualmente, guardando la elección en
 * localStorage. Envuelve toda la app (ver app/layout.tsx).
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  // Español por defecto durante el render del servidor y la primera pintura
  // del cliente (evita mismatch de hidratación); el idioma real del
  // navegador se aplica justo después de montar.
  const [preference, setPreferenceState] = useState<LanguagePreference>("auto");
  const [detected, setDetected] = useState<SupportedLanguage>("es");

  useEffect(() => {
    setPreferenceState(loadStoredPreference());
    setDetected(detectBrowserLanguage());
  }, []);

  const language = preference === "auto" ? detected : preference;

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: LanguagePreference) => {
    setPreferenceState(next);
    persist(next);
  }, []);

  const t = useCallback((key: string, vars?: Record<string, string | number>) => translate(language, key, vars), [language]);

  const value = useMemo<I18nContextValue>(() => ({ language, preference, setLanguage, t }), [language, preference, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useT/useLanguage debe usarse dentro de I18nProvider.");
  return context;
}

/** Lo único que la mayoría de componentes necesita: t('clave') -> texto en el idioma activo. */
export function useT() {
  return useI18n().t;
}

/** Para el selector de idioma del header/footer. */
export function useLanguage() {
  return useI18n();
}
