import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Assessment Integrity and Professional Practice",
  description:
    "Professional practice in assessment design, quality assurance, academic integrity, and trustworthy evaluation in higher education."
};

const principles = [
  ["Purposeful assessment", "Assessment should produce meaningful evidence of learning while remaining aligned with its educational purpose."],
  ["Transparent expectations", "Students and educators need clear expectations for authorship, process, feedback, and responsible AI use."],
  ["Trustworthy judgement", "Rubrics, standardisation, verification, and professional judgement support consistent and defensible decisions."]
];

type PracticeItem = {
  title: string;
  href?: string;
  description?: string;
  focus?: string[];
};

const practiceGroups: { title: string; items: PracticeItem[] }[] = [
  {
    title: "Case Studies",
    items: [
      {
        title: "Assessment Design for Technical Communication to Non-Technical Audiences",
        href: "/assessment-integrity/technical-communication-assessment-design"
      },
      {
        title: "Designing an AI-Supported Reading Practice Environment",
        href: "/assessment-integrity/ai-supported-reading-practice"
      }
    ]
  },
  {
    title: "Projects",
    items: [
      {
        title: "Technical English — Curriculum and Assessment Design",
        description:
          "Contributed to the design and development of a technical English course, including curriculum planning, assessment design, and learning materials. The project emphasised constructive alignment, authentic communication tasks, and transparent assessment.",
        focus: ["Curriculum Design", "Assessment Design", "Technical Communication"]
      },
      {
        title: "English Skills for Business Students — Employability-Focused Learning Design",
        description:
          "Designed learning activities and assessment materials to strengthen workplace communication and employability skills through authentic business scenarios and applied language use.",
        focus: ["Learning Design", "Employability", "Business Communication"]
      },
      {
        title: "Professional Writing — Learning and Assessment Materials",
        description:
          "Developed learning resources and assessment activities to support professional writing, audience awareness, and workplace communication across higher education contexts.",
        focus: ["Professional Writing", "Assessment", "Learning Resources"]
      },
      {
        title: "Future Thinking Skills Capstone — AI-Supported Concept Tutors",
        description:
          "Designed AI-supported learning activities to help students explore complex concepts through guided questioning while maintaining instructor oversight and assessment integrity.",
        focus: ["AI in Education", "Learning Design", "Responsible AI"]
      },
      {
        title: "Institutional Content Contribution — Grammar",
        description:
          "Developed institutional teaching materials supporting grammar instruction and language development for foundation-level learners.",
        focus: ["Language Development", "Learning Resources"]
      }
    ]
  },
  {
    title: "Teaching & Assessment Artefacts",
    items: [
      { title: "Assessment Brief Extract" },
      { title: "Rubric Extract" },
      { title: "AI Prompt Structure" },
      { title: "AI Reading Interaction" },
      { title: "Reflective Feedback Prompt" }
    ]
  }
];

const frameworks = [
  ["From Assistance to Authorship", "/frameworks/framework-01-from-assistance-to-authorship.pdf"],
  ["AI-Integrated Assessment Integrity Lifecycle", "/frameworks/framework-02-assessment-integrity-lifecycle.pdf"],
  ["AI Disclosure Framework", "/frameworks/framework-03-ai-disclosure-framework.pdf"],
  ["Oral Verification Toolkit", "/frameworks/framework-04-oral-verification-toolkit.pdf"],
  ["Assessment Authenticity Checklist", "/frameworks/framework-05-assessment-authenticity-checklist.pdf"],
  ["AI Risk-Level Matrix", "/frameworks/framework-06-ai-risk-level-matrix.pdf"],
  ["Institutional AI Governance Guide", "/frameworks/framework-07-institutional-ai-governance-guide.pdf"]
];

const publications = [
  {
    title: "Constructing Legitimacy in AI-Assisted Academic Writing",
    description: "Published research on responsibility, limitation, and disclosure in AI-assisted academic writing.",
    href: "/publications/constructing-legitimacy-ai-assisted-academic-writing"
  },
  {
    title: "HEAC-AI",
    description: "Research in preparation comparing scholarly authority in human-authored and AI-generated academic writing.",
    href: "/publications/heac-ai"
  }
];

function HubSection({
  title,
  introduction,
  children
}: {
  title: string;
  introduction: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-10 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate">{introduction}</p>
      {children}
    </section>
  );
}

export default function AssessmentIntegrityPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Assessment Integrity"
            title="Assessment Integrity and Professional Practice"
            summary="Assessment design, educational quality, academic integrity, and trustworthy evaluation in higher education."
          />
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-14">
          <HubSection
            title="Principles"
            introduction="A practice-led approach to assessment integrity begins with educational purpose, transparent expectations, and trustworthy academic judgement."
          >
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {principles.map(([title, description]) => (
                <article key={title} className="rounded-sm border border-line bg-ivory p-5">
                  <h3 className="font-serif text-2xl font-semibold text-oxford">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{description}</p>
                </article>
              ))}
            </div>
          </HubSection>

          <HubSection
            title="Assessment in Practice"
            introduction="Case studies, projects, and teaching and assessment artefacts from professional practice."
          >
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {practiceGroups.map((group) => (
                <article key={group.title} className="rounded-sm border border-line bg-ivory p-5">
                  <h3 className="font-serif text-2xl font-semibold text-oxford">{group.title}</h3>
                  <div className="mt-4 divide-y divide-line border-y border-line">
                    {group.items.map((item) => (
                      <div key={item.title} className="py-3">
                        {item.href ? (
                          <div>
                            <p className="text-sm font-medium leading-6 text-slate">{item.title}</p>
                            <Link className="mt-1 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-moss hover:text-oxford" href={item.href}>
                              View Case Study
                            </Link>
                          </div>
                        ) : (
                          <div>
                            <p className={`${item.description ? "font-semibold text-oxford" : "font-medium text-slate"} text-sm leading-5`}>
                              {item.title}
                            </p>
                            {item.description ? <p className="mt-2 text-xs leading-5 text-slate">{item.description}</p> : null}
                            {item.focus ? (
                              <p className="mt-2 text-[11px] font-medium leading-5 text-moss">
                                <span className="font-semibold uppercase tracking-[0.1em] text-slate">Focus:</span>{" "}
                                {item.focus.join(" • ")}
                              </p>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </HubSection>

          <HubSection
            title="Framework Collection"
            introduction="The existing framework series provides practical tools for assessment integrity, responsible AI use, authorship, disclosure, verification, and institutional practice."
          >
            <div className="mt-6 divide-y divide-line border-y border-line">
              {frameworks.map(([title, href], index) => (
                <article key={href} className="grid gap-3 py-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                  <span className="text-sm font-semibold text-moss">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold text-oxford">{title}</h3>
                  <a className="text-sm font-semibold text-moss hover:text-oxford" href={href} target="_blank" rel="noopener noreferrer">
                    Open PDF
                  </a>
                </article>
              ))}
            </div>
            <Link className="mt-6 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/resources">
              View the complete framework series
            </Link>
          </HubSection>

          <HubSection
            title="Publications"
            introduction="Selected research connected to academic writing, authorship, disclosure, and assessment integrity."
          >
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {publications.map((publication) => (
                <article key={publication.href} className="rounded-sm border border-line bg-ivory p-5">
                  <h3 className="text-xl font-semibold text-oxford">{publication.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{publication.description}</p>
                  <Link className="mt-5 inline-block text-sm font-semibold text-moss hover:text-oxford" href={publication.href}>
                    View publication
                  </Link>
                </article>
              ))}
            </div>
          </HubSection>

          <HubSection
            title="Resources"
            introduction="Practical materials for reviewing assessment design, learning evidence, authorship expectations, and responsible AI use."
          >
            <article className="mt-6 rounded-sm border border-line bg-ivory p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">Template</p>
              <h3 className="mt-2 text-xl font-semibold text-oxford">Assessment Integrity Audit Template</h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate">
                A structured audit template for evaluating assessment validity, authorship evidence, feedback design, and AI-use expectations.
              </p>
              <Link className="mt-5 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/resources/assessment-integrity-audit">
                View resource
              </Link>
            </article>
          </HubSection>

          <HubSection
            title="Current Development"
            introduction="Practice examples and supporting materials will be added when they can be presented with appropriate context and verification."
          >
            <div className="mt-6 border-l-4 border-moss bg-ivory p-5">
              <p className="max-w-3xl text-sm leading-6 text-slate">
                Current development is focused on preparing the six assessment-practice areas above for future case-based documentation. No project details or outcomes are presented before they are ready for publication.
              </p>
            </div>
          </HubSection>
        </Container>
      </section>
      <CTA />
    </>
  );
}
