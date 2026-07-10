import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Dr Jabreel Asghar | AI Governance and Assessment Integrity",
    template: "%s | Dr Jabreel Asghar"
  },
  description:
    "Research on AI governance, assessment integrity, academic writing, and higher education practice.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Dr Jabreel Asghar",
    description: "University lecturer and researcher in AI governance, assessment integrity, and higher education.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
