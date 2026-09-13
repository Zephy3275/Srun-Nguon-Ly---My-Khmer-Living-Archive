import Link from "next/link";

const styles = {
  link: {
    display: "block",
    width: 300,
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
    overflow: "hidden",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    display: "block",
  },
  imageFallback: {
    width: "100%",
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#5A6373",
    backgroundColor: "#14181F",
  },
  body: { padding: 16 },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
    margin: 0,
  },
  title: { fontSize: 18, fontWeight: 600, margin: "6px 0 0" },
  titleKhmer: {
    fontSize: 15,
    fontWeight: 500,
    margin: "2px 0 0",
    color: "#C7CFDB",
    lineHeight: 1.4,
  },
  description: {
    fontSize: 14,
    color: "#97A1B3",
    lineHeight: 1.5,
    margin: "8px 0 0",
  },
  descriptionKhmer: {
    fontSize: 13,
    color: "#7C8698",
    lineHeight: 1.6,
    margin: "10px 0 0",
    paddingTop: 8,
    borderTop: "1px solid #2E3644",
  },
};

export default function EntryCard({
  id,
  title,
  titleKhmer,
  source,
  description,
  descriptionKhmer,
  image,
}) {
  return (
    <Link href={`/entries/${id}`} style={styles.link}>
      <div style={styles.card}>
        {image ? (
          <img src={image} alt={title} style={styles.image} />
        ) : (
          <div style={styles.imageFallback}>IMAGE PENDING</div>
        )}
        <div style={styles.body}>
          <p style={styles.label}>SOURCE: {source}</p>
          <p style={styles.title}>{title}</p>
          {titleKhmer && <p style={styles.titleKhmer}>{titleKhmer}</p>}
          {description && <p style={styles.description}>{description}</p>}
          {descriptionKhmer && (
            <p style={styles.descriptionKhmer}>{descriptionKhmer}</p>
          )}
        </div>
      </div>
    </Link>
  );
}