import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { MarkdownBody } from "@/lib/markdown";
import { getContent, getContentItem } from "@/lib/content";
import type { ContentItem } from "@/lib/types";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("publication").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentItem("publication", slug);
  return {
    title: item?.title ?? "Publication",
    description: item?.summary || undefined
  };
}

function itemLink(item: ContentItem): { href: string; label: string } | undefined {
  if (item.doi) return { href: `https://doi.org/${item.doi}`, label: `DOI: ${item.doi}` };
  if (item.publisherUrl) return { href: item.publisherUrl, label: "Publisher link" };
  if (item.link) return { href: item.link, label: "Publication link" };
  if (item.externalUrl) return { href: item.externalUrl, label: "Publication link" };

  return undefined;
}

export default async function PublicationDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = getContentItem("publication", slug);

  if (!item) notFound();

  const link = itemLink(item);
  const label = item.journal ?? item.publisher ?? item.status ?? item.venue ?? item.type ?? "Publication";

  return (
    <article className="bg-paper">
      <Container className="py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">{label}</p>
        <h1 className="mt-3 max-w-4xl font-serif text-5xl font-semibold text-ink">{item.title}</h1>
        {item.summary ? <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">{item.summary}</p> : null}
        {link ? (
          <a className="button-primary mt-7" href={link.href}>
            {link.label}
          </a>
        ) : null}
        <div className="mt-10 border-t border-line pt-8">
          <MarkdownBody body={item.body} />
        </div>
      </Container>
    </article>
  );
}
