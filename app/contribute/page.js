import Link from "next/link";
import ContributeForm from "../../components/ContributeForm.js";
import PageHeading from "../../components/PageHeading.js";
import { createClient } from "../../utils/supabase/server.js";
import { getLang } from "../../utils/lang.js";
import { sentenceCase, t } from "../../utils/strings.js";

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
};

export default async function ContributePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const lang = await getLang();

  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: "/", label: t(lang, "P1") }}
        kicker={t(lang, "F1")}
        title={t(lang, "F2")}
      >
        {user ? (
          t(lang, "F3")
        ) : (
          <>
            {t(lang, "F4")}{" "}
            <Link href="/login" style={styles.link}>
              {sentenceCase(lang, "H6")}
            </Link>
          </>
        )}
      </PageHeading>
      {user && <ContributeForm lang={lang} />}
    </main>
  );
}
