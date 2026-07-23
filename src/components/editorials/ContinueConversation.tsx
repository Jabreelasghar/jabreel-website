import Link from "next/link";
import type { Editorial } from "@/lib/editorials";

export function ContinueConversation({ editorial }: { editorial: Editorial }) {
  return (
    <section className="mt-7 border-t border-line pt-7" aria-labelledby="continue-conversation">
      <h2 id="continue-conversation" className="font-serif text-xl font-semibold text-oxford">Continue the Conversation</h2>
      <p className="mt-3 text-sm leading-6 text-slate">Thoughtful discussion is welcome.</p>
      <ul className="mt-4 space-y-2 text-sm font-semibold">
        {editorial.linkedinDiscussionUrl ? (
          <li>
            <a className="text-moss hover:text-oxford" href={editorial.linkedinDiscussionUrl} target="_blank" rel="noopener noreferrer">
              Join the discussion on LinkedIn
            </a>
          </li>
        ) : null}
        <li><Link className="text-moss hover:text-oxford" href="/contact">Contact the author</Link></li>
        <li><Link className="text-moss hover:text-oxford" href="/insights">Explore the editorial series</Link></li>
      </ul>
    </section>
  );
}
