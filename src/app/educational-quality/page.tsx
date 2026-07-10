import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Educational Quality",
  description: "Evidence-informed approaches to curriculum, assessment, and quality enhancement in higher education."
};

export default function EducationalQualityPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Educational Quality"
            title="Educational Quality"
            summary="Evidence-informed approaches to curriculum, assessment, and quality enhancement in higher education."
          />
        </Container>
      </section>
      <section className="bg-white">
        <Container className="py-14">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl font-semibold text-ink">Area of work</h2>
            <p className="mt-4 leading-7 text-ink/70">
              This area focuses on curriculum, assessment, and quality enhancement through evidence-informed educational
              practice. Future updates may include related publications, practical guides, downloadable materials, and
              further reading.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Curriculum", "Supporting curriculum design through evidence-informed educational practice."],
              ["Assessment", "Connecting assessment design with learning, integrity, and evaluation."],
              ["Quality enhancement", "Developing quality assurance practices that strengthen learning and teaching."]
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
