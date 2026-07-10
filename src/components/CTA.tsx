import Link from "next/link";
import { Container } from "./Container";

export function CTA() {
  return (
    <section className="border-y border-line bg-white">
      <Container className="grid gap-6 py-12 md:grid-cols-[1.5fr_auto] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">Engagements</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-ink">Invite a research-led conversation on AI and education.</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink/70">
            Available for keynotes, workshops, advisory sessions, and institutional strategy conversations.
          </p>
        </div>
        <Link className="button-primary justify-self-start md:justify-self-end" href="/contact">
          Contact Dr Asghar
        </Link>
      </Container>
    </section>
  );
}
