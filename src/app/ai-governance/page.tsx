import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Responsible AI in Higher Education",
  description: "Research and practical perspectives on responsible generative AI integration in higher education."
};

export default function AiGovernancePage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <SectionHeader
            eyebrow="AI Governance"
            title="Responsible AI in Higher Education"
            summary="Research and practical perspectives on the responsible integration of generative AI into higher education."
          />
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-oxford">Area of work</h2>
            <p className="mt-4 leading-7 text-slate">
              This area brings together research on responsible AI adoption, academic integrity, and institutional
              governance in higher education. Future updates may include related publications, practical guides,
              downloadable materials, and further reading.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Responsible adoption", "Considering how generative AI can be integrated while preserving educational quality."],
              ["Institutional governance", "Examining policies and practices that support accountable AI use in higher education."],
              ["Academic integrity", "Connecting AI governance with authorship, transparency, and trustworthy assessment."],
              ["Evidence-informed practice", "Using research and teaching experience to inform practical frameworks."]
            ].map(([title, text]) => (
              <div key={title} className="rounded-sm border border-line bg-ivory p-5">
                <h3 className="font-semibold text-oxford">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
