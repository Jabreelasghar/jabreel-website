import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Higher Education Lecturer and Researcher",
  description:
    "Higher education lecturer and researcher working in assessment integrity, responsible AI, academic communication, and applied linguistics.",
  sameAs: ["https://www.linkedin.com/in/jabreel1/", "https://orcid.org/0000-0002-1903-6826"],
  knowsAbout: [
    "Higher education assessment",
    "Assessment integrity",
    "Responsible artificial intelligence",
    "AI governance in higher education",
    "Academic writing",
    "Applied linguistics",
    "Critical discourse analysis"
  ]
};

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: "%s | Dr Jabreel Asghar"
  },
  description:
    "Research on AI governance, assessment integrity, academic writing, and higher education practice.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: "University lecturer and researcher in AI governance, assessment integrity, and higher education.",
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
