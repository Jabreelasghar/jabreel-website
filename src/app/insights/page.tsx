import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Editorials and academic commentary on AI governance, assessment integrity, academic writing, and higher education practice.",
  alternates: {
    canonical: "/insights"
  },
  openGraph: {
    title: "Insights",
    description:
      "Editorials and academic commentary on AI governance, assessment integrity, academic writing, and higher education practice."
  }
};

function formatDate(date?: string) {
  if (!date) return undefined;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export default function InsightsPage() {
  const insights = getContent("insight");

  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Insights"
          title="Insights, Editorials, and Commentary"
          summary="Research-informed commentary on AI governance, assessment integrity, academic writing, and higher education practice."
        />

        <div className="mt-8 divide-y divide-line border-y border-line">
          {insights.map((item) => (
            <article key={item.slug} className="grid gap-4 py-6 lg:grid-cols-[12rem_1fr_auto] lg:items-start">
              <div className="space-y-2 text-sm text-slate">
                <p className="font-semibold uppercase tracking-[0.14em] text-moss">
                  {item.category ?? item.type ?? "Insight"}
                </p>
                {item.date ? <p>{formatDate(item.date)}</p> : null}
                {item.readingTime ? <p>{item.readingTime}</p> : null}
              </div>
              <div>
                <h2 className="text-2xl font-semibold leading-snug text-oxford">
                  <Link href={`/insights/${item.slug}`}>{item.title}</Link>
                </h2>
                {item.summary ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate">{item.summary}</p> : null}
                {item.tags.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-sm bg-mist px-2 py-1 text-xs font-medium text-moss">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <Link className="text-sm font-semibold text-moss hover:text-oxford" href={`/insights/${item.slug}`}>
                Read insight
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
