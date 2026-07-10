import Link from "next/link";
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Dr Jabreel Asghar</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-tight text-ink sm:text-6xl">
            Advancing Responsible AI, Assessment Integrity, and Quality in Higher Education
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/72">
            I research how higher education can integrate generative AI while preserving academic integrity, trustworthy
            assessment, and educational quality. My work combines AI governance, assessment design, discourse analysis,
            and digital education to develop practical frameworks that support responsible institutional practice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="button-primary" href="/publications">
              Explore My Research
            </Link>
            <Link className="button-secondary" href="/resources">
              Resources & Frameworks
            </Link>
          </div>
        </div>
        <div className="rounded-md border border-line bg-white p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["AI Governance", "Developing practical frameworks for the responsible integration of generative AI in higher education."],
              [
                "Assessment Integrity",
                "Designing authentic assessment approaches that promote academic integrity, transparency, and trustworthy evaluation."
              ],
              [
                "Educational Quality",
                "Supporting curriculum, assessment, and quality enhancement through evidence-informed educational practice."
              ],
              [
                "Research & Evidence",
                "Investigating AI-assisted academic writing, discourse, and higher education policy through applied research."
              ]
            ].map(([title, text]) => (
              <div key={title} className="min-h-36 rounded-sm border border-line bg-paper p-4">
                <p className="font-serif text-2xl font-semibold text-moss">{title}</p>
                <p className="mt-3 text-sm leading-6 text-ink/68">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-line pt-4 text-sm leading-6 text-ink/65">
            Research at the intersection of AI governance, assessment integrity, and higher education.
          </p>
        </div>
      </Container>
    </section>
  );
}
