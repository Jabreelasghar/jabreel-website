"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import {
  buildParticipantProgress,
  type ThinkLabParticipantState,
  type ThinkLabResponseState,
  type ThinkLabSessionState
} from "@/lib/thinklab/session-state";
import type { ResolvedThinkLabMoment } from "@/lib/thinklab/templates/registry";
import { ParticipantMomentPreview } from "../participant-moment-content";
import styles from "../stage-d.module.css";

type ReleaseState = { moment_id: string; status: string; updated_at: string };
type TemplateState = {
  key: string;
  version: number;
  sessionTitle: string;
  moments: ResolvedThinkLabMoment[];
};
type ControlAction =
  | "advance_thinklab_session"
  | "return_to_previous_thinklab_moment"
  | "release_current_thinklab_moment"
  | "close_current_thinklab_moment"
  | "pause_thinklab_session"
  | "resume_thinklab_session"
  | "end_thinklab_session";

export function FacilitatorConsole({
  facilitatorName,
  organisationName,
  initialSession,
  template,
  initialParticipants,
  initialResponses,
  initialReleases
}: {
  facilitatorName: string;
  organisationName?: string;
  initialSession: ThinkLabSessionState;
  template: TemplateState;
  initialParticipants: ThinkLabParticipantState[];
  initialResponses: ThinkLabResponseState[];
  initialReleases: ReleaseState[];
}) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [session, setSession] = useState(initialSession);
  const [participants, setParticipants] = useState(initialParticipants);
  const [responses, setResponses] = useState(initialResponses);
  const [releases, setReleases] = useState(initialReleases);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(true);

  const currentIndex = template.moments.findIndex(
    (moment) => moment.id === session.current_moment_id
  );
  const currentMoment = template.moments[currentIndex] ?? null;
  const progress = useMemo(
    () => buildParticipantProgress(participants, responses, session.current_moment_id),
    [participants, responses, session.current_moment_id]
  );
  const currentRelease = releases.find(
    (release) => release.moment_id === session.current_moment_id
  );

  const refresh = useCallback(async () => {
    const [sessionResult, participantsResult, responsesResult, releasesResult] = await Promise.all([
      supabase
        .from("thinklab_sessions")
        .select("id, join_code, template_key, template_version, status, current_moment_id, delivery_mode")
        .eq("id", initialSession.id)
        .maybeSingle(),
      supabase
        .from("thinklab_participants")
        .select("id, display_name, current_moment_id, status, last_seen_at")
        .eq("session_id", initialSession.id)
        .order("display_name"),
      supabase
        .from("thinklab_responses")
        .select("participant_id, moment_id, status")
        .eq("session_id", initialSession.id),
      supabase
        .from("thinklab_moment_releases")
        .select("moment_id, status, updated_at")
        .eq("session_id", initialSession.id)
    ]);

    const refreshError = sessionResult.error
      ?? participantsResult.error
      ?? responsesResult.error
      ?? releasesResult.error;
    if (refreshError || !sessionResult.data) {
      setConnected(false);
      setError("Live progress is temporarily unavailable. Check your connection and retry.");
      return;
    }
    setConnected(true);
    setError("");
    setSession(sessionResult.data);
    setParticipants(participantsResult.data ?? []);
    setResponses(responsesResult.data ?? []);
    setReleases(releasesResult.data ?? []);
  }, [initialSession.id, supabase]);

  useEffect(() => {
    document.body.classList.add("thinklab-mode");
    const timer = window.setInterval(() => void refresh(), 3000);
    const reconnect = () => void refresh();
    const disconnect = () => setConnected(false);
    window.addEventListener("online", reconnect);
    window.addEventListener("offline", disconnect);
    return () => {
      document.body.classList.remove("thinklab-mode");
      window.clearInterval(timer);
      window.removeEventListener("online", reconnect);
      window.removeEventListener("offline", disconnect);
    };
  }, [refresh]);

  async function runControl(action: ControlAction, confirmMessage?: string) {
    if (confirmMessage && !window.confirm(confirmMessage)) return;
    setLoading(true);
    setError("");
    const { error: actionError } = await supabase.rpc(action, {
      target_session_id: session.id
    });
    if (actionError) {
      setError(actionError.message || "The facilitator action could not be completed.");
    }
    await refresh();
    setLoading(false);
  }

  const signOut = async () => {
    await fetch("/api/thinklab/facilitator/session", { method: "DELETE" });
    window.location.assign("/thinklab/facilitator/sign-in");
  };

  const statusLabel = session.status === "live"
    ? "Live"
    : session.status === "paused"
      ? "Paused"
      : session.status === "ended"
        ? "Ended"
        : session.status;

  return (
    <div className={styles.controlRoom}>
      <header className={styles.controlHeader}>
        <div>
          <span className={styles.eyebrow}>{organisationName ?? "ThinkLab organisation"}</span>
          <h1>{template.sessionTitle} · Facilitator View</h1>
        </div>
        <div className={styles.sessionIdentity}>
          <b>{session.join_code}</b>
          <span>{statusLabel} · {facilitatorName}</span>
        </div>
        <div className={styles.headerActions}>
          <a
            href={`/thinklab/facilitator/session/${session.id}/projector`}
            target="_blank"
            rel="noreferrer"
          >
            Open Projector View
          </a>
          <button type="button" onClick={signOut}>Sign out</button>
        </div>
      </header>

      <section className={styles.statusStrip} aria-label="Session status">
        <div className={styles.metric}>
          <span>Current challenge</span>
          <b>{currentMoment?.section.split(" · ")[0] ?? "Unavailable"}</b>
          <small>{currentMoment?.title ?? "No current moment is assigned"}</small>
        </div>
        <div className={styles.metric}>
          <span>Active participants</span>
          <b>{progress.total}</b>
          <small>{progress.total === 0 ? "No participants have joined" : "Currently enrolled"}</small>
        </div>
        <div className={styles.metric}>
          <span>Submitted responses</span>
          <b>{progress.submitted} / {progress.total}</b>
          <small>{progress.completionPercentage}% complete</small>
        </div>
        <div className={styles.metric}>
          <span>Moment state</span>
          <b>{currentRelease?.status ?? "Not released"}</b>
          <small>{connected ? "Live data · polling every 3 seconds" : "Connection unavailable"}</small>
        </div>
      </section>

      {error && <div className={styles.errorState} role="alert">{error}</div>}

      <main className={styles.workspace}>
        <section className={styles.panel}>
          <div className={styles.panelHeading}>
            <span>Session progression</span>
            <b>{Math.max(0, currentIndex + 1)} / {template.moments.length}</b>
          </div>
          <div className={styles.momentNavigation}>
            {template.moments.map((moment, index) => {
              const release = releases.find((item) => item.moment_id === moment.id);
              return (
                <button
                  type="button"
                  key={moment.id}
                  data-current={index === currentIndex}
                  data-future={index > currentIndex}
                  disabled
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{moment.title}</b>
                  <small>{index === currentIndex ? "Current" : release?.status ?? "Held"}</small>
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeading}>
            <span>Participant View</span>
            <b>Exact current content</b>
          </div>
          <div className={styles.previewShell}>
            {currentMoment ? (
              <ParticipantMomentPreview
                moment={currentMoment}
                momentNumber={currentIndex + 1}
                totalMoments={template.moments.length}
              />
            ) : (
              <div className={styles.emptyState}>No current moment is assigned to this session.</div>
            )}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeading}>
            <span>Response Progress</span>
            <b>{progress.waiting} waiting</b>
          </div>
          <div className={styles.progressSummary}>
            <div><b>{progress.total}</b><span>Active</span></div>
            <div><b>{progress.submitted}</b><span>Submitted</span></div>
            <div><b>{progress.waiting}</b><span>Waiting</span></div>
          </div>
          <div className={styles.participantList}>
            {progress.rows.length === 0 ? (
              <div className={styles.emptyState}>No participants have joined this session yet.</div>
            ) : progress.rows.map((participant) => (
              <div className={styles.participantRow} key={participant.id}>
                <div>
                  <b>{participant.display_name}</b>
                  <span>Moment: {participant.current_moment_id}</span>
                  <small>Last activity: {new Date(participant.last_seen_at).toLocaleTimeString()}</small>
                </div>
                <span>{participant.responseStatus}<small>{participant.activityStatus}</small></span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.controlBar}>
        <div>
          <span>Facilitator Controls</span>
          <small>{loading ? "Applying change…" : session.status === "ended" ? "Session ended" : "Changes update participant devices."}</small>
        </div>
        <button
          type="button"
          disabled={loading || session.status === "ended" || currentIndex <= 0}
          onClick={() => void runControl("return_to_previous_thinklab_moment")}
        >
          Previous moment
        </button>
        <button
          type="button"
          disabled={loading || session.status === "ended"}
          onClick={() => void runControl(
            currentRelease?.status === "released" || currentRelease?.status === "reopened"
              ? "close_current_thinklab_moment"
              : "release_current_thinklab_moment"
          )}
        >
          {currentRelease?.status === "released" || currentRelease?.status === "reopened"
            ? "Close current moment"
            : "Open current moment"}
        </button>
        <button
          type="button"
          disabled={loading || session.status === "ended"}
          onClick={() => void runControl(
            session.status === "paused" ? "resume_thinklab_session" : "pause_thinklab_session"
          )}
        >
          {session.status === "paused" ? "Resume progression" : "Pause progression"}
        </button>
        <button
          type="button"
          className={styles.primaryAction}
          disabled={loading || session.status !== "live" || currentIndex < 0 || currentIndex >= template.moments.length - 1}
          onClick={() => void runControl("advance_thinklab_session")}
        >
          Next moment
        </button>
        <button
          type="button"
          className={styles.dangerAction}
          disabled={loading || session.status === "ended"}
          onClick={() => void runControl(
            "end_thinklab_session",
            "End this session? Participants will no longer be able to continue or submit ordinary responses."
          )}
        >
          End session
        </button>
      </footer>
    </div>
  );
}
