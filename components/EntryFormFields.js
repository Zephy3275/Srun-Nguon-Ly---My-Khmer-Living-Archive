import FormField from "./FormField.js";
import PhotoPreview from "./PhotoPreview.js";
import { FIELDS } from "../utils/entryFields.js";

// Draws every field of the entry form. Shared by /contribute (add) and the edit
// page. When `currentPhoto` is given we are editing: the photo shows with a
// hint that picking a new file is optional (so it is no longer marked required).
// Whichever photo is chosen shows above the picker as a preview.

const styles = {
  item: { display: "flex", flexDirection: "column", gap: 12 },
};

const EDIT_PHOTO_HINT =
  "Optional. Choose a file only if you want to replace the current photo. JPG, PNG or WebP, up to 5 MB.";

export default function EntryFormFields({ values, errors, onChange, currentPhoto }) {
  return FIELDS.map((field) => {
    const isPhoto = field.kind === "file";
    const shown =
      isPhoto && currentPhoto !== undefined
        ? { ...field, required: false, hint: EDIT_PHOTO_HINT }
        : field;
    return (
      <div key={field.name} style={styles.item}>
        {isPhoto && (
          <PhotoPreview file={values.photo} currentPhoto={currentPhoto} />
        )}
        <FormField
          field={shown}
          value={values[field.name]}
          error={errors[field.name]}
          onChange={onChange}
        />
      </div>
    );
  });
}
