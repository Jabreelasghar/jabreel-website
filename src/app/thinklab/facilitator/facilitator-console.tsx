"use client";

import { useEffect, useMemo, useState } from "react";
import { getResolvedThinkLabTemplate } from "@/lib/thinklab/templates/registry";
import styles from "../thinklab.module.css";

const stages = getResolvedThinkLabTemplate("trust-lab-session-1").moments;

type ParticipantState = {
  choices: Record<string, string[]>;
  texts: Record<string, string[]>;
  confidence: Record<string, number>;
  locked: Record<string, boolean>;
  stageIndex: number;
};

const emptyParticipant: ParticipantState = {
  choices: {}, texts: {}, confidence: {}, locked: {}, stageIndex: 0
};

export function FacilitatorConsole({
  facilitatorName,
  organisationName
}: {
  facilitatorName: string;
  organisationName?: string;
}) {
  const [releasedThrough, setReleasedThrough] = useState(0);
  const [paused, setPaused] = useState(false);
  const [participant, setParticipant] = useState<ParticipantState>(emptyParticipant);
  const [selected, setSelected] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const refreshParticipant = () => {
    const raw = localStorage.getItem("thinklab-v1-participant");
    setParticipant(raw ? JSON.parse(raw) : emptyParticipant);
  };

  useEffect(() => {
    document.body.classList.add("thinklab-mode");
    const raw = localStorage.getItem("thinklab-v1-session");
    if (raw) {
      const session = JSON.parse(raw);
      setReleasedThrough(Number(session.releasedThrough ?? 0));
      setPaused(Boolean(session.paused));
      setSelected(Number(session.releasedThrough ?? 0));
    }
    refreshParticipant();
    setHydrated(true);
    const timer = window.setInterval(refreshParticipant, 1500);
    return () => {
      document.body.classList.remove("thinklab-mode");
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("thinklab-v1-session", JSON.stringify({ releasedThrough, paused, updatedAt: Date.now() }));
  }, [releasedThrough, paused, hydrated]);

  const stage = stages[selected];
  const completed = useMemo(
    () => Object.keys(participant.choices).length + Object.keys(participant.texts).length,
    [participant]
  );
  const progress = Math.round(((releasedThrough + 1) / stages.length) * 100);
  const selectedChoices = participant.choices[stage.id] ?? [];
  const selectedTexts = participant.texts[stage.id] ?? [];

  const releaseNext = () => {
    const next = Math.min(releasedThrough + 1, stages.length - 1);
    setReleasedThrough(next);
    setSelected(next);
    setPaused(false);
  };

  const reopen = () => {
    const nextParticipant = {
      ...participant,
      locked: { ...participant.locked, [stage.id]: false }
    };
    setParticipant(nextParticipant);
    localStorage.setItem("thinklab-v1-participant", JSON.stringify(nextParticipant));
  };

  const signOut = async () => {
    await fetch("/api/thinklab/facilitator/session", { method: "DELETE" });
    window.location.assign("/thinklab/facilitator/sign-in");
  };

  return (
    <div className={styles.facilitator}>
      <header className={styles.facHeader}>
        <div className={styles.labWordmark}>THINKLAB<sup>™</sup><span>{organisationName ?? "DEMONSTRATION ORGANISATION"} · {facilitatorName}</span></div>
        <div className={styles.liveStatus}><i data-paused={paused} />{paused ? "Session paused" : "Session live"}</div>
        <button className={styles.signOutButton} onClick={signOut}>Sign out</button>
      </header>

      <main className={styles.facMain}>
        <section className={styles.facOverview}>
          <div><small>Released moment</small><b>{String(releasedThrough + 1).padStart(2, "0")} / {stages.length}</b><span>{stages[releasedThrough].title}</span></div>
          <div><small>Participant progress</small><b>{progress}%</b><span>{completed} response moments recorded</span></div>
          <div><small>Locked judgements</small><b>{Object.values(participant.locked).filter(Boolean).length}</b><span>Preserved on participant device</span></div>
          <div><small>Session state</small><b>{paused ? "PAUSE" : "LIVE"}</b><span>Last sync checks every 1.5 seconds</span></div>
        </section>

        <section className={styles.facWorkspace}>
          <div className={styles.runOfShow}>
            <div className={styles.facSectionHead}><span>Full session sequence</span><b>Moment</b></div>
            <div className={styles.momentList}>
              {stages.map((item, index) => (
                <button key={item.id} onClick={() => setSelected(index)} data-selected={selected === index} data-state={index < releasedThrough ? "complete" : index === releasedThrough ? "live" : "held"}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><small>{item.section}</small><b>{item.title}</b></div>
                  <i>{index < releasedThrough ? "Complete" : index === releasedThrough ? "Live" : "Held"}</i>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.facInspector}>
            <div className={styles.facSectionHead}><span>Moment inspection</span><b>{String(selected + 1).padStart(2, "0")}</b></div>
            <div className={styles.inspectorBody}>
              <small>{stage.section}</small>
              <h1>{stage.title}</h1>
              {stage.taskInstructions && <p>{stage.taskInstructions}</p>}
              <div className={styles.responseRecord}>
                <div><span>Status</span><b>{selected > releasedThrough ? "Unreleased" : selected === releasedThrough ? "Currently released" : "Completed"}</b></div>
                <div><span>Judgement</span><b>{participant.locked[stage.id] ? "Locked" : "Open"}</b></div>
                {selectedChoices.length > 0 && <div><span>Selected response</span><b>{selectedChoices.join(" · ")}</b></div>}
                {participant.confidence[stage.id] && <div><span>Confidence</span><b>{participant.confidence[stage.id]} / 5</b></div>}
                {selectedTexts.map((text, index) => text && <div key={index}><span>Written response {index + 1}</span><p>{text}</p></div>)}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.controlBar}>
        <div><small>Facilitator actions</small><span>Changes affect the participant interface.</span></div>
        <button onClick={() => setPaused(!paused)} className={paused ? styles.resumeAction : ""}>{paused ? "Resume" : "Pause"}</button>
        <button onClick={reopen} disabled={!participant.locked[stage.id]}>Reopen response</button>
        <button onClick={() => setSelected(releasedThrough)}>Reveal current</button>
        <button className={styles.advanceAction} onClick={releaseNext} disabled={releasedThrough === stages.length - 1}>Release & advance →</button>
      </footer>
    </div>
  );
}
