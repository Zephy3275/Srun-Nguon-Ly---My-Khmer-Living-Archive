import Link from "next/link";
import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard.js";
import ContextAbout from "../components/ContextAbout.js";
import AuthHeader from "../components/AuthHeader.js";
import { createClient } from "../utils/supabase/server.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#2EE6A8",
    fontSize: 14,
    letterSpacing: 1,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    marginBottom: 40,
  },
  navLink: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 1,
    color: "#2EE6A8",
    textDecoration: "none",
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  description: {
    fontSize: 18,
    color: "#97A1B3",
    lineHeight: 1.6,
    margin: 0,
  },
  card: {
    marginTop: 48,
    padding: 24,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
  },
  cardLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
    margin: 0,
  },
  cardValue: {
    fontSize: 16,
    margin: "6px 0 0",
  },
  count: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    color: "#2EE6A8",
    marginTop: 48,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 24,
  },
  notice: {
    marginTop: 24,
    padding: 24,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
    fontSize: 15,
    color: "#97A1B3",
    lineHeight: 1.7,
  },
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: "1px solid #2E3644",
    fontSize: 13,
    color: "#5A6373",
  },
};

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, title, titleKhmer:title_khmer, source, description, descriptionKhmer:description_khmer, image:photo_url"
    )
    .order("created_at", { ascending: false });
  const entries = data ?? [];

  return (
    <main style={styles.wrap}>
      <nav style={styles.nav}>
        <Link href="/browse" style={styles.navLink}>
          BROWSE THE COLLECTION ↗
        </Link>
        <AuthHeader />
      </nav>

      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>{collection.name}</h1>
      <p style={styles.description}>{collection.description}</p>

      <div style={styles.card}>
        <p style={styles.cardLabel}>CURATED BY</p>
        <p style={styles.cardValue}>{collection.curator}</p>
      </div>
      <div style={styles.card}>
        <p style={styles.cardLabel}>SOURCE</p>
        <p style={styles.cardValue}>{collection.source}</p>
      </div>
      <div style={styles.card}>
        <p style={styles.cardLabel}>CITY</p>
        <p style={styles.cardValue}>{collection.city}</p>
      </div>

      <ContextAbout />

      {error ? (
        <p style={styles.notice}>
          We couldn't load the archive right now. Please try again in a moment.
        </p>
      ) : entries.length === 0 ? (
        <p style={styles.notice}>No entries in the archive yet.</p>
      ) : (
        <>
          <p style={styles.count}>entries in the archive: {entries.length}</p>

          <div style={styles.grid}>
            {entries.map((entry) => (
              <EntryCard key={entry.id} {...entry} />
            ))}
          </div>
        </>
      )}

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}