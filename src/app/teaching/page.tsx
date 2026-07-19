import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Teaching", description: "Teaching practice in learning design, authentic assessment, academic communication, and responsible AI in higher education.", path: "/teaching" });

const principles = [
  ["Authenticity", "Learning activities should resemble the forms of communication, judgement, and problem-solving students will encounter beyond the classroom."],
  ["Explicit Guidance", "Complex academic and professional tasks should be made visible through clear criteria, models, worked examples, and staged practice."],
  ["Assessment for Learning", "Assessment should not only measure performance. It should clarify standards, generate useful feedback, and support improvement."],
  ["Student Agency", "Students should be expected to make decisions, explain choices, reflect on their work, and retain responsibility for the final outcome."],
  ["Inclusive Participation", "Learning should account for linguistic diversity, different levels of confidence, and varied prior experience without lowering intellectual expectations."],
  ["Responsible AI Use", "AI should support explanation, questioning, feedback, and reflection without replacing authorship, judgement, or accountability."]
];

const practiceAreas = [
  ["Learning Design", "I design coherent learning sequences that move from explanation and modelling to guided practice, application, and reflection. My work includes classroom lessons, digital learning activities, professional writing materials, and AI-supported learning interactions."],
  ["Assessment Design", "I develop assessment briefs, rubrics, performance criteria, and verification processes intended to improve clarity, consistency, and alignment with course learning outcomes."],
  ["Academic and Professional Communication", "My teaching includes academic writing, report writing, presentation skills, research communication, technical communication, and professional writing for different audiences and purposes."],
  ["Responsible AI in Learning", "I explore how generative AI can be used without weakening authorship or independent thought. This includes prompt design, AI-supported questioning, disclosure, oral verification, reflective use, and clear limits on acceptable assistance."]
];

const projects = [
  {
    title: "Authentic Assessment Design for Technical Communication",
    summary: "A complete assessment package developed for a technical communication course, including task design, rubric development, alignment with course learning outcomes, and implementation within a course team.",
    focus: "Authentic assessment, rubric design, alignment, standardisation",
    artefacts: "Assessment brief • Rubric • CLO alignment",
    href: "/assessment-integrity/projects/authentic-assessment-technical-communication"
  },
  {
    title: "Professional Writing — Learning and Assessment Materials",
    summary: "A set of learning and assessment materials designed to help students produce professional reports and audience-aware digital communication through staged instruction, modelling, guided practice, and revision.",
    focus: "Learning design, professional writing, scaffolded practice",
    artefacts: "Report-writing sequence • Social-media writing activity • Assessment materials",
    href: "/assessment-integrity/projects/professional-writing-learning-assessment-materials"
  },
  {
    title: "Future Thinking Skills — AI Learning Assistant",
    summary: "An instructor-designed ChatGPT learning assistant used to support concept explanation, examples, guided questioning, and reflection while maintaining clear boundaries around student responsibility.",
    focus: "AI-supported learning, prompt design, student agency",
    artefacts: "AI prompt structure • Guided interaction sequence • Reflection prompts",
    href: "/assessment-integrity/projects/future-thinking-skills-ai-learning-assistant"
  },
  {
    title: "Institutional Content Contribution — Grammar",
    summary: "A contribution to shared grammar learning resources developed for institutional use, with attention to explanation, examples, structured practice, and consistency across materials.",
    focus: "Curriculum contribution, shared resources, instructional clarity",
    artefacts: "Explanatory notes • Contextualised examples • Structured practice",
    href: "/assessment-integrity/projects/institutional-content-contribution-grammar"
  }
];

const professionalLearning = [
  ["Advance HE Fellowship", "Recognition of professional practice in higher education teaching and learning."],
  ["Assessment and Verification", "Professional development in assessment, internal verification, quality assurance, and standards-based judgement."],
  ["Digital Learning", "Experience with Blackboard, Nearpod, interactive learning activities, and technology-supported teaching."],
  ["Responsible AI", "Ongoing development of frameworks, teaching approaches, and assessment practices for responsible AI use in higher education."]
];

function TeachingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate">{children}</div>
    </section>
  );
}

export default function TeachingPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Teaching"
            title="Designing learning, assessment, and responsible AI practice for higher education"
            summary="My teaching combines academic communication, learning design, authentic assessment, and responsible AI. I design structured experiences that clarify expectations, develop complex skills, provide usable feedback, and support application in academic and professional contexts."
          />
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-14">
          <article className="max-w-5xl">
            <section className="pb-10">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Teaching Approach</h2>
              <h3 className="mt-4 text-xl font-semibold text-oxford">Teaching as structured participation</h3>
              <div className="mt-4 max-w-4xl space-y-4 text-base leading-7 text-slate">
                <p>I see teaching as the design of conditions in which students can participate meaningfully in learning. This requires more than explaining content. It involves making expectations visible, breaking complex tasks into manageable stages, providing models and guided practice, and creating opportunities for feedback, reflection, and revision.</p>
                <p>My approach has developed through teaching academic English, professional communication, research skills, and future-oriented courses in multilingual higher education contexts. It is informed by applied linguistics, assessment practice, critical discourse analysis, and continued professional learning.</p>
              </div>
            </section>

            <TeachingSection title="Core Principles">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {principles.map(([title, text]) => <article key={title} className="rounded-sm border border-line bg-ivory p-5"><h3 className="text-lg font-semibold text-oxford">{title}</h3><p className="mt-3 text-sm leading-6 text-slate">{text}</p></article>)}
              </div>
            </TeachingSection>

            <TeachingSection title="Areas of Practice">
              <div className="grid gap-4 md:grid-cols-2">
                {practiceAreas.map(([title, text]) => <article key={title} className="rounded-sm border border-line bg-ivory p-5"><h3 className="text-xl font-semibold text-oxford">{title}</h3><p className="mt-3 text-sm leading-6 text-slate">{text}</p></article>)}
              </div>
            </TeachingSection>

            <TeachingSection title="Teaching in Practice">
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <article key={project.href} className="flex flex-col rounded-sm border border-line bg-ivory p-5">
                    <h3 className="text-xl font-semibold text-oxford">{project.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-slate">{project.summary}</p>
                    <p className="mt-3 text-xs leading-5 text-moss"><span className="font-semibold uppercase tracking-[0.1em] text-slate">Focus:</span> {project.focus}</p>
                    <p className="mt-2 text-[11px] leading-5 text-slate"><span className="font-semibold uppercase tracking-[0.08em]">Representative artefacts:</span> {project.artefacts}</p>
                    <Link className="mt-4 inline-block text-sm font-semibold text-moss hover:text-oxford" href={project.href}>View project</Link>
                  </article>
                ))}
              </div>
            </TeachingSection>

            <TeachingSection title="Assessment and Feedback">
              <h3 className="text-xl font-semibold text-oxford">Making standards visible</h3>
              <p>I use assessment briefs, criteria, exemplars, guided analysis, and structured rehearsal to make quality and expectations visible before final submission.</p>
              <p>Feedback focuses on manageable next steps that students can apply in revision, rehearsal, and future work.</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {["Criterion-referenced feedback", "Guided self-assessment", "Peer discussion", "Reflective prompts", "Revision and rehearsal", "Oral questioning"].map((item) => <div key={item} className="rounded-sm border border-line bg-ivory px-4 py-3 text-sm font-semibold text-oxford">{item}</div>)}
              </div>
            </TeachingSection>

            <TeachingSection title="AI in Teaching">
              <h3 className="text-xl font-semibold text-oxford">Support without substitution</h3>
              <p>Generative AI has created new possibilities for explanation, feedback, and personalised practice. It has also made it necessary to distinguish more carefully between assistance and authorship.</p>
              <p>In my teaching, AI may be used to explain concepts in alternative ways, generate examples for analysis, ask guided questions, support reflection, provide provisional feedback, and help students examine the quality of their own decisions.</p>
              <p>It should not be used to remove the intellectual work that an assessment is intended to develop or verify.</p>
              <p>This approach connects classroom practice with my wider work on AI disclosure, oral verification, assessment authenticity, and institutional governance.</p>
              <div className="flex flex-wrap gap-3 pt-1"><Link className="button-secondary" href="/ai-governance">Explore AI Governance</Link><Link className="button-secondary" href="/resources">View Assessment Integrity Frameworks</Link></div>
            </TeachingSection>

            <TeachingSection title="Research-Informed Teaching">
              <p>My research in applied linguistics and critical discourse analysis informs the way I teach language, evidence, argument, representation, and authorship.</p>
              <p>Rather than presenting writing as a neutral set of rules, I encourage students to consider how language positions writers and readers, how authority is constructed, how evidence is selected and framed, how disciplinary expectations shape communication, and how AI changes the conditions under which texts are produced and judged.</p>
              <ul className="space-y-2 border-l-4 border-moss bg-ivory px-5 py-4">
                {["How language positions writers and readers", "How authority is constructed", "How evidence is selected and framed", "How disciplinary expectations shape communication", "How AI changes the production and evaluation of texts"].map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p>This helps connect language instruction with critical thinking and academic judgement.</p>
            </TeachingSection>

            <TeachingSection title="Professional Development">
              <div className="grid gap-4 md:grid-cols-2">
                {professionalLearning.map(([title, text]) => <article key={title} className="rounded-sm border border-line bg-ivory p-5"><h3 className="text-lg font-semibold text-oxford">{title}</h3><p className="mt-3 text-sm leading-6 text-slate">{text}</p></article>)}
              </div>
            </TeachingSection>

            <TeachingSection title="Reflection">
              <p>My teaching has gradually moved from the delivery of content toward the design of learning systems. The most important shift has been recognising that clarity, challenge, feedback, and student responsibility must be designed together.</p>
              <p>This is particularly important in the context of generative AI. Students need support in using new tools, but they also need tasks that preserve judgement, authorship, and accountability. My current work therefore connects teaching more closely with assessment design, academic integrity, and responsible AI practice.</p>
            </TeachingSection>

            <section className="border-t border-line py-10">
              <div className="rounded-sm border border-line bg-ivory p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-semibold text-oxford">Teaching, assessment, and responsible AI</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate">My teaching practice is closely connected with my work in assessment integrity, AI governance, and academic communication.</p>
                <div className="mt-6 flex flex-wrap gap-3"><Link className="button-primary" href="/assessment-integrity">Explore Assessment Integrity</Link><Link className="button-secondary" href="/resources">View Frameworks</Link><Link className="button-secondary" href="/publications">Read Publications</Link></div>
              </div>
            </section>
          </article>
        </Container>
      </section>
    </>
  );
}
