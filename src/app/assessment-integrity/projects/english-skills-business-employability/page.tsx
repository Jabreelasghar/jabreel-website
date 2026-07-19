import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "English Skills for Business Students",
  description: "An employability-focused Business English learning-design project integrating CV writing, cover letters, LinkedIn profiles, workplace memos, interactive learning and assessment scaffolding."
};

const artefactGroups = [
  { title: "Career Communication Sequence", items: [
    ["CV Writing — Interactive Lesson", "Interactive lesson using a job advertisement to help students identify employer needs, select relevant keywords and produce a job-specific CV.", "01-cv-writing-interactive-lesson.pdf"],
    ["CV Writing — Assignment Brief", "Authentic assessment requiring students to tailor a one-page CV to a specified vacancy and explain selected writing decisions.", "02-cv-writing-assignment.pdf"],
    ["Cover Letter — Interactive Lesson", "Guided lesson on purpose, audience, evidence, professional tone and the structure of an effective cover letter.", "03-cover-letter-interactive-lesson.pdf"],
    ["LinkedIn Profile — Assignment and Planning Worksheet", "Structured task connecting the student’s CV, professional summary, skills and experience to a coherent online professional identity.", "04-linkedin-profile-assignment-and-planning.pdf"]
  ]},
  { title: "Workplace Writing Sequence", items: [
    ["Memo Writing — Interactive Lesson", "Interactive lesson introducing memo purpose, audience, structure, tone and action-oriented workplace language through polls, analysis and practice.", "05-memo-writing-interactive-lesson.pdf"],
    ["Memo Writing — Planning Template", "A concise scaffold supporting students in organising the recipient, sender, date, subject, purpose and required action.", "06-memo-writing-template.pdf"]
  ]},
  { title: "Assessment Design", items: [
    ["Memo Assessment Rubric", "Analytic rubric assessing professional format, audience awareness, tone, clarity and language across defined performance levels.", "07-memo-assessment-rubric.pdf"]
  ]}
];

function ProjectSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-t border-line py-8"><h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2><div className="mt-4 space-y-4 text-base leading-7 text-slate">{children}</div></section>;
}

export default function EnglishSkillsBusinessEmployabilityPage() {
  return <>
    <section className="border-b border-line bg-ivory"><Container className="py-14">
      <Link className="mb-6 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/assessment-integrity">Assessment Integrity / Projects</Link>
      <SectionHeader eyebrow="Professional Practice Project" title="English Skills for Business Students — Employability-Focused Learning Design" summary="A connected set of Business English lessons, assessment tasks and learning resources designed to help students produce workplace and employability documents for realistic professional purposes. The project combines interactive instruction, authentic tasks and structured scaffolding across CV writing, cover letters, LinkedIn profiles and workplace memos." />
    </Container></section>
    <section className="bg-paper"><Container className="py-14"><article className="max-w-4xl">
      <section className="pb-8"><h2 className="font-serif text-3xl font-semibold text-oxford">Project at a Glance</h2><dl className="mt-5 divide-y divide-line border-y border-line">
        {[["Focus", "Employability • Business Communication • Authentic Assessment"], ["Contribution", "Learning Design • Assessment Design • Interactive Materials"], ["Context", "Undergraduate and foundation-level English communication"]].map(([term, detail]) => <div key={term} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-5"><dt className="text-sm font-semibold text-oxford">{term}</dt><dd className="text-sm leading-6 text-slate">{detail}</dd></div>)}
      </dl></section>

      <ProjectSection title="Project Context">
        <p>Students developing professional English need more than knowledge of document formats. They must understand how communication choices change according to purpose, audience and workplace context, and they need opportunities to apply these choices to realistic professional tasks.</p>
        <p>This project brought together several related areas of professional communication: analysing job advertisements, tailoring a CV, writing a cover letter, developing a LinkedIn profile and producing an internal workplace memo. I designed the materials as connected learning experiences rather than isolated writing exercises. They are now used within course delivery as teaching and assessment resources.</p>
      </ProjectSection>
      <ProjectSection title="Design Problem">
        <p>Traditional employability-writing activities can become formulaic. Students may reproduce a model CV or cover letter without understanding why particular information, keywords or language choices are appropriate.</p>
        <p>The design challenge was therefore to support students in making defensible communication decisions. Tasks needed to remain accessible to developing English users while still requiring attention to employer expectations, professional tone, audience, evidence and document purpose.</p>
      </ProjectSection>
      <ProjectSection title="My Contribution">
        <p>I independently designed and developed the interactive lessons, assessment tasks, planning resources, templates and rubric materials presented in this project.</p>
        <p>The work included selecting realistic workplace scenarios, structuring learning sequences, creating interactive activities, developing assessment instructions, designing student scaffolds and writing performance criteria. The materials were subsequently adopted for use as course materials, and the rubrics form part of current HCT assessment practice.</p>
      </ProjectSection>
      <ProjectSection title="Design Approach">
        <p>The materials use an analyse–decide–produce sequence.</p>
        <p>Students first examine a realistic workplace text or scenario, such as a job advertisement or organisational memo. They identify purpose, audience, tone, required content and relevant language. Guided questions, polls, matching exercises and short drafting activities then make these features visible.</p>
        <p>Students subsequently apply the same decisions to their own document. Planning worksheets and templates reduce unnecessary cognitive load, while assessment tasks require students to demonstrate that they can adapt content to a specific professional context rather than reproduce a general model.</p>
      </ProjectSection>
      <ProjectSection title="Learning Sequence">
        <p>The employability sequence begins with job-advertisement analysis. Students identify employer needs, role-specific language and appropriate professional tone before preparing a one-page CV for the advertised position.</p>
        <p>The cover-letter lesson extends this work by asking students to connect claims with evidence and explain their suitability without exaggeration. A five-part structure—opening, evidence, further evidence, fit and goodwill, and close—supports students in developing a coherent application.</p>
        <p>The LinkedIn task then asks students to transfer this professional identity across platforms. Students develop a job-aligned headline, summary, education, experience and skills sections while maintaining consistency with their CV.</p>
        <p>A parallel workplace-writing sequence introduces internal memos. Students examine how memo format, audience, urgency, action and professional language operate within organisational communication before drafting their own response.</p>
      </ProjectSection>
      <ProjectSection title="Assessment and Feedback">
        <p>The assessment materials emphasise communication decisions as well as the final document. For example, the CV task requires students to tailor a CV to a specific vacancy and explain selected keywords and writing choices.</p>
        <p>I designed the memo rubric to distinguish professional format and structure from audience, tone, clarity and language. The rubric is now part of HCT assessment practice and provides both students and assessors with explicit performance expectations across defined achievement levels.</p>
      </ProjectSection>
      <ProjectSection title="Institutional Adoption and Use">
        <p>The materials presented in this project were designed by me and are used as course materials within HCT.</p>
        <p>The interactive lessons, assessment instructions, templates and supporting resources have been incorporated into course delivery. The assessment rubrics are part of current HCT assessment practice and are used to evaluate student performance against defined expectations for professional format, audience awareness, tone, clarity and language.</p>
        <p>The memo-writing lesson was also reviewed positively by a course colleague and selected for inclusion in shared semester materials. A second lesson focusing on further practice and commonly used memo language was subsequently requested.</p>
      </ProjectSection>
      <ProjectSection title="Project Significance">
        <p>The project demonstrates an approach to Business English in which employability is embedded in teaching, learning and assessment rather than treated as a separate topic.</p>
        <p>Students work with recognisable professional genres, but the emphasis remains on judgement: selecting relevant information, adapting language to an audience, supporting claims with evidence and maintaining consistency across documents.</p>
        <p>The institutional use of the materials and rubrics also demonstrates that the project moved beyond individual classroom experimentation into established course practice.</p>
      </ProjectSection>
      <ProjectSection title="Supporting Artefacts">
        <p className="max-w-3xl">The selected artefacts illustrate the relationship between interactive instruction, authentic assessment, planning support and explicit evaluation criteria. They are presented as examples of learning and assessment design rather than as a complete course package.</p>
        <div className="space-y-8 pt-2">{artefactGroups.map(group => <section key={group.title}><h3 className="font-serif text-2xl font-semibold text-oxford">{group.title}</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{group.items.map(([title, description, file]) => <article key={file} className="flex flex-col rounded-sm border border-line bg-ivory p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">PDF</p><h4 className="mt-2 text-lg font-semibold leading-6 text-oxford">{title}</h4><p className="mt-3 flex-1 text-sm leading-6 text-slate">{description}</p><a className="button-primary mt-5 self-start" href={`/projects/english-skills-business/${file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open PDF: ${title}`}>Open PDF</a></article>)}</div></section>)}</div>
      </ProjectSection>
      <ProjectSection title="Confidentiality and Reuse">
        <p>The materials are presented as examples of professional practice designed by the author and used within HCT course delivery and assessment.</p>
        <p>Student work is not included. Internal correspondence and identifying staff information remain private. Materials are shared selectively and with attention to institutional confidentiality, intellectual property and responsible reuse.</p>
      </ProjectSection>
      <Link className="mt-2 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/assessment-integrity">Back to Assessment Integrity</Link>
    </article></Container></section>
  </>;
}
