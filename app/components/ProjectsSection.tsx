"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { FeaturedProject } from "@/app/i18n/types";

type PinnedRepo = {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
};

function FeaturedCard({
  name,
  description,
  segment,
  language,
  languageColor,
  url,
  deployUrl,
  viewOfficialSiteLabel,
  viewDemoLabel,
}: {
  name: string;
  description: string;
  segment: string;
  language: string;
  languageColor?: string | null;
  url: string;
  deployUrl?: string | null;
  viewOfficialSiteLabel: string;
  viewDemoLabel: string;
}) {
  const hasOfficialSite = url && url !== "#";

  return (
    <article className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-5 transition hover:border-[var(--terminal-green)]/30">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-md border border-[var(--terminal-blue)]/40 bg-[var(--terminal-blue)]/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--terminal-blue)]">
          {segment}
        </span>
        {language && (
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--foreground)]/60">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: languageColor ?? "var(--border-subtle)" }}
              aria-hidden
            />
            {language}
          </span>
        )}
      </div>
      <h3 className="font-semibold leading-tight text-[var(--foreground)]">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/85">
        {description}
      </p>
      {(hasOfficialSite || deployUrl) && (
        <div className="mt-4 flex flex-wrap gap-3 border-t border-[var(--border-subtle)]/50 pt-3">
          {hasOfficialSite && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--terminal-green)] underline decoration-[var(--terminal-green)]/50 underline-offset-2 hover:no-underline"
            >
              {viewOfficialSiteLabel}
            </a>
          )}
          {deployUrl && (
            <a
              href={deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--terminal-blue)] underline decoration-[var(--terminal-blue)]/50 underline-offset-2 hover:no-underline"
            >
              {viewDemoLabel}
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function PinnedCard({
  name,
  description,
  language,
  languageColor,
  url,
  viewRepoLabel,
  stars,
  forks,
}: {
  name: string;
  description: string | null;
  language: string;
  languageColor?: string | null;
  url: string;
  viewRepoLabel: string;
  stars?: number;
  forks?: number;
}) {
  return (
    <article className="rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-4 transition hover:border-[var(--terminal-green)]/40">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-mono text-sm font-semibold text-[var(--foreground)]">
          {name}
        </h3>
        {language && (
          <span className="flex items-center gap-1.5 rounded border border-[var(--border-subtle)] bg-[var(--background)]/80 px-1.5 py-0.5 font-mono text-[10px] text-[var(--foreground)]/80">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: languageColor ?? "var(--border-subtle)" }}
              aria-hidden
            />
            {language}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--foreground)]/85">
          {description}
        </p>
      )}
      {(stars !== undefined && stars > 0) || (forks !== undefined && forks > 0) ? (
        <p className="mt-1.5 font-mono text-xs text-[var(--foreground)]/60">
          {stars !== undefined && stars > 0 && `${stars} stars`}
          {stars !== undefined && stars > 0 && forks !== undefined && forks > 0 && " · "}
          {forks !== undefined && forks > 0 && `${forks} forks`}
        </p>
      ) : null}
      <div className="mt-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[var(--terminal-green)] underline hover:no-underline"
        >
          {viewRepoLabel}
        </a>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { tr } = useLanguage();
  const [pinned, setPinned] = useState<PinnedRepo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetch("/api/github-pinned")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data: PinnedRepo[]) => {
        if (!cancelled) setPinned(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured: FeaturedProject[] = tr.projects.featured;

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-[var(--border-subtle)] py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-2 font-mono text-sm font-medium uppercase tracking-wider text-[var(--terminal-green)]">
          {tr.projects.title}
        </h2>
        <p className="mb-10 text-[var(--foreground)]/80">
          {tr.projects.subtitle}
        </p>

        <div className="space-y-10">
          <div>
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-[var(--foreground)]/70">
              {tr.projects.featuredLabel}
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((proj) => (
                <FeaturedCard
                  key={proj.name}
                  name={proj.name}
                  description={proj.description}
                  segment={proj.segment}
                  language={proj.language}
                  languageColor={proj.languageColor}
                  url={proj.url}
                  deployUrl={proj.deployUrl}
                  viewOfficialSiteLabel={tr.projects.viewOfficialSite}
                  viewDemoLabel={tr.projects.viewDemo}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-[var(--foreground)]/70">
              {tr.projects.pinnedLabel}
            </h3>
            {loading && (
              <p className="font-mono text-sm text-[var(--foreground)]/60">
                {tr.projects.loading}
              </p>
            )}
            {error && !loading && (
              <p className="font-mono text-sm text-[var(--foreground)]/60">
                {tr.projects.error}
              </p>
            )}
            {!loading && !error && pinned && pinned.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pinned.map((repo) => (
                  <PinnedCard
                    key={repo.url}
                    name={repo.name}
                    description={repo.description}
                    language={repo.primaryLanguage?.name ?? ""}
                    languageColor={repo.primaryLanguage?.color ?? null}
                    url={repo.url}
                    viewRepoLabel={tr.projects.viewRepo}
                    stars={repo.stargazerCount}
                    forks={repo.forkCount}
                  />
                ))}
              </div>
            )}
            {!loading && !error && pinned && pinned.length === 0 && (
              <p className="font-mono text-sm text-[var(--foreground)]/60">
                {tr.projects.error}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
