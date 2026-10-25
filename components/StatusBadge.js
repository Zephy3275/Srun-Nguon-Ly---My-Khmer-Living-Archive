// The status of an entry in plain words, English and Khmer (the Khmer wording
// is the student's own). Used on /my-entries. An unknown status is shown as it
// is, so a new status can never silently disappear from the screen.

const WORDS = {
  pending: { en: "PENDING", km: "កំពុងរង់ចាំ", color: "var(--accent)" },
  published: { en: "PUBLISHED", km: "បានបោះពុម្ពផ្សាយ", color: "var(--text-soft)" },
  returned: { en: "RETURNED", km: "បានបញ្ជូនត្រឡប់មកវិញ", color: "var(--danger)" },
};

const styles = {
  badge: {
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: "2px 8px",
    padding: "4px 10px",
    border: "1px solid currentColor",
    borderRadius: 999,
    fontSize: 13,
  },
  // Letter spacing is for the English only: spacing between Khmer letters
  // would pull apart their stacked parts.
  en: { fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: 1 },
};

export default function StatusBadge({ status }) {
  const words = WORDS[status];
  if (!words) return <span style={styles.badge}>{status}</span>;
  return (
    <span style={{ ...styles.badge, color: words.color }}>
      <span style={styles.en}>{words.en}</span>
      <span lang="km">{words.km}</span>
    </span>
  );
}
