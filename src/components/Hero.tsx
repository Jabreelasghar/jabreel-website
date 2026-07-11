import Link from "next/link";
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="border-b border-line bg-ivory">
      <Container className="grid gap-8 py-9 lg:grid-cols-[minmax(0,3fr)_minmax(22rem,2fr)] lg:items-center lg:py-10">
        <div className="max-w-[720px]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">Dr Jabreel Asghar</p>
          <h1 className="mt-4 font-serif text-[2rem] font-semibold leading-tight text-oxford sm:text-[2.65rem] lg:text-[2.65rem]">
            Researching Responsible AI, Assessment Integrity, and Educational Quality in Higher Education
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate">
            I research how higher education can integrate generative AI while preserving academic integrity, trustworthy
            assessment, and educational quality. My work combines AI governance, assessment design, discourse analysis,
            and digital education to develop practical frameworks that support responsible institutional practice.
          </p>
          <div className="mt-4 flex max-w-2xl flex-wrap gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-[0.1em] text-slate">
            {["University Lecturer", "Fellow of Advance HE (FHEA)", "Applied Linguistics", "AI Governance", "Assessment Integrity"].map(
              (item) => (
                <span key={item} className="before:mr-2 before:text-moss before:content-['•']">
                  {item}
                </span>
              )
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="button-primary" href="/publications">
              Explore My Research
            </Link>
            <Link className="button-secondary" href="/resources">
              Resources & Frameworks
            </Link>
          </div>
        </div>
        <aside className="border-l border-line bg-paper p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">Research Priorities</p>
          <div className="mt-3 divide-y divide-line">
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
            ].map(([title, text], index) => (
              <div key={title} className="grid grid-cols-[2.1rem_1fr] gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="pt-0.5 text-xs font-semibold text-moss">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[15px] font-semibold leading-5 text-oxford">{title}</p>
                  <p className="mt-0.5 text-sm leading-5 text-slate">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 border-t border-line pt-3 text-sm leading-6 text-slate">
            Research at the intersection of AI governance, assessment integrity, and higher education.
          </p>
        </aside>
      </Container>
    </section>
  );
}
