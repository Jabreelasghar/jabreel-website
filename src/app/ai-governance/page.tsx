import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Governance in Higher Education",
  description:
    "Research, frameworks, and practical perspectives on responsible AI governance, assessment integrity, academic judgement, disclosure, and institutional practice in higher education.",
  path: "/ai-governance"
});

type Card = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

const coreAreas: Card[] = [
  {
    title: "Assessment Integrity",
    description: "Designing assessment that remains educationally valid and defensible in the presence of generative AI.",
    href: "/assessment-integrity",
    linkLabel: "Explore Assessment Integrity"
  },
  {
    title: "Responsible AI Adoption",
    description: "Examining how AI can support learning and academic work without displacing educational purpose or professional responsibility."
  },
  {
    title: "Policy and Institutional Practice",
    description: "Considering how institutional principles can be translated into clear expectations, workable processes, and consistent academic practice."
  },
  {
    title: "Professional Judgement",
    description: "Exploring the continuing role of educator expertise, contextual judgement, and accountability in AI-supported decision-making."
  },
  {
    title: "AI Literacy",
    description: "Supporting critical, transparent, and context-sensitive use of generative AI by students and educators.",
    href: "/teaching",
    linkLabel: "Explore Teaching"
  },
  {
    title: "Framework Development",
    description: "Creating practical tools that translate responsible AI principles into assessment, disclosure, verification, and governance processes.",
    href: "/resources",
    linkLabel: "Explore Frameworks"
  }
];

const progression = ["Research", "Frameworks", "Assessment Practice", "Institutional Guidance", "Professional Learning"];

const areasOfInquiry = [
  "Responsible AI in higher education",
  "AI and assessment integrity",
  "Authorship and AI disclosure",
  "Authentic assessment",
  "Oral verification",
  "Academic judgement",
  "Institutional AI governance",
  "AI literacy for educators and students",
  "Responsible assessment design",
  "Policy-to-practice implementation"
];

const guidingPrinciples: Card[] = [
  {
    title: "Educational purpose before technological novelty",
    description: "AI use should strengthen learning, assessment, and academic practice rather than become an end in itself."
  },
  {
    title: "Professional judgement remains essential",
    description: "AI can support analysis and decision-making, but responsibility remains with educators and institutions."
  },
  {
    title: "Transparency supports trust",
    description: "Clear expectations about AI use, disclosure, and verification support fairer and more defensible academic practice."
  },
  {
    title: "Governance must be implementable",
    description: "Policies have limited value unless they can be understood and applied consistently in teaching, assessment, and programme processes."
  },
  {
    title: "Innovation requires evidence",
    description: "Institutional responses to AI should be informed by educational research, critical evaluation, and observed consequences rather than technological enthusiasm alone."
  }
];

const relatedWork: Card[] = [
  {
    title: "Assessment Integrity",
    description: "Practical approaches to valid, authentic, and AI-aware assessment.",
    href: "/assessment-integrity",
    linkLabel: "View Assessment Integrity"
  },
  {
    title: "Frameworks",
    description: "Tools for disclosure, verification, assessment design, risk classification, and governance.",
    href: "/resources",
    linkLabel: "View Frameworks"
  },
  {
    title: "Publications",
    description: "Research on AI-assisted academic writing, legitimacy, discourse, and higher education.",
    href: "/publications",
    linkLabel: "View Publications"
  },
  {
    title: "Insights",
    description: "Editorial and reflective writing on AI, expertise, authorship, teaching, and learning.",
    href: "/insights",
    linkLabel: "View Insights"
  },
  {
    title: "Teaching",
    description: "Educational practice, course development, assessment work, and professional learning.",
    href: "/teaching",
    linkLabel: "View Teaching"
  }
];

function PageSection({
  title,
  children,
  className = ""
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-line py-10 first:border-t-0 first:pt-0 ${className}`}>
      <h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2>
      {children}
    </section>
  );
}

function CardGrid({ items, columns = "md:grid-cols-2 xl:grid-cols-3" }: { items: Card[]; columns?: string }) {
  return (
    <div className={`mt-6 grid gap-5 ${columns}`}>
      {items.map((item) => (
        <article key={item.title} className="flex h-full flex-col rounded-sm border border-line bg-ivory p-5">
          <h3 className="font-serif text-2xl font-semibold text-oxford">{item.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate">{item.description}</p>
          {item.href && item.linkLabel ? (
            <Link className="mt-5 text-sm font-semibold text-moss hover:text-oxford" href={item.href}>
              {item.linkLabel}
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export default function AiGovernancePage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-moss">AI Governance</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-oxford sm:text-5xl">
              Responsible AI in Higher Education
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate">
              Research, frameworks, and practical perspectives on governing the use of generative AI while preserving educational quality, assessment integrity, transparency, and institutional trust.
            </p>
            <p className="mt-5 max-w-4xl leading-7 text-slate">
              Generative AI affects higher education far beyond individual tools or isolated cases of academic misconduct. It raises questions about authorship, learning, assessment validity, curriculum design, institutional policy, professional judgement, and responsibility. This area of work examines how universities can respond through governance approaches that connect educational principles with practical implementation.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-14">
          <PageSection title="What AI Governance Means in Higher Education">
            <div className="mt-5 max-w-4xl space-y-4 leading-7 text-slate">
              <p>
                AI governance is not simply the regulation of technology. In higher education, it involves the principles, policies, processes, and professional practices through which institutions guide AI use while protecting academic standards, fairness, transparency, and educational purpose.
              </p>
              <p>
                Effective governance cannot remain at policy level. It must shape assessment design, educator decision-making, student expectations, AI literacy, disclosure practices, and programme-level implementation.
              </p>
            </div>
          </PageSection>

          <PageSection title="Core Areas of Work">
            <CardGrid items={coreAreas} />
          </PageSection>

          <PageSection title="From Principles to Practice">
            <p className="mt-4 max-w-4xl leading-7 text-slate">
              Responsible AI governance depends on movement between research, practical tools, educational implementation, and professional learning. The work presented across this website reflects these connected levels rather than treating policy, assessment, and teaching as separate concerns.
            </p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {progression.map((step, index) => (
                <li key={step} className="rounded-sm border border-line bg-ivory p-4">
                  <span className="text-xs font-semibold text-moss">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-semibold leading-6 text-oxford">{step}</p>
                </li>
              ))}
            </ol>
          </PageSection>

          <PageSection title="Current Areas of Inquiry">
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {areasOfInquiry.map((area) => (
                <li key={area} className="border-l-4 border-moss bg-ivory px-4 py-3 text-sm font-medium leading-6 text-slate">
                  {area}
                </li>
              ))}
            </ul>
          </PageSection>

          <PageSection title="Framework Collection">
            <p className="mt-4 max-w-4xl leading-7 text-slate">
              The framework collection provides practical resources for responsible AI implementation in higher education. It includes tools addressing assessment integrity, AI disclosure, oral verification, assessment authenticity, risk classification, and institutional governance.
            </p>
            <Link className="button-primary mt-6" href="/resources">
              Explore Framework Collection
            </Link>
          </PageSection>

          <PageSection title="Guiding Principles">
            <CardGrid items={guidingPrinciples} columns="md:grid-cols-2 xl:grid-cols-3" />
          </PageSection>

          <PageSection title="Related Work">
            <CardGrid items={relatedWork} columns="md:grid-cols-2 xl:grid-cols-3" />
          </PageSection>
        </Container>
      </section>
      <CTA />
    </>
  );
}
