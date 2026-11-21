// A short message in English with the Khmer under it, in one bordered box.
// Used by the review page and the edit page. The Khmer is the student's own
// wording, passed in by the caller. `lang` follows the language switch:
// "both" (or no lang) shows both lines, "en" only the English, "km" only the Khmer.

import { showsEn, showsKm } from "../utils/strings.js";

const styles = {
  box: {
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    color: "var(--muted)",
    lineHeight: 1.7,
  },
  en: { margin: 0, fontSize: 15 },
  km: {
    margin: "8px 0 0",
    paddingTop: 8,
    borderTop: "1px solid var(--border)",
    fontSize: 15,
    color: "var(--muted-dim)",
  },
};
// Khmer only: no rule above it, nothing to be set apart from.
styles.kmAlone = { margin: 0, fontSize: 15 };

export default function BilingualNotice({ en, km, lang = "both" }) {
  return (
    <div style={styles.box} role="status">
      {showsEn(lang) && <p style={styles.en}>{en}</p>}
      {showsKm(lang) && (
        <p style={lang === "both" ? styles.km : styles.kmAlone} lang="km">
          {km}
        </p>
      )}
    </div>
  );
}
