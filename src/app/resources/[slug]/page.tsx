import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { MarkdownBody } from "@/lib/markdown";
import { getContent, getContentItem } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("resource").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentItem("resource", slug);
  return {
    title: item?.title ?? "Resource",
    description: item?.summary
  };
}

export default async function ResourceDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = getContentItem("resource", slug);

  if (!item) notFound();

  return (
    <article className="bg-paper">
      <Container className="py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">{item.type ?? "Resource"}</p>
        <h1 className="mt-3 max-w-4xl font-serif text-5xl font-semibold text-ink">{item.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">{item.summary}</p>
        {item.downloadUrl ? (
          <a className="button-primary mt-7" href={item.downloadUrl} download>
            Download resource
          </a>
        ) : null}
        <div className="mt-10 border-t border-line pt-8">
          <MarkdownBody body={item.body} />
        </div>
      </Container>
    </article>
  );
}
