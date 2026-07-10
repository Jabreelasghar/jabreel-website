import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Assessment Integrity",
  description: "Approaches to authentic assessment, academic integrity, and trustworthy evaluation in AI-mediated learning."
};

export default function AssessmentIntegrityPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Assessment Integrity"
            title="Assessment Integrity"
            summary="Approaches to authentic assessment, academic integrity, and trustworthy evaluation in AI-mediated learning."
          />
        </Container>
      </section>
      <section className="bg-white">
        <Container className="py-14">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl font-semibold text-ink">Area of work</h2>
            <p className="mt-4 leading-7 text-ink/70">
              This area focuses on authentic assessment approaches that promote academic integrity, transparency, and
              trustworthy evaluation. Future updates may include related publications, practical guides, downloadable
              materials, and further reading.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["Authentic assessment", "Designing assessment approaches that support meaningful learning and evaluation."],
            ["Academic integrity", "Clarifying expectations around authorship, transparency, and responsible AI use."],
            ["Trustworthy evaluation", "Strengthening rubrics, feedback, and quality assurance practices."]
          ].map(([title, text]) => (
            <div key={title} className="rounded-md border border-line bg-paper p-5">
              <h2 className="font-serif text-2xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{text}</p>
            </div>
          ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
