// Pieces shared by submitEntry.js (add) and updateEntry.js (edit), so the two
// can never disagree about which columns exist or where a photo goes.
// Real errors are logged with console.error; only fixed, short messages are
// ever returned for the screen.

const BUCKET = "photos";

// The current logged-in user, or null. Owner always comes from here (the
// session), never from the form.
export async function getSessionUser(supabase) {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) console.error("getUser failed:", error);
  return user ?? null;
}

// Every form column, named one by one. owner, id, created_at and photo_url are
// not here: the caller adds the ones it is allowed to set. Empty optional
// fields become null (an empty string would break the integer columns).
export function entryColumns(values) {
  return {
    title: values.title,
    title_khmer: values.title_khmer,
    description: values.description,
    description_khmer: values.description_khmer,
    source: values.source,
    filling: values.filling,
    shape: values.shape,
    color: values.color,
    texture: values.texture || null,
    sweetness: values.sweetness ? Number(values.sweetness) : null,
    saltiness: values.saltiness ? Number(values.saltiness) : null,
  };
}

// Upload to <user id>/<random uuid>.<ext>. The original filename is never used
// and the extension comes from the detected type. upsert:false = never overwrite.
// Returns { path, publicUrl } or { error: "short message" }.
export async function uploadPhoto(supabase, userId, file, photoType) {
  const path = `${userId}/${crypto.randomUUID()}.${photoType.ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: photoType.mime, upsert: false });
  if (error) {
    console.error("Photo upload failed:", error);
    return { error: "Your photo didn't upload. Check your connection and try again." };
  }
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { path, publicUrl };
}

// Removes a photo this same save just uploaded, when the save then failed.
// (The policy only allows deleting inside your own folder.)
export async function removeUploadedPhoto(supabase, path) {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) console.error("Photo cleanup failed:", error);
}
