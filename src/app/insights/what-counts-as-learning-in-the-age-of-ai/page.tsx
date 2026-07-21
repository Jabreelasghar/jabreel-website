import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import article from "@/data/what-counts-as-learning-in-the-age-of-ai.json";
import { createPageMetadata } from "@/lib/seo";

const wordCount = article.paragraphs.join(" ").trim().split(/\s+/).length;
const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

export const metadata: Metadata = createPageMetadata({
  title: article.title,
  description: article.description,
  path: "/insights/what-counts-as-learning-in-the-age-of-ai",
  type: "article",
  publishedTime: article.date
});

export default function WhatCountsAsLearningPage() {
  return (
    <article className="bg-paper">
      <Container className="py-14">
        <div className="mx-auto max-w-3xl">
          <Link className="text-sm font-semibold text-moss hover:text-oxford" href="/insights">
            Insights / What Counts in the Age of AI?
          </Link>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-brass">
            {article.category} · {article.series}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">{article.title}</h1>
          <p className="mt-5 text-xl leading-8 text-ink/70">{article.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-line py-4 text-sm text-slate">
            <span>By {article.author}</span>
            <time dateTime={article.date}>{article.displayDate}</time>
            <span>{readingTime}</span>
            <a className="font-semibold text-moss hover:text-oxford" href={article.pdf} target="_blank" rel="noopener noreferrer">
              Download as PDF
            </a>
          </div>
          <div className="mt-10 space-y-6 text-[1.0625rem] leading-8 text-ink/85">
            {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <footer className="mt-12 border-t border-line pt-7">
            <Link className="text-sm font-semibold text-moss hover:text-oxford" href="/insights">Back to Insights</Link>
            <p className="mt-5 text-sm leading-6 text-slate">This is the first editorial in the ten-part series, <em>{article.series}</em></p>
            <div className="mt-5 rounded-sm border border-line bg-ivory p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">Next editorial · Forthcoming</p>
              <p className="mt-2 font-semibold text-oxford">Why Universities Cannot Adapt to AI Overnight</p>
            </div>
          </footer>
        </div>
      </Container>
    </article>
  );
}
