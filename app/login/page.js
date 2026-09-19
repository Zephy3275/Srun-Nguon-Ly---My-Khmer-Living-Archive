import Link from "next/link";
import LoginForm from "../../components/LoginForm.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
  },
  back: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 1,
    color: "#2EE6A8",
    textDecoration: "none",
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
  description: {
    fontSize: 16,
    color: "#97A1B3",
    margin: "0 0 24px",
  },
};

export default function LoginPage() {
  return (
    <main style={styles.wrap}>
      <Link href="/" style={styles.back}>
        ← BACK TO ARCHIVE
      </Link>
      <p style={styles.kicker}>MEMBER ACCESS</p>
      <h1 style={styles.title}>Log in</h1>
      <p style={styles.description}>
        Sign in with the email and password you used to sign up.
      </p>
      <LoginForm />
    </main>
  );
}