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

export async function submitEntry(supabase, values, photoType) {
  const user = await getSessionUser(supabase);
  if (!user) return { error: "Your session has ended. Please log in again." };

  const photo = await uploadPhoto(supabase, user.id, values.photo, photoType);
  if (photo.error) return { error: photo.error };

  // Every column is named inside entryColumns(): nothing from the form reaches
  // the table by accident. owner is set here from the session.
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
