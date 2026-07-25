import type { ResolvedThinkLabMoment } from "@/lib/thinklab/templates/registry";
import stageDStyles from "./stage-d.module.css";

type StoredPayload = {
  choices?: string[];
  texts?: string[];
  confidence?: number;
};

export function ParticipantMomentPreview({
  moment,
  momentNumber,
  totalMoments,
  projector = false
}: {
  moment: ResolvedThinkLabMoment;
  momentNumber: number;
  totalMoments: number;
  projector?: boolean;
}) {
  return (
    <article className={projector ? stageDStyles.projectorMoment : stageDStyles.previewMoment}>
      <div className={stageDStyles.previewMeta}>
        <span>{moment.section}</span>
        <span>{String(momentNumber).padStart(2, "0")} / {totalMoments}</span>
      </div>
      <h1>{moment.title}</h1>
      {moment.taskInstructions && <p className={stageDStyles.previewInstruction}>{moment.taskInstructions}</p>}
      {moment.sourceMaterial && (
        <div className={stageDStyles.previewSource}>
          {moment.sourceMaterial.split("\n").map((line, index) => <p key={index}>{line}</p>)}
        </div>
      )}
      {moment.options.length > 0 && (
        <div className={stageDStyles.previewOptions}>
          {moment.options.map((option, index) => (
            <div key={option}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span></div>
          ))}
        </div>
      )}
      {moment.prompts.length > 0 && (
        <div className={stageDStyles.previewPrompts}>
          {moment.prompts.map((prompt, index) => (
            <p key={`${moment.id}-preview-prompt-${index}`}>{prompt}</p>
          ))}
        </div>
      )}
      {moment.notice && <aside className={stageDStyles.previewNotice}><b>Notice</b><p>{moment.notice}</p></aside>}
      {moment.principle && <aside className={stageDStyles.previewPrinciple}>{moment.principle}</aside>}
    </article>
  );
}

export function DecisionContextPanel({
  currentMoment,
  moments,
  responses
}: {
  currentMoment: ResolvedThinkLabMoment;
  moments: ResolvedThinkLabMoment[];
  responses: Record<string, { payload: StoredPayload } | undefined>;
}) {
  if (currentMoment.contextRequiredFrom.length === 0) return null;
  const references = currentMoment.contextRequiredFrom
    .map((momentId) => moments.find((moment) => moment.id === momentId))
    .filter((moment): moment is ResolvedThinkLabMoment => Boolean(moment));

  if (references.length === 0) return null;

  return (
    <aside className={stageDStyles.contextPanel} aria-label="Decision context">
      <div className={stageDStyles.contextHeading}>
        <span>Decision context</span>
        <p>Keep the original material and your earlier judgement in view while you reason.</p>
      </div>
      {references.map((reference) => {
        const previous = responses[reference.id]?.payload;
        return (
          <section key={reference.id}>
            <h2>{reference.title}</h2>
            {reference.taskInstructions && <p>{reference.taskInstructions}</p>}
            {reference.sourceMaterial && <blockquote>{reference.sourceMaterial}</blockquote>}
            {reference.options.length > 0 && (
              <ul>{reference.options.map((option) => (
                <li key={option} data-selected={previous?.choices?.includes(option) || undefined}>
                  {option}
                </li>
              ))}</ul>
            )}
            <div className={stageDStyles.previousDecision}>
              <b>Your earlier response</b>
              {previous?.choices?.length
                ? <span>{previous.choices.join(" · ")}</span>
                : previous?.texts?.some(Boolean)
                  ? <span>{previous.texts.filter(Boolean).join(" · ")}</span>
                  : <span>No earlier response was recorded.</span>}
              {typeof previous?.confidence === "number" && (
                <span>Your earlier confidence: {previous.confidence} / 5</span>
              )}
            </div>
          </section>
        );
      })}
    </aside>
  );
}
