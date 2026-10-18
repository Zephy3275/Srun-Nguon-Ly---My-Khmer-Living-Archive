// One labelled form control (text, paragraph, 1-5 dropdown or file picker)
// with its hint underneath. When `error` is set, the message replaces the hint
// in red, right next to the field that needs fixing. Fields with a `counter`
// in entryFields.js also show a live count at the right.

import FieldCounter from "./FieldCounter.js";
import { clipWords } from "../utils/validateEntry.js";

const styles = {
  wrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
  },
  // Required fields: label text in a soft coral (lighter than the error red, so a
  // field that failed validation still stands out) and a red asterisk.
  labelRequired: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#F0998D",
  },
  star: { color: "#E86A5A" },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 16,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 8,
    color: "#E8EDF2",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  inputError: { border: "1px solid #E86A5A" },
  noteRow: { display: "flex", justifyContent: "space-between", gap: 12 },
  hint: { fontSize: 12, color: "#7C8698", margin: 0 },
  error: { fontSize: 13, color: "#E86A5A", margin: 0 },
};

export default function FormField({ field, value, error, onChange }) {
  const id = `field-${field.name}`;
  const common = {
    id,
    lang: field.lang,
    maxLength: field.maxLength, // undefined for the dropdowns and the file picker: not drawn
    "aria-required": field.required ? true : undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": `${id}-note`,
    style: error ? { ...styles.input, ...styles.inputError } : styles.input,
  };
  // A word-limited field (the description) can't use maxLength, so anything
  // typed or pasted past the last allowed word is cut off here.
  const change = (e) => {
    const text = e.target.value;
    const limit = field.counter?.unit === "words" ? field.counter.max : null;
    onChange(field.name, limit ? clipWords(text, limit) : text);
  };

  let control;
  if (field.kind === "textarea") {
    control = (
      <textarea {...common} rows={6} value={value} onChange={change} />
    );
  } else if (field.kind === "scale") {
    control = (
      <select {...common} value={value} onChange={change}>
        <option value="">Leave empty</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={String(n)}>
            {n}
          </option>
        ))}
      </select>
    );
  } else if (field.kind === "file") {
    control = (
      <input
        {...common}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => onChange(field.name, e.target.files[0] ?? null)}
      />
    );
  } else {
    control = <input {...common} type="text" value={value} onChange={change} />;
  }

  return (
    <div style={styles.wrap}>
      <label
        style={field.required ? styles.labelRequired : styles.label}
        htmlFor={id}
      >
        {field.label}
        {field.required && (
          <span style={styles.star} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {control}
      <div style={styles.noteRow}>
        <p id={`${id}-note`} style={error ? styles.error : styles.hint}>
          {error || field.hint}
        </p>
        {field.counter && <FieldCounter value={value} counter={field.counter} />}
      </div>
    </div>
  );
}
