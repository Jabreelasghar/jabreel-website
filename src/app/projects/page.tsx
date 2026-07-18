import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected higher-education projects in curriculum development, assessment design, learning design, and AI-supported educational innovation."
};

const projects = [
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
];

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Professional Practice"
            title="Projects"
            summary="Selected examples of curriculum development, assessment design, learning design, and AI-supported educational innovation in higher education. These projects reflect work undertaken within institutional quality-assurance processes and demonstrate practical approaches to course development, assessment, and student learning."
          />
          <p className="mt-5 max-w-4xl text-base leading-7 text-slate">
            Several projects incorporate customised AI-supported learning interactions designed to support formative
            practice while preserving assessment integrity and instructor authority.
          </p>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-14">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.title} className="flex h-full flex-col rounded-sm border border-line bg-ivory p-5">
                <h2 className="font-serif text-2xl font-semibold text-oxford">{project.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate">{project.description}</p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">Focus</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.focus.map((item) => (
                      <span key={item} className="rounded-sm bg-paper px-2 py-1 text-xs font-medium text-moss">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="mt-10 border-l-4 border-moss bg-ivory p-5">
            <p className="max-w-4xl text-sm leading-6 text-slate">
              Projects are presented in summary form. Course materials, assessment documents, and examples have been
              anonymised where appropriate to respect institutional confidentiality and intellectual property. Supporting
              artefacts are included only where they can be shared responsibly.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
