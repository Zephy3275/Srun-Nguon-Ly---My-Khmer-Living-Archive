import Link from "next/link";
import SignupForm from "../../components/SignupForm.js";

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

export default function SignupPage() {
  return (
    <main style={styles.wrap}>
      <Link href="/" style={styles.back}>
        ← BACK TO ARCHIVE
      </Link>
      <p style={styles.kicker}>JOIN THE ARCHIVE</p>
      <h1 style={styles.title}>Sign up</h1>
      <p style={styles.description}>
        Create an account to take part in the archive.
      </p>
      <SignupForm />
    </main>
  );
}