import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Frameworks & Resources",
  description: "Research resources on responsible AI adoption, assessment integrity, and educational quality."
};

export default function ResourcesPage() {
  const resources = [
    {
      title: "Responsible AI in Higher Education",
      summary: "Research and practical perspectives on the responsible integration of generative AI into higher education.",
      href: "/ai-governance"
    },
    {
      title: "Assessment Integrity",
      summary: "Approaches to authentic assessment, academic integrity, and trustworthy evaluation in AI-mediated learning.",
      href: "/assessment-integrity"
    },
    {
      title: "Educational Quality",
      summary: "Evidence-informed approaches to curriculum, assessment, and quality enhancement in higher education.",
      href: "/educational-quality"
    }
  ];

  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Research Resources"
          title="Frameworks, Guides, and Practical Resources"
          summary="This section brings together practical resources developed through my research and teaching to support responsible AI adoption, assessment integrity, and quality enhancement in higher education. Additional resources will be added as they become publicly available."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {resources.map((item) => (
            <article key={item.title} className="rounded-md border border-line bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">Overview</p>
              <h2 className="mt-3 text-xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{item.summary}</p>
              <Link className="button-primary mt-5" href={item.href}>
                Learn More
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
