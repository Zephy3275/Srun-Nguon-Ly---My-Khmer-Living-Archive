// Saves changes to an existing entry. Same inputs as submitEntry, plus the
// entry's id. photoType is null when the user kept the old photo.
// Returns { id } on success or { error: "short message" }.
//
// The important part is the check after .update(): when a row-level security
// policy refuses an update, Supabase does NOT return an error. It changes zero
// rows and reports success. So we ask for the changed rows with .select() and
// treat "no row came back" as a failure. The database is the real gatekeeper
// (the owner-only policies from Lab 6); this check is how the app finds out.
//
// Lab 10: an edit goes back to review. Unless the editor is a reviewer, the
// update carries status: 'pending' (the update policy refuses anything else).
// Returns { id, backToReview } so the form knows which message to show.

import {
  entryColumns,
  getSessionUser,
  uploadPhoto,
  removeUploadedPhoto,
} from "./entryWrite.js";

const NOT_SAVED = "That change wasn't saved.";

// onStage is optional: a function the form passes in to be told which step is
// running, so it can show it. It changes nothing about what is saved.
export async function updateEntry(supabase, id, values, photoType, onStage) {
  const user = await getSessionUser(supabase);
  if (!user) return { error: "Your session has ended. Please log in again." };

  // Ask the database whether this user is a reviewer. If the question itself
  // fails, treat them as a non-reviewer: the safe answer sends the entry to review.
  const { data: isReviewer, error: reviewerError } = await supabase.rpc("is_reviewer");
  if (reviewerError) console.error("is_reviewer check failed:", reviewerError);
  const backToReview = isReviewer !== true;

  // owner and id are never sent. photo_url is sent only if a new photo was picked.
  const columns = entryColumns(values);
  if (backToReview) columns.status = "pending";
  let newPhotoPath = null;
  if (photoType) {
    onStage?.("UPLOADING PHOTO…");
    const photo = await uploadPhoto(supabase, user.id, values.photo, photoType);
    if (photo.error) return { error: photo.error };
    newPhotoPath = photo.path;
    columns.photo_url = photo.publicUrl;
  }

  onStage?.("SAVING CHANGES…");
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

  return { id: data[0].id, backToReview };
}
