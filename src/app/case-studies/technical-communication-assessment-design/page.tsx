import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Assessment Design for Technical Communication to Non-Technical Audiences",
  description:
    "A case study in designing an oral presentation assessment and rubric for communicating technical information to non-technical audiences."
};

const sections = [
  {
    title: "Overview",
    paragraphs: [
      "As part of the development of a technical English course, I led the design of an oral presentation assessment intended to evaluate students' ability to communicate technical information to non-technical audiences. While the overall assessment strategy for the course was developed collaboratively, I was responsible for the initial design of the assessment task and accompanying rubric. The design was subsequently reviewed and refined through discussion with the system-wide Course Team Leader and Senior Team Leader before implementation. The assessment has been used successfully within the course since its introduction."
    ]
  },
  {
    title: "The Design Challenge",
    paragraphs: [
      "Many technical communication assessments reward disciplinary knowledge more than communication itself. For this assessment, the objective was different: students needed to demonstrate that they could explain a technical issue accurately, clearly, and accessibly to a general audience. The assessment therefore needed to evaluate communication quality rather than technical expertise."
    ]
  },
  {
    title: "My Design Approach",
    paragraphs: [
      "The assessment required students to deliver an oral presentation explaining a technical issue using accessible language for a non-technical audience. Students were expected to explain why the issue mattered, outline current risks or developments, and provide practical recommendations.",
      "To support these aims, I designed an analytical rubric that focused on four communication dimensions:"
    ],
    items: ["Clarity of explanation", "Logical organisation of ideas", "Audience awareness", "Effective use of examples and explanations"],
    closing:
      "Student guidance reinforced these principles by encouraging the use of everyday language, clear organisation, and practical recommendations while avoiding unnecessary technical jargon."
  },
  {
    title: "Assessment Quality Considerations",
    paragraphs: [
      "The assessment was intentionally designed to maintain constructive alignment between the assessment brief, rubric, and student guidance. Rather than measuring technical knowledge in isolation, the assessment focused on transferable communication skills that are valuable across professional contexts.",
      "The rubric was designed to support transparent expectations, consistent marking, and meaningful feedback while ensuring that assessment decisions reflected communication effectiveness rather than subject-specific expertise."
    ]
  },
  {
    title: "Reflection",
    paragraphs: [
      "This project reinforced the importance of designing assessment as an integrated system rather than as separate documents. Alignment between the assessment task, assessment criteria, and learner guidance contributes to clearer expectations for students while supporting consistency, transparency, and educational quality."
    ]
  }
];

export default function TechnicalCommunicationAssessmentDesignPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Case Study · Assessment Design"
            title="Assessment Design for Technical Communication to Non-Technical Audiences"
            summary="Designing an oral presentation assessment that evaluates the clear and accessible communication of technical information."
          />
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-14">
          <article className="max-w-4xl">
            {sections.map((section, index) => (
              <section key={section.title} className={`py-8 ${index === 0 ? "pt-0" : "border-t border-line"}`}>
                <h2 className="font-serif text-3xl font-semibold text-oxford">{section.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items ? (
                    <ul className="space-y-2 border-l-4 border-moss bg-ivory px-5 py-4">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.closing ? <p>{section.closing}</p> : null}
                </div>
              </section>
            ))}

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Supporting Artefacts</h2>
              <div className="mt-5 divide-y divide-line border-y border-line">
                <div className="py-4">
                  <h3 className="text-lg font-semibold text-oxford">Assessment Brief Extract</h3>
                  <p className="mt-1 text-sm text-slate">Coming soon.</p>
                </div>
                <div className="py-4">
                  <h3 className="text-lg font-semibold text-oxford">Rubric Extract</h3>
                  <p className="mt-1 text-sm text-slate">Coming soon.</p>
                </div>
              </div>
            </section>

            <Link className="mt-2 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/case-studies">
              Back to Case Studies
            </Link>
          </article>
        </Container>
      </section>
    </>
  );
}
