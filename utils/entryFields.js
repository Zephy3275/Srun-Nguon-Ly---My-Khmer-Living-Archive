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
// counter: shows a live "used / max" count under the field. The max values
//          must match the limits in validateEntry.js. A "words" counter cannot
//          use maxLength, so FormField clips the words itself (clipWords).

export const FIELDS = [
  { name: "title", required: true, label: "TITLE", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "Required. Up to 120 characters." },
  { name: "title_khmer", label: "TITLE (KHMER)", kind: "text", lang: "km", maxLength: 500, counter: { unit: "characters", max: 500 }, hint: "Optional. Up to 500 characters. Leave it empty if you don't know Khmer." },
  // The description is limited in words (1,000) AND, as a backstop, in characters (10,000).
  { name: "description", required: true, label: "DESCRIPTION", kind: "textarea", maxLength: 10000, counter: { unit: "words", max: 1000 }, hint: "Required. Up to 1,000 words." },
  { name: "description_khmer", label: "DESCRIPTION (KHMER)", kind: "textarea", lang: "km", maxLength: 6000, counter: { unit: "characters", max: 6000 }, hint: "Optional. Up to 6,000 characters. Leave it empty if you don't know Khmer." },
  { name: "source", required: true, label: "SOURCE", kind: "text", maxLength: 300, counter: { unit: "characters", max: 300 }, hint: "Required. Who or where this comes from. Up to 300 characters." },
  { name: "filling", required: true, label: "FILLING", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "Required. Up to 120 characters." },
  { name: "shape", required: true, label: "SHAPE", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "Required. Up to 120 characters." },
  { name: "color", required: true, label: "COLOR", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "Required. Up to 120 characters." },
  { name: "texture", label: "TEXTURE", kind: "text", maxLength: 120, counter: { unit: "characters", max: 120 }, hint: "Optional. Words, not numbers. Up to 120 characters." },
  { name: "sweetness", label: "SWEETNESS", kind: "scale", hint: "Optional. 1 to 5." },
  { name: "saltiness", label: "SALTINESS", kind: "scale", hint: "Optional. 1 to 5." },
  { name: "photo", required: true, label: "PHOTO", kind: "file", hint: "Required. JPG, PNG or WebP, up to 5 MB." },
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
