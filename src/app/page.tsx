import { CTA } from "@/components/CTA";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { getContent, getFeatured } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  const featuredPublications = getFeatured("publication", 3).filter((item) => item.featured);
  const creativeWriting = getContent("creativeWriting");
  const publicationMeta = (item: (typeof featuredPublications)[number]) =>
    [
      ["Status", item.status],
      ["Type", "Journal Article"],
      ["Journal", item.journal],
      ["Year", item.year],
      ["DOI", item.doi]
    ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  const resources = [
    {
      title: "Responsible AI in Higher Education",
      summary: "Research and practical perspectives on the responsible integration of generative AI into higher education.",
      href: "/ai-governance",
      action: "Learn More"
    },
    {
      title: "Assessment Integrity",
      summary: "Approaches to authentic assessment, academic integrity, and trustworthy evaluation in AI-mediated learning.",
      href: "/assessment-integrity",
      action: "Learn More"
    },
    {
      title: "Educational Quality",
      summary: "Evidence-informed approaches to curriculum, assessment, and quality enhancement in higher education.",
      href: "/educational-quality",
      action: "Learn More"
    }
  ];

  return (
    <>
      <Hero />
      <section className="border-b border-line bg-paper">
        <Container className="py-8">
          <div className="grid border-y border-line md:grid-cols-3">
          {[
            [
              "Higher Education Teaching",
              "Teaching academic communication and supporting student learning through evidence-informed educational practice."
            ],
            [
              "AI Governance Research",
              "Researching responsible AI adoption, academic integrity, and institutional governance in higher education."
            ],
            [
              "Assessment & Quality",
              "Designing authentic assessments, rubrics, and quality assurance practices that strengthen learning and evaluation."
            ]
          ].map(([title, text]) => (
            <div key={title} className="py-5 md:border-r md:border-line md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <h2 className="text-base font-semibold text-oxford">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate">{text}</p>
            </div>
          ))}
          </div>
        </Container>
      </section>
      <section className="border-b border-line bg-ivory">
        <Container className="grid gap-8 py-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
          <SectionHeader
            eyebrow="Insights"
            title="Editorials and Commentary"
            summary="This section will publish evidence-informed editorials and commentary on AI in higher education, assessment integrity, academic writing, university teaching, and educational policy."
          />
          <article className="border-y border-line py-5">
            <p className="max-w-3xl text-sm leading-6 text-slate">
              The first editorial will be published soon. Planned topics are listed in the Insights section as
              forthcoming editorials until complete versions are approved for publication.
            </p>
            <Link className="mt-5 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/insights">
              View Insights
            </Link>
          </article>
        </Container>
      </section>
      {featuredPublications.length ? (
        <section className="border-b border-line bg-oxford text-white">
          <Container className="py-10">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                Featured Publications
              </p>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Selected Research Outputs
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70">
                Recent and selected publications drawn from verified publication records.
              </p>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              {featuredPublications.slice(0, 1).map((item) => {
                const link = item.doi ? `https://doi.org/${item.doi}` : item.publisherUrl;

                return (
                  <article key={item.slug} className="border-l-4 border-moss bg-white/5 p-6">
                    <div className="flex flex-wrap gap-2 text-xs text-white/76">
                      {publicationMeta(item).map(([label, value]) => (
                        <span key={label} className="border border-white/20 px-2 py-1">
                          <span className="font-semibold uppercase tracking-[0.12em] text-white/50">{label}</span>{" "}
                          <span className="font-medium">{value}</span>
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white">{item.title}</h3>
                    {item.journal ? <p className="mt-4 text-sm font-semibold text-white/75">{item.journal}</p> : null}
                    {item.summary ? <p className="mt-4 text-sm leading-6 text-white/70">{item.summary}</p> : null}
                    {link ? (
                      <a className="mt-6 inline-block text-sm font-semibold text-white underline underline-offset-4 hover:text-white/75" href={link}>
                        {item.doi ? `DOI: ${item.doi}` : "Publisher link"}
                      </a>
                    ) : null}
                  </article>
                );
              })}
              <div className="divide-y divide-white/15">
                {featuredPublications.slice(1).map((item) => {
                  const link = item.doi ? `https://doi.org/${item.doi}` : item.publisherUrl;

                  return (
                    <article key={item.slug} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap gap-2 text-xs text-white/68">
                        {publicationMeta(item).map(([label, value]) => (
                          <span key={label} className="border border-white/20 px-2 py-1">
                            <span className="font-semibold uppercase tracking-[0.12em] text-white/45">{label}</span>{" "}
                            <span className="font-medium">{value}</span>
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-white">{item.title}</h3>
                      {item.journal ? <p className="mt-2 text-sm text-white/70">{item.journal}</p> : null}
                      {item.summary ? <p className="mt-3 text-sm leading-6 text-white/65">{item.summary}</p> : null}
                      {link ? (
                        <a className="mt-3 inline-block text-sm font-semibold text-white underline underline-offset-4 hover:text-white/75" href={link}>
                          {item.doi ? `DOI: ${item.doi}` : "Publisher link"}
                        </a>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      ) : null}
      <section className="border-b border-line bg-ivory">
        <Container className="grid gap-10 py-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeader
            eyebrow="Research Resources"
            title="Frameworks, Guides, and Practical Resources"
            summary="This section brings together practical resources developed through my research and teaching to support responsible AI adoption, assessment integrity, and quality enhancement in higher education. Additional resources will be added as they become publicly available."
          />
          <div className="divide-y divide-line border-y border-line">
            {resources.map((item, index) => (
              <article key={item.title} className="grid gap-4 py-4 sm:grid-cols-[3rem_1fr_auto] sm:items-start">
                <span className="text-sm font-semibold text-moss">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-semibold text-oxford">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate">{item.summary}</p>
                </div>
                <Link className="text-sm font-semibold text-moss hover:text-oxford" href={item.href}>
                  {item.action}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="grid gap-10 py-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeader
            eyebrow="Creative Writing"
            title="Creative and Literary Work"
            summary="A secondary section for literary and non-academic writing, including Urdu writing, short fiction, reflective prose, and literary essays."
          />
          <div className="border-y border-line py-5">
            <p className="max-w-3xl text-sm leading-6 text-slate">
              This section provides a dedicated space for creative and literary work without changing the academic focus
              of the main site.
            </p>
            {creativeWriting.length ? (
              <div className="mt-5 divide-y divide-line border-t border-line">
                {creativeWriting.slice(0, 2).map((item) => (
                  <article key={item.slug} className="py-4" dir={item.language === "Urdu" ? "rtl" : "ltr"}>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-moss">{item.genre ?? "Creative Writing"}</p>
                    <h3 className="mt-2 text-xl font-semibold text-oxford">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate">
                      {[item.year ?? item.date, item.publisher].filter(Boolean).join(" · ")}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}
            <Link className="mt-5 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/creative-writing">
              View Creative Writing
            </Link>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
