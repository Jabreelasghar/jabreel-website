import { createHash } from "node:crypto";
import { trustLabSession1 } from "../src/lib/thinklab/templates/session-1.ts";

const expectedIds = [
  "welcome", "rules", "trap", "look-again", "confidence-first", "language",
  "librarian", "lecturer", "context", "direction", "convincing", "sentence",
  "inspect", "priority", "three-change", "defend", "compare", "claim", "cards",
  "bias", "claims", "conclusion", "final-defence", "reflection"
];

const legacyFieldOrder: Record<string, string[]> = {
  welcome: ["instruction", "prompts", "notice"],
  rules: ["options", "maxChoices", "instruction"],
  trap: ["instruction", "source", "options", "locked"],
  "look-again": ["instruction", "prompts", "options", "notice"],
  "confidence-first": ["instruction", "source", "options", "locked"],
  language: ["instruction", "prompts", "confidence"],
  librarian: ["source", "options", "prompts", "instruction"],
  lecturer: ["source", "options", "prompts", "instruction"],
  context: ["source", "options", "prompts", "instruction"],
  direction: ["prompts"],
  convincing: ["instruction", "prompts", "notice"],
  sentence: ["instruction", "prompts", "options", "principle"],
  inspect: ["instruction", "source", "prompts"],
  priority: ["instruction", "options", "prompts"],
  "three-change": ["instruction", "prompts"],
  defend: ["prompts"],
  compare: ["source", "options", "prompts", "principle"],
  claim: ["instruction", "source", "options", "prompts"],
  cards: ["instruction", "options", "maxChoices", "prompts"],
  bias: ["instruction", "options"],
  claims: ["instruction", "prompts"],
  conclusion: ["options", "prompts"],
  "final-defence": ["instruction", "prompts", "principle"],
  reflection: ["instruction", "prompts", "notice"]
};

const fieldValue = (moment: (typeof trustLabSession1.moments)[number], field: string) => {
  if (field === "instruction") return "taskInstructions" in moment ? moment.taskInstructions : undefined;
  if (field === "source") return "sourceMaterial" in moment ? moment.sourceMaterial : undefined;
  if (field === "locked") return "lockResponse" in moment ? moment.lockResponse : undefined;
  if (field === "confidence") return "confidenceScale" in moment ? moment.confidenceScale : undefined;
  return field in moment ? moment[field as keyof typeof moment] : undefined;
};

const legacyMoments = trustLabSession1.moments.map(moment => {
  const legacy: Record<string, unknown> = {
    id: moment.id,
    section: moment.section,
    title: moment.title
  };

  for (const field of legacyFieldOrder[moment.id] ?? []) {
    const value = fieldValue(moment, field);
    if (value !== undefined) legacy[field] = value;
  }

  return legacy;
});

const ids = legacyMoments.map(moment => moment.id);
if (JSON.stringify(ids) !== JSON.stringify(expectedIds)) {
  throw new Error(`Session 1 moment order changed: ${ids.join(", ")}`);
}

const serialized = JSON.stringify(legacyMoments);
const digest = createHash("sha256").update(serialized).digest("hex");
const expectedDigest = "7f618af624eccf6634d6f65a0c7faa29457537e1c614cfb5d3a503e99dc5c529";

if (digest !== expectedDigest) {
  throw new Error(`Session 1 content parity failed. Expected ${expectedDigest}, received ${digest}.`);
}

console.log(`Session 1 parity passed: ${legacyMoments.length} moments, SHA-256 ${digest}.`);
