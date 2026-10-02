import { size, words } from "../utils/validateEntry.js";

// Live "used / max" count shown under a field. Counts the trimmed text with the
// same functions validation uses, and turns red once the limit is passed.

const styles = {
  count: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#7C8698",
    whiteSpace: "nowrap",
  },
  over: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#E86A5A",
    whiteSpace: "nowrap",
  },
};

export default function FieldCounter({ value, counter }) {
  const text = value.trim();
  const used = counter.unit === "words" ? words(text) : size(text);
  return (
    <span style={used > counter.max ? styles.over : styles.count}>
      {used.toLocaleString("en-US")} / {counter.max.toLocaleString("en-US")}{" "}
      {counter.unit}
    </span>
  );
}
