import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Dr Jabreel Asghar | AI Governance and Digital Education",
    template: "%s | Dr Jabreel Asghar"
  },
  description:
    "Academic thought leadership on AI governance, assessment integrity, and digital education strategy in higher education.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Dr Jabreel Asghar",
    description: "AI governance researcher, university lecturer, and digital education strategist.",
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
