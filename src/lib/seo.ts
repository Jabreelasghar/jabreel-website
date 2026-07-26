import type { Metadata } from "next";

export const SITE_NAME = "Dr Jabreel Asghar";
export const SITE_URL = "https://jabreelasghar-website.vercel.app";

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
  publishedTime,
  authors,
  keywords
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
  publishedTime?: string;
  authors?: string[];
  keywords?: string[];
}): Metadata {
  const common = { title, description, url: path, siteName: SITE_NAME, locale: "en_GB" };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    authors: authors?.map((name) => ({ name })),
    alternates: { canonical: path },
    openGraph:
      type === "article"
        ? { ...common, type: "article", ...(publishedTime ? { publishedTime } : {}), ...(authors ? { authors } : {}) }
        : { ...common, type: "website" }
  };
}
