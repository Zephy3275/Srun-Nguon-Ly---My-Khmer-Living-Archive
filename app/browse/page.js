import { createClient } from "../../utils/supabase/server.js";
import { getLang } from "../../utils/lang.js";
import { archive, t } from "../../utils/strings.js";
import PageHeading from "../../components/PageHeading.js";
import SearchFilter from "../../components/SearchFilter.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  notice: {
    marginTop: 32,
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    fontSize: 15,
    color: "var(--muted)",
    lineHeight: 1.7,
  },
};

export default async function Browse() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, title, titleKhmer:title_khmer, source, contributor, description, descriptionKhmer:description_khmer, image:photo_url"
    )
    // Same politeness filter as the home page: only published entries are searchable.
    .eq("status", "published")
    .order("created_at", { ascending: false });
  const entries = data ?? [];
  const lang = await getLang();

  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: "/", label: t(lang, "P1") }}
        kicker={t(lang, "S1")}
        title={archive(lang, "name")}
      />

      {error ? (
        <p style={styles.notice}>{t(lang, "HM4")}</p>
      ) : entries.length === 0 ? (
        <p style={styles.notice}>{t(lang, "HM5")}</p>
      ) : (
        <SearchFilter entries={entries} lang={lang} />
      )}
    </main>
  );
}
