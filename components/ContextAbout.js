import { t } from "../utils/strings.js";

const styles = {
  section: {
    marginTop: 48,
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
  },
  kicker: {
    fontFamily: "var(--font-label)",
    color: "var(--accent)",
    fontSize: 14,
    letterSpacing: 1,
    margin: 0,
  },
  heading: {
    fontFamily: "var(--font-heading)",
    fontSize: 32,
    fontWeight: 600,
    margin: "12px 0 16px",
  },
  intro: {
    fontSize: 16,
    color: "var(--muted)",
    lineHeight: 1.7,
    margin: "0 0 16px",
  },
  point: {
    fontSize: 15,
    color: "var(--muted)",
    lineHeight: 1.7,
    margin: "0 0 12px",
  },
  lead: { color: "var(--text)" },
  closing: {
    fontSize: 15,
    color: "var(--muted)",
    lineHeight: 1.7,
    margin: "16px 0 0",
    paddingTop: 16,
    borderTop: "1px solid var(--border)",
  },
};

// The text lives in utils/strings.js (AB1 to AB12), in English and Khmer.
// Each point is a heading ID and a text ID.
const points = [
  ["AB4", "AB5"],
  ["AB6", "AB7"],
  ["AB8", "AB9"],
  ["AB10", "AB11"],
];

export default function ContextAbout({ lang }) {
  return (
    <section style={styles.section}>
      <p style={styles.kicker}>{t(lang, "AB1")}</p>
      <h2 style={styles.heading}>{t(lang, "AB2")}</h2>
      <p style={styles.intro}>{t(lang, "AB3")}</p>
      {points.map(([lead, body]) => (
        <p key={lead} style={styles.point}>
          <strong style={styles.lead}>{t(lang, lead)}:</strong> {t(lang, body)}
        </p>
      ))}
      <p style={styles.closing}>{t(lang, "AB12")}</p>
    </section>
  );
}