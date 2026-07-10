import { CTA } from "@/components/CTA";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import Link from "next/link";

export default function HomePage() {
  const resources = [
    {
      title: "Responsible AI in Higher Education",
      summary: "Research and practical perspectives on the responsible integration of generative AI into higher education.",
      href: "/ai-governance",
      action: "Learn More"
    },
    {
      title: "Assessment Integrity",
      summary: "Approaches to authentic assessment, academic integrity, and trustworthy evaluation in AI-mediated learning.",
      href: "/assessment-integrity",
      action: "Learn More"
    },
    {
      title: "Educational Quality",
      summary: "Evidence-informed approaches to curriculum, assessment, and quality enhancement in higher education.",
      href: "/educational-quality",
      action: "Learn More"
    }
  ];

  const insights = [
    {
      title: "Rethinking Assessment in the Age of Generative AI",
      summary: "Exploring how assessment can evolve while preserving academic integrity and meaningful learning.",
      href: "/insights/rethinking-assessment-generative-ai"
    },
    {
      title: "Responsible AI Governance in Higher Education",
      summary: "Examining the policies, practices, and institutional considerations that support responsible AI adoption.",
      href: "/insights/responsible-ai-governance-higher-education"
    },
    {
      title: "AI-Assisted Academic Writing: Challenges and Opportunities",
      summary:
        "Considering authorship, transparency, and educational implications of AI-assisted writing in higher education.",
      href: "/insights/ai-assisted-academic-writing"
    }
  ];

  return (
    <>
      <Hero />
      <section className="bg-white">
        <Container className="grid gap-8 py-14 md:grid-cols-3">
          {[
            [
              "Higher Education Teaching",
              "Teaching academic communication and supporting student learning through evidence-informed educational practice."
            ],
            [
              "AI Governance Research",
              "Researching responsible AI adoption, academic integrity, and institutional governance in higher education."
            ],
            [
              "Assessment & Quality",
              "Designing authentic assessments, rubrics, and quality assurance practices that strengthen learning and evaluation."
            ]
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
            eyebrow="Research Resources"
            title="Frameworks, Guides, and Practical Resources"
            summary="This section brings together practical resources developed through my research and teaching to support responsible AI adoption, assessment integrity, and quality enhancement in higher education. Additional resources will be added as they become publicly available."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {resources.map((item) => (
              <article key={item.title} className="rounded-md border border-line bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">Overview</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">{item.summary}</p>
                <Link className="button-primary mt-5" href={item.href}>
                  {item.action}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-white">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Research Insights"
            title="Ideas, Research, and Commentary"
            summary="Reflections on AI governance, assessment integrity, academic writing, and higher education informed by research, teaching, and professional practice."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {insights.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-md border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">Featured Topic</p>
                <h3 className="mt-4 text-xl font-semibold text-ink">
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink/70">{item.summary}</p>
                <Link className="mt-5 text-sm font-semibold text-moss hover:text-ink" href={item.href}>
                  View topic
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
