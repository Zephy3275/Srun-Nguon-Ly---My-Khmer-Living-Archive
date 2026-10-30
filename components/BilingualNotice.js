// A short message in English with the Khmer under it, in one bordered box.
// Used by the review page for its three messages. The Khmer is the student's
// own wording, passed in by the caller.

const styles = {
  box: {
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    color: "var(--muted)",
    lineHeight: 1.7,
  },
  en: { margin: 0, fontSize: 15 },
  km: {
    margin: "8px 0 0",
    paddingTop: 8,
    borderTop: "1px solid var(--border)",
    fontSize: 15,
    color: "var(--muted-dim)",
  },
};

export default function BilingualNotice({ en, km }) {
  return (
    <div style={styles.box} role="status">
      <p style={styles.en}>{en}</p>
      <p style={styles.km} lang="km">
        {km}
      </p>
    </div>
  );
}
