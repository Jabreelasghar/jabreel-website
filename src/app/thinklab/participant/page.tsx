import type { Metadata } from "next";
import { ParticipantExperience } from "./participant-experience";

export const metadata: Metadata = {
  title: "Participant · ThinkLab™ Trust Lab",
  description: "Participant interface for the ThinkLab Trust Lab guided experience."
};

export default function ParticipantPage() {
  return <ParticipantExperience />;
}
