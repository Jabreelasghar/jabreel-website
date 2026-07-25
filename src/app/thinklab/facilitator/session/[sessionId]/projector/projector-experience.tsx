"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { ResolvedThinkLabMoment } from "@/lib/thinklab/templates/registry";
import { ParticipantMomentPreview } from "../../../../participant-moment-content";
import styles from "../../../../stage-d.module.css";

type ProjectorSession = {
  id: string;
  template_key: string;
  template_version: number;
  status: string;
  current_moment_id: string;
};

export function ProjectorExperience({
  initialSession,
  template
}: {
  initialSession: ProjectorSession;
  template: {
    key: string;
    version: number;
    sessionTitle: string;
    moments: ResolvedThinkLabMoment[];
  };
}) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [session, setSession] = useState(initialSession);
  const [connectionError, setConnectionError] = useState(false);
  const currentIndex = template.moments.findIndex(
    (moment) => moment.id === session.current_moment_id
  );
  const currentMoment = template.moments[currentIndex];

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from("thinklab_sessions")
      .select("id, template_key, template_version, status, current_moment_id")
      .eq("id", initialSession.id)
      .maybeSingle();
    if (error || !data) {
      setConnectionError(true);
      return;
    }
    setConnectionError(false);
    setSession(data);
  }, [initialSession.id, supabase]);

  useEffect(() => {
    document.body.classList.add("thinklab-mode");
    const timer = window.setInterval(() => void refresh(), 2500);
    return () => {
      document.body.classList.remove("thinklab-mode");
      window.clearInterval(timer);
    };
  }, [refresh]);

  return (
    <main className={styles.projector}>
      <header className={styles.projectorHeader}>
        <span>ThinkLab™ · {template.sessionTitle}</span>
        <span>{connectionError ? "Reconnecting…" : session.status === "paused" ? "Session paused" : session.status === "ended" ? "Session ended" : "Live classroom view"}</span>
      </header>
      {session.status === "ended" ? (
        <section className={styles.projectorMoment}>
          <p className={styles.eyebrow}>ThinkLab session</p>
          <h1>This session has ended.</h1>
          <p className={styles.previewInstruction}>Thank you for bringing your judgement to the activity.</p>
        </section>
      ) : currentMoment ? (
        <ParticipantMomentPreview
          moment={currentMoment}
          momentNumber={currentIndex + 1}
          totalMoments={template.moments.length}
          projector
        />
      ) : (
        <section className={styles.projectorMoment}>
          <h1>Waiting for the facilitator.</h1>
          <p className={styles.previewInstruction}>No current moment is assigned.</p>
        </section>
      )}
    </main>
  );
}
