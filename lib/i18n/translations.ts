import de from "@/locales/de/common.json";
import en from "@/locales/en/common.json";
import es from "@/locales/es/common.json";
import fr from "@/locales/fr/common.json";
import it from "@/locales/it/common.json";
import pt from "@/locales/pt/common.json";
import type { SupportedLanguage } from "./types";

/**
 * Agregar un idioma nuevo no requiere tocar ningún componente: solo se crea
 * locales/<código>/common.json con las mismas claves y se agrega aquí y en
 * SUPPORTED_LANGUAGES (types.ts).
 */
const dictionaries: Record<SupportedLanguage, Record<string, string>> = {
  es: es as Record<string, string>,
  en: en as Record<string, string>,
  pt: pt as Record<string, string>,
  fr: fr as Record<string, string>,
  de: de as Record<string, string>,
  it: it as Record<string, string>,
};

/** Español es el idioma base: si falta una clave en el idioma activo, se usa el texto en español en vez de mostrar la clave cruda. */
export function translate(language: SupportedLanguage, key: string, vars?: Record<string, string | number>): string {
  const dictionary = dictionaries[language] ?? dictionaries.es;
  const template = dictionary[key] ?? dictionaries.es[key] ?? key;
  if (!vars) return template;
  return Object.entries(vars).reduce((text, [name, value]) => text.replaceAll(`{{${name}}}`, String(value)), template);
}
