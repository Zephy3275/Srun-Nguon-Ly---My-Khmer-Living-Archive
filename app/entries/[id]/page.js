import BackLink from "../../../components/BackLink.js";
import EntryOwnerActions from "../../../components/EntryOwnerActions.js";
import { createClient } from "../../../utils/supabase/server.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  titleKhmer: {
    fontSize: 22,
    fontWeight: 500,
    color: "#C7CFDB",
    margin: "0 0 16px",
    lineHeight: 1.3,
  },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
    margin: "0 0 20px",
  },
  image: {
    width: "100%",
    maxHeight: 420,
    objectFit: "cover",
    borderRadius: 10,
    display: "block",
  },
  description: {
    fontSize: 17,
    color: "#97A1B3",
    lineHeight: 1.6,
    marginTop: 24,
  },
  descriptionKhmer: {
    fontSize: 16,
    color: "#7C8698",
    lineHeight: 1.8,
    marginTop: 12,
    borderTop: "1px solid #2E3644",
    paddingTop: 12,
  },
};

export default async function EntryPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: entry, error } = await supabase
    .from("entries")
    .select(
      "id, owner, title, titleKhmer:title_khmer, source, contributor, sweetness, saltiness, description, descriptionKhmer:description_khmer, image:photo_url"
    )
    .eq("id", id)
    .maybeSingle();
  const { data: { user } } = await supabase.auth.getUser();

  // 22P02 = Postgres saying the id is not a valid uuid (e.g. an old slug link);
  // that counts as not found. Any other error is a real failure to reach the data.
  if (error && error.code !== "22P02") {
    return (
      <main style={styles.wrap}>
        <BackLink href="/browse">← BACK TO BROWSE</BackLink>
        <h1 style={styles.title}>Couldn't load this entry</h1>
        <p style={styles.description}>
          We couldn't reach the archive right now. Please try again in a moment.
        </p>
      </main>
    );
  }

  if (!entry) {
    return (
      <main style={styles.wrap}>
        <BackLink href="/browse">← BACK TO BROWSE</BackLink>
        <h1 style={styles.title}>Entry not found</h1>
        <p style={styles.description}>
          There is no entry with that id in the archive yet.
        </p>
      </main>
    );
  }

  // Sweetness and saltiness are optional (null when nobody rated them): only
  // the ones that exist are shown, and the whole line is skipped if neither does.
  const levels = [
    entry.sweetness != null && `SWEETNESS: ${entry.sweetness}/5`,
    entry.saltiness != null && `SALTINESS: ${entry.saltiness}/5`,
  ].filter(Boolean);

  return (
    <main style={styles.wrap}>
      <BackLink href="/browse">← BACK TO BROWSE</BackLink>
      <h1 style={styles.title}>{entry.title}</h1>
      {entry.titleKhmer && (
        <h2 style={styles.titleKhmer}>{entry.titleKhmer}</h2>
      )}
      <p style={styles.label}>SOURCE: {entry.source}</p>
      {entry.contributor && (
        <p style={styles.label}>CONTRIBUTED BY: {entry.contributor}</p>
      )}
      {levels.length > 0 && <p style={styles.label}>{levels.join(" · ")}</p>}
      {entry.image && (
        <img src={entry.image} alt={entry.title} style={styles.image} />
      )}
      {entry.description && (
        <p style={styles.description}>{entry.description}</p>
      )}
      {entry.descriptionKhmer && (
        <p style={styles.descriptionKhmer}>{entry.descriptionKhmer}</p>
      )}
      {/* Politeness only: the owner-only database policies are the real refusal. */}
      {user && user.id === entry.owner && <EntryOwnerActions id={entry.id} />}
    </main>
  );
}