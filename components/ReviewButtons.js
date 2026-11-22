"use client";

import { useState } from "react";
import { STRINGS, showsEn, showsKm } from "../utils/strings.js";

// The note box and the two buttons under a pending entry. They only report
// which button was pressed (and the note, for RETURN); ReviewQueue makes the
// rpc call. The note is optional and is only sent with RETURN: PUBLISH ignores
// it. English in spaced capitals, Khmer beside it with no letter spacing
// (spacing would pull the Khmer stacks apart).
// showPublish={false} hides PUBLISH: the entry page's take-down box
// (TakeDownButton.js) reuses the note box and RETURN for a published entry.

const styles = {
  noteLabel: {
    display: "block",
    marginTop: 16,
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--muted)",
  },
  noteEn: { letterSpacing: 1 },
  noteKm: { marginLeft: 8 },
  note: {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    marginTop: 6,
    padding: 10,
    fontFamily: "var(--font-body)",
    fontSize: 14,
    lineHeight: 1.5,
    color: "var(--text)",
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    resize: "vertical",
  },
  row: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 },
  button: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 8,
    padding: "10px 16px",
    fontFamily: "var(--font-label)",
    fontSize: 14,
    borderRadius: 8,
    cursor: "pointer",
  },
  en: { fontWeight: 700, letterSpacing: 1 },
};

// The student's English and Khmer for the note label and the two buttons
// (utils/strings.js). `lang`: "both" shows both, "en" the English, "km" the Khmer.
const NOTE_LABEL = STRINGS.K6;
const PUBLISH = STRINGS.K4;
const RETURN = STRINGS.K5;

export default function ReviewButtons({ disabled, onDecide, lang, showPublish = true }) {
  const [note, setNote] = useState("");
  const en = showsEn(lang);
  const km = showsKm(lang);

  return (
    <div>
      <label style={styles.noteLabel}>
        {en && <span style={styles.noteEn}>{NOTE_LABEL.en}</span>}
        {km && (
          <span style={lang === "both" ? styles.noteKm : undefined} lang="km">
            {NOTE_LABEL.km}
          </span>
        )}
        <textarea
          style={styles.note}
          rows={2}
          maxLength={500}
          value={note}
          disabled={disabled}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>
      <div style={styles.row}>
        {showPublish && (
          <button
            type="button"
            className="btn-filled"
            style={styles.button}
            disabled={disabled}
            onClick={() => onDecide("published")}
          >
            {en && <span style={styles.en}>{PUBLISH.en}</span>}
            {km && <span lang="km">{PUBLISH.km}</span>}
          </button>
        )}
        <button
          type="button"
          className="btn-outline"
          style={styles.button}
          disabled={disabled}
          onClick={() => onDecide("returned", note.trim())}
        >
          {en && <span style={styles.en}>{RETURN.en}</span>}
          {km && <span lang="km">{RETURN.km}</span>}
        </button>
      </div>
    </div>
  );
}
