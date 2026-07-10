import Link from "next/link";
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Academic insight platform</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-tight text-ink sm:text-6xl">
            AI governance, assessment integrity, and digital education strategy.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/72">
            Dr Jabreel Asghar helps universities make credible, evidence-informed decisions about artificial intelligence,
            responsible assessment, and the future of teaching and learning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="button-primary" href="/resources">
              Explore resources
            </Link>
            <Link className="button-secondary" href="/speaking-workshops">
              Speaking and workshops
            </Link>
          </div>
        </div>
        <div className="rounded-md border border-line bg-white p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Policy", "Institutional AI principles and review processes"],
              ["Practice", "Assessment design and academic integrity"],
              ["Capability", "Staff development and digital fluency"],
              ["Evidence", "Research translation for senior leaders"]
            ].map(([title, text]) => (
              <div key={title} className="min-h-36 rounded-sm border border-line bg-paper p-4">
                <p className="font-serif text-2xl font-semibold text-moss">{title}</p>
                <p className="mt-3 text-sm leading-6 text-ink/68">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-line pt-4 text-sm leading-6 text-ink/65">
            A research platform for leaders, educators, and policy teams navigating AI-mediated higher education.
          </p>
        </div>
      </Container>
    </section>
  );
}
