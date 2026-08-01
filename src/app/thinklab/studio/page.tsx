import type { Metadata } from "next";
import { ThinkLabStudio } from "../thinklab-studio";

export const metadata: Metadata = {
  title: "ThinkLab™ Experience Studio",
  description: "ThinkLab guided workshop experience studio."
};

export default function ThinkLabStudioPage() {
  return <ThinkLabStudio />;
}
