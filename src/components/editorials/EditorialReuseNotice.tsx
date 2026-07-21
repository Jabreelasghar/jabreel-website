import { type Editorial, getEditorialReuseNotice } from "@/lib/editorials";

export function EditorialReuseNotice({ editorial }: { editorial: Editorial }) {
  return (
    <section className="mt-7 border-t border-line pt-7" aria-labelledby="editorial-reuse">
      <h2 id="editorial-reuse" className="font-serif text-xl font-semibold text-oxford">Copyright and reuse</h2>
      <p className="mt-3 text-sm leading-6 text-slate">{getEditorialReuseNotice(editorial)}</p>
    </section>
  );
}
