// Saves a new entry: upload the photo, then insert the row.
// Takes already-trimmed, already-validated values. Returns { id } on success
// or { error: "short message the user can act on" }. The real error is only
// ever logged with console.error, never returned to the screen.

import {
  entryColumns,
  getSessionUser,
  uploadPhoto,
  removeUploadedPhoto,
} from "./entryWrite.js";

// onStage is optional: a function the form passes in to be told which step is
// running ("UPLOADING PHOTO…", "SAVING ENTRY…") so it can show it. It changes
// nothing about what is saved.
export async function submitEntry(supabase, values, photoType, onStage) {
  const user = await getSessionUser(supabase);
  if (!user) return { error: "Your session has ended. Please log in again." };

  onStage?.("UPLOADING PHOTO…");
  const photo = await uploadPhoto(supabase, user.id, values.photo, photoType);
  if (photo.error) return { error: photo.error };

  // Every column is named inside entryColumns(): nothing from the form reaches
  // the table by accident. owner is set here from the session.
  onStage?.("SAVING ENTRY…");
  const { data, error: insertError } = await supabase
    .from("entries")
    .insert({ owner: user.id, ...entryColumns(values), photo_url: photo.publicUrl })
    .select("id")
    .single();

  if (insertError) {
    console.error("Entry insert failed:", insertError);
    await removeUploadedPhoto(supabase, photo.path); // don't leave an orphan
    return { error: "Your entry couldn't be saved. Please try again in a moment." };
  }

  return { id: data.id };
}
