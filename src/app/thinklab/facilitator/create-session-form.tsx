"use client";

import { FormEvent, useRef, useState } from "react";

type EligibleOrganisation = {
  id: string;
  name: string;
};

export function CreateSessionForm({
  organisations
}: {
  organisations: EligibleOrganisation[];
}) {
  const [organisationId, setOrganisationId] = useState(organisations[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const submissionInProgress = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current || !organisationId) return;

    submissionInProgress.current = true;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/thinklab/facilitator/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organisationId })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || typeof result.sessionId !== "string") {
        const messages: Record<number, string> = {
          400: "Select a valid organization and try again.",
          401: "Your sign-in has expired. Sign in again to create a session.",
          403: "You no longer have permission to create a session for this organization.",
          409: "You already have an active session. Refresh this page to open it.",
          500: "The session could not be created. Please try again."
        };
        setError(
          messages[response.status] ??
            "The session could not be created. Please try again."
        );
        submissionInProgress.current = false;
        setSubmitting(false);
        return;
      }

      window.location.assign(
        `/thinklab/facilitator?session=${encodeURIComponent(result.sessionId)}`
      );
    } catch {
      setError("The session could not be created. Check your connection and try again.");
      submissionInProgress.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form className="mt-8 grid gap-5" onSubmit={submit}>
      {organisations.length === 1 && (
        <p className="text-sm leading-6 text-[#b8c6c0]">
          Organization:{" "}
          <span className="font-semibold text-[#e7ece8]">
            {organisations[0].name}
          </span>
        </p>
      )}

      {organisations.length > 1 && (
        <div className="grid gap-2">
          <label
            className="text-sm font-semibold text-[#b8c6c0]"
            htmlFor="thinklab-organisation"
          >
            Organization
          </label>
          <select
            id="thinklab-organisation"
            className="w-full border border-white/30 bg-[#142528] px-4 py-3 text-[#e7ece8] focus:border-[#d88a5f] focus:outline-none focus:ring-2 focus:ring-[#d88a5f]/40"
            value={organisationId}
            onChange={event => setOrganisationId(event.target.value)}
            disabled={submitting}
          >
            {organisations.map(organisation => (
              <option key={organisation.id} value={organisation.id}>
                {organisation.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <p className="text-sm leading-6 text-[#91a6a0]">
        A six-character join code will be generated automatically.
      </p>
      <button
        className="w-fit bg-[#c36b3c] px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={submitting || !organisationId}
        type="submit"
        aria-describedby={error ? "create-session-error" : undefined}
      >
        {submitting ? "Creating session..." : "Create session"}
      </button>
      {error && (
        <p
          id="create-session-error"
          role="alert"
          className="text-sm leading-6 text-[#f1a484]"
        >
          {error}
        </p>
      )}
    </form>
  );
}
