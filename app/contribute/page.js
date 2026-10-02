import Link from "next/link";
import ContributeForm from "../../components/ContributeForm.js";
import { createClient } from "../../utils/supabase/server.js";

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
  link: {
    color: "#2EE6A8",
    textDecoration: "none",
  },
};

export default async function ContributePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main style={styles.wrap}>
      <Link href="/" style={styles.back}>
        ← BACK TO ARCHIVE
      </Link>
      <p style={styles.kicker}>CONTRIBUTE</p>
      <h1 style={styles.title}>Add an entry</h1>
      {user ? (
        <>
          <p style={styles.description}>
            Add something to the archive. Every field marked required must be
            filled in, and the photo is required.
          </p>
          <ContributeForm />
        </>
      ) : (
        <p style={styles.description}>
          You need to be logged in to add an entry.{" "}
          <Link href="/login" style={styles.link}>
            Log in
          </Link>
        </p>
      )}
    </main>
  );
}
