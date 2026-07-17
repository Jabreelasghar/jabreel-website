import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { getPublicationContent } from "@/lib/content";
import type { ContentItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Publications",
  description: "Selected publications and ongoing research by Dr Jabreel Asghar."
};

function itemLink(item: ContentItem): { href: string; label: string } | undefined {
  if (item.doi) return { href: `https://doi.org/${item.doi}`, label: `DOI: ${item.doi}` };
  if (item.publisherUrl) return { href: item.publisherUrl, label: "Publisher link" };
  if (item.link) return { href: item.link, label: "Publication link" };
  if (item.externalUrl) return { href: item.externalUrl, label: "Publication link" };

  return undefined;
}

function PublicationCard({ item, variant = "article" }: { item: ContentItem; variant?: "article" | "book" | "progress" }) {
  const link = itemLink(item);
  const meta =
    variant === "book"
      ? [item.format, item.publisher, item.year]
      : variant === "progress"
        ? [item.status, item.year]
        : [item.status, item.year];

  return (
    <article className="rounded-sm border border-line bg-ivory p-6">
      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate">
        {meta.filter(Boolean).map((value) => (
          <span key={value}>{value}</span>
        ))}
      </div>
      <h2 className="mt-3 text-2xl font-semibold text-oxford">{item.title}</h2>
      {item.journal ? <p className="mt-2 text-sm font-semibold text-moss">{item.journal}</p> : null}
      {item.summary ? <p className="mt-4 text-sm leading-6 text-slate">{item.summary}</p> : null}
      {item.tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-sm bg-mist px-2 py-1 text-xs font-medium text-moss">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
        <Link className="text-moss hover:text-oxford" href={`/publications/${item.slug}`}>
          Read summary
        </Link>
        {link ? (
          <a className="text-moss hover:text-oxford" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ) : null}
      </div>
    </article>
  );
}

function PublicationSection({
  title,
  items,
  variant = "article"
}: {
  title: string;
  items: ContentItem[];
  variant?: "article" | "book" | "progress";
}) {
  if (!items.length) return null;

  return (
    <section className="mt-12 border-t border-line pt-8">
      <h2 className="font-serif text-3xl font-semibold text-oxford">{title}</h2>
      <div className="mt-5 grid gap-5">
        {items.map((item) => (
          <PublicationCard key={item.slug} item={item} variant={variant} />
        ))}
      </div>
    </section>
  );
}

export default function PublicationsPage() {
  const journalArticles = getPublicationContent("journal-articles");
  const books = getPublicationContent("books");
  const bookReviews = getPublicationContent("book-reviews");
  const researchInProgress = getPublicationContent("research-in-progress");

  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Publications"
          title="Publications"
          summary="This page brings together selected publications and ongoing research relating to higher education, AI governance, assessment integrity, academic communication, and discourse analysis. The work reflects both published work and ongoing research that examines how emerging technologies are reshaping teaching, learning, assessment, and educational quality. Publications are presented with full bibliographic details and, where available, links to the published version, DOI, or publisher's webpage."
        />
        <PublicationSection title="Journal Articles" items={journalArticles} />
        <PublicationSection title="Books" items={books} variant="book" />
        <PublicationSection title="Book Reviews" items={bookReviews} />
        <PublicationSection title="Research in Progress" items={researchInProgress} variant="progress" />
      </Container>
    </section>
  );
}
