import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SearchList } from "@/components/SearchList";
import { SectionHeader } from "@/components/SectionHeader";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Searchable AI governance and digital education resources by Dr Jabreel Asghar."
};

export default function ResourcesPage() {
  const resources = getContent("resource");

  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Resources"
          title="Frameworks, checklists, and teaching tools"
          summary="Search practical resources designed for academic leaders, educators, and policy teams."
        />
        <div className="mt-8">
          <SearchList items={resources} basePath="/resources" placeholder="Search resources by topic, format, or tag" />
        </div>
      </Container>
    </section>
  );
}
