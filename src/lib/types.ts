export type ContentKind = "publication" | "resource" | "insight" | "teaching";

export type ContentItem = {
  slug: string;
  title: string;
  date?: string;
  summary: string;
  tags: string[];
  type?: string;
  venue?: string;
  author?: string;
  downloadUrl?: string;
  externalUrl?: string;
  featured?: boolean;
  body: string;
};
