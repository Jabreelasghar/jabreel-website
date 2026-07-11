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
      {eyebrow ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-moss">{eyebrow}</p> : null}
      <h2 className="font-serif text-3xl font-semibold leading-tight text-oxford sm:text-4xl">{title}</h2>
      {summary ? <p className="mt-4 text-base leading-7 text-slate">{summary}</p> : null}
    </div>
  );
}
