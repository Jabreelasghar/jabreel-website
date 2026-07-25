"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { ResolvedThinkLabMoment } from "@/lib/thinklab/templates/registry";
import { DecisionContextPanel } from "../../participant-moment-content";
import styles from "../../thinklab.module.css";
import stageCStyles from "../../stage-c.module.css";

type Payload = { choices?: string[]; texts?: string[]; confidence?: number };
type ResponseRecord = {
  id: string; moment_id: string; payload: Payload; initial_locked_payload: Payload | null;
  status: string; version: number; updated_at: string;
};
type ReleaseRecord = { moment_id: string; status: string; updated_at: string };
type SessionRecord = {
  id: string; template_key: string; template_version: number; status: string; current_moment_id: string;
};
type ParticipantRecord = {
  id: string; display_name: string; current_moment_id: string; status: string; last_seen_at: string;
};
type Template = {
  key: string; version: number; sessionTitle: string; moments: ResolvedThinkLabMoment[];
};
type SaveState = "idle" | "saving" | "saved" | "error" | "conflict";
type RecoveryDraft = { payload: Payload; expectedVersion: number; savedAt: string };

const releasedStatuses = new Set(["released", "closed", "reopened"]);

export function LiveParticipantExperience({
  session: initialSession, participant, template, initialReleases, initialResponses
}: {
  session: SessionRecord; participant: ParticipantRecord; template: Template;
  initialReleases: ReleaseRecord[]; initialResponses: ResponseRecord[];
}) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [session, setSession] = useState(initialSession);
  const [participantState, setParticipantState] = useState(participant);
  const [releases, setReleases] = useState(initialReleases);
  const [responses, setResponses] = useState<Record<string, ResponseRecord>>(
    Object.fromEntries(initialResponses.map((item) => [item.moment_id, item]))
  );
  const [stageIndex, setStageIndex] = useState(Math.max(
    0, template.moments.findIndex((moment) => moment.id === participant.current_moment_id)
  ));
  const [drafts, setDrafts] = useState<Record<string, Payload>>(
    Object.fromEntries(initialResponses.map((item) => [item.moment_id, item.payload]))
  );
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({});
  const [online, setOnline] = useState(true);
  const saveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const recoveryKey = `thinklab-live-drafts:${session.id}`;

  const loadCanonical = useCallback(async () => {
    const [sessionResult, participantResult, releasesResult, responsesResult] = await Promise.all([
      supabase.from("thinklab_sessions")
        .select("id, template_key, template_version, status, current_moment_id")
        .eq("id", session.id).maybeSingle(),
      supabase.from("thinklab_participants")
        .select("id, display_name, current_moment_id, status, last_seen_at")
        .eq("session_id", session.id).eq("id", participant.id).maybeSingle(),
      supabase.from("thinklab_moment_releases")
        .select("moment_id, status, updated_at").eq("session_id", session.id),
      supabase.from("thinklab_responses")
        .select("id, moment_id, payload, initial_locked_payload, status, version, updated_at")
        .eq("session_id", session.id).eq("participant_id", participant.id)
    ]);
    if (!sessionResult.data || !participantResult.data) return null;
    const participantData = participantResult.data;
    setSession(sessionResult.data);
    setParticipantState(participantData);
    setReleases(releasesResult.data ?? []);
    const canonical = Object.fromEntries(
      ((responsesResult.data ?? []) as ResponseRecord[]).map((item) => [item.moment_id, item])
    );
    setResponses(canonical);
    setDrafts((current) => {
      const recovery = readRecoveryDrafts(recoveryKey);
      const next = { ...current };
      for (const [momentId, record] of Object.entries(canonical)) {
        if (!recovery[momentId]) next[momentId] = record.payload;
      }
      return next;
    });
    const restoredIndex = template.moments.findIndex(
      (moment) => moment.id === participantData.current_moment_id
    );
    if (restoredIndex >= 0) setStageIndex(restoredIndex);
    return {
      session: sessionResult.data,
      participant: participantData,
      releases: releasesResult.data ?? [],
      responses: canonical
    };
  }, [participant.id, recoveryKey, session.id, supabase, template.moments]);

  const sendMoment = useCallback(async (
    momentId: string,
    payload: Payload,
    expectedVersion: number
  ) => {
    setSaveStates((state) => ({ ...state, [momentId]: "saving" }));
    writeRecoveryDraft(recoveryKey, momentId, { payload, expectedVersion, savedAt: new Date().toISOString() });
    if (!navigator.onLine) {
      setSaveStates((state) => ({ ...state, [momentId]: "error" }));
      return false;
    }
    const { data, error } = await supabase.rpc("save_thinklab_response", {
      target_session_id: session.id,
      target_moment_id: momentId,
      response_payload: payload,
      expected_version: expectedVersion
    });
    if (error) {
      const conflict = /conflict|locked/i.test(error.message);
      setSaveStates((state) => ({ ...state, [momentId]: conflict ? "conflict" : "error" }));
      return false;
    }
    const result = (Array.isArray(data) ? data[0] : data) as {
      response_id: string; response_version: number; response_status: string; response_updated_at: string;
    };
    setResponses((current) => ({
      ...current,
      [momentId]: {
        id: result.response_id, moment_id: momentId, payload,
        initial_locked_payload: current[momentId]?.initial_locked_payload ?? null,
        status: result.response_status, version: result.response_version,
        updated_at: result.response_updated_at
      }
    }));
    removeRecoveryDraft(recoveryKey, momentId);
    setSaveStates((state) => ({ ...state, [momentId]: "saved" }));
    return true;
  }, [recoveryKey, session.id, supabase]);

  const saveMoment = useCallback(async (momentId: string, payload: Payload) => {
    const saved = await sendMoment(momentId, payload, responses[momentId]?.version ?? 0);
    if (!saved && navigator.onLine) await loadCanonical();
  }, [loadCanonical, responses, sendMoment]);

  useEffect(() => {
    document.body.classList.add("thinklab-mode");
    setOnline(navigator.onLine);
    const recovery = readRecoveryDrafts(recoveryKey);
    if (Object.keys(recovery).length) {
      setDrafts((current) => {
        const next = { ...current };
        for (const [momentId, draft] of Object.entries(recovery)) {
          if (draft.expectedVersion === (responses[momentId]?.version ?? 0)) {
            next[momentId] = draft.payload;
            setSaveStates((state) => ({ ...state, [momentId]: "error" }));
          } else {
            setSaveStates((state) => ({ ...state, [momentId]: "conflict" }));
          }
        }
        return next;
      });
    }
    return () => {
      document.body.classList.remove("thinklab-mode");
      Object.values(saveTimers.current).forEach(clearTimeout);
    };
  }, [recoveryKey, responses]);

  useEffect(() => {
    const offline = () => setOnline(false);
    const reconnect = async () => {
      setOnline(true);
      const canonical = await loadCanonical();
      if (!canonical) return;
      const recovery = readRecoveryDrafts(recoveryKey);
      for (const [momentId, draft] of Object.entries(recovery)) {
        const serverVersion = canonical.responses[momentId]?.version ?? 0;
        if (draft.expectedVersion !== serverVersion) {
          setSaveStates((state) => ({ ...state, [momentId]: "conflict" }));
          continue;
        }
        setDrafts((current) => ({ ...current, [momentId]: draft.payload }));
        await sendMoment(momentId, draft.payload, serverVersion);
      }
    };
    window.addEventListener("offline", offline);
    window.addEventListener("online", reconnect);
    const presence = window.setInterval(() => {
      if (navigator.onLine) void supabase.rpc("touch_thinklab_participant_presence", {
        target_session_id: session.id
      });
    }, 45_000);
    return () => {
      window.removeEventListener("offline", offline);
      window.removeEventListener("online", reconnect);
      window.clearInterval(presence);
    };
  }, [loadCanonical, recoveryKey, sendMoment, session.id, supabase]);

  useEffect(() => {
    const canonicalRefresh = window.setInterval(() => {
      if (navigator.onLine) void loadCanonical();
    }, 3000);
    return () => window.clearInterval(canonicalRefresh);
  }, [loadCanonical]);

  const stage = template.moments[stageIndex];
  const payload = drafts[stage.id] ?? {};
  const response = responses[stage.id];
  const locked = Boolean(response?.initial_locked_payload || response?.status === "locked");
  const releaseStatus = releases.find((item) => item.moment_id === stage.id)?.status;
  const momentOpen = releaseStatus === "released" || releaseStatus === "reopened";
  const requiresChoiceLock = stage.id === "cards" && stage.maxChoices === 2;
  const choices = payload.choices ?? [];
  const texts = payload.texts ?? [];
  const releasedIds = new Set(
    releases.filter((item) => releasedStatuses.has(item.status)).map((item) => item.moment_id)
  );
  const furthestReleased = template.moments.reduce(
    (last, moment, index) => releasedIds.has(moment.id) ? index : last, 0
  );
  const progress = Math.round(((stageIndex + 1) / template.moments.length) * 100);
  const saveState = saveStates[stage.id] ?? (response ? "saved" : "idle");
  const canContinue = stage.id === "welcome" ? Boolean(texts[0]?.trim()) :
    stage.id === "rules" ? choices.length === 3 :
    stage.id === "reflection" ? stage.prompts.every((_, index) => texts[index]?.trim()) :
    requiresChoiceLock ? choices.length === 2 :
    stage.options.length > 0 && stage.prompts.length === 0 ? choices.length > 0 : true;

  function updatePayload(nextPayload: Payload) {
    if (locked || !momentOpen || session.status === "ended") return;
    setDrafts((current) => ({ ...current, [stage.id]: nextPayload }));
    setSaveStates((state) => ({ ...state, [stage.id]: "saving" }));
    writeRecoveryDraft(recoveryKey, stage.id, {
      payload: nextPayload, expectedVersion: responses[stage.id]?.version ?? 0,
      savedAt: new Date().toISOString()
    });
    clearTimeout(saveTimers.current[stage.id]);
    saveTimers.current[stage.id] = setTimeout(() => void saveMoment(stage.id, nextPayload), 1500);
  }

  async function lockInitialJudgement() {
    setSaveStates((state) => ({ ...state, [stage.id]: "saving" }));
    const { data, error } = await supabase.rpc("submit_thinklab_response", {
      target_session_id: session.id, target_moment_id: stage.id,
      response_payload: payload, expected_version: responses[stage.id]?.version ?? 0
    });
    if (error) {
      setSaveStates((state) => ({ ...state, [stage.id]: "conflict" }));
      await loadCanonical();
      return;
    }
    const result = (Array.isArray(data) ? data[0] : data) as {
      response_id: string; response_version: number; response_status: string; response_locked_at: string;
    };
    setResponses((current) => ({
      ...current,
      [stage.id]: {
        id: result.response_id, moment_id: stage.id, payload, initial_locked_payload: payload,
        status: result.response_status, version: result.response_version, updated_at: result.response_locked_at
      }
    }));
    removeRecoveryDraft(recoveryKey, stage.id);
    setSaveStates((state) => ({ ...state, [stage.id]: "saved" }));
  }

  async function moveToMoment(nextIndex: number) {
    if (nextIndex === stageIndex || !template.moments[nextIndex]) return;
    const previousIndex = stageIndex;
    const nextMomentId = template.moments[nextIndex].id;
    setStageIndex(nextIndex);
    const { error } = await supabase.rpc("set_thinklab_participant_current_moment", {
      target_session_id: session.id,
      target_moment_id: nextMomentId
    });
    if (error) {
      setStageIndex(previousIndex);
      await loadCanonical();
    }
  }

  return (
    <div className={styles.lab}>
      <header className={styles.labHeader}>
        <div className={styles.labWordmark}>THINKLAB<sup>™</sup><span>THE TRUST LAB</span></div>
        <div className={styles.progressMeta}><span>{String(stageIndex + 1).padStart(2, "0")} / {template.moments.length}</span><b>{progress}%</b></div>
        <span className={styles.participantLabel}>{participantState.display_name}</span>
      </header>
      <div className={styles.progressTrack}><i style={{ width: `${progress}%` }} /></div>
      {!online && <div className={stageCStyles.connectionNotice} role="status">Offline — your typing is preserved and will retry after reconnecting.</div>}
      {session.status === "ended" && <div className={stageCStyles.connectionNotice} role="status">This session has ended. Your saved work remains visible.</div>}
      <main className={styles.labMain}>
        <aside className={styles.sequence}>
          {[...new Set(template.moments.map((item) => item.section.split(" · ")[0]))].map((section) => {
            const first = template.moments.findIndex((item) => item.section.startsWith(section));
            const last = template.moments.map((item) => item.section.startsWith(section)).lastIndexOf(true);
            const state = stageIndex > last ? "complete" : stageIndex >= first ? "current" : "future";
            return <div key={section} data-state={state}><i /><span>{section}</span></div>;
          })}
        </aside>
        <section className={styles.stage}>
          <div className={styles.stageLabel}><span>{stage.section}</span><span>Instrument {String(stageIndex + 1).padStart(2, "0")}</span></div>
          <h1>{stage.title}</h1>
          {stage.taskInstructions && <p className={styles.instruction}>{stage.taskInstructions}</p>}
          <DecisionContextPanel
            currentMoment={stage}
            moments={template.moments}
            responses={responses}
          />
          {stage.sourceMaterial && <div className={styles.source}>{stage.sourceMaterial.split("\n").map((line, index) => <p key={index}>{line}</p>)}</div>}
          {stage.options.length > 0 && <div className={styles.choices}>{stage.options.map((option) => {
            const selected = choices.includes(option);
            return <button key={option} type="button" data-selected={selected} disabled={locked || !momentOpen || session.status === "ended"} onClick={() => {
              const limit = stage.maxChoices ?? 1;
              const next = selected ? choices.filter((item) => item !== option) :
                limit === 1 ? [option] : choices.length < limit ? [...choices, option] : choices;
              updatePayload({ ...payload, choices: next });
            }}><i>{selected ? "✓" : ""}</i><span>{option}</span></button>;
          })}</div>}
          {stage.prompts.length > 0 && <div className={styles.fields}>{stage.prompts.map((prompt, index) =>
            <label key={`${stage.id}-${index}`}><span>{prompt}</span><textarea value={texts[index] ?? ""} disabled={locked || !momentOpen || session.status === "ended"} onChange={(event) => {
              const next = [...texts]; next[index] = event.target.value;
              updatePayload({ ...payload, texts: next });
            }} /></label>
          )}</div>}
          {stage.confidenceScale && <label className={styles.confidenceControl}><span>Confidence in this judgement</span><input type="range" min="1" max="5" disabled={locked || !momentOpen || session.status === "ended"} value={payload.confidence ?? 3} onChange={(event) => updatePayload({ ...payload, confidence: Number(event.target.value) })} /><b>{payload.confidence ?? 3} / 5</b></label>}
          {stage.notice && <div className={styles.notice}><b>NOTICE</b><p>{stage.notice}</p></div>}
          {stage.principle && <div className={styles.principle}>{stage.principle}</div>}
          <div className={styles.stageActions}>
            <SaveIndicator state={saveState} retry={() => void saveMoment(stage.id, payload)} />
            {locked ? <div className={styles.waiting}>{requiresChoiceLock ? "Two evidence cards locked" : "Judgement locked"}</div> :
              !momentOpen ? <div className={styles.waiting}>This moment is closed</div> :
              stage.lockResponse || requiresChoiceLock ? <button className={styles.commit} onClick={() => void lockInitialJudgement()} disabled={!canContinue || saveState === "saving"}>{requiresChoiceLock ? "Confirm and lock two cards" : "Lock initial judgement"}</button> :
              stageIndex < furthestReleased ? <button className={styles.commit} onClick={() => void moveToMoment(stageIndex + 1)} disabled={!canContinue}>Continue</button> :
              <div className={styles.waiting}><i />{session.status === "paused" ? "Session paused by facilitator" : "Waiting for facilitator"}</div>}
          </div>
        </section>
      </main>
    </div>
  );
}

function SaveIndicator({ state, retry }: { state: SaveState; retry: () => void }) {
  if (state === "saving") return <span className={styles.savedState} role="status">Saving…</span>;
  if (state === "error") return <button className={stageCStyles.retrySave} onClick={retry}>Unable to save — Retry</button>;
  if (state === "conflict") return <button className={stageCStyles.retrySave} onClick={retry}>Newer response found — Review and retry</button>;
  if (state === "saved") return <span className={styles.savedState} role="status">Saved</span>;
  return <span className={styles.savedState}>Not yet saved</span>;
}

function readRecoveryDrafts(key: string): Record<string, RecoveryDraft> {
  try { return JSON.parse(localStorage.getItem(key) ?? "{}") as Record<string, RecoveryDraft>; }
  catch { return {}; }
}
function writeRecoveryDraft(key: string, momentId: string, draft: RecoveryDraft) {
  const drafts = readRecoveryDrafts(key); drafts[momentId] = draft;
  localStorage.setItem(key, JSON.stringify(drafts));
}
function removeRecoveryDraft(key: string, momentId: string) {
  const drafts = readRecoveryDrafts(key); delete drafts[momentId];
  localStorage.setItem(key, JSON.stringify(drafts));
}
