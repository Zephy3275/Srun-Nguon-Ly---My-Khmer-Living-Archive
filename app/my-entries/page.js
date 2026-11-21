import Link from "next/link";
import MyEntryRow from "../../components/MyEntryRow.js";
import PageHeading from "../../components/PageHeading.js";
import { createClient } from "../../utils/supabase/server.js";
import { getLang } from "../../utils/lang.js";
import { sentenceCase, t } from "../../utils/strings.js";

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
      .select("id, title, title_khmer, status, review_note")
      .eq("owner", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("My entries could not be loaded:", error);
      failed = true;
    }
    entries = data ?? [];
  }
  const lang = await getLang();

  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: "/", label: t(lang, "P1") }}
        kicker={t(lang, "M1")}
        title={sentenceCase(lang, "H5")}
      >
        {user ? (
          t(lang, "M2")
        ) : (
          <>
            {t(lang, "M3")}{" "}
            <Link href="/login" style={styles.link}>
              {sentenceCase(lang, "H6")}
            </Link>
          </>
        )}
      </PageHeading>

      {user &&
        (failed ? (
          <p style={styles.notice}>{t(lang, "M4")}</p>
        ) : entries.length === 0 ? (
          <p style={styles.notice}>
            {t(lang, "M5")}{" "}
            <Link href="/contribute" style={styles.link}>
              {t(lang, "M6")}
            </Link>
          </p>
        ) : (
          <ul style={styles.list}>
            {entries.map((entry) => (
              <MyEntryRow key={entry.id} entry={entry} lang={lang} />
            ))}
          </ul>
        ))}
    </main>
  );
}
