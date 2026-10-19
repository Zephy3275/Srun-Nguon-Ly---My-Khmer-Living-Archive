import Link from "next/link";

// The "← BACK TO …" link at the top of a page. One place for its look, so every
// page's back link matches. Hover underline comes from .back-link in globals.css.

const styles = {
  link: {
    display: "inline-block",
    marginBottom: 16,
    fontFamily: "'Courier New', monospace",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 1,
    color: "var(--accent)",
  },
};

export default function BackLink({ href, children }) {
  return (
    <Link href={href} className="back-link" style={styles.link}>
      {children}
    </Link>
  );
}
