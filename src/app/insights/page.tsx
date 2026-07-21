import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { editorials, getEditorialReadingTime } from "@/lib/editorials";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Insights", description: "Evidence-informed editorials examining how generative AI is reshaping learning, teaching, assessment, authorship, expertise, and institutional practice in higher education.", path: "/insights" });

export default function InsightsPage() {
  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader eyebrow="Insights" title="Insights, Editorials, and Commentary" summary="Evidence-informed editorials examining how generative AI is reshaping learning, teaching, assessment, authorship, expertise, and institutional practice in higher education." />
        <section className="mt-10 border-t border-line pt-8">
          <h2 className="font-serif text-3xl font-semibold text-oxford">What Counts in the Age of AI?</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate">This ten-part editorial series moves from immediate questions about learning and institutional response towards deeper questions about judgement, creativity, trust, and what remains distinctively human.</p>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {editorials.map((editorial) => {
              const published = editorial.status === "published";
              return (
                <article key={editorial.slug} className={`grid gap-3 py-5 sm:grid-cols-[4rem_1fr_auto] sm:items-start ${published ? "bg-ivory px-4" : ""}`}>
                  <span className="text-sm font-semibold text-moss">{String(editorial.seriesNumber).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug text-oxford">
                      {published ? <Link className="hover:text-moss" href={`/insights/${editorial.slug}`}>{editorial.title}</Link> : editorial.title}
                    </h3>
                    {published ? <p className="mt-2 text-sm leading-6 text-slate">{editorial.subtitle}</p> : null}
                    {published && editorial.publicationDate ? <p className="mt-2 text-xs text-slate">{editorial.displayDate} · {getEditorialReadingTime(editorial)}</p> : null}
                    {published ? (
                      <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                        <Link className="text-moss hover:text-oxford" href={`/insights/${editorial.slug}`}>Read editorial</Link>
                        {editorial.pdf ? <a className="text-moss hover:text-oxford" href={editorial.pdf} target="_blank" rel="noopener noreferrer">Download PDF</a> : null}
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
