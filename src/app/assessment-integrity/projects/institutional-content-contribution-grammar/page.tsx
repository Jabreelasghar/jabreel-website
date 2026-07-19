import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Institutional Content Contribution — Grammar",
  description:
    "Curriculum-aligned grammar learning resources supporting foundation-level academic language development within a collaborative institutional project."
};

const principles = [
  ["Curriculum Alignment", "Grammar content reflected institutional learning outcomes and programme expectations."],
  ["Clarity and Accessibility", "Explanations and examples were written for foundation-level learners using clear, consistent language."],
  ["Progressive Learning", "Resources moved from explanation and guided practice towards meaningful application."],
  ["Reusable Resource Design", "Materials were designed for use across multiple courses and teaching contexts."],
  ["Institutional Consistency", "Content followed shared instructional conventions to support a common learning experience."],
  ["Pedagogical Simplicity", "Grammar rules were presented without unnecessary complexity while maintaining linguistic accuracy."]
];

const professionalLearning = [
  ["Writing for Shared Use", "Developing resources intended for multiple instructors rather than a single class."],
  ["Balancing Accuracy and Simplicity", "Presenting grammar clearly while maintaining linguistic precision."],
  ["Curriculum Consistency", "Supporting common instructional expectations across programmes."],
  ["Reusable Learning Resources", "Designing materials that remain useful across multiple teaching cycles."]
];

const artefacts = [
  ["Grammar Learning Resource", "A representative grammar lesson illustrating explanation, examples and structured practice."],
  ["Practice Activity Sequence", "Examples showing progression from controlled exercises to independent language use."],
  ["Resource Design Template", "The instructional structure used to maintain consistency across grammar resources."]
];

function ProjectSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate">{children}</div>
    </section>
  );
}

export default function InstitutionalContentContributionGrammarPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <Link className="mb-6 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/assessment-integrity">
            Assessment Integrity / Projects
          </Link>
          <SectionHeader
            eyebrow="Professional Practice Project"
            title="Institutional Content Contribution — Grammar"
            summary="Developed curriculum-aligned grammar learning resources supporting foundation-level academic language development within a collaborative institutional project."
          />
          <p className="mt-6 text-sm font-medium leading-6 text-moss">
            <span className="font-semibold uppercase tracking-[0.1em] text-slate">Focus:</span>{" "}
            Language Development • Curriculum Resources • Learning Design • Institutional Collaboration
          </p>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-14">
          <article className="max-w-4xl">
            <section className="pb-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Project Overview</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>This project documents my contribution to the development of grammar learning resources produced as part of an institutional initiative to support consistent academic language instruction across foundation programmes.</p>
                <p>Working within agreed curriculum and quality frameworks, I developed instructional content designed to strengthen students&apos; understanding of core grammatical structures while supporting a common approach to language development across multiple courses.</p>
                <p>The contribution included explanatory notes, worked examples, guided practice activities and review exercises covering key areas of English grammar for foundation-level learners.</p>
              </div>
            </section>

            <ProjectSection title="Professional Context">
              <p>Large foundation programmes rely on shared learning resources to promote consistency in teaching while allowing instructors flexibility in classroom delivery.</p>
              <p>This project contributed to a coordinated resource-development initiative by producing curriculum-aligned grammar materials suitable for use across different courses, instructors and student cohorts.</p>
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

            <ProjectSection title="Resource Development Process">
              <p className="border-l-4 border-moss bg-ivory px-5 py-4 font-semibold text-oxford">Curriculum Outcome → Grammar Focus → Examples → Guided Practice → Independent Practice → Review</p>
              <p>Each resource was structured around this progression to encourage gradual development from understanding to application.</p>
            </ProjectSection>

            <ProjectSection title="Professional Learning">
              <div className="grid gap-4 sm:grid-cols-2">
                {professionalLearning.map(([title, description]) => (
                  <article key={title} className="rounded-sm border border-line bg-ivory p-5">
                    <h3 className="text-lg font-semibold text-oxford">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{description}</p>
                  </article>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Outcome and Professional Value">
              <p>The project strengthened my experience of designing curriculum-aligned learning resources within a collaborative institutional environment.</p>
              <p>It also demonstrated the importance of balancing consistency, accessibility and pedagogical flexibility when producing shared instructional materials intended for use across multiple programmes.</p>
            </ProjectSection>

            <ProjectSection title="Selected Artefacts">
              <div className="grid gap-4 sm:grid-cols-2">
                {artefacts.map(([title, description]) => (
                  <article key={title} className="rounded-sm border border-line bg-ivory p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">Forthcoming</p>
                    <h3 className="mt-2 text-lg font-semibold text-oxford">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{description}</p>
                  </article>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Reflection">
              <p>Developing institutional learning resources differs from preparing materials for a single class. Resources must remain sufficiently clear, adaptable and curriculum-aligned to support a wide range of teaching contexts while maintaining consistent academic expectations.</p>
              <p>This project reinforced the importance of designing language-learning materials that can be reused across programmes without losing their educational purpose.</p>
            </ProjectSection>

            <ProjectSection title="Related Projects">
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-sm border border-line bg-ivory p-5">
                  <h3 className="text-lg font-semibold text-oxford">Professional Writing — Learning and Assessment Materials</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">A structured learning system combining component practice, assessment preparation and responsible resource development.</p>
                  <Link className="button-secondary mt-5" href="/assessment-integrity/projects/professional-writing-learning-assessment-materials">View Project</Link>
                </article>
                <article className="rounded-sm border border-line bg-ivory p-5">
                  <h3 className="text-lg font-semibold text-oxford">Future Thinking Skills — AI Learning Assistant</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">A course-specific ChatGPT learning assistant designed around guided inquiry and responsible AI use.</p>
                  <Link className="button-secondary mt-5" href="/assessment-integrity/projects/future-thinking-skills-ai-learning-assistant">View Project</Link>
                </article>
                <article className="rounded-sm border border-line bg-ivory p-5 sm:col-span-2">
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
