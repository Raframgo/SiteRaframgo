/**
 * i18n del portal RaframGo: más simple que el de Mercue (no hay moneda,
 * fecha ni unidades que formatear — solo textos), pero mismo principio: el
 * idioma se detecta del navegador, se puede guardar una preferencia
 * explícita, y ningún componente conoce el idioma activo directamente
 * (siempre llaman a useT() con una clave).
 */
export type SupportedLanguage = "es" | "en" | "pt" | "fr" | "de" | "it";

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["es", "en", "pt", "fr", "de", "it"];

/** "auto" = seguir el idioma detectado del navegador; cualquier otro valor es una elección explícita de la persona. */
export type LanguagePreference = "auto" | SupportedLanguage;
