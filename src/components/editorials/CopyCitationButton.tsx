"use client";

import { useEffect, useRef, useState } from "react";

export function CopyCitationButton({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(citation);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = citation;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copiedWithFallback = document.execCommand("copy");
      textarea.remove();
      if (!copiedWithFallback) return;
    }
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        type="button"
        className="rounded-sm border border-moss px-3 py-2 text-sm font-semibold text-moss transition-colors hover:border-oxford hover:text-oxford"
        onClick={copyCitation}
        aria-label="Copy APA citation to clipboard"
      >
        Copy citation
      </button>
      <span className="text-sm text-slate" role="status" aria-live="polite">{copied ? "Copied" : ""}</span>
    </div>
  );
}
