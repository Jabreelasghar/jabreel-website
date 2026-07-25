import type { ThinkLabMoment } from "./types";

export type ResolvedThinkLabMoment = Omit<
  ThinkLabMoment,
  | "prompts"
  | "options"
  | "contextRequiredFrom"
  | "evidenceBecomesVisible"
  | "lockResponse"
  | "revisesPreviousJudgement"
> & {
  prompts: readonly string[];
  options: readonly string[];
  contextRequiredFrom: readonly string[];
  evidenceBecomesVisible: boolean;
  lockResponse: boolean;
  revisesPreviousJudgement: string | null;
};

export function resolveThinkLabMoment(moment: ThinkLabMoment): ResolvedThinkLabMoment {
  return {
    ...moment,
    prompts: moment.prompts ?? [],
    options: moment.options ?? [],
    contextRequiredFrom: moment.contextRequiredFrom ?? [],
    evidenceBecomesVisible: moment.evidenceBecomesVisible ?? false,
    lockResponse: moment.lockResponse ?? false,
    revisesPreviousJudgement: moment.revisesPreviousJudgement ?? null
  };
}
