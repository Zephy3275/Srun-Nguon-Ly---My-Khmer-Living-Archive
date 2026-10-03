// Saves changes to an existing entry. Same inputs as submitEntry, plus the
// entry's id. photoType is null when the user kept the old photo.
// Returns { id } on success or { error: "short message" }.
//
// The important part is the check after .update(): when a row-level security
// policy refuses an update, Supabase does NOT return an error. It changes zero
// rows and reports success. So we ask for the changed rows with .select() and
// treat "no row came back" as a failure. The database is the real gatekeeper
// (the owner-only policies from Lab 6); this check is how the app finds out.

import {
  entryColumns,
  getSessionUser,
  uploadPhoto,
  removeUploadedPhoto,
} from "./entryWrite.js";

const NOT_SAVED = "That change wasn't saved.";

export async function updateEntry(supabase, id, values, photoType) {
  const user = await getSessionUser(supabase);
  if (!user) return { error: "Your session has ended. Please log in again." };

  // owner and id are never sent. photo_url is sent only if a new photo was picked.
  const columns = entryColumns(values);
  let newPhotoPath = null;
  if (photoType) {
    const photo = await uploadPhoto(supabase, user.id, values.photo, photoType);
    if (photo.error) return { error: photo.error };
    newPhotoPath = photo.path;
    columns.photo_url = photo.publicUrl;
  }

  const { data, error } = await supabase
    .from("entries")
    .update(columns)
    .eq("id", id)
    .select("id");

  if (error || !data || data.length === 0) {
    console.error(
      "Entry update saved nothing:",
      error ?? "no row came back (refused by a policy, or the entry is gone)"
    );
    if (newPhotoPath) await removeUploadedPhoto(supabase, newPhotoPath);
    return { error: NOT_SAVED };
  }

  return { id: data[0].id };
}
