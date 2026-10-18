import Loader from "../components/Loader.js";

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
    color: "#2EE6A8",
    fontSize: 15,
  },
};

export default function Loading() {
  return (
    <main style={styles.wrap}>
      <div style={styles.center}>
        <Loader size={128} label="LOADING THE ARCHIVE…" vertical />
      </div>
    </main>
  );
}
