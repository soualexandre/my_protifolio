"use client";

import { useLanguage } from "@/app/context/LanguageContext";

const BADGE_STYLES = {
  bachelor:
    "border-2 border-[var(--terminal-blue)]/60 bg-gradient-to-br from-[#58a6ff]/25 to-[#58a6ff]/5 text-[var(--terminal-blue)]",
  postgrad:
    "border-2 border-[var(--terminal-green)]/60 bg-gradient-to-br from-[#3fb950]/25 to-[#3fb950]/5 text-[var(--terminal-green)]",
} as const;

export function AcademicSection() {
  const { tr } = useLanguage();

  return (
    <section id="academic" className="scroll-mt-24 border-b border-[var(--border-subtle)] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-[var(--terminal-purple)]">
          {tr.academic.title}
        </h2>
        <p className="mb-10 text-[var(--foreground)]/80">
          {tr.academic.subtitle}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tr.academic.certs.map((cert) => (
              <article
                key={`${cert.title}-${cert.institution}`}
                className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-5 transition hover:border-[var(--border-subtle)]/80"
              >
                <div
                  className={`absolute -right-5 -top-5 flex h-24 w-24 items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold uppercase tracking-wider ${BADGE_STYLES[cert.degreeType]}`}
                  aria-hidden
                >
                  {cert.seal}
                </div>
                <h3 className="pr-14 font-semibold leading-snug text-[var(--foreground)]">
                  {cert.title}
                </h3>
                <p
                  className={`mt-1 text-sm font-medium ${
                    cert.degreeType === "bachelor"
                      ? "text-[var(--terminal-blue)]"
                      : "text-[var(--terminal-green)]"
                  }`}
                >
                  {cert.institution}
                </p>
                {cert.period && (
                  <p className="mt-1 text-xs text-[var(--foreground)]/60">
                    {cert.period}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/85">
                  {cert.description}
                </p>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
