import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "./types";

const FALLBACK: SupportedLanguage = "es";

/** Lee navigator.language (p. ej. "en-US" -> "en") y lo resuelve contra los idiomas soportados. */
export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === "undefined") return FALLBACK;
  const raw = navigator.language ?? "es";
  const languageTag = raw.split("-")[0]?.toLowerCase();
  return (SUPPORTED_LANGUAGES as string[]).includes(languageTag) ? (languageTag as SupportedLanguage) : FALLBACK;
}
