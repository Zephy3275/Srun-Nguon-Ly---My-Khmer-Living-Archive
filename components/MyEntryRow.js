import Link from "next/link";
import StatusBadge from "./StatusBadge.js";

// One line of /my-entries: the title (opens the entry), its status, and what
// the status means for the contributor.

const HINTS = {
  pending: "Waiting for review. Only you can see it for now.",
  returned: "This entry was returned. Edit it and save to send it for review again.",
};

const styles = {
  row: {
    // The title link's cover (below) stretches to this box, so the whole row opens the entry.
    position: "relative",
    padding: 20,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
  },
  title: {
    display: "block",
    fontFamily: "var(--font-heading)",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.2,
    color: "inherit",
    textDecoration: "none",
  },
  // An empty span inside the title link, stretched over the whole row. It keeps
  // one link (not two) and lets EDIT stay its own link instead of nesting in one.
  cover: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 },
  titleKhmer: {
    fontFamily: "var(--font-heading)",
    fontSize: 16,
    color: "var(--text-soft)",
    margin: "2px 0 0",
  },
  statusRow: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 12 },
  hint: { fontSize: 14, color: "var(--muted)", lineHeight: 1.5, margin: 0 },
  // The reviewer's reason for a returned entry. Plain text (React escapes it);
  // pre-wrap keeps the reviewer's line breaks.
  note: {
    marginTop: 12,
    padding: "10px 14px",
    borderLeft: "3px solid var(--danger)",
    backgroundColor: "var(--bg)",
    borderRadius: 4,
  },
  noteLabel: { margin: 0, fontFamily: "var(--font-label)", fontSize: 12, color: "var(--muted)" },
  noteEn: { letterSpacing: 1 },
  noteKm: { marginLeft: 8 },
  noteText: {
    margin: "6px 0 0",
    fontSize: 15,
    color: "var(--text-soft)",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
  },
  edit: {
    // Above the cover, so a click on EDIT goes to the edit page, not the entry.
    position: "relative",
    zIndex: 1,
    padding: "6px 12px",
    fontFamily: "var(--font-label)",
    fontSize: 13,
    letterSpacing: 1,
    color: "var(--accent)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    textDecoration: "none",
  },
};

export default function MyEntryRow({ entry }) {
  const hint = HINTS[entry.status];
  return (
    <li style={styles.row}>
      <Link href={`/entries/${entry.id}`} style={styles.title}>
        {entry.title}
        <span style={styles.cover} />
      </Link>
      {entry.title_khmer && <p style={styles.titleKhmer}>{entry.title_khmer}</p>}
      <div style={styles.statusRow}>
        <StatusBadge status={entry.status} />
        {entry.status === "returned" && (
          <Link href={`/entries/${entry.id}/edit`} style={styles.edit}>
            EDIT
          </Link>
        )}
      </div>
      {hint && <p style={{ ...styles.hint, marginTop: 10 }}>{hint}</p>}
      {entry.status === "returned" && entry.review_note && (
        <div style={styles.note}>
          <p style={styles.noteLabel}>
            <span style={styles.noteEn}>REVIEWER'S NOTE</span>
            <span style={styles.noteKm} lang="km">
              កំណត់សម្គាល់របស់អ្នកវាយតម្លៃ
            </span>
          </p>
          <p style={styles.noteText}>{entry.review_note}</p>
        </div>
      )}
    </li>
  );
}
