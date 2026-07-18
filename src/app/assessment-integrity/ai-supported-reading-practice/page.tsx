import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Designing an AI-Supported Reading Practice Environment",
  description:
    "A case study in designing a constrained AI-supported environment for independent reading comprehension practice."
};

export default function AiSupportedReadingPracticePage() {
  return (
    <>
      <section className="border-b border-line bg-ivory">
        <Container className="py-14">
          <SectionHeader
            eyebrow="Assessment Integrity · Case Study"
            title="Designing an AI-Supported Reading Practice Environment"
            summary="Structured independent reading practice that preserves instructor authority and keeps assessment decisions outside the AI system."
          />
        </Container>
      </section>
      <section className="bg-paper">
        <Container className="py-14">
          <article className="max-w-4xl">
            <section className="pb-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Overview</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>
                  I designed a customised AI-supported reading practice environment for students in skills-based academic
                  English courses. The purpose was to provide structured independent practice while preserving instructor
                  authority and keeping assessment decisions outside the AI system.
                </p>
                <p>
                  The activity guided learners through staged comprehension questions, required them to justify answers
                  with evidence from the source text, and prompted revision when an answer or supporting quotation was
                  inaccurate. The design treated AI as a formative learning support rather than an evaluator or grader.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Project at a Glance</h2>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {[
                  ["Role", "Designer of the AI-supported reading practice environment"],
                  ["Context", "Skills-based academic English"],
                  ["Purpose", "Independent reading comprehension practice"],
                  ["AI function", "Structured questioning, retry prompts, evidence checking, and formative feedback"],
                  ["Assessment role", "None; the activity was designed for practice rather than grading"],
                  ["Supporting evidence", "Interface screenshot and anonymised interaction extract"]
                ].map(([term, detail]) => (
                  <div key={term} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-5">
                    <dt className="text-sm font-semibold text-oxford">{term}</dt>
                    <dd className="text-sm leading-6 text-slate">{detail}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">The Educational Challenge</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>
                  Independent reading practice is important in academic English courses, but students cannot always
                  receive immediate individual guidance while working outside class. A conventional answer key can confirm
                  whether an answer is correct, but it does not necessarily require learners to return to the text, explain
                  their reasoning, or reconsider unsupported responses.
                </p>
                <p>
                  The design challenge was therefore to create a scalable practice environment that encouraged active
                  comprehension without allowing AI to replace instructor judgement or institutional assessment processes.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Design Principles</h2>
              <div className="mt-5 space-y-5">
                {[
                  [
                    "Separation of practice and assessment",
                    "The AI-supported activity functioned as a formative practice environment. It did not assign grades or make formal decisions about student achievement. Assessment responsibility remained with instructors and the institution."
                  ],
                  [
                    "Structured independence",
                    "Learners were guided through staged tasks rather than given unrestricted access to answers. They selected an area of reading practice, responded to questions, and were required to support answers using evidence from the source text."
                  ],
                  [
                    "Constrained use of AI",
                    "The AI was given a limited educational role. It could identify whether a response matched the expected answer, request textual evidence, reject evidence that did not support the answer, and invite another attempt. It was not positioned as an autonomous assessor."
                  ]
                ].map(([title, text]) => (
                  <div key={title} className="border-l-4 border-moss bg-ivory p-5">
                    <h3 className="text-xl font-semibold text-oxford">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Design and Implementation</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>
                  The reading assistant offered several practice pathways, including vocabulary, factual comprehension,
                  main idea, pronoun reference, and cause-and-result relationships.
                </p>
                <p>Within each pathway, the interaction followed a staged sequence:</p>
                <ol className="list-decimal space-y-2 border-l-4 border-moss bg-ivory py-4 pl-10 pr-5">
                  <li>The learner responded to a comprehension question.</li>
                  <li>An incorrect response triggered a retry rather than immediate disclosure of the answer.</li>
                  <li>After a correct response, the learner was required to provide supporting words from the source text.</li>
                  <li>Evidence that did not match the answer was rejected and the learner was asked to revise it.</li>
                  <li>The interaction continued only after the answer and evidence were appropriately connected.</li>
                </ol>
                <p>
                  This sequence was intended to foreground textual grounding and self-correction rather than answer
                  completion.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Responsible AI Design</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>
                  The AI assistant was deliberately constrained so that it supported learning without automating academic
                  judgement. It provided immediate formative guidance, but it did not grade student work, determine course
                  achievement, or replace instructor feedback.
                </p>
                <p>
                  The design also limited the risk of passive answer retrieval. Learners had to make an initial choice,
                  reconsider incorrect responses, and locate evidence in the text. The AI therefore functioned as a
                  structured practice partner rather than an answer generator.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Educational Quality Considerations</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>
                  The prompts were designed to support reading behaviours relevant to course learning, including
                  identifying explicit information, interpreting reference, recognising main ideas, and connecting answers
                  to textual evidence.
                </p>
                <p>
                  The interaction was also designed to make the learning process visible. Retry prompts revealed where
                  comprehension had broken down, while evidence requirements encouraged learners to verify their
                  interpretations against the source text.
                </p>
                <p>
                  Because the activity was formative, it could support additional practice without altering formal
                  assessment arrangements or delegating evaluative authority to AI.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Reflection</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate">
                <p>
                  This project reinforced the importance of defining the educational role of AI before selecting its
                  technical functions. The value of the activity did not come from generating answers quickly. It came
                  from imposing a sequence that required learners to attempt, verify, revise, and justify.
                </p>
                <p>
                  The design illustrates how AI can support independent learning while remaining bounded by clear
                  pedagogical and assessment constraints.
                </p>
              </div>
            </section>

            <section className="border-t border-line py-8">
              <h2 className="font-serif text-3xl font-semibold text-oxford">Supporting Evidence</h2>
              <div className="mt-6 space-y-8">
                <figure>
                  <div className="overflow-hidden rounded-sm border border-line bg-ivory p-2">
                    <Image
                      src="/images/ai-reading-practice-interface.png"
                      alt="Custom AI-supported reading practice interface showing vocabulary, factual comprehension, main idea, and pronoun-reference options."
                      width={1034}
                      height={790}
                      className="h-auto w-full"
                      sizes="(max-width: 896px) 100vw, 896px"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-slate">
                    Figure 1. AI-supported reading practice interface
                  </figcaption>
                  <p className="mt-3 text-sm leading-6 text-slate">
                    The interface presents learners with distinct reading-practice pathways and makes clear that they
                    remain in control of the activity. It provides access to vocabulary, factual comprehension, main idea,
                    pronoun reference, and cause-and-result practice.
                  </p>
                </figure>

                <div className="border-t border-line pt-6">
                  <h3 className="text-xl font-semibold text-oxford">
                    Sample AI-Supported Reading Comprehension Interaction (Anonymised)
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate">
                    This extract demonstrates staged comprehension questions, retry logic, and evidence-based feedback. It
                    shows learners being required to correct inaccurate answers and provide textual evidence before
                    progressing.
                  </p>
                  <a
                    className="button-primary mt-5"
                    href="/downloads/ai-reading-prompt-structure-anonymised.pdf"
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
