import { CopyCitationButton } from "@/components/editorials/CopyCitationButton";
import { type Editorial, getEditorialCitation, getEditorialCitationParts } from "@/lib/editorials";

export function EditorialCitation({ editorial }: { editorial: Editorial }) {
  const citation = getEditorialCitationParts(editorial);
  if (!citation) return null;
  const plainTextCitation = getEditorialCitation(editorial);

  return (
    <section className="mt-7 border-t border-line pt-7" aria-labelledby="cite-editorial">
      <h2 id="cite-editorial" className="font-serif text-xl font-semibold text-oxford">Cite this editorial</h2>
      <p className="mt-3 text-sm leading-6 text-slate">
        {citation.authorAndDate} <cite>{citation.title}</cite> {citation.site}{" "}
        <a className="break-words text-moss hover:text-oxford" href={citation.url}>{citation.url}</a>
      </p>
      <CopyCitationButton citation={plainTextCitation} />
    </section>
  );
}
