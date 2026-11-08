import Link from "next/link";
import BilingualNotice from "../../../../components/BilingualNotice.js";
import ContributeForm from "../../../../components/ContributeForm.js";
import PageHeading from "../../../../components/PageHeading.js";
import { createClient } from "../../../../utils/supabase/server.js";

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

const BACK_TO_REVIEW_EN =
  "This entry is published. If you save changes, it goes back to review and is hidden from the public archive until a reviewer approves it again.";
const BACK_TO_REVIEW_KM =
  "ធាតុនេះត្រូវបានផ្សព្វផ្សាយរួចហើយ។ ប្រសិនបើអ្នករក្សាទុកការផ្លាស់ប្តូរ ធាតុនេះនឹងត្រឡប់ទៅស្ថានភាពរង់ចាំការពិនិត្យឡើងវិញ ហើយនឹងត្រូវបានលាក់ពីបណ្ណសារសាធារណៈ រហូតទាល់តែអ្នកពិនិត្យអនុម័តវាជាថ្មីម្តងទៀត។";

// Page frame + one heading and message, used by every state except the form.
function Notice({ id, heading, children }) {
  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: `/entries/${id}`, label: "← BACK TO ENTRY" }}
        kicker="EDIT ENTRY"
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

  if (!user) {
    return (
      <Notice id={id} heading="Log in to edit">
        You need to be logged in to edit an entry.{" "}
        <Link href="/login" style={styles.link}>
          Log in
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
      <Notice id={id} heading="Couldn't load this entry">
        We couldn't reach the archive right now. Please try again in a moment.
      </Notice>
    );
  }

  if (!entry) {
    return (
      <Notice id={id} heading="Entry not found">
        There is no entry with that id in the archive.
      </Notice>
    );
  }

  // Politeness only: the owner-only database policies are the real refusal.
  if (entry.owner !== user.id) {
    return (
      <Notice id={id} heading="You can't edit this entry">
        Only the person who added an entry can edit it.
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
        back={{ href: `/entries/${id}`, label: "← BACK TO ENTRY" }}
        kicker="EDIT ENTRY"
        title="Edit entry"
      >
        Change anything you like, then save. Your current photo stays unless you
        choose a new one.
      </PageHeading>
      {warnsBackToReview && (
        <div style={styles.warning}>
          <BilingualNotice en={BACK_TO_REVIEW_EN} km={BACK_TO_REVIEW_KM} />
        </div>
      )}
      <ContributeForm entry={entry} />
    </main>
  );
}
