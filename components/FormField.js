// One labelled form control (text, paragraph, 1-5 dropdown or file picker)
// with its hint underneath. When `error` is set, the message replaces the hint
// in red, right next to the field that needs fixing. Fields with a `counter`
// in entryFields.js also show a live count at the right.

import FieldCounter from "./FieldCounter.js";

const styles = {
  wrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
  },
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
    "aria-invalid": error ? true : undefined,
    "aria-describedby": `${id}-note`,
    style: error ? { ...styles.input, ...styles.inputError } : styles.input,
  };
  const change = (e) => onChange(field.name, e.target.value);

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
      <label style={styles.label} htmlFor={id}>
        {field.label}
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
