import ReviewButtons from "./ReviewButtons.js";
import BilingualNotice from "./BilingualNotice.js";

// One pending entry in the review queue: everything a reviewer needs to decide
// (photo, titles, full descriptions, the facts, who is credited, when it was
// sent), then the two buttons. `failed` shows the "that didn't go through"
// message under the buttons; the entry itself stays where it is.

const FAILED_EN =
  "That didn't go through. The entry may already have been reviewed, or you may not be allowed to review. Refresh the page and try again.";
const FAILED_KM =
  "ប្រតិបត្តិការនេះមិនបានជោគជ័យទេ។ ធាតុនេះអាចត្រូវបានពិនិត្យរួចហើយ ឬអ្នកប្រហែលជាមិនត្រូវបានអនុញ្ញាតឱ្យធ្វើការពិនិត្យនោះទេ។ សូមផ្ទុកទំព័រឡើងវិញ រួចសាកល្បងម្តងទៀត។";

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
  text: { fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: "12px 0 0" },
  textKhmer: { fontSize: 14, color: "var(--muted-dim)", lineHeight: 1.8, margin: "10px 0 0", paddingTop: 10, borderTop: "1px solid var(--border)" },
  failed: { marginTop: 16 },
};

export default function ReviewEntryCard({ entry, disabled, failed, onDecide }) {
  // Optional facts: only the ones that exist are listed.
  const facts = [
    entry.filling && `FILLING: ${entry.filling}`,
    entry.shape && `SHAPE: ${entry.shape}`,
    entry.color && `COLOR: ${entry.color}`,
    entry.texture && `TEXTURE: ${entry.texture}`,
    entry.sweetness != null && `SWEETNESS: ${entry.sweetness}/5`,
    entry.saltiness != null && `SALTINESS: ${entry.saltiness}/5`,
  ].filter(Boolean);

  return (
    <li style={styles.card}>
      {entry.photo_url ? (
        <img src={entry.photo_url} alt={entry.title} style={styles.image} />
      ) : (
        <div style={styles.noImage}>IMAGE PENDING</div>
      )}
      <div style={styles.body}>
        <p style={styles.label}>SUBMITTED: {entry.created_at.slice(0, 10)}</p>
        <p style={styles.label}>SOURCE: {entry.source}</p>
        {entry.contributor && <p style={styles.label}>CONTRIBUTED BY: {entry.contributor}</p>}
        <h2 style={styles.title}>{entry.title}</h2>
        {entry.title_khmer && <p style={styles.titleKhmer}>{entry.title_khmer}</p>}
        {facts.length > 0 && <p style={styles.text}>{facts.join(" · ")}</p>}
        <p style={styles.text}>{entry.description}</p>
        {entry.description_khmer && <p style={styles.textKhmer}>{entry.description_khmer}</p>}
        <ReviewButtons disabled={disabled} onDecide={onDecide} />
        {failed && (
          <div style={styles.failed}>
            <BilingualNotice en={FAILED_EN} km={FAILED_KM} />
          </div>
        )}
      </div>
    </li>
  );
}
