import Link from "next/link";
import { Container } from "@/components/Container";
import { EditorialCitation } from "@/components/editorials/EditorialCitation";
import { EditorialReuseNotice } from "@/components/editorials/EditorialReuseNotice";
import {
  type Editorial,
  getEditorialNeighbours,
  getEditorialReadingTime,
  getEditorialSeriesPosition
} from "@/lib/editorials";

function EditorialHeader({ editorial }: { editorial: Editorial }) {
  return (
    <>
      <Link className="text-sm font-semibold text-moss hover:text-oxford" href="/insights">
        Insights / {editorial.series}
      </Link>
      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-brass">
        {editorial.category ?? "Editorial"} · {editorial.series}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">{editorial.title}</h1>
      <p className="mt-5 text-xl leading-8 text-ink/70">{editorial.subtitle}</p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-line py-4 text-sm text-slate">
        <span>By {editorial.authorDisplayName ?? "Dr Jabreel Asghar"}</span>
        {editorial.publicationDate && editorial.displayDate ? <time dateTime={editorial.publicationDate}>{editorial.displayDate}</time> : null}
        <span>{getEditorialReadingTime(editorial)}</span>
        {editorial.pdf ? (
          <a className="font-semibold text-moss hover:text-oxford" href={editorial.pdf} target="_blank" rel="noopener noreferrer">
            Download as PDF
          </a>
        ) : null}
      </div>
    </>
  );
}

function SeriesItem({ label, editorial }: { label: "Previous" | "Next"; editorial?: Editorial }) {
  if (!editorial) return null;
  const published = editorial.status === "published";

  return (
    <p className="text-sm leading-6 text-slate">
      <span className="font-semibold text-oxford">{label} editorial:</span>{" "}
      {published ? <Link className="font-semibold text-moss hover:text-oxford" href={`/insights/${editorial.slug}`}>{editorial.title}</Link> : editorial.title}
      {" — "}{published ? "Published" : "Forthcoming"}
    </p>
  );
}

function EditorialSeriesNavigation({ editorial }: { editorial: Editorial }) {
  const { previous, next } = getEditorialNeighbours(editorial);

  return (
    <>
      <div className="mt-7 border-t border-line pt-7">
        <p className="text-sm leading-6 text-slate">{getEditorialSeriesPosition(editorial)}</p>
      </div>
      <div className={`mt-5 grid gap-3 ${previous && next ? "sm:grid-cols-2" : ""}`}>
        <SeriesItem label="Previous" editorial={previous} />
        <SeriesItem label="Next" editorial={next} />
      </div>
    </>
  );
}

export function EditorialPage({ editorial }: { editorial: Editorial }) {
  return (
    <article className="bg-paper">
      <Container className="py-14">
        <div className="mx-auto max-w-3xl">
          <EditorialHeader editorial={editorial} />
          <div className="mt-10 space-y-6 text-[1.0625rem] leading-8 text-ink/85">
            {(editorial.paragraphs ?? []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <footer className="mt-12 border-t border-line pt-7">
            <section aria-labelledby="about-editorial">
              <h2 id="about-editorial" className="font-serif text-xl font-semibold text-oxford">About this editorial</h2>
              <p className="mt-3 text-sm leading-6 text-slate">{editorial.about}</p>
            </section>
            <EditorialCitation editorial={editorial} />
            <EditorialReuseNotice editorial={editorial} />
            <EditorialSeriesNavigation editorial={editorial} />
            <Link className="mt-7 inline-block text-sm font-semibold text-moss hover:text-oxford" href="/insights">Back to Insights</Link>
          </footer>
        </div>
      </Container>
    </article>
  );
}
