import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Frameworks and Resources", description: "Framework publications and supporting documents for AI governance, assessment integrity, and responsible AI use in higher education.", path: "/resources" });

type FrameworkPdf = {
  title: string;
  description: string;
  href: string;
};

const seriesResources: FrameworkPdf[] = [
  {
    title: "AI Governance Framework Series Overview",
    description:
      "An overview of the framework series and its focus on responsible AI governance, assessment integrity, and higher education practice.",
    href: "/frameworks/series-00-overview.pdf"
  },
  {
    title: "Read Me First",
    description:
      "A starting document that explains how to approach the AI Governance Framework Series and its supporting materials.",
    href: "/frameworks/series-01-read-me-first.pdf"
  },
  {
    title: "Framework Series Guide",
    description:
      "A guide to the structure of the framework series and the relationship between its individual documents.",
    href: "/frameworks/series-02-guide.pdf"
  },
  {
    title: "Suggested Citations",
    description:
      "Suggested citation formats for referencing the AI Governance Framework Series and related documents.",
    href: "/frameworks/series-03-suggested-citations.pdf"
  },
  {
    title: "License and Reuse",
    description:
      "License and reuse information for the AI Governance Framework Series and its supporting documents.",
    href: "/frameworks/series-04-license-and-reuse.pdf"
  },
  {
    title: "Framework Series Brochure",
    description:
      "A concise brochure introducing the framework series and its main areas of focus.",
    href: "/frameworks/series-05-brochure.pdf"
  }
];

const frameworks: FrameworkPdf[] = [
  {
    title: "From Assistance to Authorship",
    description:
      "A framework for considering the movement from AI assistance toward questions of authorship in academic work.",
    href: "/frameworks/framework-01-from-assistance-to-authorship.pdf"
  },
  {
    title: "AI-Integrated Assessment Integrity Lifecycle",
    description:
      "A lifecycle framework for connecting assessment integrity with AI use across stages of assessment design and evaluation.",
    href: "/frameworks/framework-02-assessment-integrity-lifecycle.pdf"
  },
  {
    title: "AI Disclosure Framework",
    description:
      "A framework for supporting transparent disclosure of AI use in academic and assessment contexts.",
    href: "/frameworks/framework-03-ai-disclosure-framework.pdf"
  },
  {
    title: "Oral Verification Toolkit",
    description:
      "A toolkit focused on oral verification as part of trustworthy assessment practice in AI-mediated learning environments.",
    href: "/frameworks/framework-04-oral-verification-toolkit.pdf"
  },
  {
    title: "Assessment Authenticity Checklist",
    description:
      "A checklist for reviewing assessment authenticity in relation to academic integrity and responsible AI use.",
    href: "/frameworks/framework-05-assessment-authenticity-checklist.pdf"
  },
  {
    title: "AI Risk-Level Matrix",
    description:
      "A matrix for considering levels of AI-related risk in assessment and higher education practice.",
    href: "/frameworks/framework-06-ai-risk-level-matrix.pdf"
  },
  {
    title: "Institutional AI Governance Guide",
    description:
      "A guide for connecting institutional AI governance with assessment integrity and responsible higher education practice.",
    href: "/frameworks/framework-07-institutional-ai-governance-guide.pdf"
  }
];

function FrameworkCard({ item }: { item: FrameworkPdf }) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-line bg-ivory p-5">
      <h3 className="text-xl font-semibold text-oxford">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate">{item.description}</p>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-slate/70">
        PDF · Version 1.0 · July 2026
      </p>
      <a
        className="button-primary mt-5"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${item.title} PDF in a new tab`}
      >
        Open PDF
      </a>
    </article>
  );
}

function FrameworkSection({ title, description, items }: { title: string; description: string; items: FrameworkPdf[] }) {
  return (
    <section className="mt-12 border-t border-line pt-8">
      <h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate">{description}</p>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <FrameworkCard key={item.href} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Frameworks"
          title="AI Governance Framework Series"
          summary="A collection of framework publications and supporting resources focused on responsible AI governance, assessment integrity, and higher education practice."
        />
        <p className="mt-6 max-w-4xl text-base leading-7 text-slate">
          The AI Governance Framework Series brings together seven complementary frameworks and supporting publications
          that provide a coherent approach to responsible AI governance in higher education assessment. The series
          combines conceptual foundations with practical implementation resources for educators, researchers, assessment
          designers, and institutional leaders.
        </p>
        <FrameworkSection
          title="Framework Series Resources"
          description="Overview documents, implementation guidance, citation information, licensing, and supporting publications for the framework series."
          items={seriesResources}
        />
        <FrameworkSection
          title="The Seven Frameworks"
          description="The core conceptual, operational, and institutional frameworks that make up the AI Governance Framework Series."
          items={frameworks}
        />
      </Container>
    </section>
  );
}
