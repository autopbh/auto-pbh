
import { Language, TranslationDictionary, TranslationConfig } from "@/types";
import fr from "./fr";
import en from "./en";
import pt from "./pt";
import es from "./es";
import de from "./de";
import it from "./it";
import nl from "./nl";

export const translations: Record<Language, TranslationDictionary> = {
  fr,
  en,
  pt,
  es,
  de,
  it,
  nl
};

export const translationConfig: TranslationConfig = {
  fallbackLanguage: "fr",
  detectMissingKeys: true,
  logMissingKeys: true
};

/**
 * Get a nested translation value using a dot notation path
 */
export function getNestedTranslation(obj: TranslationDictionary, path: string): string {
  const keys = path.split(".");
  let current: any = obj;

  for (const key of keys) {
    if (current === undefined || current === null) {
      return path;
    }
    current = current[key];
  }

  return current as string || path;
}
