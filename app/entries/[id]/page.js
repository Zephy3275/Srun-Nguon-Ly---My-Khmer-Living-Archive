import BackLink from "../../../components/BackLink.js";
import EntryOwnerActions from "../../../components/EntryOwnerActions.js";
import { createClient } from "../../../utils/supabase/server.js";
import { getLang } from "../../../utils/lang.js";
import { entryText, isKhmerText, t } from "../../../utils/strings.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: 48,
    fontWeight: 600,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  titleKhmer: {
    fontFamily: "var(--font-heading)",
    fontSize: 24,
    fontWeight: 500,
    color: "var(--text-soft)",
    margin: "0 0 16px",
    lineHeight: 1.3,
  },
  label: {
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--muted)",
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
    color: "var(--muted)",
    lineHeight: 1.6,
    marginTop: 24,
    whiteSpace: "pre-wrap", // keep the contributor's line breaks and blank lines
  },
  descriptionKhmer: {
    fontSize: 16,
    color: "var(--muted-dim)",
    lineHeight: 1.8,
    marginTop: 12,
    borderTop: "1px solid var(--border)",
    paddingTop: 12,
    whiteSpace: "pre-wrap",
  },
};
// Khmer-only mode: the Khmer description takes the English one's place, so it
// gets the main style, with the Khmer line height (no rule above it).
styles.descriptionInKhmer = { ...styles.description, lineHeight: 1.8 };

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
  const lang = await getLang();

  // 22P02 = Postgres saying the id is not a valid uuid (e.g. an old slug link);
  // that counts as not found. Any other error is a real failure to reach the data.
  if (error && error.code !== "22P02") {
    return (
      <main style={styles.wrap}>
        <BackLink href="/browse">{t(lang, "P2")}</BackLink>
        <h1 style={styles.title}>{t(lang, "E1")}</h1>
        <p style={styles.description}>{t(lang, "E2")}</p>
      </main>
    );
  }

  if (!entry) {
    return (
      <main style={styles.wrap}>
        <BackLink href="/browse">{t(lang, "P2")}</BackLink>
        <h1 style={styles.title}>{t(lang, "E3")}</h1>
        <p style={styles.description}>{t(lang, "E4")}</p>
      </main>
    );
  }

  // Sweetness and saltiness are optional (null when nobody rated them): only
  // the ones that exist are shown, and the whole line is skipped if neither does.
  const levels = [
    entry.sweetness != null && `${t(lang, "FL10")}: ${entry.sweetness}/5`,
    entry.saltiness != null && `${t(lang, "FL11")}: ${entry.saltiness}/5`,
  ].filter(Boolean);

  // "both": English, then the Khmer under it. "en": English only. "km": the
  // Khmer in the English's place (the English when the entry has no Khmer).
  const title = entryText(lang, entry.title, entry.titleKhmer);
  const description = entryText(lang, entry.description, entry.descriptionKhmer);
  const khmerDescription = isKhmerText(lang, entry.descriptionKhmer);

  return (
    <main style={styles.wrap}>
      <BackLink href="/browse">{t(lang, "P2")}</BackLink>
      {/* Politeness only: the owner-only database policies are the real refusal. */}
      {user && user.id === entry.owner && <EntryOwnerActions id={entry.id} lang={lang} />}
      <h1 lang={isKhmerText(lang, entry.titleKhmer) ? "km" : undefined} style={styles.title}>
        {title}
      </h1>
      {lang === "both" && entry.titleKhmer && (
        <h2 lang="km" style={styles.titleKhmer}>{entry.titleKhmer}</h2>
      )}
      <p style={styles.label}>{t(lang, "P6")}: {entry.source}</p>
      {entry.contributor && (
        <p style={styles.label}>{t(lang, "P7")}: {entry.contributor}</p>
      )}
      {levels.length > 0 && <p style={styles.label}>{levels.join(" · ")}</p>}
      {entry.image && (
        <img src={entry.image} alt={title} style={styles.image} />
      )}
      {description && (
        <p
          lang={khmerDescription ? "km" : undefined}
          style={khmerDescription ? styles.descriptionInKhmer : styles.description}
        >
          {description}
        </p>
      )}
      {lang === "both" && entry.descriptionKhmer && (
        <p lang="km" style={styles.descriptionKhmer}>{entry.descriptionKhmer}</p>
      )}
    </main>
  );
}