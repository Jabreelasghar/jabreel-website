export type ContentKind = "publication" | "resource" | "insight" | "teaching" | "creativeWriting";

export type PublicationCategory = "journal-articles" | "books" | "book-reviews" | "research-in-progress";

export type ContentItem = {
  slug: string;
  title: string;
  date?: string;
  year?: string;
  summary: string;
  tags: string[];
  category?: string;
  type?: string;
  draft?: boolean;
  readingTime?: string;
  pdf?: string;
  language?: string;
  genre?: string;
  venue?: string;
  journal?: string;
  status?: string;
  doi?: string;
  publisherUrl?: string;
  publisher?: string;
  format?: string;
  link?: string;
  coverImage?: string;
  citation?: string;
  author?: string;
  downloadUrl?: string;
  externalUrl?: string;
  featured?: boolean;
  body: string;
};
