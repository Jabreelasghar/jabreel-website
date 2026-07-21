import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import article from "@/data/what-counts-as-learning-in-the-age-of-ai.json";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Insights", description: "Evidence-informed editorials examining how generative AI is reshaping learning, teaching, assessment, authorship, expertise, and institutional practice in higher education.", path: "/insights" });

const editorials = [
  article.title,
  "Why Universities Cannot Adapt to AI Overnight",
  "AI Didn’t Break Authorship—It Exposed It",
  "What Counts as Teaching in the Age of AI?",
  "What Counts as Expertise in the Age of AI?",
  "What Counts as Assessment in the Age of AI?",
  "What Counts as Critical Thinking in the Age of AI?",
  "What Counts as Creativity in the Age of AI?",
  "What Counts as Trust in the Age of AI?",
  "What Counts as Being Human in the Age of AI?"
];

export default function InsightsPage() {
  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader eyebrow="Insights" title="Insights, Editorials, and Commentary" summary="Evidence-informed editorials examining how generative AI is reshaping learning, teaching, assessment, authorship, expertise, and institutional practice in higher education." />
        <section className="mt-10 border-t border-line pt-8">
          <h2 className="font-serif text-3xl font-semibold text-oxford">What Counts in the Age of AI?</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate">This ten-part editorial series moves from immediate questions about learning and institutional response towards deeper questions about judgement, creativity, trust, and what remains distinctively human.</p>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {editorials.map((title, index) => {
              const published = index === 0;
              return (
                <article key={title} className={`grid gap-3 py-5 sm:grid-cols-[4rem_1fr_auto] sm:items-start ${published ? "bg-ivory px-4" : ""}`}>
                  <span className="text-sm font-semibold text-moss">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug text-oxford">{published ? <Link className="hover:text-moss" href="/insights/what-counts-as-learning-in-the-age-of-ai">{title}</Link> : title}</h3>
                    {published ? <p className="mt-2 text-sm leading-6 text-slate">{article.subtitle}</p> : null}
                    {published ? (
                      <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                        <Link className="text-moss hover:text-oxford" href="/insights/what-counts-as-learning-in-the-age-of-ai">Read editorial</Link>
                        <a className="text-moss hover:text-oxford" href={article.pdf} target="_blank" rel="noopener noreferrer">Download PDF</a>
                      </div>
                    ) : null}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">{published ? "Published" : "Forthcoming"}</span>
                </article>
              );
            })}
          </div>
        </section>
      </Container>
    </section>
  );
}
