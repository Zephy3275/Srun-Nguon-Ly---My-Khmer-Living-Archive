import BackLink from "./BackLink.js";

// The top of a page: back link, small label, big title and (optionally) a
// sentence under it. Browse, login, signup, contribute and edit all used to carry
// their own copy of these styles; now they share this one, so the headings are
// the same size everywhere and can be restyled in one place.
//   back: { href, label }   kicker: the small label   children: the sentence

const styles = {
  kicker: {
    fontFamily: "'Courier New', monospace",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 2,
    color: "var(--accent)",
    margin: 0,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    margin: "8px 0 12px",
    lineHeight: 1.1,
  },
  description: {
    fontSize: 18,
    color: "var(--muted)",
    lineHeight: 1.6,
    margin: "0 0 24px",
  },
};

export default function PageHeading({ back, kicker, title, children }) {
  return (
    <>
      <BackLink href={back.href}>{back.label}</BackLink>
      <p style={styles.kicker}>{kicker}</p>
      <h1 style={styles.title}>{title}</h1>
      {children && <p style={styles.description}>{children}</p>}
    </>
  );
}
