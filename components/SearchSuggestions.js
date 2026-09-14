import Link from "next/link";

const styles = {
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  },
  item: {
    borderBottom: "1px solid #2E3644",
  },
  link: {
    display: "block",
    padding: "10px 14px",
    textDecoration: "none",
    color: "inherit",
  },
  title: {
    display: "block",
    fontSize: 15,
    color: "#E8EDF2",
  },
  khmer: {
    display: "block",
    fontSize: 14,
    color: "#C7CFDB",
    lineHeight: 1.4,
  },
};

export default function SearchSuggestions({ suggestions }) {
  return (
    <ul style={styles.list}>
      {suggestions.map((s) => (
        <li key={s.id} style={styles.item}>
          <Link
            href={`/entries/${s.id}`}
            style={styles.link}
            onMouseDown={(e) => e.preventDefault()}
          >
            <span style={styles.title}>{s.title}</span>
            {s.titleKhmer && <span style={styles.khmer}>{s.titleKhmer}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
