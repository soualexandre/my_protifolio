"use client";

import { useLanguage } from "@/app/context/LanguageContext";

const GITHUB_URL = "https://github.com/soualexandre";
const LINKEDIN_URL = "https://www.linkedin.com/in/eualexandre/";
const HIRE_LINK = "#contact";
const PROFILE_IMAGE = "/profile.jpeg";

export function SocialHeader() {
  const { tr } = useLanguage();

  return (
    <header id="profile" className="scroll-mt-24 border-b border-[var(--border-subtle)] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-4 flex items-center gap-2 rounded-t-lg border border-b-0 border-[var(--border-subtle)] bg-[#21262d] px-3 py-2 font-mono text-xs text-[var(--foreground)]/80">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f85149]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d29922]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3fb950]" />
          <span className="ml-2 text-[var(--terminal-green)]">
            {tr.profile.terminalTitle}
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-b-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] p-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="relative shrink-0">
            <div className="live-ring absolute -inset-1 rounded-full bg-[var(--terminal-green)]/40" />
            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--terminal-green)] bg-gradient-to-br from-[#21262d] to-[#30363d] font-mono text-2xl font-bold text-[var(--foreground)]">
              <img
                src={PROFILE_IMAGE}
                alt="Alexandre Souza"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) (fallback as HTMLElement).style.display = "flex";
                }}
              />
              <span
                className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-[#21262d] to-[#30363d]"
                aria-hidden
              >
                AS
              </span>
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[var(--terminal-green)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--background)]">
              LIVE
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-semibold text-xl text-[var(--foreground)] sm:text-2xl">
              Alexandre Souza
            </h1>
            <p className="mt-1 text-[var(--terminal-green)]">
              {tr.profile.tagline}
            </p>
            <p className="mt-0.5 text-[var(--foreground)]/90">
              {tr.profile.yearsScale}
            </p>
            <p className="mt-0.5 text-[var(--foreground)]/90">
              {tr.profile.education}
            </p>
            <p className="mt-0.5 text-[var(--foreground)]/90">
              {tr.profile.location}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[#21262d] px-4 py-2.5 font-medium text-[var(--foreground)] transition hover:border-[var(--terminal-green)] hover:bg-[var(--terminal-green)]/10"
              >
                {tr.profile.followGithub}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[#21262d] px-4 py-2.5 font-medium text-[var(--foreground)] transition hover:border-[var(--terminal-green)] hover:bg-[var(--terminal-green)]/10"
              >
                {tr.profile.followLinkedIn}
              </a>
              <a
                href={HIRE_LINK}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--terminal-green)] px-4 py-2.5 font-medium text-[var(--background)] transition hover:opacity-90"
              >
                {tr.profile.hireCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
