import LoginForm from "../../components/LoginForm.js";
import PageHeading from "../../components/PageHeading.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
};

export default function LoginPage() {
  return (
    <main style={styles.wrap}>
      <PageHeading
        back={{ href: "/", label: "← BACK TO HOMEPAGE" }}
        kicker="MEMBER ACCESS"
        title="Log in"
      >
        Sign in with the email and password you used to sign up.
      </PageHeading>
      <LoginForm />
    </main>
  );
}
