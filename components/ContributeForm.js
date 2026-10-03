"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client.js";
import { EMPTY_VALUES, valuesFromEntry } from "../utils/entryFields.js";
import { trimValues, validateEntry } from "../utils/validateEntry.js";
import { checkPhoto } from "../utils/photoCheck.js";
import { submitEntry } from "../utils/submitEntry.js";
import { updateEntry } from "../utils/updateEntry.js";
import EntryFormFields from "./EntryFormFields.js";

// Used twice: /contribute (no `entry` prop = add a new entry) and the edit page
// (`entry` = the row being edited, form pre-filled, new photo optional).

const styles = {
  form: { marginTop: 32, display: "flex", flexDirection: "column", gap: 20 },
  button: {
    padding: "12px 16px",
    fontSize: 15,
    fontWeight: 600,
    backgroundColor: "#1C222C",
    color: "#2EE6A8",
    border: "1px solid #2E3644",
    borderRadius: 8,
    cursor: "pointer",
  },
  error: { color: "#E86A5A", fontSize: 14, margin: 0 },
};

export default function ContributeForm({ entry }) {
  const router = useRouter();
  const editing = Boolean(entry);
  const [values, setValues] = useState(editing ? valuesFromEntry(entry) : EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Editing a field clears that field's message.
  function handleChange(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setFormError("");
    setLoading(true); // disables the button for the whole check + upload + save

    try {
      const clean = trimValues(values);
      const found = validateEntry(clean);
      // Adding: the photo is required. Editing: only check one if a new file was chosen.
      let photoType = null;
      if (!editing || clean.photo) {
        const photo = await checkPhoto(clean.photo);
        if (photo.message) found.photo = photo.message;
        photoType = photo.type;
      }
      setErrors(found);
      if (Object.keys(found).length > 0) {
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const result = editing
        ? await updateEntry(supabase, entry.id, clean, photoType)
        : await submitEntry(supabase, clean, photoType);
      if (result.error) {
        setFormError(result.error);
        setLoading(false);
        return;
      }
      router.push(`/entries/${result.id}`);
      router.refresh();
    } catch (err) {
      console.error("Contribute form failed unexpectedly:", err);
      setFormError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      <EntryFormFields
        values={values}
        errors={errors}
        onChange={handleChange}
        currentPhoto={editing ? entry.photo_url : undefined}
      />

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "SAVING…" : editing ? "SAVE CHANGES" : "ADD TO THE ARCHIVE"}
      </button>

      {formError && <p style={styles.error}>{formError}</p>}
    </form>
  );
}
