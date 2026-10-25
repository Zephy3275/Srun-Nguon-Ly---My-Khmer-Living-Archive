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
  titleKhmer: {
    fontFamily: "var(--font-heading)",
    fontSize: 16,
    color: "var(--text-soft)",
    margin: "2px 0 0",
  },
  statusRow: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 12 },
  hint: { fontSize: 14, color: "var(--muted)", lineHeight: 1.5, margin: 0 },
  edit: {
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
    </li>
  );
}
