import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SearchList } from "@/components/SearchList";
import { SectionHeader } from "@/components/SectionHeader";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description: "Searchable publications, papers, and academic outputs by Dr Jabreel Asghar."
};

export default function PublicationsPage() {
  const publications = getContent("publication");

  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Publications"
          title="Research outputs and scholarly writing"
          summary="A searchable index for articles, conference papers, reports, and works in progress."
        />
        <div className="mt-8">
          <SearchList items={publications} basePath="/publications" placeholder="Search publications by title, venue, or tag" />
        </div>
      </Container>
    </section>
  );
}
