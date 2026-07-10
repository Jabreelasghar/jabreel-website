import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description: "About Dr Jabreel Asghar, university lecturer and AI governance researcher."
};

export default function AboutPage() {
  return (
    <section className="bg-paper">
      <Container className="grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader
          eyebrow="About"
          title="Dr Jabreel Asghar"
          summary="University lecturer, AI governance researcher, and digital education strategist."
        />
        <div className="prose-custom">
          <p>
            This placeholder biography positions Dr Asghar as an academic working across AI governance, assessment
            integrity, and digital education strategy. Replace it with a fuller biography, institutional affiliation,
            qualifications, and current research priorities.
          </p>
          <h2>Research Focus</h2>
          <p>
            His work can be presented around responsible AI adoption, higher education policy, learning design, and the
            practical conditions that help universities use emerging technologies with credibility.
          </p>
          <h2>Professional Profile</h2>
          <p>
            Add selected appointments, research collaborations, editorial roles, committee memberships, and external
            advisory work here.
          </p>
        </div>
      </Container>
    </section>
  );
}
