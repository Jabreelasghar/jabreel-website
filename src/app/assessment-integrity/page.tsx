import type { Metadata } from "next";
import { ContentCard } from "@/components/Card";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Assessment Integrity",
  description: "Assessment integrity resources and research for AI-mediated higher education."
};

export default function AssessmentIntegrityPage() {
  const items = [...getContent("resource"), ...getContent("insight")].filter((item) =>
    item.tags.includes("Assessment Integrity")
  );

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Assessment Integrity"
            title="Assessment design after generative AI"
            summary="A research-led space for rethinking trust, validity, feedback, student agency, and academic standards."
          />
        </Container>
      </section>
      <section className="bg-white">
        <Container className="grid gap-6 py-14 md:grid-cols-3">
          {[
            ["Design", "Assessment tasks that make learning visible and reduce brittle detection logic."],
            ["Integrity", "Transparent expectations for AI use, authorship, and evidence of process."],
            ["Capability", "Staff and student development for responsible, discipline-aware AI use."]
          ].map(([title, text]) => (
            <div key={title} className="rounded-md border border-line bg-paper p-5">
              <h2 className="font-serif text-2xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{text}</p>
            </div>
          ))}
        </Container>
      </section>
      <section className="border-y border-line bg-paper">
        <Container className="py-14">
          <SectionHeader title="Assessment integrity resources" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {items.map((item) => (
              <ContentCard
                key={item.slug}
                item={item}
                href={item.downloadUrl ? `/resources/${item.slug}` : `/insights/${item.slug}`}
              />
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
