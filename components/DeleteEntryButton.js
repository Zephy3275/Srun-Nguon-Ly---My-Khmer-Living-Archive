"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client.js";

// Delete with an inline "are you sure?" step. Nothing is deleted until the
// second click. Like an update, a delete refused by a row-level security
// policy returns NO error: it just deletes zero rows. So we ask for the
// deleted rows with .select() and treat "no row came back" as a failure.

const base = {
  padding: "10px 14px",
  fontFamily: "'Courier New', monospace",
  fontSize: 13,
  letterSpacing: 1,
  borderRadius: 8,
  cursor: "pointer",
  backgroundColor: "#1C222C",
};

const styles = {
  row: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  ask: { fontSize: 14, color: "#C7CFDB" },
  delete: { ...base, color: "#E86A5A", border: "1px solid #E86A5A" },
  cancel: { ...base, color: "#97A1B3", border: "1px solid #2E3644" },
  error: { color: "#E86A5A", fontSize: 14, margin: "12px 0 0" },
};

export default function DeleteEntryButton({ id }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data, error: deleteError } = await supabase
      .from("entries")
      .delete()
      .eq("id", id)
      .select("id");

    if (deleteError || !data || data.length === 0) {
      console.error(
        "Entry delete removed nothing:",
        deleteError ?? "no row came back (refused by a policy, or the entry is gone)"
      );
      setError("That change wasn't saved.");
      setLoading(false);
      setConfirming(false);
      return;
    }
    router.push("/browse");
    router.refresh();
  }

  if (!confirming) {
    return (
      <div>
        <button type="button" style={styles.delete} onClick={() => setConfirming(true)}>
          DELETE
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={styles.row}>
      <span style={styles.ask}>Delete this entry? This can't be undone.</span>
      <button type="button" style={styles.delete} disabled={loading} onClick={handleDelete}>
        {loading ? "DELETING…" : "YES, DELETE"}
      </button>
      <button
        type="button"
        style={styles.cancel}
        disabled={loading}
        onClick={() => setConfirming(false)}
      >
        CANCEL
      </button>
    </div>
  );
}
