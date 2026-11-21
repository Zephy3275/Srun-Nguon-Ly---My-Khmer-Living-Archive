import { STRINGS, showsEn, showsKm } from "../utils/strings.js";

// The status of an entry in plain words, English and Khmer (the Khmer wording
// is the student's own, K1 to K3 in utils/strings.js). Used on /my-entries. An
// unknown status is shown as it is, so a new status can never silently
// disappear from the screen. `lang`: "both" shows both words, "en" the English,
// "km" the Khmer.

const WORDS = {
  pending: { ...STRINGS.K1, color: "var(--accent)" },
  published: { ...STRINGS.K2, color: "var(--text-soft)" },
  returned: { ...STRINGS.K3, color: "var(--danger)" },
};

const styles = {
  badge: {
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: "2px 8px",
    padding: "4px 10px",
    border: "1px solid currentColor",
    borderRadius: 999,
    fontSize: 13,
  },
  // Letter spacing is for the English only: spacing between Khmer letters
  // would pull apart their stacked parts.
  en: { fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: 1 },
};

export default function StatusBadge({ status, lang }) {
  const words = WORDS[status];
  if (!words) return <span style={styles.badge}>{status}</span>;
  return (
    <span style={{ ...styles.badge, color: words.color }}>
      {showsEn(lang) && <span style={styles.en}>{words.en}</span>}
      {showsKm(lang) && <span lang="km">{words.km}</span>}
    </span>
  );
}
