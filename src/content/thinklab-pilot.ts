export const pilot = {
  status: "pending_approval",
  pilotDetails: "Coming soon",
  institutionLabel: "Proposed institution",
  institution: "Higher Colleges of Technology (pending approval)",
  registrationLabel: "Join the interest list",
  registrationOpen: false,
  campus: null,
  dates: null,
  time: null,
  venue: null,
  sessions: null,
  maximumParticipants: null,
  registrationDeadline: null,
  facilitator: "Dr Jabreel Asghar",
  registrationUrl: null,
  attendancePolicy: null,
  certificateApproved: null,
} as const;

export const workshops = [
  ["Trust Lab", "What deserves trust?", "Examine why polished AI answers are easy to accept and decide when checking becomes necessary."],
  ["Decision Lab", "AI recommends. Humans decide.", "Identify missing context, assumptions, priorities and consequences before acting on advice."],
  ["Responsibility Lab", "Who should decide what?", "Draw the boundary between useful support and the transfer of meaningful human responsibility."],
  ["Evidence Lab", "What counts as good evidence?", "Judge the quality, relevance and limits of evidence before allowing it to influence a decision."],
  ["Values Lab", "Whose values shape this decision?", "Recognise why reasonable people can interpret the same evidence differently and still disagree."],
  ["Uncertainty Lab", "What should you do when you cannot know for sure?", "Decide when to investigate, wait, act with safeguards or revise a judgement."],
] as const;
