import Link from "next/link";
import entries from "../../../data/entries.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
  },
  back: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 1,
    color: "#2EE6A8",
    textDecoration: "none",
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#2EE6A8",
    fontSize: 14,
    letterSpacing: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  titleKhmer: {
    fontSize: 22,
    fontWeight: 500,
    color: "#C7CFDB",
    margin: "0 0 16px",
    lineHeight: 1.3,
  },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
    margin: "0 0 20px",
  },
  image: {
    width: "100%",
    maxHeight: 420,
    objectFit: "cover",
    borderRadius: 10,
    display: "block",
  },
  description: {
    fontSize: 17,
    color: "#97A1B3",
    lineHeight: 1.6,
    marginTop: 24,
  },
  descriptionKhmer: {
    fontSize: 16,
    color: "#7C8698",
    lineHeight: 1.8,
    marginTop: 12,
    borderTop: "1px solid #2E3644",
    paddingTop: 12,
  },
};

export default async function EntryPage({ params }) {
  const { id } = await params;
  const entry = entries.find((e) => e.id === id);

  if (!entry) {
    return (
      <main style={styles.wrap}>
        <Link href="/browse" style={styles.back}>
          ← BACK TO BROWSE
        </Link>
        <p style={styles.kicker}>ARCHIVE ENTRY</p>
        <h1 style={styles.title}>Entry not found</h1>
        <p style={styles.description}>
          There is no entry with that id in the archive yet.
        </p>
      </main>
    );
  }

  return (
    <main style={styles.wrap}>
      <Link href="/browse" style={styles.back}>
        ← BACK TO BROWSE
      </Link>
      <p style={styles.kicker}>ARCHIVE ENTRY</p>
      <h1 style={styles.title}>{entry.title}</h1>
      {entry.titleKhmer && (
        <h2 style={styles.titleKhmer}>{entry.titleKhmer}</h2>
      )}
      <p style={styles.label}>SOURCE: {entry.source}</p>
      {entry.image && (
        <img src={entry.image} alt={entry.title} style={styles.image} />
      )}
      {entry.description && (
        <p style={styles.description}>{entry.description}</p>
      )}
      {entry.descriptionKhmer && (
        <p style={styles.descriptionKhmer}>{entry.descriptionKhmer}</p>
      )}
    </main>
  );
}