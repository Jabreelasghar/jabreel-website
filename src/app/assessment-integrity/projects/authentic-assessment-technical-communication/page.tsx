import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Authentic Assessment Design for Technical Communication",
  description:
    "A complete assessment package for a Technical English course combining authentic communication, constructive alignment, transparent criteria and structured learner support."
};

const principles = [
  ["Authentic Communication", "Students explain genuine IT topics to a non-technical audience rather than simply demonstrating subject knowledge."],
  ["Constructive Alignment", "Assessment tasks, learning outcomes, guidance materials and marking criteria were designed as an integrated package rather than independent documents."],
  ["Assessment Transparency", "Students receive explicit guidance, checklists and clearly defined assessment criteria before completing the task."],
  ["Scaffolded Learning", "Teacher guidance, student guidance, templates and planning tools support students throughout the assessment process."]
];

const workflow = [
  "Select an IT topic.",
  "Research the topic.",
  "Adapt technical content for a non-technical audience.",
  "Produce a short video-recorded presentation.",
  "Participate in a follow-up discussion board activity to extend learning and encourage peer interaction."
];

const deliverables = [
  {
    title: "Assessment Brief",
    description: "Complete assessment brief, learning outcomes, assessment criteria and implementation guidance.",
    href: "/downloads/technical-communication-assessment-brief-anonymised.pdf"
  },
  {
    title: "Rubric Extract",
    description: "Criterion-referenced rubric assessing clarity, technical terminology, audience adaptation and presentation delivery. I developed the initial rubric, which was subsequently proofread and reviewed by the Course Team Leader before implementation.",
    href: "/downloads/technical-communication-rubric-extract-anonymised.pdf"
  }
];

const features = [
  "Authentic communication task",
  "Audience adaptation",
  "Transparent assessment criteria",
  "Constructive alignment",
  "Scaffolded learner support",
  "Teacher implementation guidance",
  "Consistent assessment practice",
  "Integrated assessment ecosystem"
];

function ProjectSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate">{children}</div>
    </section>
  );
}

export default function AuthenticAssessmentTechnicalCommunicationPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <Link className="mb-6 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/assessment-integrity">
            Assessment Integrity / Projects
          </Link>
          <SectionHeader
            eyebrow="Professional Practice Project"
            title="Authentic Assessment Design for Technical Communication"
            summary="A complete assessment package developed for the Technical English (GED-200) course, including assessment specification, rubric, teacher guidance, student support materials and implementation resources."
          />
          <p className="mt-6 max-w-4xl text-base leading-7 text-slate">
            This project documents the design of an authentic assessment package developed for a Technical English course for IT students. The assessment required students to explain an IT-related topic to a non-technical audience through a short video-recorded presentation before extending their learning into an online discussion activity. The project demonstrates an integrated approach to assessment design that combines constructive alignment, authentic communication tasks, transparent assessment criteria, and structured learner support.
          </p>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-14">
          <article className="max-w-4xl">
            <section className="pb-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Project Overview</h2>
              <h3 className="mt-5 text-lg font-semibold text-oxford">Context</h3>
              <p className="mt-3 text-base leading-7 text-slate">
                The Technical English course aimed to develop students&apos; ability to communicate technical concepts clearly to audiences with limited technical knowledge. Rather than assessing technical knowledge alone, the assessment focused on students&apos; ability to adapt specialist information for non-specialists while using appropriate technical terminology accurately.
              </p>
            </section>

            <ProjectSection title="My Contribution">
              <p>I created the assessment materials and supporting learning resources, including:</p>
              <ul className="space-y-2 border-l-4 border-moss bg-ivory px-5 py-4">
                <li>Assessment specification</li>
                <li>Oral presentation task</li>
                <li>Student guidance materials</li>
                <li>Teacher guidance materials</li>
                <li>Presentation planning checklist</li>
                <li>Presentation templates</li>
                <li>Material-development guidance</li>
                <li>Initial assessment rubric</li>
              </ul>
              <p>The assessment rubric was subsequently proofread and reviewed by the Course Team Leader before implementation. Later edits made by others are not presented as my sole work.</p>
            </ProjectSection>

            <ProjectSection title="Design Principles">
              <p>The assessment was designed around four principles.</p>
              <div className="grid gap-4 pt-1 sm:grid-cols-2">
                {principles.map(([title, description]) => (
                  <article key={title} className="rounded-sm border border-line bg-ivory p-5">
                    <h3 className="text-lg font-semibold text-oxford">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{description}</p>
                  </article>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Assessment Workflow">
              <ol className="divide-y divide-line border-y border-line">
                {workflow.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-3 py-3">
                    <span className="font-semibold text-moss">{String(index + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </ProjectSection>

            <ProjectSection title="Project Deliverables">
              <p>The wider assessment package also included teacher guidance, student guidance, a presentation checklist, presentation templates and material-development guidance. The following anonymised extracts are available publicly.</p>
              <div className="grid gap-4 pt-1 sm:grid-cols-2">
                {deliverables.map((item) => (
                  <article key={item.href} className="flex flex-col rounded-sm border border-line bg-ivory p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">PDF</p>
                    <h3 className="mt-2 text-lg font-semibold text-oxford">{item.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-slate">{item.description}</p>
                    <a className="button-primary mt-5 self-start" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Open PDF: ${item.title}`}>
                      Open PDF
                    </a>
                  </article>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Assessment Features">
              <div className="grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature} className="rounded-sm border border-line bg-ivory px-4 py-3 text-sm font-semibold text-oxford">
                    {feature}
                  </div>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Reflection">
              <p>This project reinforced the importance of designing assessment as an integrated learning system rather than a standalone task. Student performance is influenced not only by the assessment itself but also by the quality of guidance, transparency of expectations, and alignment between learning activities and assessment criteria. The project demonstrated how structured support materials can improve assessment consistency while helping students develop communication skills that extend beyond the classroom.</p>
            </ProjectSection>

            <ProjectSection title="Related Case Study">
              <article className="rounded-sm border border-line bg-ivory p-5">
                <h3 className="text-xl font-semibold text-oxford">Assessment Design for Technical Communication to Non-Technical Audiences</h3>
                <p className="mt-3 text-sm leading-6 text-slate">This case study examines the rationale behind the assessment design decisions, including audience adaptation, rubric development, constructive alignment, and the use of authentic communication tasks.</p>
                <Link className="button-secondary mt-5" href="/assessment-integrity/technical-communication-assessment-design">
                  Read Case Study →
                </Link>
              </article>
            </ProjectSection>

            <Link className="mt-2 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/assessment-integrity">
              Back to Assessment Integrity
            </Link>
          </article>
        </Container>
      </section>
    </>
  );
}
