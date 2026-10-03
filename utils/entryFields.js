// The fields a contributor fills in on /contribute. One list drives both the
// form (what to draw) and the starting state (what each field begins as).
// Not here on purpose: owner (comes from the login session), id, created_at
// (the database fills them) and photo_url (produced by the upload).
//
// kind: "text" = one line, "textarea" = paragraph, "scale" = 1-5 dropdown,
//       "file" = the photo picker.
// lang: "km" tells the browser to use a Khmer font for that field.
// counter: shows a live "used / max" count under the field. The max values
//          must match the limits in validateEntry.js.

export const FIELDS = [
  { name: "title", label: "TITLE", kind: "text", counter: { unit: "characters", max: 120 }, hint: "Required. Up to 120 characters." },
  { name: "title_khmer", label: "TITLE (KHMER)", kind: "text", lang: "km", counter: { unit: "characters", max: 500 }, hint: "Required. Khmer letters only, no English." },
  { name: "description", label: "DESCRIPTION", kind: "textarea", counter: { unit: "words", max: 1000 }, hint: "Required. Up to 1,000 words." },
  { name: "description_khmer", label: "DESCRIPTION (KHMER)", kind: "textarea", lang: "km", counter: { unit: "characters", max: 6000 }, hint: "Required. Up to 6,000 characters. English only inside (brackets)." },
  { name: "source", label: "SOURCE", kind: "text", hint: "Required. Who or where this comes from. Up to 300 characters." },
  { name: "filling", label: "FILLING", kind: "text", hint: "Required. Up to 120 characters." },
  { name: "shape", label: "SHAPE", kind: "text", hint: "Required. Up to 120 characters." },
  { name: "color", label: "COLOR", kind: "text", hint: "Required. Up to 120 characters." },
  { name: "texture", label: "TEXTURE", kind: "text", hint: "Optional. Words, not numbers. Up to 120 characters." },
  { name: "sweetness", label: "SWEETNESS", kind: "scale", hint: "Optional. 1 to 5." },
  { name: "saltiness", label: "SALTINESS", kind: "scale", hint: "Optional. 1 to 5." },
  { name: "photo", label: "PHOTO", kind: "file", hint: "Required. JPG, PNG or WebP, up to 5 MB." },
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
