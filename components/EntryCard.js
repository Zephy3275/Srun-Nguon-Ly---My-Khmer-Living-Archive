import Link from "next/link";

// Cut a paragraph off after 3 lines and end it with "…". Used for both the
// English and the Khmer description so every card stays about the same height.
const clamp = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const styles = {
  link: {
    display: "block",
    width: 300,
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
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
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--faint)",
    backgroundColor: "var(--bg)",
  },
  body: { padding: 16 },
  label: {
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--muted)",
    margin: 0,
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.2,
    margin: "6px 0 0",
  },
  titleKhmer: {
    fontFamily: "var(--font-heading)",
    fontSize: 16,
    fontWeight: 500,
    margin: "2px 0 0",
    color: "var(--text-soft)",
    lineHeight: 1.4,
  },
  description: {
    fontSize: 14,
    color: "var(--muted)",
    lineHeight: 1.5,
    margin: "8px 0 0",
    ...clamp,
  },
  descriptionKhmer: {
    fontSize: 13,
    color: "var(--muted-dim)",
    lineHeight: 1.6,
    margin: "10px 0 0",
    paddingTop: 8,
    ...clamp,
    borderTop: "1px solid var(--border)",
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