"use client";

import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="sticky top-0 z-[60] border-b border-[var(--border-subtle)] bg-[var(--background)]/95 backdrop-blur-sm"
      aria-label={tr.nav.ariaNav}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#profile"
          className="font-mono text-sm font-medium text-[var(--terminal-green)] transition hover:opacity-80"
          onClick={closeMenu}
        >
          {tr.nav.brand}
        </a>

        {/* Desktop: links + language */}
        <div className="hidden items-center gap-3 md:flex">
          <ul className="flex items-center gap-1 sm:gap-2">
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

        {/* Mobile: hamburger + language */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--card-bg)] text-[var(--foreground)] transition hover:bg-[var(--border-subtle)]/50"
            aria-expanded={menuOpen}
            aria-controls="nav-menu-mobile"
            aria-label={menuOpen ? tr.nav.closeMenu : tr.nav.openMenu}
          >
            <span className="sr-only">{menuOpen ? tr.nav.closeMenu : tr.nav.openMenu}</span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (recolhível) */}
      <div
        id="nav-menu-mobile"
        className={`overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--background)] md:hidden ${menuOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ transition: "max-height 0.25s ease-out, opacity 0.2s ease-out" }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col px-4 py-3">
          {links.map(({ href, key }) => (
            <li key={href}>
              <a
                href={href}
                onClick={closeMenu}
                className="block rounded-md px-3 py-2.5 font-mono text-sm text-[var(--foreground)]/90 transition hover:bg-[var(--card-bg)] hover:text-[var(--terminal-green)]"
              >
                {tr.nav[key]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
