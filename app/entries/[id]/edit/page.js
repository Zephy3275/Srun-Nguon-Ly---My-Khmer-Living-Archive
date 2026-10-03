import Link from "next/link";
import ContributeForm from "../../../../components/ContributeForm.js";
import { createClient } from "../../../../utils/supabase/server.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
  },
  back: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 1,
    color: "#2EE6A8",
    textDecoration: "none",
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#2EE6A8",
    fontSize: 14,
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  description: {
    fontSize: 16,
    color: "#97A1B3",
    margin: "0 0 24px",
  },
  link: {
    color: "#2EE6A8",
    textDecoration: "none",
  },
};

// Page frame + one heading and message, used by every state except the form.
function Notice({ id, heading, children }) {
  return (
    <main style={styles.wrap}>
      <Link href={`/entries/${id}`} style={styles.back}>
        ← BACK TO ENTRY
      </Link>
      <p style={styles.kicker}>EDIT ENTRY</p>
      <h1 style={styles.title}>{heading}</h1>
      <p style={styles.description}>{children}</p>
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
      "id, owner, title, title_khmer, description, description_khmer, source, filling, shape, color, texture, sweetness, saltiness, photo_url"
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

  return (
    <main style={styles.wrap}>
      <Link href={`/entries/${id}`} style={styles.back}>
        ← BACK TO ENTRY
      </Link>
      <p style={styles.kicker}>EDIT ENTRY</p>
      <h1 style={styles.title}>Edit entry</h1>
      <p style={styles.description}>
        Change anything you like, then save. Your current photo stays unless you
        choose a new one.
      </p>
      <ContributeForm entry={entry} />
    </main>
  );
}
