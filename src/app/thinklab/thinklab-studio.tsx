"use client";

import Link from "next/link";
import styles from "./thinklab.module.css";

export function ThinkLabStudio() {
  return (
    <div className={styles.roleScreen}>
      <header>
        <div className={styles.labWordmark}>THINKLAB<sup>™</sup><span>THE TRUST LAB</span></div>
        <span>Session 01</span>
      </header>
      <main>
        <p>Choose your entrance</p>
        <h1>How are you<br />joining?</h1>
        <div className={styles.roleChoices}>
          <Link href="/thinklab/participant">
            <small>01 · Guided experience</small>
            <b>Enter as<br />Participant</b>
            <span>→</span>
          </Link>
          <Link href="/thinklab/facilitator">
            <small>02 · Session control</small>
            <b>Enter as<br />Facilitator</b>
            <span>→</span>
          </Link>
        </div>
      </main>
      <footer><span>Notice</span><span>Question</span><span>Intervene</span></footer>
    </div>
  );
}
