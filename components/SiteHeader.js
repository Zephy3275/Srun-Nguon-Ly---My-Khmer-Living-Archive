import Link from "next/link";
import AuthHeader from "./AuthHeader.js";
import LangSwitch from "./LangSwitch.js";
import { t } from "../utils/strings.js";

// The bar across the top of every page. It sticks to the top of the window while
// the page scrolls, so the way around the site is always in reach. Left: the
// archive's name with the mooncake icon (home). Right: BROWSE, the main action
// ADD AN ENTRY +, the login/sign-up/sign-out pieces from AuthHeader, and the
// language switch. `lang` comes from the layout (the "lang" cookie).
// Link looks (.nav-link, .nav-btn, .btn-filled, .btn-outline) live in globals.css.

const styles = {
  bar: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: "var(--header-bg)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid var(--border)",
  },
  inner: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "10px 24px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px 16px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "var(--font-label)",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 1,
    color: "var(--accent)",
    textDecoration: "none",
  },
  links: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 },
};

export default function SiteHeader({ lang }) {
  return (
    <header style={styles.bar}>
      <div style={styles.inner}>
        <Link href="/" style={styles.brand}>
          <img src="/icon.png" alt="" width={28} height={28} style={{ display: "block" }} />
          {t(lang, "H1")}
        </Link>
        <nav style={styles.links} aria-label={t(lang, "X1")}>
          <Link href="/browse" className="nav-link">
            {t(lang, "H2")}
          </Link>
          <Link href="/contribute" className="nav-btn btn-filled">
            {t(lang, "H3")}
          </Link>
          <AuthHeader lang={lang} />
          <LangSwitch lang={lang} />
        </nav>
      </div>
    </header>
  );
}
