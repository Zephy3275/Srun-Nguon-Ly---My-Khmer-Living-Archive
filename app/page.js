import EntryCard from "../components/EntryCard.js";
import ContextAbout from "../components/ContextAbout.js";
import HeroBanner from "../components/HeroBanner.js";
import MoonPhases from "../components/MoonPhases.js";
import { createClient } from "../utils/supabase/server.js";
import { getLang } from "../utils/lang.js";
import { archive, t } from "../utils/strings.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "8px 24px 80px",
  },
  kicker: {
    fontFamily: "var(--font-label)",
    color: "var(--accent)",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 2,
    margin: 0,
  },
  title: {
    fontFamily: "var(--font-heading)",
    fontSize: 54,
    fontWeight: 600,
    margin: "10px 0 16px",
    lineHeight: 1.08,
  },
  description: {
    fontSize: 18,
    color: "var(--muted)",
    lineHeight: 1.6,
    margin: "0 auto",
    maxWidth: 560,
  },
  // One box for CURATED BY, CITY and SOURCE (they used to be three boxes,
  // about 400px of scrolling): the two short ones share the top row,
  // the source sentence gets the full width underneath.
  card: {
    marginTop: 32,
    padding: "16px 20px",
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
  },
  cardRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px 48px",
  },
  cardSource: {
    marginTop: 14,
    paddingTop: 14,
    borderTop: "1px solid var(--border)",
  },
  cardLabel: {
    fontFamily: "var(--font-label)",
    fontSize: 12,
    color: "var(--muted)",
    margin: 0,
  },
  cardValue: {
    fontSize: 16,
    margin: "6px 0 0",
  },
  count: {
    fontFamily: "var(--font-label)",
    fontSize: 14,
    color: "var(--accent)",
    marginTop: 48,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 24,
  },
  notice: {
    marginTop: 24,
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    fontSize: 15,
    color: "var(--muted)",
    lineHeight: 1.7,
  },
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: "1px solid var(--border)",
    fontSize: 13,
    color: "var(--faint)",
  },
};

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, title, titleKhmer:title_khmer, source, contributor, description, descriptionKhmer:description_khmer, image:photo_url"
    )
    // Politeness, not security: the database already hides pending entries from
    // strangers, but you see your own while logged in, so the public page filters too.
    .eq("status", "published")
    .order("created_at", { ascending: false });
  const entries = data ?? [];
  const lang = await getLang();

  return (
    <>
      <HeroBanner>
        <p style={styles.kicker}>{t(lang, "H1")}</p>
        <h1 style={styles.title}>{archive(lang, "name")}</h1>
        <p style={styles.description}>{archive(lang, "description")}</p>
      </HeroBanner>
      <main style={styles.wrap}>
        <MoonPhases />

        <div style={styles.card}>
          <div style={styles.cardRow}>
            <div>
              <p style={styles.cardLabel}>{t(lang, "HM1")}</p>
              <p style={styles.cardValue}>{archive(lang, "curator")}</p>
            </div>
            <div>
              <p style={styles.cardLabel}>{t(lang, "HM2")}</p>
              <p style={styles.cardValue}>{archive(lang, "city")}</p>
            </div>
          </div>
          <div style={styles.cardSource}>
            <p style={styles.cardLabel}>{t(lang, "P6")}</p>
            <p style={styles.cardValue}>{archive(lang, "source")}</p>
          </div>
        </div>

        <ContextAbout lang={lang} />

        {error ? (
          <p style={styles.notice}>{t(lang, "HM4")}</p>
        ) : entries.length === 0 ? (
          <p style={styles.notice}>{t(lang, "HM5")}</p>
        ) : (
          <>
            <p style={styles.count}>{t(lang, "HM3", { count: entries.length })}</p>

            <div style={styles.grid}>
              {entries.map((entry) => (
                <EntryCard key={entry.id} {...entry} lang={lang} />
              ))}
            </div>
          </>
        )}

        <footer style={styles.footer}>{t(lang, "HM6")}</footer>
      </main>
    </>
  );
}