export type ThinkLabSessionState = {
  id: string;
  join_code: string;
  template_key: string;
  template_version: number;
  status: string;
  current_moment_id: string;
  delivery_mode: string;
};

export type ThinkLabParticipantState = {
  id: string;
  display_name: string;
  current_moment_id: string;
  status: string;
  last_seen_at: string;
};

export type ThinkLabResponseState = {
  participant_id: string;
  moment_id: string;
  status: string;
  payload?: {
    choices?: string[];
    texts?: string[];
    confidence?: number;
  };
};

export type ParticipantProgressRow = ThinkLabParticipantState & {
  responseStatus: "Not started" | "In progress" | "Submitted";
  activityStatus: "Active" | "Inactive";
};

export function buildParticipantProgress(
  participants: ThinkLabParticipantState[],
  responses: ThinkLabResponseState[],
  currentMomentId: string,
  now = Date.now()
) {
  const responseByParticipant = new Map(
    responses
      .filter((response) => response.moment_id === currentMomentId)
      .map((response) => [response.participant_id, response])
  );
  const activeParticipants = participants.filter((participant) => participant.status === "active");
  const rows: ParticipantProgressRow[] = activeParticipants.map((participant) => {
    const response = responseByParticipant.get(participant.id);
    const submitted = response?.status === "submitted" || response?.status === "locked";
    const responseStatus = submitted
      ? "Submitted"
      : response
        ? "In progress"
        : "Not started";
    const lastSeen = Date.parse(participant.last_seen_at);
    return {
      ...participant,
      responseStatus,
      activityStatus: Number.isFinite(lastSeen) && now - lastSeen <= 120_000
        ? "Active"
        : "Inactive"
    };
  });
  const submitted = rows.filter((row) => row.responseStatus === "Submitted").length;
  const total = rows.length;
  return {
    rows,
    total,
    submitted,
    waiting: Math.max(0, total - submitted),
    completionPercentage: total === 0 ? 0 : Math.round((submitted / total) * 100)
  };
}
