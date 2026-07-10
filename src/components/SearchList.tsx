"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ContentItem } from "@/lib/types";

export function SearchList({
  items,
  basePath,
  placeholder = "Search by title, topic, or tag"
}: {
  items: ContentItem[];
  basePath: string;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim();
    if (!value) return items;

    return items.filter((item) =>
      [item.title, item.summary, item.type, item.venue, ...item.tags].join(" ").toLowerCase().includes(value)
    );
  }, [items, query]);

  return (
    <div>
      <label className="sr-only" htmlFor="content-search">
        Search
      </label>
      <input
        id="content-search"
        className="w-full rounded-md border border-line bg-white px-4 py-3 text-base text-ink outline-none ring-moss/20 placeholder:text-ink/40 focus:border-moss focus:ring-4"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="mt-6 grid gap-4">
        {filtered.map((item) => (
          <article key={item.slug} className="rounded-md border border-line bg-white p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink/55">
              {item.date ? <span>{item.date}</span> : null}
              {item.type ? <span>{item.type}</span> : null}
              {item.venue ? <span>{item.venue}</span> : null}
            </div>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              <Link href={`${basePath}/${item.slug}`}>{item.title}</Link>
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{item.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-sm bg-paper px-2 py-1 text-xs font-medium text-moss">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
