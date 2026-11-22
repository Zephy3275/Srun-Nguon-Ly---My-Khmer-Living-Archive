"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client.js";
import BilingualNotice from "./BilingualNotice.js";
import ReviewButtons from "./ReviewButtons.js";
import { STRINGS, t } from "../utils/strings.js";

// Final sprint: a reviewer can take a published entry down by returning it.
// The entry page shows this box only to reviewers and only on a published
// entry. That is politeness: the real check is review_entry in the database,
// which refuses anyone who is not a reviewer and, for a published entry,
// accepts only 'returned'. It returns false WITHOUT an error when it refuses,
// so success is exactly `data === true`, the same as the review queue.
// A returned entry leaves the public pages and shows as RETURNED, with the
// note, on its owner's MY ENTRIES.

// "That didn't go through. ..." : the student's English and Khmer (K12).
const FAILED = STRINGS.K12;

const styles = {
  box: {
    marginTop: 40,
    padding: 20,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
  },
  kicker: {
    margin: 0,
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--accent)",
  },
  failed: { marginTop: 16 },
};

export default function TakeDownButton({ id, lang }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function takeDown(decision, note) {
    if (decision !== "returned") return; // only RETURN is shown here
    setBusy(true);
    setFailed(false);
    const supabase = createClient();
    // The note travels only when there is one; otherwise the function's default (null).
    const args = { entry_id: id, decision: "returned" };
    if (note) args.note = note;
    const { data, error } = await supabase.rpc("review_entry", args);

    if (error || data !== true) {
      console.error("Take-down was not applied:", error ?? "review_entry returned", data);
      setBusy(false);
      setFailed(true);
      return;
    }
    // Back to the home page, where the entry is no longer listed.
    router.push("/");
    router.refresh();
  }

  return (
    <section style={styles.box}>
      <p lang={lang === "km" ? "km" : undefined} style={styles.kicker}>
        {t(lang, "R1")}
      </p>
      <ReviewButtons showPublish={false} disabled={busy} onDecide={takeDown} lang={lang} />
      {failed && (
        <div style={styles.failed}>
          <BilingualNotice en={FAILED.en} km={FAILED.km} lang={lang} />
        </div>
      )}
    </section>
  );
}
