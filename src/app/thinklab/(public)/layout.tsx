import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import "./public-theme.css";
import { ThinkLabThemeMode } from "./theme-mode";

export const metadata: Metadata = {
  title: { absolute: "ThinkLab™ | Human Judgement in the Age of AI" },
  description: "ThinkLab is a research-informed methodology helping students develop trust, evidence, responsibility, values and decision-making judgement in AI-supported higher education.",
  alternates: { canonical: "/thinklab" },
  openGraph: {
    title: "ThinkLab™ | Human Judgement in the Age of AI",
    description: "A research-informed methodology for making human judgement visible in an AI-enabled world.",
    url: `${SITE_URL}/thinklab`,
    type: "website"
  }
};

export default function ThinkLabPublicLayout({ children }: { children: React.ReactNode }) {
  return <><ThinkLabThemeMode />{children}</>;
}
