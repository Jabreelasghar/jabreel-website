import { trustLabSession1 } from "./session-1";
import { resolveThinkLabMoment } from "./resolve-moment";
import type { ThinkLabTemplate } from "./types";

const templates = {
  [trustLabSession1.key]: trustLabSession1
} satisfies Record<string, ThinkLabTemplate>;

export function getThinkLabTemplate(templateKey: keyof typeof templates) {
  return templates[templateKey];
}

export function getResolvedThinkLabTemplate(templateKey: keyof typeof templates) {
  const template = getThinkLabTemplate(templateKey);
  return {
    ...template,
    moments: template.moments.map(resolveThinkLabMoment)
  };
}

export function getResolvedThinkLabTemplateVersion(templateKey: string, templateVersion: number) {
  if (!(templateKey in templates)) return null;
  const template = templates[templateKey as keyof typeof templates];
  if (template.version !== templateVersion) return null;
  return {
    ...template,
    moments: template.moments.map(resolveThinkLabMoment)
  };
}

export { trustLabSession1 };
export type { ResolvedThinkLabMoment } from "./resolve-moment";
export type { ThinkLabMoment, ThinkLabResponseType, ThinkLabTemplate } from "./types";
