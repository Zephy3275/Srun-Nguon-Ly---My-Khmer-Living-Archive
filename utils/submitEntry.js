// Saves a new entry: upload the photo, then insert the row.
// Takes already-trimmed, already-validated values. Returns { id } on success
// or { error: "<string ID>" }: the ID of a short message the user can act on
// (utils/strings.js), which the form shows in the chosen language. The real
// error is only ever logged with console.error, never returned to the screen.

import {
  entryColumns,
  getSessionUser,
  uploadPhoto,
  removeUploadedPhoto,
} from "./entryWrite.js";

// onStage is optional: a function the form passes in to be told which step is
// running (the IDs of "UPLOADING PHOTO…" and "SAVING ENTRY…") so it can show it. It changes
// nothing about what is saved.
export async function submitEntry(supabase, values, photoType, onStage) {
  const user = await getSessionUser(supabase);
  if (!user) return { error: "F25" };

  onStage?.("F15");
  const photo = await uploadPhoto(supabase, user.id, values.photo, photoType);
  if (photo.error) return { error: photo.error };

  // Every column is named inside entryColumns(): nothing from the form reaches
  // the table by accident. owner is set here from the session.
  onStage?.("F16");
  const { data, error: insertError } = await supabase
    .from("entries")
    .insert({ owner: user.id, ...entryColumns(values), photo_url: photo.publicUrl })
    .select("id")
    .single();

  if (insertError) {
    console.error("Entry insert failed:", insertError);
    await removeUploadedPhoto(supabase, photo.path); // don't leave an orphan
    return { error: "F26" };
  }

  return { id: data.id };
}
