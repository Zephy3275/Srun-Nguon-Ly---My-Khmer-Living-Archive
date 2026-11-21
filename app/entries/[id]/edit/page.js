import Link from "next/link";
import BilingualNotice from "../../../../components/BilingualNotice.js";
import ContributeForm from "../../../../components/ContributeForm.js";
import PageHeading from "../../../../components/PageHeading.js";
import { createClient } from "../../../../utils/supabase/server.js";
import { getLang } from "../../../../utils/lang.js";
import { STRINGS, sentenceCase, t } from "../../../../utils/strings.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  link: {
    color: "var(--accent)",
    textDecoration: "none",
  },
  warning: { marginTop: 24 },
};

// The warning before a non-reviewer edits a published entry: the student's
// English and Khmer (K13 in utils/strings.js).
const BACK_TO_REVIEW = STRINGS.K13;

// Page frame + one heading and message, used by every state except the form.
function Notice({ id, lang, heading, children }) {
  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: `/entries/${id}`, label: t(lang, "P3") }}
        kicker={t(lang, "F5")}
        title={heading}
      >
        {children}
      </PageHeading>
    </main>
  );
}

export default async function EditEntryPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const lang = await getLang();

  if (!user) {
    return (
      <Notice id={id} lang={lang} heading={t(lang, "F6")}>
        {t(lang, "F7")}{" "}
        <Link href="/login" style={styles.link}>
          {sentenceCase(lang, "H6")}
        </Link>
      </Notice>
    );
  }

  const { data: entry, error } = await supabase
    .from("entries")
    .select(
      "id, owner, title, title_khmer, description, description_khmer, source, contributor, filling, shape, color, texture, sweetness, saltiness, photo_url, status"
    )
    .eq("id", id)
    .maybeSingle();

  // 22P02 = not a valid uuid (an old slug link): counts as not found.
  if (error && error.code !== "22P02") {
    console.error("Edit page could not load the entry:", error);
    return (
      <Notice id={id} lang={lang} heading={t(lang, "E1")}>
        {t(lang, "E2")}
      </Notice>
    );
  }

  if (!entry) {
    return (
      <Notice id={id} lang={lang} heading={t(lang, "E3")}>
        {t(lang, "E4")}
      </Notice>
    );
  }

  // Politeness only: the owner-only database policies are the real refusal.
  if (entry.owner !== user.id) {
    return (
      <Notice id={id} lang={lang} heading={t(lang, "F8")}>
        {t(lang, "F9")}
      </Notice>
    );
  }

  // A non-reviewer's edit sends a published entry back to review (updateEntry.js),
  // so say so before they save. A reviewer's own edit stays published: no warning.
  // If the question fails, treat them as a non-reviewer, as updateEntry does.
  const { data: isReviewer, error: reviewerError } = await supabase.rpc("is_reviewer");
  if (reviewerError) console.error("is_reviewer check failed:", reviewerError);
  const warnsBackToReview = entry.status === "published" && isReviewer !== true;

  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: `/entries/${id}`, label: t(lang, "P3") }}
        kicker={t(lang, "F5")}
        title={sentenceCase(lang, "F5")}
      >
        {t(lang, "F10")}
      </PageHeading>
      {warnsBackToReview && (
        <div style={styles.warning}>
          <BilingualNotice en={BACK_TO_REVIEW.en} km={BACK_TO_REVIEW.km} lang={lang} />
        </div>
      )}
      <ContributeForm entry={entry} lang={lang} />
    </main>
  );
}
