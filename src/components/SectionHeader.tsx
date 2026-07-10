export function SectionHeader({
  eyebrow,
  title,
  summary
}: {
  eyebrow?: string;
  title: string;
  summary?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brass">{eyebrow}</p> : null}
      <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      {summary ? <p className="mt-4 text-base leading-7 text-ink/70">{summary}</p> : null}
    </div>
  );
}
