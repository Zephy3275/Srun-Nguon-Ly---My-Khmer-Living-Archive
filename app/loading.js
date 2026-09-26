const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
  },
  text: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 1,
    color: "#2EE6A8",
  },
};

export default function Loading() {
  return (
    <main style={styles.wrap}>
      <p style={styles.text}>LOADING THE ARCHIVE…</p>
    </main>
  );
}
