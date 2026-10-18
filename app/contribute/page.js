import Link from "next/link";
import ContributeForm from "../../components/ContributeForm.js";
import PageHeading from "../../components/PageHeading.js";
import { createClient } from "../../utils/supabase/server.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "48px 24px 80px",
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
      <PageHeading
        back={{ href: "/", label: "← BACK TO HOMEPAGE" }}
        kicker="CONTRIBUTE"
        title="Add an entry"
      >
        {user ? (
          "Add something to the archive. Every field marked required must be filled in, and the photo is required."
        ) : (
          <>
            You need to be logged in to add an entry.{" "}
            <Link href="/login" style={styles.link}>
              Log in
            </Link>
          </>
        )}
      </PageHeading>
      {user && <ContributeForm />}
    </main>
  );
}
