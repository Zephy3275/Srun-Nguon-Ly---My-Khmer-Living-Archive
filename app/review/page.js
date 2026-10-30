import BilingualNotice from "../../components/BilingualNotice.js";
import PageHeading from "../../components/PageHeading.js";
import ReviewQueue from "../../components/ReviewQueue.js";
import { createClient } from "../../utils/supabase/server.js";

// Lab 11: the review queue. The reviewer check runs here on the server BEFORE
// any entries are asked for. That check is politeness (a stranger would only
// see their own pending entries and every button would be refused); the
// database is the real gate. For a reviewer, .eq("status", "pending") is the
// real filter, because a reviewer can read every entry.

const NOT_REVIEWER_EN = "This page is for reviewers only.";
const NOT_REVIEWER_KM = "ទំព័រនេះសម្រាប់តែអ្នកពិនិត្យមើលប៉ុណ្ណោះ។";
const LOAD_FAILED_EN = "The queue could not be loaded.";
const LOAD_FAILED_KM = "មិនអាចផ្ទុកបញ្ជីរង់ចាំបានទេ";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
};

export default async function ReviewPage() {
  const supabase = await createClient();
  const { data: isReviewer, error: roleError } = await supabase.rpc("is_reviewer");
  if (roleError) console.error("Reviewer check failed:", roleError);

  // Anything but exactly true (false, null, an error) is "not a reviewer".
  if (isReviewer !== true) {
    return (
      <main style={styles.wrap}>
        <BilingualNotice en={NOT_REVIEWER_EN} km={NOT_REVIEWER_KM} />
      </main>
    );
  }

  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, title, title_khmer, description, description_khmer, source, contributor, filling, shape, color, texture, sweetness, saltiness, photo_url, created_at"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });
  if (error) console.error("The review queue could not be loaded:", error);

  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: "/", label: "← BACK TO HOMEPAGE" }}
        kicker="FOR REVIEWERS"
        title="Review queue"
      >
        Pending entries, oldest first.
      </PageHeading>
      {error ? (
        <BilingualNotice en={LOAD_FAILED_EN} km={LOAD_FAILED_KM} />
      ) : (
        <ReviewQueue initialEntries={data ?? []} />
      )}
    </main>
  );
}
