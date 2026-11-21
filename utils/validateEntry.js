// Checks the text fields of the contribution form. Pure functions: no
// network, no React. Returns { fieldName: "<string ID>" } - an empty object
// means everything passed. Each ID (V1 to V11) is a message in
// utils/strings.js, shown by the form in the chosen language. The photo is checked in photoCheck.js.
// Rules come from Week7_Lab7/TableRule_Refined.md.
// Khmer text is only ever trimmed and inspected, never changed.

const LETTER = /\p{L}/u;
const DIGIT = /\p{Nd}/u; // any script, so Khmer digits (០-៩) count too
const CONTROL = /\p{Cc}/u; // invisible control characters, e.g. a null byte

// Count characters the way Postgres does (code points, not UTF-16 units).
// Exported so the live counters on the form count exactly what validation counts.
export const size = (s) => [...s].length;
export const words = (s) => s.split(/\s+/).filter(Boolean).length;

// Keep only the first `max` words of `s`, exactly as typed (spaces and line
// breaks between the kept words are untouched). Text that is already within the
// limit comes back unchanged. Used by the form to stop typing/pasting at the
// word limit; the same words are counted as in `words` above.
export function clipWords(s, max) {
  let count = 0;
  let end = 0;
  for (const match of s.matchAll(/\S+/g)) {
    count += 1;
    if (count <= max) end = match.index + match[0].length;
  }
  return count > max ? s.slice(0, end) : s;
}
// Descriptions may contain line breaks; nothing else invisible is allowed.
const hasControl = (s) => CONTROL.test(s.replace(/[\n\r\t]/g, ""));

// Trim every text value. Non-text values (the photo File) pass through.
export function trimValues(values) {
  return Object.fromEntries(
    Object.entries(values).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
  );
}

export function validateEntry(v) {
  const errors = {};

  // "At least one letter" also rejects an empty field and ";;;;" style input.
  const plain = (name, max, message) => {
    const s = v[name];
    if (!LETTER.test(s) || size(s) > max || CONTROL.test(s)) errors[name] = message;
  };

  plain("title", 120, "V1");
  plain("source", 300, "V2");
  // One name is enough (no first + last rule), in any language: it only needs a letter.
  plain("contributor", 120, "V3");
  plain("filling", 120, "V4");
  plain("shape", 120, "V5");
  plain("color", 120, "V6");

  // The Khmer fields are optional (a contributor may not know Khmer). Empty is
  // fine; a filled one must have a letter and fit the limit. Any language is accepted.
  const tk = v.title_khmer;
  if (tk !== "" && (!LETTER.test(tk) || size(tk) > 500 || CONTROL.test(tk))) {
    errors.title_khmer = "V7";
  }

  const d = v.description;
  if (!LETTER.test(d) || hasControl(d) || words(d) > 1000 || size(d) > 10000) {
    errors.description = "V8";
  }

  const dk = v.description_khmer;
  if (dk !== "" && (!LETTER.test(dk) || size(dk) > 6000 || hasControl(dk))) {
    errors.description_khmer =
      "V9";
  }

  // Optional fields: an empty value is fine, a filled one must pass.
  const tx = v.texture;
  if (tx !== "" && (!LETTER.test(tx) || DIGIT.test(tx) || size(tx) > 120 || CONTROL.test(tx))) {
    errors.texture = "V10";
  }
  for (const name of ["sweetness", "saltiness"]) {
    if (v[name] !== "" && !/^[1-5]$/.test(v[name])) {
      errors[name] = "V11";
    }
  }

  return errors;
}
