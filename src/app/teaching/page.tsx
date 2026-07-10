import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Teaching",
  description: "Teaching, curriculum, and digital education materials by Dr Jabreel Asghar."
};

export default function TeachingPage() {
  const teaching = getContent("teaching");

  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Teaching"
          title="Teaching practice and learning design"
          summary="A home for modules, supervision areas, teaching resources, and reflective practice notes."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {teaching.map((item) => (
            <article key={item.slug} className="rounded-md border border-line bg-white p-6">
              <p className="text-sm font-semibold text-brass">{item.type ?? "Teaching material"}</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{item.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-sm bg-paper px-2 py-1 text-xs font-medium text-moss">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
