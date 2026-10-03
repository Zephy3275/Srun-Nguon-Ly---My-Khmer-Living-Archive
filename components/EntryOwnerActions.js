import Link from "next/link";
import DeleteEntryButton from "./DeleteEntryButton.js";

// Edit + Delete for one entry. The page only renders this when the logged-in
// user is the entry's owner. That is politeness, not security: the real refusal
// is the owner-only row-level security policies in the database.

const styles = {
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 40,
    paddingTop: 24,
    borderTop: "1px solid #2E3644",
  },
  edit: {
    padding: "10px 14px",
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    letterSpacing: 1,
    color: "#2EE6A8",
    border: "1px solid #2E3644",
    borderRadius: 8,
    backgroundColor: "#1C222C",
    textDecoration: "none",
  },
};

export default function EntryOwnerActions({ id }) {
  return (
    <div style={styles.row}>
      <Link href={`/entries/${id}/edit`} style={styles.edit}>
        EDIT
      </Link>
      <DeleteEntryButton id={id} />
    </div>
  );
}
