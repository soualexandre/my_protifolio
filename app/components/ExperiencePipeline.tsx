"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export function ExperiencePipeline() {
  const { tr } = useLanguage();
  const jobs = tr.experience.jobs;
  const statusInProgress = tr.experience.statusInProgress;
  const statusSuccess = tr.experience.statusSuccess;

  return (
    <section id="experience" className="scroll-mt-24 border-b border-[var(--border-subtle)] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-[var(--terminal-green)]">
          {tr.experience.title}
        </h2>
        <p className="mb-10 text-[var(--foreground)]/80">
          {tr.experience.subtitle}
        </p>

        <div className="relative">
          <div
            className="absolute left-[19px] top-6 bottom-6 w-0.5 rounded-full bg-[var(--border-subtle)] sm:left-[23px]"
            aria-hidden
          />
          <div
            className="absolute left-[19px] top-6 h-12 w-0.5 rounded-full bg-[var(--terminal-green)] sm:left-[23px]"
            aria-hidden
          />

          <ul className="space-y-0">
            {jobs.map((job, index) => (
              <li key={index} className="relative flex gap-6 pb-12 last:pb-0">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--terminal-green)] bg-[var(--background)] font-mono text-xs font-bold text-[var(--terminal-green)]">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4 sm:p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="text-[var(--foreground)]/70">
                      [JOB {String(index + 1).padStart(2, "0")}]
                    </span>
                    <span className="text-[var(--foreground)]/50">//</span>
                    <span
                      className={
                        index === 0
                          ? "text-[var(--terminal-yellow)]"
                          : "text-[var(--terminal-green)]"
                      }
                    >
                      {tr.experience.statusLabel}{" "}
                      {index === 0 ? statusInProgress : statusSuccess}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {job.company}
                  </h3>
                  <p className="mt-0.5 text-sm text-[var(--terminal-green)]">
                    {job.period}
                  </p>
                  <p className="mt-2 text-sm text-[var(--foreground)]/80">
                    {job.subStatus}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/90">
                    {job.log}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
