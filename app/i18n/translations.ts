import type { AcademicCert, Locale, TranslationKeys } from "./types";
import { en } from "./locales/en";
import { pt } from "./locales/pt";
import { es } from "./locales/es";

export const translations: Record<Locale, TranslationKeys> = { en, pt, es };

function getNested(
  obj: Record<string, unknown>,
  path: string
): string | TranslationKeys["experience"]["jobs"] | AcademicCert[] | undefined {
  return path.split(".").reduce((acc: unknown, key) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj as unknown) as
    | string
    | TranslationKeys["experience"]["jobs"]
    | AcademicCert[]
    | undefined;
}

export function getTranslation(
  locale: Locale,
  path: string
): string | TranslationKeys["experience"]["jobs"] | AcademicCert[] {
  const obj = translations[locale] as unknown as Record<string, unknown>;
  const value = getNested(obj, path);
  if (value === undefined) {
    const fallback = getNested(
      translations.en as unknown as Record<string, unknown>,
      path
    );
    return (fallback as string) ?? path;
  }
  return value as
    | string
    | TranslationKeys["experience"]["jobs"]
    | AcademicCert[];
}
