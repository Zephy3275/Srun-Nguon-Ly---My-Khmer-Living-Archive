import LoginForm from "../../components/LoginForm.js";
import PageHeading from "../../components/PageHeading.js";
import { getLang } from "../../utils/lang.js";
import { sentenceCase, t } from "../../utils/strings.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
};

export default async function LoginPage() {
  const lang = await getLang();
  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: "/", label: t(lang, "P1") }}
        kicker={t(lang, "A1")}
        title={sentenceCase(lang, "H6")}
      >
        {t(lang, "A2")}
      </PageHeading>
      <LoginForm lang={lang} />
    </main>
  );
}
