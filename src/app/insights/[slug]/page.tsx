import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { MarkdownBody } from "@/lib/markdown";
import { getContent, getContentItem } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

function publicFileExists(href?: string) {
  if (!href || !href.startsWith("/")) return false;

  return fs.existsSync(path.join(process.cwd(), "public", href.replace(/^\//, "")));
}

export function generateStaticParams() {
  return getContent("insight").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentItem("insight", slug);
  return {
    title: item?.title ?? "Insight",
    description: item?.summary,
    alternates: {
      canonical: item ? `/insights/${item.slug}` : "/insights"
    },
    openGraph: {
      title: item?.title ?? "Insight",
      description: item?.summary,
      type: "article",
      publishedTime: item?.date
    }
  };
}

export default async function InsightDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = getContentItem("insight", slug);

  if (!item) notFound();

  const hasPdf = publicFileExists(item.pdf);

  return (
    <article className="bg-paper">
      <Container className="py-14">
        <Link className="text-sm font-semibold text-moss hover:text-oxford" href="/insights">
          Back to Insights
        </Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-brass">
          {[item.type ?? "Insight", item.category, item.date].filter(Boolean).join(" · ")}
        </p>
        <h1 className="mt-3 max-w-4xl font-serif text-5xl font-semibold text-ink">{item.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">{item.summary}</p>
        {hasPdf ? (
          <a
            className="mt-6 inline-block text-sm font-semibold text-moss hover:text-oxford"
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download editorial as PDF
          </a>
        ) : null}
        <div className="mt-10 border-t border-line pt-8">
          <MarkdownBody body={item.body} />
        </div>
      </Container>
    </article>
  );
}
