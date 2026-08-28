import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard.js";

const entries = [
  {
    title: "Mooncake Ngoyen Egg 1",
    source: "My uncle's shop",
    description:
      "A classic style mooncake. When people think of mooncake, they think of a cake that have mixture of various ingredients packing many flavors.",
    image: "/images/mooncake_egg_1.jpg",
  },
  {
    title: "Mooncake Ngoyen Egg 2",
    source: "My uncle's shop",
    description:
      "A premium classic. Only slightly bigger than the mooncake egg 1 but with 2 eggs. Perfect for those with a bigger appetite.",
    image: "/images/mooncake_egg_2.jpg",
  },
];

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
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: "1px solid #2E3644",
    fontSize: 13,
    color: "#5A6373",
  },
};

export default function Home() {
  return (
    <main style={styles.wrap}>
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

      <p style={styles.count}>entries in the archive: {entries.length}</p>

      <div style={styles.grid}>
        {entries.map((entry) => (
          <EntryCard key={entry.title} {...entry} />
        ))}
      </div>

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}