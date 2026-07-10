import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Responsible AI Governance in Higher Education",
  description:
    "Examining the policies, practices, and institutional considerations that support responsible AI adoption."
};

export default function ResponsibleAiGovernanceHigherEducationPage() {
  return (
    <>
      <article className="bg-paper">
        <Container className="py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">Featured Topic</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl font-semibold text-ink">
            Responsible AI Governance in Higher Education
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">
            Examining the policies, practices, and institutional considerations that support responsible AI adoption.
          </p>
          <div className="mt-10 max-w-3xl border-t border-line pt-8 text-base leading-8 text-ink/75">
            <p>
              This topic focuses on responsible AI adoption, academic integrity, and institutional governance in higher
              education. Future updates may include related commentary, publications, practical resources, and further
              reading.
            </p>
          </div>
        </Container>
      </article>
      <CTA />
    </>
  );
}
