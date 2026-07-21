import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description: "How this website uses private aggregate analytics to improve its content and resources.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <section className="bg-paper">
      <Container className="py-14">
        <SectionHeader
          eyebrow="Privacy"
          title="Website analytics and privacy"
          summary="A concise explanation of how aggregate traffic information is used to improve this website."
        />
        <div className="mt-10 max-w-3xl space-y-8 text-base leading-7 text-slate">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-oxford">Vercel Web Analytics</h2>
            <p className="mt-3">
              This website uses Vercel Web Analytics to understand aggregate traffic and page use. The private analytics dashboard provides information about overall visits, commonly viewed pages, referral sources, and general geographic and device information.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-oxford">How the information is used</h2>
            <p className="mt-3">
              Aggregate analytics help identify which pages and resources are useful and where the website can be improved. No visitor counts, page-view totals, download counts, or popularity rankings are displayed publicly.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
