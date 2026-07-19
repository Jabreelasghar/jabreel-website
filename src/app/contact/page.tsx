import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Contact", description: "Contact Dr Jabreel Asghar regarding research collaboration, invited talks, workshops, assessment consultancy, and AI governance in higher education.", path: "/contact" });

const profileLinks = [
  {
    label: "ORCID",
    href: "https://orcid.org/0000-0002-1903-6826"
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=5wlwvjEAAAAJ&hl=en"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jabreel1/"
  }
];

export default function ContactPage() {
  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Contact"
          title="Academic collaboration and professional enquiries"
          summary="I welcome enquiries related to research collaboration, invited talks, faculty development, assessment consultancy, and AI governance in higher education."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-md border border-line bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Contact information
            </h2>

            <div className="mt-5 space-y-5 text-sm leading-6 text-ink/70">
              <div>
                <p className="font-medium text-ink">Email</p>
                <a
                  className="mt-1 inline-block underline underline-offset-4"
                  href="mailto:Jabreel.Asghar@protonmail.com"
                >
                  Jabreel.Asghar@protonmail.com
                </a>
              </div>

              <div>
                <p className="font-medium text-ink">Location</p>
                <p className="mt-1">United Arab Emirates</p>
              </div>

              <div>
                <p className="font-medium text-ink">Response time</p>
                <p className="mt-1">
                  I normally respond to professional and academic enquiries
                  within three to five working days.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-md border border-line bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Academic profiles
            </h2>

            <div className="mt-5 grid gap-3">
              {profileLinks.map((profile) => (
                <a
                  key={profile.label}
                  className="button-primary justify-self-start"
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${profile.label} profile in a new tab`}
                >
                  {profile.label}
                </a>
              ))}
            </div>
          </article>
        </div>

        <section className="mt-8 rounded-md border border-line bg-ivory p-6">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Areas for collaboration
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-6 text-ink/70">
            I am interested in research and professional collaboration in AI
            governance in higher education, assessment integrity, academic
            writing, educational quality, applied linguistics, and critical
            discourse analysis.
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-6 text-ink/70">
            Enquiries may concern joint research, invited presentations,
            faculty workshops, assessment review, rubric development, policy
            consultation, peer review, or related academic work.
          </p>
        </section>
      </Container>
    </section>
  );
}
