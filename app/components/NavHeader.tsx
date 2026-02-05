"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "#profile", key: "profile" as const },
  { href: "#experience", key: "experience" as const },
  { href: "#data-processing", key: "data" as const },
  { href: "#projects", key: "projects" as const },
  { href: "#academic", key: "academic" as const },
  { href: "#contact", key: "contact" as const },
];

export function NavHeader() {
  const { tr } = useLanguage();

  return (
    <nav
      className="sticky top-0 z-[60] border-b border-[var(--border-subtle)] bg-[var(--background)]/95 backdrop-blur-sm"
      aria-label={tr.nav.ariaNav}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#profile"
          className="font-mono text-sm font-medium text-[var(--terminal-green)] transition hover:opacity-80"
        >
          {tr.nav.brand}
        </a>
        <div className="flex items-center gap-3">
          <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            {links.map(({ href, key }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block rounded-md px-2.5 py-1.5 font-mono text-xs text-[var(--foreground)]/80 transition hover:bg-[var(--card-bg)] hover:text-[var(--terminal-green)] sm:px-3 sm:text-sm"
                >
                  {tr.nav[key]}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
