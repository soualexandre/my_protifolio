"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export function DataProcessing() {
  const { tr } = useLanguage();
  const cases = tr.dataProcessing.cases;

  return (
    <section id="data-processing" className="scroll-mt-24 border-b border-[var(--border-subtle)] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-[var(--terminal-yellow)]">
          {tr.dataProcessing.title}
        </h2>
        <p className="mb-10 text-[var(--foreground)]/80">
          {tr.dataProcessing.subtitle}
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-4">
          {/* Left: JSON with cases — more space */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[#0d1117] shadow-xl">
              <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#f85149]" />
                <span className="h-2 w-2 rounded-full bg-[#d29922]" />
                <span className="h-2 w-2 rounded-full bg-[#3fb950]" />
                <span className="ml-2 font-mono text-xs text-[var(--foreground)]/60">
                  {tr.dataProcessing.filename}
                </span>
              </div>
              <pre className="max-h-[520px] overflow-auto p-4 font-mono text-xs leading-relaxed">
                <code>
                  <span className="text-[#7ee787]">{"{"}</span>
                  {"\n  "}
                  <span className="text-[#79c0ff]">&quot;improvement_cases&quot;</span>
                  <span className="text-[var(--foreground)]">: </span>
                  <span className="text-[#7ee787]">[</span>
                  {cases.map((c, i) => (
                    <span key={i}>
                      {"\n    "}
                      <span className="text-[#7ee787]">{"{"}</span>
                      {"\n      "}
                      <span className="text-[#79c0ff]">&quot;category&quot;</span>
                      <span className="text-[var(--foreground)]">: </span>
                      <span className="text-[#a5d6ff]">&quot;{c.category}&quot;</span>,
                      {"\n      "}
                      <span className="text-[#79c0ff]">&quot;title&quot;</span>
                      <span className="text-[var(--foreground)]">: </span>
                      <span className="text-[#a5d6ff]">&quot;{c.title}&quot;</span>,
                      {"\n      "}
                      <span className="text-[#79c0ff]">&quot;before&quot;</span>
                      <span className="text-[var(--foreground)]">: </span>
                      <span className="text-[#a5d6ff]">&quot;{c.before}&quot;</span>,
                      {"\n      "}
                      <span className="text-[#79c0ff]">&quot;problem&quot;</span>
                      <span className="text-[var(--foreground)]">: </span>
                      <span className="text-[#a5d6ff]">&quot;{c.problem}&quot;</span>,
                      {"\n      "}
                      <span className="text-[#79c0ff]">&quot;after&quot;</span>
                      <span className="text-[var(--foreground)]">: </span>
                      <span className="text-[#a5d6ff]">&quot;{c.after}&quot;</span>
                      {"\n    "}
                      <span className="text-[#7ee787]">{"}"}</span>
                      {i < cases.length - 1 ? "," : ""}
                    </span>
                  ))}
                  {"\n  "}
                  <span className="text-[#7ee787]">]</span>
                  {"\n"}
                  <span className="text-[#7ee787]">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Center: Connection arrow — data flow from source to target */}
          <div className="relative hidden min-h-[520px] flex-col items-center justify-center overflow-hidden rounded-lg border border-[var(--terminal-green)]/30 bg-[#0d1117] lg:col-span-2 lg:flex">
            <div className="absolute left-2 top-6 font-mono text-[9px] font-medium uppercase tracking-widest text-[var(--terminal-green)]/80">
              Source
            </div>
            <div className="absolute right-2 top-6 font-mono text-[9px] font-medium uppercase tracking-widest text-[var(--terminal-green)]/80">
              Target
            </div>

            {/* Track (full width); arrow moves inside it */}
            <div className="relative flex w-full flex-1 items-center px-2 py-8">
              <div className="relative h-3 w-full overflow-hidden rounded-md bg-[var(--border-subtle)]/30">
                {/* Static glow track */}
                <div
                  className="absolute inset-0 rounded-md bg-gradient-to-r from-[var(--terminal-green)]/15 via-[var(--terminal-green)]/10 to-[var(--terminal-green)]/5"
                  aria-hidden
                />
                {/* Moving arrow (line segment + arrowhead) left → right */}
                <div
                  className="arrow-slide absolute left-0 top-1/2 flex -translate-y-1/2 items-center"
                  aria-hidden
                >
                  <div className="h-1.5 w-12 rounded-l-full bg-[var(--terminal-green)] shadow-[0_0_8px_var(--terminal-green)]" />
                  <div
                    className="h-0 w-0 shrink-0 border-y-[10px] border-l-[20px] border-r-0 border-solid border-y-transparent border-l-[var(--terminal-green)] drop-shadow-[0_0_6px_var(--terminal-green)]"
                    aria-hidden
                  />
                </div>
                {/* Data dots along track (optional, keeps motion feel) */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="data-packet absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--terminal-green)]/80 shadow-[0_0_6px_var(--terminal-green)]"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-widest text-[var(--terminal-green)]/70">
              {tr.dataProcessing.processing}
            </div>
          </div>

          {/* Right: Rendered cases — Before / Problem / After — more space */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--card-bg)] shadow-xl">
              <div className="border-b border-[var(--border-subtle)] px-4 py-3 font-mono text-xs font-medium text-[var(--terminal-green)]">
                {tr.dataProcessing.renderedUi}
              </div>
              <div className="max-h-[520px] overflow-auto p-3">
                <ul className="space-y-4">
                  {cases.map((c, i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-[var(--border-subtle)] bg-[#0d1117]/40 p-3"
                    >
                      <span className="mb-1.5 block font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--terminal-blue)]">
                        {c.category}
                      </span>
                      <h4 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
                        {c.title}
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="rounded border-l-2 border-[#f85149]/70 bg-[#f85149]/5 px-2 py-1.5">
                          <span className="font-mono font-medium text-[var(--foreground)]/90">
                            {tr.dataProcessing.beforeLabel}
                          </span>
                          <p className="mt-0.5 leading-relaxed text-[var(--foreground)]/85">
                            {c.before}
                          </p>
                        </div>
                        <div className="rounded border-l-2 border-[#d29922]/70 bg-[#d29922]/5 px-2 py-1.5">
                          <span className="font-mono font-medium text-[var(--foreground)]/90">
                            {tr.dataProcessing.problemLabel}
                          </span>
                          <p className="mt-0.5 leading-relaxed text-[var(--foreground)]/85">
                            {c.problem}
                          </p>
                        </div>
                        <div className="rounded border-l-2 border-[#3fb950]/70 bg-[#3fb950]/5 px-2 py-1.5">
                          <span className="font-mono font-medium text-[var(--foreground)]/90">
                            {tr.dataProcessing.afterLabel}
                          </span>
                          <p className="mt-0.5 leading-relaxed text-[var(--foreground)]/85">
                            {c.after}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
