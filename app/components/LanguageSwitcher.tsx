"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { localeNames, type Locale } from "@/app/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="flex items-center gap-0.5 rounded-md border border-[var(--border-subtle)] bg-[var(--card-bg)] p-0.5 font-mono text-xs"
      role="group"
      aria-label="Select language"
    >
      {(Object.keys(localeNames) as Locale[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang)}
          className={`rounded px-2 py-1 transition sm:px-2.5 ${
            locale === lang
              ? "bg-[var(--terminal-green)] text-[var(--background)]"
              : "text-[var(--foreground)]/70 hover:bg-[var(--border-subtle)] hover:text-[var(--foreground)]"
          }`}
          aria-pressed={locale === lang}
          aria-label={`${locale === lang ? "Current" : "Switch to"} ${lang === "en" ? "English" : lang === "pt" ? "Portuguese" : "Spanish"}`}
        >
          {localeNames[lang]}
        </button>
      ))}
    </div>
  );
}
