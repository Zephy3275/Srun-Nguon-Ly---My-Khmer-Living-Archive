import Link from "next/link";

// Shown by ContributeForm instead of the form once a save has worked and the
// entry now waits for review. kind "added" = a new entry; "edited" = changes to
// an existing one (an edit sends it back to review, so it leaves the public shelf).

const MESSAGES = {
  added: {
    heading: "Thank you",
    text: "Your entry has been received and is waiting for review. It will appear in the archive once it is published. You can follow its progress under MY ENTRIES.",
  },
  edited: {
    heading: "Sent back for review",
    text: "Your changes were saved and sent back for review. The entry stays hidden from the public until it is approved. You can follow its progress under MY ENTRIES.",
  },
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
  text: { fontSize: 16, color: "var(--muted)", lineHeight: 1.7, margin: "12px 0 24px" },
  row: { display: "flex", flexWrap: "wrap", gap: 12 },
};

export default function EntrySentNotice({ kind }) {
  const message = MESSAGES[kind] ?? MESSAGES.added;
  return (
    <div style={styles.box} role="status">
      <h2 style={styles.heading}>{message.heading}</h2>
      <p style={styles.text}>{message.text}</p>
      <div style={styles.row}>
        <Link href="/my-entries" className="nav-btn btn-filled">
          MY ENTRIES
        </Link>
        <Link href="/" className="nav-btn btn-outline">
          BACK TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
}
