"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import styles from "../thinklab.module.css";
import stageCStyles from "../stage-c.module.css";

type JoinResult = { session_id: string; participant_id: string };

export function JoinThinkLab() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    document.body.classList.add("thinklab-mode");
    return () => document.body.classList.remove("thinklab-mode");
  }, []);

  async function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoining(true);
    setError("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { data: authData } = await supabase.auth.getSession();
      if (!authData.session) {
        const { error: authError } = await supabase.auth.signInAnonymously({
          options: { data: { display_name: displayName.trim() } }
        });
        if (authError) throw authError;
      }

      const normalizedCode = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
      const { data, error: joinError } = await supabase.rpc("join_thinklab_session", {
        code: normalizedCode,
        display_name: displayName.trim()
      });
      if (joinError) throw joinError;

      const result = (Array.isArray(data) ? data[0] : data) as JoinResult | null;
      if (!result?.session_id) throw new Error("That session is not available to join.");

      localStorage.setItem(
        "thinklab-live-identity",
        JSON.stringify({ sessionId: result.session_id, participantId: result.participant_id })
      );
      router.replace(`/thinklab/session/${result.session_id}`);
    } catch {
      setError("That session is not available. Check the code and try again.");
      setJoining(false);
    }
  }

  return (
    <div className={styles.signIn}>
      <header>
        <div className={styles.labWordmark}>THINKLAB<sup>™</sup><span>THE TRUST LAB</span></div>
        <span>Participant access</span>
      </header>
      <main>
        <p>Live session</p>
        <h1>Join the<br />Trust Lab</h1>
        <form onSubmit={join} className={stageCStyles.joinForm}>
          <label htmlFor="join-code">Join code</label>
          <input
            id="join-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            autoComplete="off"
            inputMode="text"
            maxLength={12}
            required
          />
          <label htmlFor="display-name">Display name</label>
          <input
            id="display-name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            autoComplete="name"
            maxLength={100}
            required
          />
          <button type="submit" disabled={joining}>
            {joining ? "Joining…" : "Join session"}
          </button>
          {error && <p role="alert">{error}</p>}
        </form>
      </main>
      <footer><span>Notice</span><span>Question</span><span>Intervene</span></footer>
    </div>
  );
}
