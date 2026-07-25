"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../thinklab.module.css";

export function FacilitatorSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.classList.add("thinklab-mode");
    return () => document.body.classList.remove("thinklab-mode");
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const response = await fetch("/api/thinklab/facilitator/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      setError("The sign-in details were not accepted. Please try again.");
      setSubmitting(false);
      return;
    }
    window.location.assign("/thinklab/facilitator");
  };

  return (
    <div className={styles.signIn}>
      <header>
        <div className={styles.labWordmark}>THINKLAB<sup>™</sup><span>FACILITATOR ACCESS</span></div>
        <Link href="/thinklab">Return to role selection</Link>
      </header>
      <main>
        <div className={styles.signInMark}>⟦ ⟧</div>
        <p>Session control is restricted</p>
        <h1>Facilitator<br />sign in</h1>
        <form onSubmit={submit}>
          <label htmlFor="facilitator-email">Email address</label>
          <input
            id="facilitator-email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoComplete="username"
            required
            autoFocus
          />
          <label htmlFor="facilitator-password">Password</label>
          <div>
            <input
              id="facilitator-password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
            <button disabled={submitting}>{submitting ? "Checking…" : "Enter console →"}</button>
          </div>
          {error && <p role="alert">{error}</p>}
        </form>
      </main>
      <footer><span>Authorised facilitators only</span><span>Trust Lab · Session 01</span></footer>
    </div>
  );
}
