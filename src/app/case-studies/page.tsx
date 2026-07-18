import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Case studies in higher-education teaching, assessment design, educational quality, and academic communication."
};

const caseStudies = [
  {
    title: "Assessment Design for Technical Communication to Non-Technical Audiences",
    summary:
      "The design of an oral presentation assessment and analytical rubric focused on clear, accessible communication for a general audience.",
    href: "/case-studies/technical-communication-assessment-design",
    area: "Assessment Design"
  }
];

export default function CaseStudiesPage() {
  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Professional Practice"
          title="Case Studies"
          summary="Documented examples of teaching, assessment, educational quality, and academic communication in practice."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <article key={caseStudy.href} className="flex h-full flex-col rounded-sm border border-line bg-ivory p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">{caseStudy.area}</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-oxford">{caseStudy.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate">{caseStudy.summary}</p>
              <Link className="mt-5 text-sm font-semibold text-moss hover:text-oxford" href={caseStudy.href}>
                Read case study
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
