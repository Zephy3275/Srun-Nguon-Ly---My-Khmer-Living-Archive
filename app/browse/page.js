import collection from "../../collection.config.js";
import entries from "../../data/entries.js";
import SearchFilter from "../../components/SearchFilter.js";

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
    fontSize: 32,
    fontWeight: 700,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
};

export default function Browse() {
  return (
    <main style={styles.wrap}>
      <p style={styles.kicker}>BROWSE THE COLLECTION</p>
      <h1 style={styles.title}>{collection.name}</h1>

      <SearchFilter entries={entries} />
    </main>
  );
}