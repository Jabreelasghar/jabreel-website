import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

const stableDate = new Date("2026-07-19");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<[string, MetadataRoute.Sitemap[number]["changeFrequency"], number]> = [
    ["/", "weekly", 1], ["/about", "monthly", 0.9], ["/teaching", "monthly", 0.9],
    ["/assessment-integrity", "monthly", 0.9], ["/ai-governance", "monthly", 0.9],
    ["/resources", "monthly", 0.9], ["/publications", "monthly", 0.9],
    ["/insights", "weekly", 0.9], ["/contact", "yearly", 0.5],
    ["/insights/what-counts-as-learning-in-the-age-of-ai", "monthly", 0.7],
    ["/creative-writing", "monthly", 0.8], ["/educational-quality", "monthly", 0.8],
    ["/speaking-workshops", "monthly", 0.8],
    ["/assessment-integrity/ai-supported-reading-practice", "yearly", 0.7],
    ["/assessment-integrity/technical-communication-assessment-design", "yearly", 0.7],
    ["/assessment-integrity/projects/authentic-assessment-technical-communication", "yearly", 0.7],
    ["/assessment-integrity/projects/english-skills-business-employability", "yearly", 0.7],
    ["/assessment-integrity/projects/future-thinking-skills-ai-learning-assistant", "yearly", 0.7],
    ["/assessment-integrity/projects/institutional-content-contribution-grammar", "yearly", 0.7],
    ["/assessment-integrity/projects/professional-writing-learning-assessment-materials", "yearly", 0.7]
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map(([path, changeFrequency, priority]) => ({
    url: `${SITE_URL}${path}`, lastModified: stableDate, changeFrequency, priority
  }));
  const dynamic = [
    ...getContent("publication").map((item) => [`/publications/${item.slug}`, item.date ?? item.year]),
    ...getContent("insight").map((item) => [`/insights/${item.slug}`, item.date]),
    ...getContent("creativeWriting").map((item) => [`/creative-writing/${item.slug}`, item.date]),
    ...getContent("resource").map((item) => [`/resources/${item.slug}`, item.date])
  ] as Array<[string, string | undefined]>;

  for (const [path, date] of dynamic) {
    if (!entries.some((entry) => entry.url === `${SITE_URL}${path}`)) {
      entries.push({
        url: `${SITE_URL}${path}`,
        lastModified: date ? new Date(date) : stableDate,
        changeFrequency: path.startsWith("/insights/") ? "monthly" : "yearly",
        priority: path.startsWith("/resources/") ? 0.7 : 0.6
      });
    }
  }
  return entries;
}
