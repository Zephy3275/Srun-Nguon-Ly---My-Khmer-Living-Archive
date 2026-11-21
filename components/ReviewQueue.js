"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client.js";
import BilingualNotice from "./BilingualNotice.js";
import ReviewEntryCard from "./ReviewEntryCard.js";
import { STRINGS, showsEn, showsKm } from "../utils/strings.js";

// The list of pending entries, held in state so a reviewed entry can leave it.
// The buttons call rpc('review_entry'), never an update on the table. That
// function returns false WITHOUT an error when it refuses (not a reviewer, or
// the entry is no longer pending), so success is exactly `data === true`:
// anything else leaves the entry in place and shows the failure message.

// The student's English and Khmer, in utils/strings.js.
const EMPTY = STRINGS.K11; // The queue is empty. Every entry has been reviewed.
const PENDING = STRINGS.K7; // the counter's word

const styles = {
  // How many entries are waiting; goes down as entries are reviewed. The Khmer
  // word is the existing "pending" status word (the student's), no letter spacing.
  count: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    margin: "0 0 16px",
    fontFamily: "var(--font-label)",
    fontSize: 14,
    color: "var(--accent)",
  },
  countEn: { fontWeight: 700, letterSpacing: 1 },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
};

export default function ReviewQueue({ initialEntries, lang }) {
  const [entries, setEntries] = useState(initialEntries);
  const [busyId, setBusyId] = useState(null);
  const [failedId, setFailedId] = useState(null);

  async function decide(entry, decision, note) {
    setBusyId(entry.id);
    setFailedId(null);
    const supabase = createClient();
    // The note travels only with a return, and only when there is one: without
    // `note` the function's default (null) applies, so PUBLISH is unchanged.
    const args = { entry_id: entry.id, decision };
    if (decision === "returned" && note) args.note = note;
    const { data, error } = await supabase.rpc("review_entry", args);
    setBusyId(null);

    if (error || data !== true) {
      console.error("Review was not applied:", error ?? "review_entry returned", data);
      setFailedId(entry.id);
      return;
    }
    setEntries((current) => current.filter((e) => e.id !== entry.id));
  }

  if (entries.length === 0) {
    return <BilingualNotice en={EMPTY.en} km={EMPTY.km} lang={lang} />;
  }

  // "both": "3 PENDING" and the Khmer word; "en": "3 PENDING"; "km": "3" and the Khmer word.
  return (
    <>
      <p style={styles.count}>
        <span style={styles.countEn}>
          {entries.length}
          {showsEn(lang) && ` ${PENDING.en}`}
        </span>
        {showsKm(lang) && <span lang="km">{PENDING.km}</span>}
      </p>
      <ul style={styles.list}>
        {entries.map((entry) => (
          <ReviewEntryCard
            key={entry.id}
            entry={entry}
            disabled={busyId !== null}
            failed={failedId === entry.id}
            onDecide={(decision, note) => decide(entry, decision, note)}
            lang={lang}
          />
        ))}
      </ul>
    </>
  );
}
