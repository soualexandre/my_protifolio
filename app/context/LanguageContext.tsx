"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultLocale,
  getTranslation,
  translations,
  type Locale,
  type TranslationKeys,
} from "../i18n";

const STORAGE_KEY = "portfolio-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  tr: TranslationKeys;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "pt" || stored === "es") return stored;
  return defaultLocale;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getStoredLocale());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const lang = locale === "pt" ? "pt-BR" : locale === "es" ? "es" : "en";
    document.documentElement.lang = lang;
  }, [mounted, locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const currentLocale = mounted ? locale : defaultLocale;

  const t = useCallback(
    (path: string): string => {
      const value = getTranslation(currentLocale, path);
      return typeof value === "string" ? value : path;
    },
    [currentLocale]
  );

  const tr = useMemo(
    () => translations[currentLocale],
    [currentLocale]
  ) as TranslationKeys;

  const value = useMemo(
    () => ({ locale: currentLocale, setLocale, t, tr }),
    [currentLocale, setLocale, t, tr]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
