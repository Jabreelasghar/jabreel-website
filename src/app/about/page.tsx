import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description: "About Dr Jabreel Asghar, university lecturer and AI governance researcher."
};

export default function AboutPage() {
  const profileItems = [
    ["Role", "University lecturer, researcher, and assessment specialist"],
    ["Recognition", "Fellow of Advance HE (FHEA)"],
    ["Research Areas", "AI governance, assessment integrity, academic writing, educational quality"]
  ];

  return (
    <section className="bg-paper">
      <Container className="py-12 lg:py-14">
        <div className="border-b border-line pb-8">
          <SectionHeader
            eyebrow="About"
            title="Dr Jabreel Asghar"
            summary="University lecturer, researcher, and assessment specialist."
          />
        </div>
        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,760px)_minmax(16rem,22rem)] lg:items-start">
          <div className="prose-custom max-w-[760px]">
            <p>
              Dr Jabreel Asghar is a university lecturer, researcher, and assessment specialist whose work brings
              together higher education, academic communication, and responsible AI use. His research focuses on AI
              governance in higher education, assessment integrity, academic writing, and educational quality, with
              particular attention to how generative AI is reshaping authorship, transparency, and trustworthy
              evaluation.
            </p>
            <p>
              As a Fellow of Advance HE (FHEA), he combines research with sustained academic practice in teaching,
              curriculum, assessment design, and student learning. His work is concerned with the practical and
              institutional questions that arise when universities integrate AI into teaching and assessment while
              seeking to preserve academic standards and meaningful learning.
            </p>
            <p>
              This website presents his research, publications, teaching, and practical work in AI governance,
              assessment integrity, and higher education quality.
            </p>
            <h2>Research Focus</h2>
            <p>
              Dr Asghar's research examines how generative AI is reshaping higher education, with particular emphasis on
              AI governance, assessment integrity, academic writing, and educational quality. His work considers how
              universities can integrate AI responsibly while maintaining transparency, academic standards, and
              trustworthy approaches to teaching and assessment.
            </p>
            <p>
              A central strand of his research concerns assessment integrity, including authentic assessment design,
              student authorship, and the responsible evaluation of learning in AI-assisted educational contexts. His
              work on AI-assisted academic writing draws on discourse analysis to examine how emerging technologies are
              changing academic communication, knowledge construction, and expectations of scholarly authorship.
            </p>
            <p>
              Across these interconnected areas, his research seeks to develop evidence-informed approaches that enable
              higher education institutions to adopt AI responsibly while preserving the integrity, quality, and
              educational purpose of assessment and academic practice.
            </p>
            <h2>Teaching and Academic Practice</h2>
            <p>
              Dr Asghar teaches English and Academic Communication in higher education, with a particular interest in
              academic writing, critical thinking, and the development of students' communication skills. His teaching is
              informed by evidence-based approaches to curriculum design, assessment, and learning, with an emphasis on
              helping students meet the expectations of academic study.
            </p>
            <p>
              His academic practice extends beyond classroom teaching to the design of curricula, assessments, and
              learning activities that promote clarity, authenticity, and meaningful evaluation. He is particularly
              interested in how assessment and academic communication can evolve in response to generative AI while
              maintaining educational standards and supporting student learning.
            </p>
            <p>
              Through both teaching and assessment practice, he encourages responsible engagement with AI as a learning
              tool, emphasising transparency, academic integrity, and the development of students' independent academic
              judgement.
            </p>
          </div>
          <aside className="bg-mist/55 px-5 py-6 lg:sticky lg:top-24">
            <Image
              src="/images/jabreel-asghar-about.png"
              alt="Dr Jabreel Asghar in front of academic bookshelves"
              width={1408}
              height={1117}
              sizes="(min-width: 1024px) 22rem, 100vw"
              className="mb-5 h-auto w-full border border-line"
              priority
            />
            <p className="border-b border-line pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-moss">Profile</p>
            <div className="divide-y divide-line">
              {profileItems.map(([label, value]) => (
                <div key={label} className="py-4">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-oxford">{label}</h2>
                  <p className="mt-1.5 text-sm leading-6 text-slate">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
