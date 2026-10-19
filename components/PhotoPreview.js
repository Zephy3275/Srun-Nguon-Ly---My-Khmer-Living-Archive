"use client";

import { useEffect, useState } from "react";

// The picture shown above the photo picker in the entry form. A freshly chosen
// file is previewed right away (before anything is uploaded); with no new file,
// the entry's current photo shows when editing; on a new entry with nothing
// chosen yet, nothing shows. Only files the browser says are images are
// previewed; the real check (file bytes, size) still runs when the form is sent.

const styles = {
  wrap: { display: "flex", flexDirection: "column", gap: 6 },
  image: {
    width: "100%",
    maxHeight: 220,
    objectFit: "cover",
    borderRadius: 8,
    display: "block",
  },
  caption: {
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--muted)",
    margin: 0,
  },
};

export default function PhotoPreview({ file, currentPhoto }) {
  const [url, setUrl] = useState(null);

  // A temporary local address for the chosen file. It is freed again when the
  // file changes or the form closes, so previews don't pile up in memory.
  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const src = url || currentPhoto;
  if (!src) return null;

  return (
    <div style={styles.wrap}>
      <img
        src={src}
        alt={url ? "Preview of the new photo" : "Current photo"}
        style={styles.image}
      />
      <p style={styles.caption}>
        {url ? "NEW PHOTO (not saved yet)" : "CURRENT PHOTO"}
      </p>
    </div>
  );
}
