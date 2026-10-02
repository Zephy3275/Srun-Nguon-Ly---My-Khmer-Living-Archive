// Saves a new entry: upload the photo, then insert the row.
// Takes already-trimmed, already-validated values. Returns { id } on success
// or { error: "short message the user can act on" }. The real error is only
// ever logged with console.error, never returned to the screen.

const BUCKET = "photos";

export async function submitEntry(supabase, values, photoType) {
  // Owner comes from the login session, never from the form.
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    if (userError) console.error("getUser failed:", userError);
    return { error: "Your session has ended. Please log in again." };
  }

  // <user id>/<random uuid>.<ext> - the original filename is never used, and
  // the extension comes from the detected type. upsert:false = never overwrite.
  const path = `${user.id}/${crypto.randomUUID()}.${photoType.ext}`;
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, values.photo, { contentType: photoType.mime, upsert: false });
  if (uploadError) {
    console.error("Photo upload failed:", uploadError);
    return { error: "Your photo didn't upload. Check your connection and try again." };
  }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path);

  // Every column is named: nothing from the form reaches the table by accident.
  const { data, error: insertError } = await supabase
    .from("entries")
    .insert({
      owner: user.id,
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
      photo_url: publicUrl,
    })
    .select("id")
    .single();

  if (insertError) {
    console.error("Entry insert failed:", insertError);
    // Don't leave an orphaned photo behind (the policy allows deleting your own).
    const { error: removeError } = await supabase.storage.from(BUCKET).remove([path]);
    if (removeError) console.error("Photo cleanup failed:", removeError);
    return { error: "Your entry couldn't be saved. Please try again in a moment." };
  }

  return { id: data.id };
}
