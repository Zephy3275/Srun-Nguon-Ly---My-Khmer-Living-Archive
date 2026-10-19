import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard.js";
import ContextAbout from "../components/ContextAbout.js";
import HeroMoon from "../components/HeroMoon.js";
import MoonPhases from "../components/MoonPhases.js";
import { createClient } from "../utils/supabase/server.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "40px 24px 80px",
  },
  hero: { textAlign: "center" },
  kicker: {
    fontFamily: "var(--font-label)",
    color: "var(--accent)",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 2,
    margin: 0,
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: 54,
    fontWeight: 600,
    margin: "10px 0 16px",
    lineHeight: 1.08,
  },
  description: {
    fontSize: 18,
    color: "var(--muted)",
    lineHeight: 1.6,
    margin: "0 auto",
    maxWidth: 560,
  },
  card: {
    marginTop: 48,
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
  },
  cardLabel: {
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--muted)",
    margin: 0,
  },
  cardValue: {
    fontSize: 16,
    margin: "6px 0 0",
  },
  count: {
    fontFamily: "var(--font-label)",
    fontSize: 14,
    color: "var(--accent)",
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
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    fontSize: 15,
    color: "var(--muted)",
    lineHeight: 1.7,
  },
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: "1px solid var(--border)",
    fontSize: 13,
    color: "var(--faint)",
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
      <section style={styles.hero}>
        <HeroMoon />
        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>{collection.name}</h1>
        <p style={styles.description}>{collection.description}</p>
      </section>
      <MoonPhases />

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