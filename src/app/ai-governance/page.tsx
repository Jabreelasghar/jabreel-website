import type { Metadata } from "next";
import { ContentCard } from "@/components/Card";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { getContent, getFeatured } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Governance",
  description: "Research and institutional frameworks for responsible AI governance in higher education."
};

export default function AiGovernancePage() {
  const resources = getContent("resource").filter((item) => item.tags.includes("AI Governance"));
  const insights = getFeatured("insight", 3);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-14">
          <SectionHeader
            eyebrow="AI Governance"
            title="Institutional AI governance for higher education"
            summary="A focused area for policy design, accountable adoption, risk review, staff capability, and evidence-informed implementation."
          />
        </Container>
      </section>
      <section className="bg-white">
        <Container className="grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-ink">Governance priorities</h2>
            <p className="mt-4 leading-7 text-ink/70">
              The work links university policy, learning design, assessment, and operational decision-making so that AI
              adoption remains accountable and educationally purposeful.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Principles and policy", "Risk and assurance", "Staff capability", "Evaluation and evidence"].map((item) => (
              <div key={item} className="rounded-md border border-line bg-paper p-5">
                <h3 className="font-semibold text-ink">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/68">Placeholder copy for Dr Asghar's approach and examples.</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-y border-line bg-paper">
        <Container className="py-14">
          <SectionHeader title="Related resources and insights" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[...resources, ...insights].slice(0, 6).map((item) => (
              <ContentCard
                key={`${item.title}-${item.slug}`}
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
