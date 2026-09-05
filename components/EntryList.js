import EntryCard from "./EntryCard.js";

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 24,
  },
};

export default function EntryList({ entries }) {
  return (
    <div style={styles.grid}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} {...entry} />
      ))}
    </div>
  );
}