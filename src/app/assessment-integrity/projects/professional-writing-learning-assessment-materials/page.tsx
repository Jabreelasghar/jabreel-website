import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Professional Writing — Learning and Assessment Materials",
  description:
    "A professional writing curriculum-development project integrating audience awareness, workplace genres, scaffolded instruction and authentic assessment."
};

const principles = [
  ["Component-Based Learning", "Complex writing tasks are divided into smaller, teachable decisions before students complete the full genre."],
  ["Progressive Scaffolding", "Learning moves from model analysis and guided practice to independent writing and timed performance."],
  ["Authentic Assessment Alignment", "Activities reproduce the decisions, genres and constraints required in the formal assessment."],
  ["Deliberate Practice", "Short, repeated tasks develop fluency more effectively than occasional completion of whole documents."],
  ["Learner Self-Monitoring", "Checklists, sentence frames, model answers and peer review support students in evaluating their own work."],
  ["Responsible AI-Supported Design", "AI accelerated drafting and variation generation, while instructional judgement and quality assurance remained human responsibilities."]
];

const professionalLearning = [
  ["Designing for Component Mastery", "The project strengthened my use of short, focused practice before integrated task performance."],
  ["Connecting Learning and Assessment", "Each activity was designed to prepare students for an identifiable assessment decision rather than provide general language practice."],
  ["Developing Writing Fluency", "Repeated micro-writing tasks supported greater speed, confidence and control under timed conditions."],
  ["Designing Reusable Learning Systems", "The project strengthened my ability to organise related activities into coherent sequences that can be adapted, reviewed and reused across teaching cycles."]
];

const learningResources = [
  {
    title: "Professional Report Writing",
    description: "A structured sequence developing report structure, introductions, chart description, cross-chart analysis, conclusions, recommendations and timed report production.",
    items: ["Foundations and Report Structure", "Writing Introductions", "Describing Survey Data", "Describing Cost Data", "Writing Analysis", "Conclusions and Recommendations", "Fluency and Exam Preparation"]
  },
  {
    title: "Professional Social Media Writing",
    description: "A progressive sequence developing awareness of writer, audience, purpose, message and rhetorical appeals before guided, independent and timed production.",
    items: ["Audience, Purpose and Rhetorical Appeals", "Model Analysis", "Scaffolded Post Construction", "Independent Writing", "Timed Assessment Practice"]
  }
];

const selectedResources = [
  ["Professional Report Writing: Foundations", "A selected workbook introducing report structure, graphical findings and evidence-based recommendations."],
  ["Professional Report Writing: Fluency Builder", "A focused resource using repeated component practice, timed writing and peer review to develop assessment fluency."],
  ["Professional Social Media Writing: Foundations", "A learning resource introducing writer, audience, purpose, message and rhetorical appeals."],
  ["Professional Social Media Writing: Guided Practice", "A scaffolded sequence moving from model analysis to independent professional social media writing."]
];

function ProjectSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate">{children}</div>
    </section>
  );
}

export default function ProfessionalWritingLearningAssessmentMaterialsPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <Link className="mb-6 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/assessment-integrity">
            Assessment Integrity / Projects
          </Link>
          <SectionHeader
            eyebrow="Professional Practice Project"
            title="Professional Writing — Learning and Assessment Materials"
            summary="A structured learning system developed for Professional Written Communication, combining scaffolded report writing, social media communication and focused assessment preparation."
          />
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-14">
          <article className="max-w-4xl">
            <section className="pb-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Project Overview</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>This project documents the development of a connected suite of learning and assessment materials for LSC1103 Professional Written Communication. The resources were designed to prepare students for two assessed workplace-writing tasks: a professional report based on graphical data and a professional social media post shaped by audience, purpose, message and rhetorical appeal.</p>
                <p>Rather than asking students to complete full assessment tasks from the outset, the materials break each genre into smaller components. Students first analyse models, practise individual decisions and complete guided activities before moving to independent and timed production. The result is a coherent progression from understanding to fluency and assessment readiness.</p>
                <p>Artificial intelligence supported drafting, variation generation and activity production. Pedagogical sequencing, assessment alignment, task selection, quality assurance and final editorial judgement remained under instructor control.</p>
              </div>
            </section>

            <ProjectSection title="Professional Context">
              <p>Professional writing assessments often require students to manage several demands simultaneously: interpreting a scenario, identifying audience and purpose, organising information, selecting appropriate language and completing the task within a fixed time.</p>
              <p>For developing writers, repeated practice with complete tasks can conceal the specific source of difficulty. These materials were therefore designed around component practice. Report writing was divided into introductions, chart description, cross-chart analysis, conclusions and recommendations. Social media writing was organised around writer, audience, purpose, message and rhetorical appeal.</p>
              <p>This approach allowed students to practise one decision at a time before integrating those decisions into complete professional texts.</p>
            </ProjectSection>

            <ProjectSection title="Design Principles">
              <div className="grid gap-4 sm:grid-cols-2">
                {principles.map(([title, description]) => (
                  <article key={title} className="rounded-sm border border-line bg-ivory p-5">
                    <h3 className="text-lg font-semibold text-oxford">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{description}</p>
                  </article>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Professional Learning">
              <div className="grid gap-3 sm:grid-cols-2">
                {professionalLearning.map(([title, description]) => (
                  <article key={title} className="rounded-sm border border-line bg-ivory p-5">
                    <h3 className="text-lg font-semibold text-oxford">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{description}</p>
                  </article>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Learning Resources">
              <div className="space-y-6">
                {learningResources.map((resource) => (
                  <section key={resource.title} className="rounded-sm border border-line bg-ivory p-5">
                    <h3 className="font-serif text-2xl font-semibold text-oxford">{resource.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{resource.description}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {resource.items.map((item) => <li key={item} className="border-l-2 border-moss pl-3 text-sm leading-6 text-slate">{item}</li>)}
                    </ul>
                  </section>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Selected Resources">
              <p>Selected resources will be added after editorial review and removal of internal course references. Public downloads will represent the strongest examples of instructional sequencing and assessment preparation rather than the complete internal resource set.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {selectedResources.map(([title, description]) => (
                  <article key={title} className="rounded-sm border border-line bg-ivory p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">Forthcoming</p>
                    <h3 className="mt-2 text-lg font-semibold text-oxford">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{description}</p>
                  </article>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Reflection">
              <p>The most important design decision in this project was to stop treating repeated completion of whole reports as the main route to improvement. Students did not simply need more model texts or more complete practice tasks. They needed repeated opportunities to practise the individual decisions that make up successful professional writing.</p>
              <p>Breaking the report into introductions, chart descriptions, analysis and recommendations made those decisions visible and teachable. The same principle shaped the social media materials, where audience, purpose, message and appeal were taught separately before students produced complete posts.</p>
              <p>The project also demonstrated both the value and the limits of AI-supported resource development. AI made it possible to generate scenarios, examples and task variations efficiently. It did not determine the learning sequence, distinguish useful repetition from unnecessary volume, or judge whether an activity genuinely prepared students for assessment. Those remained pedagogical responsibilities.</p>
            </ProjectSection>

            <ProjectSection title="Related Projects">
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-sm border border-line bg-ivory p-5">
                  <h3 className="text-lg font-semibold text-oxford">English Skills for Business Students</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">Employability-focused learning design across career communication and workplace writing.</p>
                  <Link className="button-secondary mt-5" href="/assessment-integrity/projects/english-skills-business-employability">View Project</Link>
                </article>
                <article className="rounded-sm border border-line bg-ivory p-5">
                  <h3 className="text-lg font-semibold text-oxford">Authentic Assessment Design for Technical Communication</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">An integrated assessment package focused on communicating specialist content to non-technical audiences.</p>
                  <Link className="button-secondary mt-5" href="/assessment-integrity/projects/authentic-assessment-technical-communication">View Project</Link>
                </article>
              </div>
            </ProjectSection>

            <Link className="mt-2 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/assessment-integrity">Back to Assessment Integrity</Link>
          </article>
        </Container>
      </section>
    </>
  );
}
