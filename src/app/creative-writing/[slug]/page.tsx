import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getContent, getContentItem } from "@/lib/content";
import { MarkdownBody } from "@/lib/markdown";

type Params = { params: Promise<{ slug: string }> };

function isRtl(language?: string) {
  return language === "Urdu";
}

export function generateStaticParams() {
  return getContent("creativeWriting")
    .filter((item) => item.body.trim())
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentItem("creativeWriting", slug);

  return {
    title: item?.title ?? "Creative Writing",
    description: item?.summary,
    alternates: {
      canonical: item ? `/creative-writing/${item.slug}` : "/creative-writing"
    },
    openGraph: {
      title: item?.title ?? "Creative Writing",
      description: item?.summary
    }
  };
}

export default async function CreativeWritingDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = getContentItem("creativeWriting", slug);

  if (!item || !item.body.trim()) notFound();

  const rtl = isRtl(item.language);

  return (
    <article className="bg-paper">
      <Container className="py-14">
        <Link className="text-sm font-semibold text-moss hover:text-oxford" href="/creative-writing">
          Back to Creative Writing
        </Link>
        <div className="mt-6 max-w-4xl" dir={rtl ? "rtl" : "ltr"}>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">{item.genre ?? "Creative Writing"}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-ink">{item.title}</h1>
          {item.summary ? <p className="mt-5 text-lg leading-8 text-ink/70">{item.summary}</p> : null}
          <div className="mt-10 border-t border-line pt-8">
            <MarkdownBody body={item.body} />
          </div>
        </div>
      </Container>
    </article>
  );
}
