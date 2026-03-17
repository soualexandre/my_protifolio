"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const RESUME_URL = "/Alexandre%20Souza.pdf";

type State = "idle" | "invoking" | "running" | "done";

const steps = [
  (tr: { profile: { downloadCvStep1: string } }) => tr.profile.downloadCvStep1,
  (tr: { profile: { downloadCvStep2: string } }) => tr.profile.downloadCvStep2,
  (tr: { profile: { downloadCvStep3: string } }) => tr.profile.downloadCvStep3,
] as const;

export function ResumeDownload() {
  const { tr } = useLanguage();
  const [state, setState] = useState<State>("idle");
  const [logLine, setLogLine] = useState(0);
  const downloadFilenameRef = useRef(tr.profile.downloadCvFilename);

  useEffect(() => {
    downloadFilenameRef.current = tr.profile.downloadCvFilename;
  }, [tr.profile.downloadCvFilename]);

  const runDownload = useCallback(() => {
    if (state === "running" || state === "invoking") return;

    setState("invoking");
    setLogLine(0);

    const tInvoke = setTimeout(() => {
      setState("running");
      const showLog = (line: number) => setLogLine(line);
      const t1 = setTimeout(() => showLog(1), 320);
      const t2 = setTimeout(() => showLog(2), 720);
      const t3 = setTimeout(() => {
        showLog(3);

        const a = document.createElement("a");
        a.href = RESUME_URL;
        a.download = downloadFilenameRef.current;
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setState("done");
      }, 1200);
    }, 450);

    return () => clearTimeout(tInvoke);
  }, [state]);

  const isIdle = state === "idle";
  const isInvoking = state === "invoking";
  const isRunning = state === "running";
  const isDone = state === "done";
  const isBusy = isInvoking || isRunning;
  const fnName = tr.profile.downloadCvFnName;

  return (
    <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)] p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-[var(--foreground)]/50">
        <span className="text-[var(--terminal-green)]">session</span>
        <span className="text-[var(--foreground)]/40">→</span>
        <span>portfolio_view</span>
      </div>

      <ul className="mb-5 space-y-2 border-b border-[var(--border-subtle)] pb-5">
        {steps.map((getLabel, i) => (
          <li
            key={i}
            className="flex items-center gap-3 font-mono text-sm text-[var(--foreground)]/70"
          >
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--terminal-green)]/20 text-[var(--terminal-green)]"
              aria-hidden
            >
              ✓
            </span>
            <span>{getLabel(tr)}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <p
          className="resume-status-line min-h-[2rem] text-center text-sm sm:text-left"
          aria-live="polite"
        >
          {isIdle && (
            <span className="resume-prompt-pulse font-medium text-[var(--terminal-green)]">
              {tr.profile.downloadCvPromptClick}
            </span>
          )}
          {isInvoking && (
            <span className="text-[var(--terminal-yellow)]">
              {tr.profile.downloadCvLogFetch}
            </span>
          )}
          {isRunning && (
            <span className="text-[var(--terminal-yellow)]">
              {logLine >= 1 && tr.profile.downloadCvLogFetch}
              {logLine >= 2 && " — " + tr.profile.downloadCvLogTransfer}
              {logLine >= 3 && " ✓"}
            </span>
          )}
          {isDone && (
            <span className="text-[var(--terminal-green)]">
              {tr.profile.downloadCvLogDone}
            </span>
          )}
        </p>

        <div className="flex justify-center sm:justify-start">
          <button
            type="button"
            onClick={runDownload}
            disabled={isBusy}
            aria-label={tr.profile.downloadCvAria}
            className="resume-download-btn resume-download-btn-fixed group inline-flex items-center gap-0 rounded-lg border font-mono text-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--terminal-green)] focus:ring-offset-2 focus:ring-offset-[var(--background)] disabled:cursor-wait disabled:opacity-90 sm:w-auto"
            data-state={state}
          >
            <span className="resume-cmd-prompt shrink-0 border-r px-3 py-2.5">
              &gt;
            </span>
            <span className="resume-cmd-content flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 text-left">
              {isIdle && (
                <>
                  <span className="resume-cmd-fn">{fnName}</span>
                  <span className="text-[var(--foreground)]/50">()</span>
                </>
              )}
              {isInvoking && (
                <>
                  <span className="resume-cmd-invoke">{fnName}</span>
                  <span className="resume-cmd-invoke-parens">()</span>
                  <span className="resume-cmd-cursor shrink-0 font-bold" aria-hidden>
                    |
                  </span>
                </>
              )}
              {isRunning && (
                <>
                  <span className="text-[var(--terminal-yellow)]">running</span>
                  <span className="resume-cmd-dots">...</span>
                </>
              )}
              {isDone && (
                <>
                  <span className="text-[var(--terminal-green)]">done</span>
                  <span className="text-[var(--foreground)]/50">— {tr.profile.downloadCv}</span>
                </>
              )}
            </span>
            {isIdle && (
              <span className="resume-cmd-cursor shrink-0 px-2 py-2.5 font-bold" aria-hidden>
                |
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
