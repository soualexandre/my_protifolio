"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

/** Deterministic short hash and date for git-log style */
function fakeCommitMeta(index: number) {
  const hash = ["a1b2c3d", "f4e5d6c", "b7a8c9e", "d0e1f2a"][index % 4];
  const d = new Date(2024, 2 + index, 10 + index);
  const date = d.toISOString().slice(0, 10);
  const time = "14:32:15";
  return { hash, date, time };
}

export function DataProcessing() {
  const { tr } = useLanguage();
  const cases = tr.dataProcessing.cases;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = cases[selectedIndex];

  const commitList = useMemo(
    () => cases.map((c, i) => ({ ...fakeCommitMeta(i), message: c.title, category: c.category })),
    [cases]
  );

  return (
    <section id="data-processing" className="scroll-mt-24 border-b border-[var(--border-subtle)] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-[var(--terminal-yellow)]">
          {tr.dataProcessing.title}
        </h2>
        <p className="mb-10 text-[var(--foreground)]/80">
          {tr.dataProcessing.subtitle}
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Git commit history */}
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[#0d1117] shadow-xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#f85149]" />
              <span className="h-2 w-2 rounded-full bg-[#d29922]" />
              <span className="h-2 w-2 rounded-full bg-[#3fb950]" />
              <span className="ml-2 font-mono text-xs text-[var(--foreground)]/60">
                ~/improvements $ git log --oneline
              </span>
            </div>
            <div className="max-h-[340px] overflow-auto p-3">
              <ul className="space-y-0.5">
                {commitList.map((commit, i) => (
                  <li
                    key={i}
                    className={`data-commit-item cursor-pointer rounded-md border-l-2 py-2 pl-3 pr-2 font-mono text-xs transition-colors ${selectedIndex === i ? "border-l-[var(--terminal-green)] bg-[var(--terminal-green)]/10" : "border-l-transparent hover:bg-[var(--card-bg)]"}`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onClick={() => setSelectedIndex(i)}
                  >
                    <span className="text-[var(--terminal-green)]">{commit.hash}</span>
                    <span className="mx-2 text-[var(--terminal-yellow)]/90">{commit.date}</span>
                    <span className="text-[var(--foreground)]/90">{commit.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Debug log + Antes vs Depois */}
          <div className="flex flex-col gap-4">
            {/* Debug log panel */}
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[#0d1117] shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#f85149]" />
                <span className="h-2 w-2 rounded-full bg-[#d29922]" />
                <span className="h-2 w-2 rounded-full bg-[#3fb950]" />
                <span className="ml-2 font-mono text-xs text-[var(--foreground)]/60">
                  {tr.dataProcessing.debugLog}
                </span>
              </div>
              <div className="max-h-[160px] overflow-auto p-3 font-mono text-xs" key={selectedIndex}>
                {selected && (
                  <>
                    <p className="data-log-line text-[#d29922]/90" style={{ animationDelay: "0s" }}>
                      [14:32:14] [WARN] {tr.dataProcessing.beforeLabel}: {selected.before}
                    </p>
                    <p className="data-log-line mt-1 text-[#f85149]/90" style={{ animationDelay: "0.06s" }}>
                      [14:32:15] [ERROR] {tr.dataProcessing.problemLabel}: {selected.problem}
                    </p>
                    <p className="data-log-line mt-1 text-[var(--terminal-green)]" style={{ animationDelay: "0.12s" }}>
                      [14:32:16] [INFO] {tr.dataProcessing.afterLabel}: {selected.after}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Antes vs Depois — dois cards visíveis e destacados */}
            <div className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] shadow-xl" key={selectedIndex}>
              <div className="border-b border-[var(--border-subtle)] bg-[#161b22]/80 px-4 py-2.5">
                <p className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--terminal-green)]/90">
                  {tr.dataProcessing.beforeVsAfter}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Card Antes */}
                <div className="data-before-card flex min-h-[140px] flex-col border-b border-[var(--border-subtle)] bg-gradient-to-br from-[#f85149]/10 to-transparent p-4 sm:border-b-0 sm:border-r sm:border-[var(--border-subtle)]">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#f85149]/20 text-sm text-[#f85149]" aria-hidden>
                      −
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#f85149]">
                      {tr.dataProcessing.beforeLabel}
                    </span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-[var(--foreground)]/90">
                    {selected?.before}
                  </p>
                </div>
                {/* Card Depois */}
                <div className="data-after-card data-after-glow flex min-h-[140px] flex-col border-t border-[var(--terminal-green)]/20 bg-gradient-to-br from-[var(--terminal-green)]/10 to-transparent p-4 sm:border-t-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--terminal-green)]/20 text-[var(--terminal-green)]" aria-hidden>
                      ✓
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--terminal-green)]">
                      {tr.dataProcessing.afterLabel}
                    </span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-[var(--foreground)]/90">
                    {selected?.after}
                  </p>
                </div>
              </div>
              {/* Seta central entre os dois cards (desktop) */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block" aria-hidden>
                <span className="rounded-full border border-[var(--terminal-green)]/30 bg-[var(--background)] px-2.5 py-1 font-mono text-sm text-[var(--terminal-green)] shadow-lg">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
