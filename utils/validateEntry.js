// Checks the text fields of the contribution form. Pure functions: no
// network, no React. Returns { fieldName: "message" } - an empty object
// means everything passed. The photo is checked in photoCheck.js.
// Rules come from Week7_Lab7/TableRule_Refined.md.
// Khmer text is only ever trimmed and inspected, never changed.

const LETTER = /\p{L}/u;
const DIGIT = /\p{Nd}/u; // any script, so Khmer digits (០-៩) count too
const CONTROL = /\p{Cc}/u; // invisible control characters, e.g. a null byte
const LATIN = /\p{Script=Latin}/u;
const KHMER = /\p{Script=Khmer}/u;

// Count characters the way Postgres does (code points, not UTF-16 units).
// Exported so the live counters on the form count exactly what validation counts.
export const size = (s) => [...s].length;
export const words = (s) => s.split(/\s+/).filter(Boolean).length;
// A Khmer letter, not just a Khmer digit or a vowel mark on its own.
const hasKhmerLetter = (s) => [...s].some((c) => LETTER.test(c) && KHMER.test(c));
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

  plain("title", 120, "Add a title (up to 120 characters).");
  plain("source", 300, "Say where this comes from (up to 300 characters).");
  plain("filling", 120, "Describe the filling (up to 120 characters).");
  plain("shape", 120, "Describe the shape (up to 120 characters).");
  plain("color", 120, "Describe the color (up to 120 characters).");

  const tk = v.title_khmer;
  if (!hasKhmerLetter(tk) || LATIN.test(tk) || size(tk) > 500 || CONTROL.test(tk)) {
    errors.title_khmer = "Write the title in Khmer (no English letters, up to 500 characters).";
  }

  const d = v.description;
  if (!LETTER.test(d) || hasControl(d) || words(d) > 1000 || size(d) > 10000) {
    errors.description = "Add a description (up to 1,000 words).";
  }

  // English is allowed only inside ( ) in the Khmer description, e.g. "(Pia)".
  const dk = v.description_khmer;
  const outsideBrackets = dk.replace(/\([^)]*\)/g, "");
  if (!hasKhmerLetter(dk) || LATIN.test(outsideBrackets) || size(dk) > 6000 || hasControl(dk)) {
    errors.description_khmer =
      "Write the description in Khmer (up to 6,000 characters). English only inside (brackets).";
  }

  // Optional fields: an empty value is fine, a filled one must pass.
  const tx = v.texture;
  if (tx !== "" && (!LETTER.test(tx) || DIGIT.test(tx) || size(tx) > 120 || CONTROL.test(tx))) {
    errors.texture = "Texture should be words, not numbers (up to 120 characters).";
  }
  for (const name of ["sweetness", "saltiness"]) {
    if (v[name] !== "" && !/^[1-5]$/.test(v[name])) {
      errors[name] = "Pick 1 to 5, or leave it empty.";
    }
  }

  return errors;
}
