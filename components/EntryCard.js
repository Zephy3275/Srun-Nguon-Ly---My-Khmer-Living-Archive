const styles = {
  card: {
    width: 300,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    display: "block",
  },
  body: { padding: 16 },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
    margin: 0,
  },
  title: { fontSize: 18, fontWeight: 600, margin: "6px 0 0" },
  description: {
    fontSize: 14,
    color: "#97A1B3",
    lineHeight: 1.5,
    margin: "8px 0 0",
  },
};

export default function EntryCard({ title, source, description, image }) {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <div style={styles.body}>
        <p style={styles.label}>SOURCE: {source}</p>
        <p style={styles.title}>{title}</p>
        {description && <p style={styles.description}>{description}</p>}
      </div>
    </div>
  );
}