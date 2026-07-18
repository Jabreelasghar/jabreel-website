import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Assessment Design for Technical Communication to Non-Technical Audiences",
  description:
    "A case study in designing an oral presentation assessment and analytical rubric for communicating technical information to non-technical audiences."
};

export default function TechnicalCommunicationAssessmentDesignPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Assessment Integrity · Case Study"
            title="Assessment Design for Technical Communication to Non-Technical Audiences"
            summary="Designing an oral presentation assessment that evaluates the clear and accessible communication of technical information."
          />
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-14">
          <article className="max-w-4xl">
            <section className="pb-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Overview</h2>
              <p className="mt-4 text-base leading-7 text-slate">
                During the development of a technical English course, I was responsible for the initial design of an oral
                presentation assessment and its accompanying analytical rubric. While the overall assessment strategy was
                developed collaboratively within the course team, I designed the assessment task and rubric before they
                were reviewed and refined through discussion with the system-wide Course Team Leader and Senior Team
                Leader prior to implementation. The assessment has since been used successfully within the course to
                evaluate students&apos; ability to communicate technical information to non-technical audiences.
              </p>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Project at a Glance</h2>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {[
                  ["Role", "Lead designer of the assessment task and analytical rubric"],
                  ["Context", "Technical English course"],
                  ["Assessment Type", "Individual oral presentation"],
                  ["Focus", "Communicating technical information to non-specialist audiences"],
                  ["Status", "Implemented and used in teaching"]
                ].map(([term, detail]) => (
                  <div key={term} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-5">
                    <dt className="text-sm font-semibold text-oxford">{term}</dt>
                    <dd className="text-sm leading-6 text-slate">{detail}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">The Design Challenge</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>
                  Many technical communication assessments emphasise subject knowledge more than communication itself.
                  The objective of this assessment was different. Students were required to demonstrate that they could
                  explain a technical issue accurately, clearly, and accessibly to a non-specialist audience.
                </p>
                <p>
                  The challenge was therefore to design an assessment that rewarded communication effectiveness rather
                  than technical expertise while providing clear expectations for both students and assessors.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Design Decisions</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>
                  The assessment required students to explain a technical issue using accessible language, demonstrate
                  its relevance to everyday contexts, describe current risks or developments, and provide practical
                  recommendations for a general audience.
                </p>
                <p>Several design decisions shaped the assessment:</p>
                <ul className="space-y-2 border-l-4 border-moss bg-ivory px-5 py-4">
                  <li>Communication effectiveness was prioritised over technical depth.</li>
                  <li>Audience awareness was treated as an explicit assessment criterion.</li>
                  <li>
                    Students were encouraged to translate technical concepts into everyday language rather than rely on
                    specialist terminology.
                  </li>
                  <li>
                    The assessment brief, rubric, and learner guidance were developed together to promote constructive
                    alignment and reduce ambiguity.
                  </li>
                </ul>
                <p>
                  These decisions ensured that the assessment measured students&apos; ability to communicate technical
                  information rather than simply reproduce technical knowledge.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Rubric Design</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>The analytical rubric focused on four dimensions of effective communication:</p>
                <ul className="space-y-2 border-l-4 border-moss bg-ivory px-5 py-4">
                  <li>Clarity of explanation</li>
                  <li>Logical organisation of ideas</li>
                  <li>Audience awareness and accessibility</li>
                  <li>Effective use of examples and explanations</li>
                </ul>
                <p>
                  Student guidance reinforced these principles by encouraging clear structure, practical
                  recommendations, and the appropriate use of everyday language while discouraging unnecessary technical
                  jargon.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Assessment Quality</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>
                  Constructive alignment guided the development of the assessment. The assessment task, analytical
                  rubric, and learner guidance were intentionally designed as an integrated system so that students
                  understood what was expected and assessors could apply the criteria consistently.
                </p>
                <p>
                  Rather than measuring technical knowledge in isolation, the assessment focused on transferable
                  communication skills that are valuable across academic and professional contexts. The rubric was
                  designed to support transparent expectations, consistent judgement, and meaningful feedback.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Reflection</h2>
              <p className="mt-4 text-base leading-7 text-slate">
                This project reinforced my view that high-quality assessment depends on coherence across the assessment
                brief, evaluation criteria, and learner guidance. Designing these components together helped create an
                assessment that communicates expectations clearly to students while supporting more consistent and
                defensible assessment decisions.
              </p>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Supporting Evidence</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate">
                The following anonymised extracts illustrate the alignment between the assessment task, evaluation
                criteria, and learner guidance described in this case study.
              </p>
              <div className="mt-5 divide-y divide-line border-y border-line">
                <div className="py-4">
                  <h3 className="text-lg font-semibold text-oxford">Assessment Brief (Anonymised)</h3>
                  <a
                    className="button-primary mt-4"
                    href="/downloads/technical-communication-assessment-brief-anonymised.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </div>
                <div className="py-4">
                  <h3 className="text-lg font-semibold text-oxford">Rubric Extract (Anonymised)</h3>
                  <a
                    className="button-primary mt-4"
                    href="/downloads/technical-communication-rubric-extract-anonymised.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </section>

            <Link className="mt-2 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/assessment-integrity">
              Back to Assessment Integrity
            </Link>
          </article>
        </Container>
      </section>
    </>
  );
}
