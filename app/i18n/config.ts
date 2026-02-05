import type { Locale } from "./types";

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
};

export const supportedLocales: Locale[] = ["en", "pt", "es"];
