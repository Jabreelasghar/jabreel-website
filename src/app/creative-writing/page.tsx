import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { getContent } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Creative Writing", description: "Creative writing by Dr Jabreel Asghar, including Urdu writing, short fiction, reflective prose, and literary work.", path: "/creative-writing" });

const groups = [
  { key: "English", label: "English" },
  { key: "Urdu", label: "\u0627\u0631\u062f\u0648" }
];

function languageDirection(language?: string) {
  return language === "Urdu" ? "rtl" : "ltr";
}

export default function CreativeWritingPage() {
  const items = getContent("creativeWriting");

  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Creative Writing"
          title="Creative Writing"
          summary="A secondary section for literary and non-academic writing, including Urdu writing, short fiction, reflective prose, and literary essays."
        />
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate">
          This section provides a dedicated space for creative and literary work. Full text will be added only where a
          finished piece is available for public presentation.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {groups.map((group) => {
            const groupedItems = items.filter((item) => item.language === group.key);

            return (
              <section key={group.key} className="border-t border-line pt-6" dir={languageDirection(group.key)}>
                <h2 className="font-serif text-3xl font-semibold text-oxford">{group.label}</h2>
                {groupedItems.length ? (
                  <div className="mt-5 divide-y divide-line border-y border-line">
                    {groupedItems.map((item) => {
                      const hasBody = Boolean(item.body.trim());

                      return (
                        <article key={item.slug} className="py-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-moss">{item.genre}</p>
                          <h3 className="mt-2 text-2xl font-semibold text-oxford">{item.title}</h3>
                          {item.romanizedTitle ? (
                            <p className="mt-1 text-sm font-semibold text-slate" dir="ltr">
                              {item.romanizedTitle}
                            </p>
                          ) : null}
                          <p className="mt-2 text-sm leading-6 text-slate">
                            {[item.year ?? item.date, item.status].filter(Boolean).join(" · ")}
                          </p>
                          {item.summary ? <p className="mt-3 text-sm leading-6 text-slate">{item.summary}</p> : null}
                          <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                            {hasBody ? (
                              <Link className="text-moss hover:text-oxford" href={`/creative-writing/${item.slug}`}>
                                Read book
                              </Link>
                            ) : null}
                            {item.link ? (
                              <a className="text-moss hover:text-oxford" href={item.link} target="_blank" rel="noopener noreferrer">
                                External record
                              </a>
                            ) : null}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-5 border-y border-line py-5 text-sm leading-6 text-slate" dir="ltr">
                    No public pieces are available in this grouping yet.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
