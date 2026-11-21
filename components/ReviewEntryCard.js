import ReviewButtons from "./ReviewButtons.js";
import BilingualNotice from "./BilingualNotice.js";
import { STRINGS, entryText, isKhmerText, t } from "../utils/strings.js";

// One pending entry in the review queue: everything a reviewer needs to decide
// (photo, titles, full descriptions, the facts, who is credited, when it was
// sent), then the two buttons. `failed` shows the "that didn't go through"
// message under the buttons; the entry itself stays where it is.

// "That didn't go through. ..." : the student's English and Khmer (K12).
const FAILED = STRINGS.K12;

// The database stores UTC; show the date as it is in Phnom Penh (UTC+7), so an
// entry sent at 6 AM there is not dated the day before. "en-CA" prints YYYY-MM-DD.
const DAY = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Phnom_Penh" });
const day = (timestamp) => DAY.format(new Date(timestamp));

const styles = {
  card: {
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: { width: "100%", maxHeight: 360, objectFit: "cover", display: "block" },
  noImage: {
    padding: "48px 0",
    textAlign: "center",
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--faint)",
    backgroundColor: "var(--bg)",
  },
  body: { padding: 20 },
  label: { fontFamily: "var(--font-label)", fontSize: 12, color: "var(--muted)", margin: "0 0 6px" },
  title: { fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 600, lineHeight: 1.2, margin: "8px 0 0" },
  titleKhmer: { fontFamily: "var(--font-heading)", fontSize: 18, color: "var(--text-soft)", margin: "2px 0 0" },
  // pre-wrap keeps the contributor's line breaks, so the reviewer sees the text as written.
  text: { fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: "12px 0 0", whiteSpace: "pre-wrap" },
  textKhmer: { fontSize: 14, color: "var(--muted-dim)", lineHeight: 1.8, margin: "10px 0 0", paddingTop: 10, borderTop: "1px solid var(--border)", whiteSpace: "pre-wrap" },
  failed: { marginTop: 16 },
};
// Khmer-only mode: the Khmer description takes the English one's place, with
// the Khmer line height.
styles.textInKhmer = { ...styles.text, lineHeight: 1.8 };

export default function ReviewEntryCard({ entry, disabled, failed, onDecide, lang }) {
  // Optional facts: only the ones that exist are listed.
  const fact = (id, value) => `${t(lang, id)}: ${value}`;
  const facts = [
    entry.filling && fact("FL6", entry.filling),
    entry.shape && fact("FL7", entry.shape),
    entry.color && fact("FL8", entry.color),
    entry.texture && fact("FL9", entry.texture),
    entry.sweetness != null && fact("FL10", `${entry.sweetness}/5`),
    entry.saltiness != null && fact("FL11", `${entry.saltiness}/5`),
  ].filter(Boolean);

  // Same rule as the entry page: "both" shows the English with the Khmer under
  // it, "en" the English only, "km" the Khmer in the English's place.
  const title = entryText(lang, entry.title, entry.title_khmer);
  const khmerDescription = isKhmerText(lang, entry.description_khmer);

  return (
    <li style={styles.card}>
      {entry.photo_url ? (
        <img src={entry.photo_url} alt={title} style={styles.image} />
      ) : (
        <div style={styles.noImage}>{t(lang, "P5")}</div>
      )}
      <div style={styles.body}>
        <p style={styles.label}>{t(lang, "R4")}: {day(entry.created_at)}</p>
        {/* Null until the owner changes the entry's content (a trigger sets it). */}
        {entry.updated_at && <p style={styles.label}>{t(lang, "R5")}: {day(entry.updated_at)}</p>}
        <p style={styles.label}>{t(lang, "P6")}: {entry.source}</p>
        {entry.contributor && <p style={styles.label}>{t(lang, "P7")}: {entry.contributor}</p>}
        <h2 lang={isKhmerText(lang, entry.title_khmer) ? "km" : undefined} style={styles.title}>
          {title}
        </h2>
        {lang === "both" && entry.title_khmer && (
          <p lang="km" style={styles.titleKhmer}>{entry.title_khmer}</p>
        )}
        {facts.length > 0 && <p style={styles.text}>{facts.join(" · ")}</p>}
        <p lang={khmerDescription ? "km" : undefined} style={khmerDescription ? styles.textInKhmer : styles.text}>
          {entryText(lang, entry.description, entry.description_khmer)}
        </p>
        {lang === "both" && entry.description_khmer && (
          <p lang="km" style={styles.textKhmer}>{entry.description_khmer}</p>
        )}
        <ReviewButtons disabled={disabled} onDecide={onDecide} lang={lang} />
        {failed && (
          <div style={styles.failed}>
            <BilingualNotice en={FAILED.en} km={FAILED.km} lang={lang} />
          </div>
        )}
      </div>
    </li>
  );
}
