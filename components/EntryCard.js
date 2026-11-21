import Link from "next/link";
import { entryText, isKhmerText, t } from "../utils/strings.js";

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
// Khmer-only mode: a Khmer title in the main title's place needs a taller line
// than 1.2, or the tops and bottoms of the Khmer letters get cut off.
styles.titleInKhmer = { ...styles.title, lineHeight: 1.5 };

export default function EntryCard({
  id,
  title,
  titleKhmer,
  source,
  contributor,
  description,
  descriptionKhmer,
  image,
  lang,
}) {
  // "both": the English, then the Khmer under it. "en": English only.
  // "km": the Khmer in the English's place (the English if there is none).
  const shownTitle = entryText(lang, title, titleKhmer);
  const shownDescription = entryText(lang, description, descriptionKhmer);
  return (
    <Link href={`/entries/${id}`} style={styles.link}>
      <div style={styles.card}>
        {image ? (
          <img src={image} alt={shownTitle} style={styles.image} />
        ) : (
          <div style={styles.imageFallback}>{t(lang, "P5")}</div>
        )}
        <div style={styles.body}>
          <p style={styles.label}>{t(lang, "P6")}: {source}</p>
          {contributor && (
            <p style={{ ...styles.label, marginTop: 2 }}>
              {t(lang, "P7")}: {contributor}
            </p>
          )}
          <p
            lang={isKhmerText(lang, titleKhmer) ? "km" : undefined}
            style={isKhmerText(lang, titleKhmer) ? styles.titleInKhmer : styles.title}
          >
            {shownTitle}
          </p>
          {lang === "both" && titleKhmer && (
            <p lang="km" style={styles.titleKhmer}>{titleKhmer}</p>
          )}
          {shownDescription && (
            <p
              lang={isKhmerText(lang, descriptionKhmer) ? "km" : undefined}
              style={styles.description}
            >
              {shownDescription}
            </p>
          )}
          {lang === "both" && descriptionKhmer && (
            <p lang="km" style={styles.descriptionKhmer}>{descriptionKhmer}</p>
          )}
        </div>
      </div>
    </Link>
  );
}