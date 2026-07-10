import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Rethinking Assessment in the Age of Generative AI",
  description: "Exploring how assessment can evolve while preserving academic integrity and meaningful learning."
};

export default function RethinkingAssessmentGenerativeAiPage() {
  return (
    <>
      <article className="bg-paper">
        <Container className="py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">Featured Topic</p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl font-semibold text-ink">
            Rethinking Assessment in the Age of Generative AI
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">
            Exploring how assessment can evolve while preserving academic integrity and meaningful learning.
          </p>
          <div className="mt-10 max-w-3xl border-t border-line pt-8 text-base leading-8 text-ink/75">
            <p>
              This topic considers authentic assessment, academic integrity, transparency, and trustworthy evaluation in
              AI-mediated learning. Future updates may include related commentary, publications, practical resources, and
              further reading.
            </p>
          </div>
        </Container>
      </article>
      <CTA />
    </>
  );
}
