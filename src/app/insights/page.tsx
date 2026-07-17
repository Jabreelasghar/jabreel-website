import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { getDraftContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Forthcoming editorials and commentary on AI in higher education, assessment integrity, academic writing, university teaching, and educational policy.",
  alternates: {
    canonical: "/insights"
  },
  openGraph: {
    title: "Insights",
    description:
      "Forthcoming editorials and commentary on AI in higher education, assessment integrity, academic writing, university teaching, and educational policy."
  }
};

export default function InsightsPage() {
  const forthcomingOrder = [
    "What Counts as Learning in the Age of AI?",
    "AI Didn't Break Authorship—It Redefined It",
    "Why Universities Cannot Adapt to AI Overnight",
    "What Counts as Teaching in the Age of AI?",
    "What Counts as Expertise in the Age of AI?"
  ];
  const forthcoming = getDraftContent("insight")
    .filter((item) => forthcomingOrder.includes(item.title))
    .sort((a, b) => forthcomingOrder.indexOf(a.title) - forthcomingOrder.indexOf(b.title));

  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Insights"
          title="Insights, Editorials, and Commentary"
          summary="This section will publish evidence-informed editorials and commentary on AI in higher education, assessment integrity, academic writing, university teaching, and educational policy."
        />

        <section className="mt-10 border-t border-line pt-8">
          <h2 className="font-serif text-3xl font-semibold text-oxford">Forthcoming Insights</h2>
          <div className="mt-5 divide-y divide-line border-y border-line">
            {forthcoming.map((item) => (
              <article key={item.slug} className="grid gap-3 py-5 sm:grid-cols-[12rem_1fr]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">Forthcoming Editorial</p>
                <h3 className="text-xl font-semibold leading-snug text-oxford">{item.title}</h3>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
}
