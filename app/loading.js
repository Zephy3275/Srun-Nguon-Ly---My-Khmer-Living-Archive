import Loader from "../components/Loader.js";
import { getLang } from "../utils/lang.js";
import { t } from "../utils/strings.js";

// Shown while a page waits for the archive. The site header (in the layout)
// stays on screen above it.

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    padding: "80px 0",
    color: "var(--accent)",
    fontSize: 15,
  },
};

export default async function Loading() {
  const lang = await getLang();
  return (
    <main style={styles.wrap}>
      <div style={styles.center}>
        <Loader size={128} label={t(lang, "P4")} vertical />
      </div>
    </main>
  );
}
