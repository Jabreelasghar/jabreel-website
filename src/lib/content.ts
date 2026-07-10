import fs from "node:fs";
import path from "node:path";
import type { ContentItem, ContentKind } from "./types";

const contentDirs: Record<ContentKind, string> = {
  publication: "publications",
  resource: "resources",
  insight: "insights",
  teaching: "teaching"
};

const contentRoot = path.join(process.cwd(), "content");

function parseValue(value: string): string | string[] | boolean {
  const trimmed = value.trim();

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return trimmed.replace(/^["']|["']$/g, "");
}

function parseFrontMatter(raw: string): Omit<ContentItem, "slug" | "body"> & { body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return {
      title: "Untitled",
      summary: "",
      tags: [],
      body: raw.trim()
    };
  }

  const data: Record<string, string | string[] | boolean> = {};

  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1);
    data[key] = parseValue(value);
  }

  return {
    title: String(data.title ?? "Untitled"),
    date: data.date ? String(data.date) : undefined,
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags : [],
    type: data.type ? String(data.type) : undefined,
    venue: data.venue ? String(data.venue) : undefined,
    author: data.author ? String(data.author) : undefined,
    downloadUrl: data.downloadUrl ? String(data.downloadUrl) : undefined,
    externalUrl: data.externalUrl ? String(data.externalUrl) : undefined,
    featured: Boolean(data.featured),
    body: match[2].trim()
  };
}

export function getContent(kind: ContentKind): ContentItem[] {
  const dir = path.join(contentRoot, contentDirs[kind]);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const parsed = parseFrontMatter(raw);

      return {
        slug: file.replace(/\.mdx?$/, ""),
        ...parsed
      };
    })
    .sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));
}

export function getContentItem(kind: ContentKind, slug: string): ContentItem | undefined {
  return getContent(kind).find((item) => item.slug === slug);
}

export function getFeatured(kind: ContentKind, limit = 3): ContentItem[] {
  const items = getContent(kind);
  const featured = items.filter((item) => item.featured);

  return (featured.length ? featured : items).slice(0, limit);
}
