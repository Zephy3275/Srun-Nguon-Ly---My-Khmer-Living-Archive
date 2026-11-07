"use client";

import { useState } from "react";

// The note box and the two buttons under a pending entry. They only report
// which button was pressed (and the note, for RETURN); ReviewQueue makes the
// rpc call. The note is optional and is only sent with RETURN: PUBLISH ignores
// it. English in spaced capitals, Khmer beside it with no letter spacing
// (spacing would pull the Khmer stacks apart).

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

export default function ReviewButtons({ disabled, onDecide }) {
  const [note, setNote] = useState("");

  return (
    <div>
      <label style={styles.noteLabel}>
        <span style={styles.noteEn}>REASON FOR RETURNING (OPTIONAL)</span>
        <span style={styles.noteKm} lang="km">
          មូលហេតុនៃការប្រគល់ត្រឡប់
        </span>
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
        <button
          type="button"
          className="btn-filled"
          style={styles.button}
          disabled={disabled}
          onClick={() => onDecide("published")}
        >
          <span style={styles.en}>PUBLISH</span>
          <span lang="km">ផ្សព្វផ្សាយ</span>
        </button>
        <button
          type="button"
          className="btn-outline"
          style={styles.button}
          disabled={disabled}
          onClick={() => onDecide("returned", note.trim())}
        >
          <span style={styles.en}>RETURN</span>
          <span lang="km">ត្រឡប់មកវិញ</span>
        </button>
      </div>
    </div>
  );
}
