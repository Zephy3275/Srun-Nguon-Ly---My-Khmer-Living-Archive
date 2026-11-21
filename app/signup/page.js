import SignupForm from "../../components/SignupForm.js";
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

export default async function SignupPage() {
  const lang = await getLang();
  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: "/", label: t(lang, "P1") }}
        kicker={t(lang, "A9")}
        title={sentenceCase(lang, "H7")}
      >
        {t(lang, "A10")}
      </PageHeading>
      <SignupForm lang={lang} />
    </main>
  );
}
