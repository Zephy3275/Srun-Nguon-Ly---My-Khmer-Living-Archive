import Link from "next/link";
import { STRINGS, showsEn, showsKm, t } from "../utils/strings.js";

// Shown by ContributeForm instead of the form once a save has worked and the
// entry now waits for review. kind "added" = a new entry; "edited" = changes to
// an existing one (an edit sends it back to review, so it leaves the public shelf).
//
// The texts are the student's English and Khmer (K14, K15 in utils/strings.js).
// "both": the English heading, the English text and the Khmer under it (as
// before the language switch). "en": English only. "km": Khmer only.

const MESSAGES = {
  added: { heading: "F23", text: "K14" },
  edited: { heading: "F24", text: "K15" },
};

const styles = {
  box: {
    marginTop: 32,
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
  },
  heading: {
    fontFamily: "var(--font-heading)",
    fontSize: 28,
    fontWeight: 600,
    margin: 0,
  },
  text: { fontSize: 16, color: "var(--muted)", lineHeight: 1.7, margin: "12px 0 0" },
  textKm: {
    fontSize: 16,
    color: "var(--muted-dim)",
    lineHeight: 1.8,
    margin: "12px 0 24px",
    paddingTop: 12,
    borderTop: "1px solid var(--border)",
  },
  row: { display: "flex", flexWrap: "wrap", gap: 12 },
};
// When only one language shows, its text sits alone above the buttons.
styles.textAlone = { ...styles.text, margin: "12px 0 24px" };
styles.textKmAlone = { ...styles.textAlone, lineHeight: 1.8 };

export default function EntrySentNotice({ kind, lang }) {
  const message = MESSAGES[kind] ?? MESSAGES.added;
  const text = STRINGS[message.text];
  return (
    <div style={styles.box} role="status">
      <h2 style={styles.heading}>{t(lang, message.heading)}</h2>
      {showsEn(lang) && (
        <p style={lang === "both" ? styles.text : styles.textAlone}>{text.en}</p>
      )}
      {showsKm(lang) && (
        <p lang="km" style={lang === "both" ? styles.textKm : styles.textKmAlone}>
          {text.km}
        </p>
      )}
      <div style={styles.row}>
        <Link href="/my-entries" className="nav-btn btn-filled">
          {t(lang, "H5")}
        </Link>
        <Link href="/" className="nav-btn btn-outline">
          {/* The same words as the back link at the top of pages, without its arrow. */}
          {t(lang, "P1").replace("← ", "")}
        </Link>
      </div>
    </div>
  );
}
