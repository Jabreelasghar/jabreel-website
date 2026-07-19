import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Future Thinking Skills Capstone — AI Learning Assistant",
  description:
    "A course-specific ChatGPT learning assistant supporting guided concept exploration, independent study and responsible AI literacy."
};

const principles = [
  ["Guided Concept Exploration", "Complex ideas were explored through staged questioning rather than one-step explanations."],
  ["Formative Use of AI", "The assistant supported practice, clarification and reflection but was not used to complete assessed work."],
  ["Instructor-Defined Boundaries", "The educational role, interaction structure and limits of the assistant were defined through instructor-authored instructions."],
  ["Reasoning Before Answers", "Students were encouraged to explain, justify and reconsider their thinking rather than accept generated responses passively."],
  ["Curriculum Alignment", "Concepts, terminology and interaction prompts were designed around course learning outcomes and teaching priorities."],
  ["Responsible AI Integration", "The project treated AI as a supervised learning resource rather than a substitute for teaching, assessment or academic judgement."]
];

const interactionStages = [
  ["Explain", "The assistant clarified the concept using accessible language and course-relevant terminology."],
  ["Example", "It demonstrated how the concept could appear in a practical or decision-making context."],
  ["Guided Questions", "Students were prompted to analyse the example, justify their interpretation and identify weaknesses in their reasoning."],
  ["Reflection", "The interaction concluded by asking students to summarise what changed in their understanding and where uncertainty remained."]
];

const professionalLearning = [
  ["Designing AI-Supported Learning", "The project strengthened my ability to define a productive educational role for generative AI within an existing curriculum."],
  ["Structuring Guided Inquiry", "It developed my use of staged questioning to support explanation, application and metacognitive reflection."],
  ["Setting Appropriate Boundaries", "The project clarified how AI tools can support learning without generating assessed responses or replacing instructor judgement."],
  ["Translating Policy into Practice", "It provided a practical example of responsible AI principles being applied through instructional design rather than policy statements alone."]
];

const artefacts = [
  ["AI Learning Assistant Design Notes", "A concise account of the learning problem, interaction structure, instructional boundaries and design decisions."],
  ["Guided Concept Interaction Example", "A selected example showing how the assistant moves from explanation to questioning and reflection."],
  ["Responsible Use Guidance", "A short student-facing guide explaining the intended role and limits of the assistant."]
];

function ProjectSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate">{children}</div>
    </section>
  );
}

export default function FutureThinkingSkillsAiLearningAssistantPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <Link className="mb-6 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/assessment-integrity">
            Assessment Integrity / Projects
          </Link>
          <SectionHeader
            eyebrow="Professional Practice Project"
            title="Future Thinking Skills Capstone — AI Learning Assistant"
            summary="Designed and implemented a course-specific ChatGPT learning assistant to support concept exploration, guided questioning and independent study while maintaining instructor oversight and assessment integrity."
          />
          <p className="mt-6 text-sm font-medium leading-6 text-moss">
            <span className="font-semibold uppercase tracking-[0.1em] text-slate">Focus:</span>{" "}
            Responsible AI • Learning Design • Prompt Design • AI Literacy
          </p>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-14">
          <article className="max-w-4xl">
            <section className="pb-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Project Overview</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>This project documents the design and implementation of a course-specific ChatGPT learning assistant for the Future Thinking Skills capstone course.</p>
                <p>The course introduced students to abstract concepts including cognitive bias, inference, decision-making and critical evaluation. These concepts often require repeated questioning, application and reflection rather than memorisation alone. The assistant was designed to extend learning beyond the classroom through structured explanation, guided inquiry and formative practice.</p>
                <p>It functioned as a learning-support tool rather than an assessment instrument. Curriculum decisions, learning boundaries, task design and academic judgement remained under instructor control.</p>
              </div>
            </section>

            <ProjectSection title="Professional Context">
              <p>Students in the capstone course were required to engage with concepts that can appear straightforward in definition but become difficult when applied to unfamiliar situations.</p>
              <p>Conventional explanations and worked examples were useful, but students could benefit from additional opportunities to question concepts, test their understanding and reflect on their reasoning at their own pace.</p>
              <p>A customised ChatGPT learning assistant was therefore configured to provide course-specific support while avoiding unrestricted answer generation or completion of assessed work.</p>
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

            <ProjectSection title="Interaction Design">
              <p>The assistant was structured around a staged interaction sequence that moved students from initial explanation to application and reflection.</p>
              <p className="border-l-4 border-moss bg-ivory px-5 py-4 font-semibold text-oxford">Explain → Example → Guided Questions → Reflection</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {interactionStages.map(([title, description]) => (
                  <article key={title} className="rounded-sm border border-line bg-ivory p-5">
                    <h3 className="text-lg font-semibold text-oxford">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{description}</p>
                  </article>
                ))}
              </div>
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
              <p>The project demonstrated how a customised generative AI assistant can be integrated into higher education as a structured learning resource rather than an assessment shortcut.</p>
              <p>It extended opportunities for concept exploration, guided questioning and independent practice beyond scheduled class time. Professionally, the project provided a concrete example of how responsible AI principles can be translated into a bounded instructional design.</p>
            </ProjectSection>

            <ProjectSection title="Selected Artefacts">
              <p>Selected evidence will be added after review of internal course references, student-facing instructions and responsible-use guidance.</p>
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
              <p>The project reinforced that creating a customised ChatGPT does not by itself constitute meaningful educational innovation. The central design task was deciding what kind of interaction would help students think more carefully without allowing the assistant to take over the intellectual work.</p>
              <p>The staged sequence of explanation, example, guided questioning and reflection gave the tool a defined pedagogical purpose. It also made the limits of the assistant clearer: it could provide further opportunities for practice and clarification, but it could not determine curriculum priorities, judge the quality of student learning or assume responsibility for assessment decisions.</p>
              <p>The project therefore became a practical exercise in responsible AI implementation. Its value lay not in building new AI technology, but in designing a controlled educational use of an existing generative system.</p>
            </ProjectSection>

            <ProjectSection title="Related Projects">
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-sm border border-line bg-ivory p-5">
                  <h3 className="text-lg font-semibold text-oxford">Professional Writing — Learning and Assessment Materials</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">A structured learning system combining component practice, assessment preparation and responsible AI-supported resource development.</p>
                  <Link className="button-secondary mt-5" href="/assessment-integrity/projects/professional-writing-learning-assessment-materials">View Project</Link>
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
