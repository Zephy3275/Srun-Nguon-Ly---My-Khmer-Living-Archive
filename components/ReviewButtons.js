"use client";

// The two buttons under a pending entry. They only report which one was
// pressed; ReviewQueue makes the rpc call. English in spaced capitals, Khmer
// beside it with no letter spacing (spacing would pull the Khmer stacks apart).

const styles = {
  row: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 },
  button: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 8,
    padding: "10px 16px",
    fontFamily: "var(--font-label)",
    fontSize: 14,
    borderRadius: 8,
    cursor: "pointer",
  },
  en: { fontWeight: 700, letterSpacing: 1 },
};

export default function ReviewButtons({ disabled, onDecide }) {
  return (
    <div style={styles.row}>
      <button
        type="button"
        className="btn-filled"
        style={styles.button}
        disabled={disabled}
        onClick={() => onDecide("published")}
      >
        <span style={styles.en}>PUBLISH</span>
        <span lang="km">ផ្សព្វផ្សាយ</span>
      </button>
      <button
        type="button"
        className="btn-outline"
        style={styles.button}
        disabled={disabled}
        onClick={() => onDecide("returned")}
      >
        <span style={styles.en}>RETURN</span>
        <span lang="km">ត្រឡប់មកវិញ</span>
      </button>
    </div>
  );
}
