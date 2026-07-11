import Link from "next/link";
import { Container } from "./Container";

export function CTA() {
  return (
    <section className="border-t border-line bg-paper">
      <Container className="grid gap-5 py-7 md:grid-cols-[1.5fr_auto] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">Get in Touch</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-oxford">Let's Connect</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate">
            If you are interested in my research, publications, or teaching, or would like to discuss opportunities for
            academic collaboration, I welcome your enquiry.
          </p>
        </div>
        <Link className="button-primary justify-self-start md:justify-self-end" href="/contact">
          Contact Me
        </Link>
      </Container>
    </section>
  );
}
