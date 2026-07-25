import type { Metadata } from "next";
import { JoinThinkLab } from "./join-thinklab";

export const metadata: Metadata = {
  title: "Join a session · ThinkLab™",
  description: "Join a live ThinkLab guided learning session."
};

export default function JoinThinkLabPage() {
  return <JoinThinkLab />;
}
