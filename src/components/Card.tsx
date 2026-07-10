import Link from "next/link";
import type { ContentItem } from "@/lib/types";

export function ContentCard({ item, href }: { item: ContentItem; href: string }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-sm bg-paper px-2 py-1 text-xs font-medium text-moss">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-ink">
        <Link href={href}>{item.title}</Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-ink/70">{item.summary}</p>
      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
        <span className="text-ink/50">{item.date ?? item.type ?? "Updated"}</span>
        <Link className="font-semibold text-moss hover:text-ink" href={href}>
          Read more
        </Link>
      </div>
    </article>
  );
}

export function ResourceCard({ item }: { item: ContentItem }) {
  return (
    <article className="rounded-md border border-line bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">{item.type ?? "Resource"}</p>
      <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/70">{item.summary}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="button-primary" href={`/resources/${item.slug}`}>
          View resource
        </Link>
        {item.downloadUrl ? (
          <a className="button-secondary" href={item.downloadUrl} download>
            Download
          </a>
        ) : null}
      </div>
    </article>
  );
}
