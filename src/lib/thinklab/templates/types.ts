export type ThinkLabResponseType =
  | "text"
  | "multiple-text"
  | "single-choice"
  | "multiple-choice"
  | "confidence-scale"
  | "compound";

export type ThinkLabMoment = {
  id: string;
  section: string;
  title: string;
  taskInstructions?: string;
  prompts?: readonly string[];
  responseType: ThinkLabResponseType;
  sourceMaterial?: string;
  options?: readonly string[];
  maxChoices?: number;
  confidenceScale?: boolean;
  contextRequiredFrom?: readonly string[];
  evidenceBecomesVisible?: boolean;
  notice?: string;
  principle?: string;
  lockResponse?: boolean;
  revisesPreviousJudgement?: string;
};

export type ThinkLabTemplate = {
  key: string;
  version: number;
  sessionTitle: string;
  moments: readonly ThinkLabMoment[];
};
