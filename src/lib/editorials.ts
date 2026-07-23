import type { Metadata } from "next";
import catalogue from "@/data/editorials.json";
import { createPageMetadata } from "@/lib/seo";

export type EditorialStatus = "published" | "forthcoming";

export type Editorial = {
  series: string;
  seriesNumber: number;
  seriesTotal: number;
  slug: string;
  status: EditorialStatus;
  title: string;
  subtitle?: string;
  authorDisplayName?: string;
  citationAuthor?: string;
  publicationDate?: string;
  publicationYear?: number;
  displayDate?: string;
  description?: string;
  pdf?: string;
  canonicalUrl?: string;
  about?: string;
  paragraphs?: string[];
  category?: string;
  linkedinDiscussionUrl?: string;
};

export const editorials = (catalogue.editorials as Editorial[]).slice().sort(
  (a, b) => a.seriesNumber - b.seriesNumber
);

export function getEditorial(slug: string) {
  return editorials.find((editorial) => editorial.slug === slug);
}

export function getPublishedEditorial(slug: string) {
  const editorial = getEditorial(slug);
  return editorial?.status === "published" ? editorial : undefined;
}

export function getEditorialReadingTime(editorial: Editorial) {
  const wordCount = (editorial.paragraphs ?? []).join(" ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
}

export function getEditorialCitationParts(editorial: Editorial) {
  if (!editorial.publicationDate || !editorial.canonicalUrl || !editorial.citationAuthor || !editorial.authorDisplayName) return undefined;
  const date = new Date(`${editorial.publicationDate}T00:00:00Z`);
  const month = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(date);
  const sentenceCaseTitle = editorial.title.charAt(0).toUpperCase()
    + editorial.title.slice(1).toLowerCase().replace(/\bai\b/g, "AI");

  return {
    authorAndDate: `${editorial.citationAuthor} (${date.getUTCFullYear()}, ${month} ${date.getUTCDate()}).`,
    title: sentenceCaseTitle,
    site: `${editorial.authorDisplayName}.`,
    url: editorial.canonicalUrl
  };
}

export function getEditorialCitation(editorial: Editorial) {
  const citation = getEditorialCitationParts(editorial);
  return citation ? `${citation.authorAndDate} ${citation.title} ${citation.site} ${citation.url}` : "";
}

export function getEditorialReuseNotice(editorial: Editorial) {
  const year = editorial.publicationYear ?? (editorial.publicationDate ? new Date(`${editorial.publicationDate}T00:00:00Z`).getUTCFullYear() : new Date().getUTCFullYear());
  return `© ${year} ${editorial.authorDisplayName ?? "Dr Jabreel Asghar"}. This editorial may be shared or quoted with appropriate attribution. Substantial reproduction, adaptation, or commercial reuse requires permission.`;
}

export function getEditorialSeriesNote(editorial: Editorial) {
  return `This editorial is part ${editorial.seriesNumber} of the ten-part series ${editorial.series}`;
}

export function getEditorialSeriesPosition(editorial: Editorial) {
  return `Part ${editorial.seriesNumber} of ${editorial.seriesTotal} in the series ${editorial.series}`;
}

export function getEditorialNeighbours(editorial: Editorial) {
  const index = editorials.findIndex((item) => item.slug === editorial.slug);
  return {
    previous: index > 0 ? editorials[index - 1] : undefined,
    next: index >= 0 && index < editorials.length - 1 ? editorials[index + 1] : undefined
  };
}

export function createEditorialMetadata(editorial: Editorial): Metadata {
  return createPageMetadata({
    title: editorial.title,
    description: editorial.description ?? editorial.subtitle ?? editorial.title,
    path: `/insights/${editorial.slug}`,
    type: "article",
    publishedTime: editorial.publicationDate
  });
}
