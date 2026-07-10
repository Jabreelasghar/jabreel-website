import { CTA } from "@/components/CTA";
import { ContentCard, ResourceCard } from "@/components/Card";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { getFeatured } from "@/lib/content";

export default function HomePage() {
  const resources = getFeatured("resource", 3);
  const insights = getFeatured("insight", 3);

  return (
    <>
      <Hero />
      <section className="bg-white">
        <Container className="grid gap-8 py-14 md:grid-cols-3">
          {[
            ["University lecturer", "Teaching and curriculum design grounded in digital education practice."],
            ["AI governance researcher", "Frameworks for responsible, institutionally credible AI adoption."],
            ["Digital education strategist", "Advice for leaders moving from experimentation to durable capability."]
          ].map(([title, text]) => (
            <div key={title} className="border-l-2 border-moss pl-5">
              <h2 className="font-serif text-2xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{text}</p>
            </div>
          ))}
        </Container>
      </section>
      <section className="border-y border-line bg-paper">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Featured frameworks"
            title="Practical tools for responsible AI-enabled education"
            summary="Replace these sample resources with Dr Asghar's own frameworks, checklists, and institutional guides."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {resources.map((item) => (
              <ResourceCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-white">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Insights"
            title="Research-informed commentary"
            summary="Short essays and briefings that translate academic evidence into usable institutional judgment."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {insights.map((item) => (
              <ContentCard key={item.slug} item={item} href={`/insights/${item.slug}`} />
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
