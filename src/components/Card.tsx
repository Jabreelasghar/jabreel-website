import Link from "next/link";
import type { ContentItem } from "@/lib/types";

export function ContentCard({ item, href }: { item: ContentItem; href: string }) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-line bg-ivory p-5 transition hover:border-moss/50">
      <div className="flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-sm bg-mist px-2 py-1 text-xs font-medium text-moss">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-oxford">
        <Link href={href}>{item.title}</Link>
      </h3>
      {item.summary ? <p className="mt-3 flex-1 text-sm leading-6 text-slate">{item.summary}</p> : <div className="flex-1" />}
      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
        <span className="text-slate">{item.date ?? item.type ?? "Updated"}</span>
        <Link className="font-semibold text-moss hover:text-oxford" href={href}>
          Read more
        </Link>
      </div>
    </article>
  );
}

export function ResourceCard({ item }: { item: ContentItem }) {
  return (
    <article className="rounded-sm border border-line bg-ivory p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">{item.type ?? "Resource"}</p>
      <h3 className="mt-3 text-xl font-semibold text-oxford">{item.title}</h3>
      {item.summary ? <p className="mt-3 text-sm leading-6 text-slate">{item.summary}</p> : null}
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
