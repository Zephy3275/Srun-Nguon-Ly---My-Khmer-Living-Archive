"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client.js";
import { FIELDS, EMPTY_VALUES } from "../utils/entryFields.js";
import { trimValues, validateEntry } from "../utils/validateEntry.js";
import { checkPhoto } from "../utils/photoCheck.js";
import { submitEntry } from "../utils/submitEntry.js";
import FormField from "./FormField.js";

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

export default function ContributeForm() {
  const router = useRouter();
  const [values, setValues] = useState(EMPTY_VALUES);
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
      const photo = await checkPhoto(clean.photo);
      if (photo.message) found.photo = photo.message;
      setErrors(found);
      if (Object.keys(found).length > 0) {
        setLoading(false);
        return;
      }

      const result = await submitEntry(createClient(), clean, photo.type);
      if (result.error) {
        setFormError(result.error);
        setLoading(false);
        return;
      }
      router.push(`/entries/${result.id}`);
      router.refresh();
    } catch (err) {
      console.error("Contribute failed unexpectedly:", err);
      setFormError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      {FIELDS.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          onChange={handleChange}
        />
      ))}

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "SAVING…" : "ADD TO THE ARCHIVE"}
      </button>

      {formError && <p style={styles.error}>{formError}</p>}
    </form>
  );
}
