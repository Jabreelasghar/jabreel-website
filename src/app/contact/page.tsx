import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Dr Jabreel Asghar for academic collaboration, speaking, workshops, and advisory work."
};

export default function ContactPage() {
  return (
    <section className="bg-paper">
      <Container className="grid gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeader
          eyebrow="Contact"
          title="Academic collaboration, speaking, and advisory enquiries"
          summary="Use this page for speaking invitations, workshop requests, research collaborations, media enquiries, and institutional advisory conversations."
        />
        <div className="rounded-md border border-line bg-white p-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">Enquiry details</h2>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            Replace the placeholder address with Dr Asghar's preferred contact email or connect this block to a form
            service such as Formspree, Basin, or a university-managed contact route.
          </p>
          <div className="mt-6 grid gap-4">
            <a className="button-primary justify-self-start" href="mailto:hello@example.com">
              hello@example.com
            </a>
            <p className="text-sm leading-6 text-ink/60">
              For speaking requests, include the event date, audience, format, location, and preferred topic.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
