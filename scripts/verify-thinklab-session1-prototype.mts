import { trustLabSession1 } from "../src/lib/thinklab/templates/session-1.ts";
import { resolveThinkLabMoment } from "../src/lib/thinklab/templates/resolve-moment.ts";

const supportedResponseTypes = new Set([
  "text",
  "multiple-text",
  "single-choice",
  "multiple-choice",
  "confidence-scale",
  "compound"
]);

const moments = trustLabSession1.moments;
const ids = new Set<string>();
const simulatedResponses = new Map<string, {
  choices: string[];
  texts: string[];
  confidence?: number;
  locked: boolean;
}>();

for (const rawMoment of moments) {
  const moment = resolveThinkLabMoment(rawMoment);
  if (ids.has(moment.id)) throw new Error(`Duplicate moment id: ${moment.id}`);

  if (!supportedResponseTypes.has(moment.responseType)) {
    throw new Error(`Unsupported response type on ${moment.id}: ${moment.responseType}`);
  }

  for (const contextId of moment.contextRequiredFrom) {
    if (!ids.has(contextId)) {
      throw new Error(`${moment.id} requires future or unknown context: ${contextId}`);
    }
  }

  if (moment.revisesPreviousJudgement && !ids.has(moment.revisesPreviousJudgement)) {
    throw new Error(
      `${moment.id} revises future or unknown judgement: ${moment.revisesPreviousJudgement}`
    );
  }
  if (typeof moment.evidenceBecomesVisible !== "boolean") {
    throw new Error(`${moment.id} has no resolved evidence-release definition`);
  }
  if (typeof moment.lockResponse !== "boolean") {
    throw new Error(`${moment.id} has no resolved locking definition`);
  }
  if (moment.revisesPreviousJudgement !== null &&
      typeof moment.revisesPreviousJudgement !== "string") {
    throw new Error(`${moment.id} has no resolved revision definition`);
  }

  const choices = [...moment.options.slice(0, moment.maxChoices ?? 1)];
  const texts = moment.prompts.map(prompt => `Completed response for ${prompt}`);
  const confidence = moment.confidenceScale ? 3 : undefined;

  if (moment.responseType === "single-choice" && choices.length !== 1) {
    throw new Error(`${moment.id} did not produce exactly one simulated choice`);
  }
  if (moment.responseType === "multiple-choice" && choices.length !== (moment.maxChoices ?? 1)) {
    throw new Error(`${moment.id} did not produce the required simulated choices`);
  }
  if (texts.some(text => !text.trim())) {
    throw new Error(`${moment.id} contains an incomplete simulated prompt`);
  }

  simulatedResponses.set(moment.id, {
    choices,
    texts,
    confidence,
    locked: moment.lockResponse
  });
  ids.add(moment.id);
}

if (moments.length !== 24) throw new Error(`Expected 24 moments, received ${moments.length}`);
if (moments[0]?.id !== "welcome") throw new Error("Session 1 no longer begins with welcome");
if (moments.at(-1)?.id !== "reflection") throw new Error("Session 1 no longer ends with reflection");

const reflection = simulatedResponses.get("reflection");
if (!reflection || reflection.texts.length !== 4 || reflection.texts.some(text => !text.trim())) {
  throw new Error("Final reflection cannot satisfy the completion requirement");
}

const lockedMoments = [...simulatedResponses]
  .filter(([, response]) => response.locked)
  .map(([momentId]) => momentId);
if (JSON.stringify(lockedMoments) !== JSON.stringify(["trap", "confidence-first"])) {
  throw new Error(`Locked judgement sequence changed: ${lockedMoments.join(", ")}`);
}

console.log(
  `Session 1 prototype traversal passed: ${moments.length} moments, ` +
  `${simulatedResponses.size} simulated responses, final reflection complete.`
);
