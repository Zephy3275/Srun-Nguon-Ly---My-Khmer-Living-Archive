import collection from "../../collection.config.js";
import { createClient } from "../../utils/supabase/server.js";
import SearchFilter from "../../components/SearchFilter.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
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
  notice: {
    marginTop: 32,
    padding: 24,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
    fontSize: 15,
    color: "#97A1B3",
    lineHeight: 1.7,
  },
};

export default async function Browse() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, title, titleKhmer:title_khmer, source, description, descriptionKhmer:description_khmer, image:photo_url"
    )
    .order("created_at", { ascending: false });
  const entries = data ?? [];

  return (
    <main style={styles.wrap}>
      <p style={styles.kicker}>BROWSE THE COLLECTION</p>
      <h1 style={styles.title}>{collection.name}</h1>

      {error ? (
        <p style={styles.notice}>
          We couldn't load the archive right now. Please try again in a moment.
        </p>
      ) : entries.length === 0 ? (
        <p style={styles.notice}>No entries in the archive yet.</p>
      ) : (
        <SearchFilter entries={entries} />
      )}
    </main>
  );
}