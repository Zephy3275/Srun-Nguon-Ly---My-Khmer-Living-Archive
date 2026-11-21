// The fields a contributor fills in on /contribute. One list drives both the
// form (what to draw) and the starting state (what each field begins as).
// Not here on purpose: owner (comes from the login session), id, created_at
// (the database fills them) and photo_url (produced by the upload).
//
// kind: "text" = one line, "textarea" = paragraph, "scale" = 1-5 dropdown,
//       "file" = the photo picker.
// lang: "km" tells the browser to use a Khmer font for that field.
// required: true draws a red * and the label in red, and marks the input aria-required.
//           (The database/validation rules for required fields live in validateEntry.js.)
// maxLength: the browser stops accepting characters at this length, so the
//            limit is a hard stop while typing or pasting. Same numbers as the
//            rules in validateEntry.js and the database length checks.
// label, hint: string IDs in utils/strings.js (FL = field label, FH = field
//          hint; P6 = SOURCE), drawn by FormField in the chosen language.
// counter: shows a live "used / max" count under the field. The max values
//          must match the limits in validateEntry.js. A "words" counter cannot
//          use maxLength, so FormField clips the words itself (clipWords).

export const FIELDS = [
  { name: "title", required: true, label: "FL1", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "FH1" },
  { name: "title_khmer", label: "FL2", kind: "text", lang: "km", maxLength: 500, counter: { unit: "characters", max: 500 }, hint: "FH2" },
  // The description is limited in words (1,000) AND, as a backstop, in characters (10,000).
  { name: "description", required: true, label: "FL3", kind: "textarea", maxLength: 10000, counter: { unit: "words", max: 1000 }, hint: "FH3" },
  { name: "description_khmer", label: "FL4", kind: "textarea", lang: "km", maxLength: 6000, counter: { unit: "characters", max: 6000 }, hint: "FH4" },
  { name: "source", required: true, label: "P6", kind: "text", maxLength: 300, counter: { unit: "characters", max: 300 }, hint: "FH5" },
  // Who gets the credit: a display name typed by the contributor (any language, a single name is fine).
  // It is a label, not identity: the real accountability is still `owner`, taken from the login session.
  { name: "contributor", required: true, label: "FL5", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "FH6" },
  { name: "filling", required: true, label: "FL6", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "FH1" },
  { name: "shape", required: true, label: "FL7", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "FH1" },
  { name: "color", required: true, label: "FL8", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "FH1" },
  { name: "texture", label: "FL9", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "FH7" },
  { name: "sweetness", label: "FL10", kind: "scale", hint: "FH8" },
  { name: "saltiness", label: "FL11", kind: "scale", hint: "FH8" },
  { name: "photo", required: true, label: "FL12", kind: "file", hint: "FH9" },
];

// Text fields start as "", the photo starts as null (no file chosen yet).
export const EMPTY_VALUES = Object.fromEntries(
  FIELDS.map((f) => [f.name, f.kind === "file" ? null : ""])
);

// Starting values for the edit form, from a row of the entries table (the field
// names are the column names). null columns become "", numbers become strings
// for the dropdowns. The photo starts as null: a file picker can't be
// pre-filled, so "no file chosen" means "keep the current photo".
export function valuesFromEntry(entry) {
  return Object.fromEntries(
    FIELDS.map((f) => [
      f.name,
      f.kind === "file" ? null : entry[f.name] == null ? "" : String(entry[f.name]),
    ])
  );
}
