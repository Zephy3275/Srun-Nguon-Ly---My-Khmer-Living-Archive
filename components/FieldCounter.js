import { size, words } from "../utils/validateEntry.js";
import { t } from "../utils/strings.js";

// Live "used / max" count shown under a field. Counts the trimmed text with the
// same functions validation uses, and turns red when the limit is reached (the
// form stops accepting more at that point, so the colour explains why).

const styles = {
  count: {
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--muted-dim)",
    whiteSpace: "nowrap",
  },
  over: {
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--danger)",
    whiteSpace: "nowrap",
  },
};

// The unit word ("characters" / "words") in the chosen language.
const UNITS = { characters: "F21", words: "F22" };

export default function FieldCounter({ value, counter, lang }) {
  const text = value.trim();
  const used = counter.unit === "words" ? words(text) : size(text);
  return (
    <span style={used >= counter.max ? styles.over : styles.count}>
      {used.toLocaleString("en-US")} / {counter.max.toLocaleString("en-US")}{" "}
      {t(lang, UNITS[counter.unit])}
    </span>
  );
}
