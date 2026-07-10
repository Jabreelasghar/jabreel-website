import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Speaking and Workshops",
  description: "Keynotes, workshops, panels, and advisory sessions with Dr Jabreel Asghar."
};

export default function SpeakingPage() {
  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Speaking and Workshops"
          title="Research-led sessions for universities and education teams"
          summary="Sessions can be tailored for senior leaders, academic staff, curriculum teams, policy groups, and student-facing teams."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["Keynotes", "AI governance, digital education futures, and assessment integrity."],
            ["Workshops", "Hands-on policy, assessment redesign, and responsible AI practice sessions."],
            ["Advisory", "Focused support for institutional AI strategy and capability building."]
          ].map(([title, text]) => (
            <div key={title} className="rounded-md border border-line bg-white p-6">
              <h2 className="font-serif text-2xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{text}</p>
            </div>
          ))}
        </div>
        <Link className="button-primary mt-8" href="/contact">
          Discuss an engagement
        </Link>
      </Container>
    </section>
  );
}
