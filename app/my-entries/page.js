import Link from "next/link";
import MyEntryRow from "../../components/MyEntryRow.js";
import PageHeading from "../../components/PageHeading.js";
import { createClient } from "../../utils/supabase/server.js";

// Lab 10: the logged-in user's own entries, with their status. The .eq("owner")
// filter is what this page asks for; the database would also show a reviewer
// everyone's entries, so the filter is needed here, not just politeness.

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
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  notice: {
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    fontSize: 15,
    color: "var(--muted)",
    lineHeight: 1.7,
  },
};

export default async function MyEntriesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let entries = [];
  let failed = false;
  if (user) {
    const { data, error } = await supabase
      .from("entries")
      .select("id, title, title_khmer, status")
      .eq("owner", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("My entries could not be loaded:", error);
      failed = true;
    }
    entries = data ?? [];
  }

  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: "/", label: "← BACK TO HOMEPAGE" }}
        kicker="YOUR CONTRIBUTIONS"
        title="My entries"
      >
        {user ? (
          "Everything you have added, and where each entry is in review."
        ) : (
          <>
            You need to be logged in to see your entries.{" "}
            <Link href="/login" style={styles.link}>
              Log in
            </Link>
          </>
        )}
      </PageHeading>

      {user &&
        (failed ? (
          <p style={styles.notice}>
            We couldn't load your entries right now. Please try again in a moment.
          </p>
        ) : entries.length === 0 ? (
          <p style={styles.notice}>
            You haven't added any entries yet.{" "}
            <Link href="/contribute" style={styles.link}>
              Add one
            </Link>
          </p>
        ) : (
          <ul style={styles.list}>
            {entries.map((entry) => (
              <MyEntryRow key={entry.id} entry={entry} />
            ))}
          </ul>
        ))}
    </main>
  );
}
