"use client";

import { useEffect, useMemo, useState } from "react";
import { getResolvedThinkLabTemplate } from "@/lib/thinklab/templates/registry";
import styles from "../thinklab.module.css";

export const stages = getResolvedThinkLabTemplate("trust-lab-session-1").moments;

export function ParticipantExperience() {
  const [stageIndex, setStageIndex] = useState(0);
  const [releasedThrough, setReleasedThrough] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [choices, setChoices] = useState<Record<string, string[]>>({});
  const [texts, setTexts] = useState<Record<string, string[]>>({});
  const [confidence, setConfidence] = useState<Record<string, number>>({});
  const [locked, setLocked] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);
  const stage = stages[stageIndex];
  const stageChoices = choices[stage.id] ?? [];
  const stageTexts = texts[stage.id] ?? [];
  const progress = Math.round(((stageIndex + 1) / stages.length) * 100);

  useEffect(() => {
    document.body.classList.add("thinklab-mode");
    return () => document.body.classList.remove("thinklab-mode");
  }, []);

  useEffect(() => {
    const applySession = () => {
      const raw = localStorage.getItem("thinklab-v1-session");
      if (!raw) return;
      const session = JSON.parse(raw);
      const released = Math.min(Number(session.releasedThrough ?? 0), stages.length - 1);
      setReleasedThrough(released);
      setPaused(Boolean(session.paused));
      setStageIndex(released);
    };
    const rawParticipant = localStorage.getItem("thinklab-v1-participant");
    if (rawParticipant) {
      const saved = JSON.parse(rawParticipant);
      setChoices(saved.choices ?? {});
      setTexts(saved.texts ?? {});
      setConfidence(saved.confidence ?? {});
      setLocked(saved.locked ?? {});
      setCompleted(Boolean(saved.completed));
    }
    applySession();
    setHydrated(true);
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "thinklab-v1-session") applySession();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("thinklab-v1-participant", JSON.stringify({ choices, texts, confidence, locked, stageIndex, completed }));
  }, [choices, texts, confidence, locked, stageIndex, completed, hydrated]);

  const canContinue = useMemo(() => {
    if (stage.id === "welcome") return Boolean(stageTexts[0]?.trim());
    if (stage.id === "rules") return stageChoices.length === 3;
    if (stage.id === "reflection") {
      return Boolean(stage.prompts.every((_, index) => stageTexts[index]?.trim()));
    }
    if (stage.options.length > 0 && stage.prompts.length === 0) return stageChoices.length > 0;
    return true;
  }, [stage, stageChoices, stageTexts]);

  const toggleOption = (option: string) => {
    if (locked[stage.id]) return;
    const limit = stage.maxChoices ?? 1;
    const current = choices[stage.id] ?? [];
    const next = current.includes(option)
      ? current.filter((item) => item !== option)
      : limit === 1 ? [option] : current.length < limit ? [...current, option] : current;
    setChoices({ ...choices, [stage.id]: next });
  };

  const setPrompt = (promptIndex: number, value: string) => {
    const next = [...stageTexts];
    next[promptIndex] = value;
    setTexts({ ...texts, [stage.id]: next });
  };

  const advance = () => {
    if (stage.lockResponse && !locked[stage.id]) {
      setLocked({ ...locked, [stage.id]: true });
      return;
    }
    if (stageIndex < stages.length - 1 && stageIndex + 1 <= releasedThrough) setStageIndex(stageIndex + 1);
  };

  return (
    <div className={styles.lab}>
      <header className={styles.labHeader}>
        <div className={styles.labWordmark}>THINKLAB<sup>™</sup><span>THE TRUST LAB</span></div>
        <div className={styles.progressMeta}><span>{String(stageIndex + 1).padStart(2, "0")} / {stages.length}</span><b>{progress}%</b></div>
        <span className={styles.participantLabel}>Participant</span>
      </header>
      <div className={styles.progressTrack}><i style={{ width: `${progress}%` }} /></div>

      <main className={styles.labMain}>
        <aside className={styles.sequence}>
          {[...new Set(stages.map(item => item.section.split(" · ")[0]))].map(section => {
            const first = stages.findIndex(item => item.section.startsWith(section));
            const last = stages.map(item => item.section.startsWith(section)).lastIndexOf(true);
            const state = stageIndex > last ? "complete" : stageIndex >= first ? "current" : "future";
            return <div key={section} data-state={state}><i /> <span>{section}</span></div>;
          })}
        </aside>

        <section className={styles.stage}>
          <div className={styles.stageLabel}><span>{stage.section}</span><span>Instrument {String(stageIndex + 1).padStart(2, "0")}</span></div>
          <h1>{stage.title}</h1>
          {stage.taskInstructions && <p className={styles.instruction}>{stage.taskInstructions}</p>}
          {stage.sourceMaterial && <div className={styles.source}>{stage.sourceMaterial.split("\n").map((line, i) => <p key={i}>{line}</p>)}</div>}

          {stage.options.length > 0 && (
            <div className={styles.choices}>
              {stage.options.map(option => {
                const selected = stageChoices.includes(option);
                return <button key={option} onClick={() => toggleOption(option)} data-selected={selected} disabled={Boolean(locked[stage.id])}>
                  <i>{selected ? "✓" : ""}</i><span>{option}</span>
                </button>;
              })}
            </div>
          )}

          {stage.prompts.length > 0 && (
            <div className={styles.fields}>
              {stage.prompts.map((prompt, index) => (
                <label key={`${stage.id}-prompt-${index}`}><span>{prompt}</span>
                  <textarea value={stageTexts[index] ?? ""} onChange={event => setPrompt(index, event.target.value)} />
                </label>
              ))}
            </div>
          )}

          {stage.confidenceScale && (
            <label className={styles.confidenceControl}>
              <span>Confidence in this judgement</span>
              <input type="range" min="1" max="5" value={confidence[stage.id] ?? 3} onChange={event => setConfidence({ ...confidence, [stage.id]: Number(event.target.value) })} />
              <b>{confidence[stage.id] ?? 3} / 5</b>
            </label>
          )}

          {stage.notice && <div className={styles.notice}><b>NOTICE</b><p>{stage.notice}</p></div>}
          {stage.principle && <div className={styles.principle}>{stage.principle}</div>}

          <div className={styles.stageActions}>
            <span className={styles.savedState}>Responses saved on this device</span>
            {stageIndex === stages.length - 1 ? (
              completed ? (
                <div className={styles.completedState} role="status">
                  <b>Trust Lab complete</b>
                  <span>Your reflection and judgements have been saved.</span>
                </div>
              ) : (
                <button className={styles.commit} onClick={() => setCompleted(true)} disabled={!canContinue}>
                  Complete Trust Lab
                </button>
              )
            ) : paused ? (
              <div className={styles.waiting}><i /> Session paused by facilitator</div>
            ) : stage.lockResponse && !locked[stage.id] ? (
              <button className={styles.commit} onClick={advance} disabled={!canContinue}>Lock initial judgement</button>
            ) : stageIndex + 1 > releasedThrough ? (
              <div className={styles.waiting}><i /> {locked[stage.id] ? "Judgement locked · waiting for facilitator" : "Waiting for facilitator"}</div>
            ) : (
              <button className={styles.commit} onClick={advance} disabled={!canContinue}>
                Continue
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
