import SignupForm from "../../components/SignupForm.js";
import PageHeading from "../../components/PageHeading.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
};

export default function SignupPage() {
  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: "/", label: "← BACK TO HOMEPAGE" }}
        kicker="JOIN THE ARCHIVE"
        title="Sign up"
      >
        Create an account to take part in the archive.
      </PageHeading>
      <SignupForm />
    </main>
  );
}
