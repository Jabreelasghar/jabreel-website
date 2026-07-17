import fs from "node:fs";
import path from "node:path";
import type { ContentItem, ContentKind, PublicationCategory } from "./types";

const contentDirs: Record<ContentKind, string> = {
  publication: "publications",
  resource: "resources",
  insight: "insights",
  teaching: "teaching",
  creativeWriting: "creative-writing"
};

const contentRoot = path.join(process.cwd(), "content");
const publicationCategories: PublicationCategory[] = [
  "journal-articles",
  "books",
  "book-reviews",
  "research-in-progress"
];
type ContentFile = { file: string; category?: PublicationCategory };

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
    year: data.year ? String(data.year) : undefined,
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags : [],
    category: data.category ? String(data.category) : undefined,
    type: data.type ? String(data.type) : undefined,
    draft: Boolean(data.draft),
    readingTime: data.readingTime ? String(data.readingTime) : undefined,
    pdf: data.pdf ? String(data.pdf) : undefined,
    language: data.language ? String(data.language) : undefined,
    genre: data.genre ? String(data.genre) : undefined,
    venue: data.venue ? String(data.venue) : undefined,
    journal: data.journal ? String(data.journal) : undefined,
    status: data.status ? String(data.status) : undefined,
    doi: data.doi ? String(data.doi) : undefined,
    publisherUrl: data.publisher_url ? String(data.publisher_url) : undefined,
    publisher: data.publisher ? String(data.publisher) : undefined,
    format: data.format ? String(data.format) : undefined,
    link: data.link ? String(data.link) : undefined,
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    citation: data.citation ? String(data.citation) : undefined,
    author: data.author ? String(data.author) : undefined,
    downloadUrl: data.downloadUrl ? String(data.downloadUrl) : undefined,
    externalUrl: data.externalUrl ? String(data.externalUrl) : undefined,
    featured: Boolean(data.featured),
    body: match[2].trim()
  };
}

function publicationFiles(dir: string, category?: PublicationCategory): ContentFile[] {
  if (!fs.existsSync(dir)) return [];

  if (category) {
    const categoryDir = path.join(dir, category);

    if (!fs.existsSync(categoryDir)) return [];

    return fs
      .readdirSync(categoryDir)
      .filter((file) => file !== "README.md" && (file.endsWith(".md") || file.endsWith(".mdx")))
      .map((file) => ({ file: path.join(category, file), category }));
  }

  const nestedFiles = publicationCategories.flatMap((publicationCategory) =>
    publicationFiles(dir, publicationCategory)
  );

  const legacyFiles = fs
    .readdirSync(dir)
    .filter((file) => file !== "README.md" && (file.endsWith(".md") || file.endsWith(".mdx")))
    .map((file) => ({ file }));

  return [...nestedFiles, ...legacyFiles];
}

function sortContent(items: ContentItem[]): ContentItem[] {
  return items.sort((a, b) => {
    const aSort = a.year ?? a.date ?? "";
    const bSort = b.year ?? b.date ?? "";

    if (aSort !== bSort) return String(bSort).localeCompare(String(aSort));

    return a.title.localeCompare(b.title);
  });
}

export function getContent(kind: ContentKind): ContentItem[] {
  const dir = path.join(contentRoot, contentDirs[kind]);

  if (!fs.existsSync(dir)) return [];

  const files: ContentFile[] =
    kind === "publication"
      ? publicationFiles(dir)
      : fs
          .readdirSync(dir)
          .filter((file) => file !== "README.md" && (file.endsWith(".md") || file.endsWith(".mdx")))
          .map((file) => ({ file }));

  return sortContent(
    files.map(({ file, category }) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const parsed = parseFrontMatter(raw);

      return {
        slug: path.basename(file).replace(/\.mdx?$/, ""),
        category,
        ...parsed
      };
    }).filter((item) => !item.draft)
  );
}

export function getContentItem(kind: ContentKind, slug: string): ContentItem | undefined {
  return getContent(kind).find((item) => item.slug === slug);
}

export function getDraftContent(kind: ContentKind): ContentItem[] {
  const dir = path.join(contentRoot, contentDirs[kind]);

  if (!fs.existsSync(dir)) return [];

  const files: ContentFile[] =
    kind === "publication"
      ? publicationFiles(dir)
      : fs
          .readdirSync(dir)
          .filter((file) => file !== "README.md" && (file.endsWith(".md") || file.endsWith(".mdx")))
          .map((file) => ({ file }));

  return sortContent(
    files
      .map(({ file, category }) => {
        const raw = fs.readFileSync(path.join(dir, file), "utf8");
        const parsed = parseFrontMatter(raw);

        return {
          slug: path.basename(file).replace(/\.mdx?$/, ""),
          category,
          ...parsed
        };
      })
      .filter((item) => item.draft)
  );
}

export function getPublicationContent(category: PublicationCategory): ContentItem[] {
  const dir = path.join(contentRoot, contentDirs.publication);

  return sortContent(
    publicationFiles(dir, category).map(({ file, category: publicationCategory }) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const parsed = parseFrontMatter(raw);

      return {
        slug: path.basename(file).replace(/\.mdx?$/, ""),
        category: publicationCategory,
        ...parsed
      };
    })
  );
}

export function getFeatured(kind: ContentKind, limit = 3): ContentItem[] {
  const items = getContent(kind);
  const featured = items.filter((item) => item.featured);

  return (featured.length ? featured : items).slice(0, limit);
}
