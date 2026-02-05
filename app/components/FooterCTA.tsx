"use client";

import { useLanguage } from "@/app/context/LanguageContext";

const EMAIL = "alexandre.souza.office@gmail.com";
const PHONE = "+55(63)98488-6628";
const PHONE_LINK = "tel:+5563984886628";

export function FooterCTA() {
  const { tr } = useLanguage();

  return (
    <footer id="contact" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-[var(--terminal-green)]">
          {tr.footer.title}
        </h2>
        <p className="mb-6 text-[var(--foreground)]/80">
          {tr.footer.subtitle}
        </p>

        <div className="rounded-lg border border-[var(--border-subtle)] bg-[#0d1117] font-mono text-sm">
          <div className="border-b border-[var(--border-subtle)] px-3 py-2 text-[var(--foreground)]/60">
            {tr.footer.terminalTitle}
          </div>
          <div className="space-y-1 p-4">
            <p className="text-[var(--terminal-green)]">
              {tr.footer.initializing}
            </p>
            <p className="text-[var(--foreground)]/90">
              {tr.footer.location}
            </p>
            <p className="text-[var(--foreground)]/90">
              {tr.footer.email}{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-[var(--terminal-blue)] underline hover:no-underline"
              >
                {EMAIL}
              </a>
            </p>
            <p className="text-[var(--foreground)]/90">
              {tr.footer.phone}{" "}
              <a
                href={PHONE_LINK}
                className="text-[var(--terminal-blue)] underline hover:no-underline"
              >
                {PHONE}
              </a>
            </p>
            <p className="pt-2 text-[var(--terminal-green)]">
              {tr.footer.status}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
