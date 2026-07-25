import type { Metadata } from "next";
import { ThinkLabStudio } from "./thinklab-studio";

export const metadata: Metadata = {
  title: "ThinkLab™ — Phase 1 Experience Studio",
  description: "Three interactive creative directions for the ThinkLab guided learning experience."
};

export default function ThinkLabPage() {
  return <ThinkLabStudio />;
}
