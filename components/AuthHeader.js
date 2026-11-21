import Link from "next/link";
import LogoutButton from "./LogoutButton.js";
import { createClient } from "../utils/supabase/server.js";
import { t } from "../utils/strings.js";

// The account part of the site header: your email and SIGN OUT when logged in
// (plus REVIEW for reviewers), LOG IN and SIGN UP links when not. Server component: it reads the session.

const styles = {
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  email: {
    maxWidth: 160,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: "var(--font-label)",
    fontSize: 13,
    letterSpacing: 1,
    color: "var(--muted)",
  },
};

export default async function AuthHeader({ lang }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // The REVIEW link is politeness only: it shows for reviewers, and /review
  // and the database check the role again. Only exactly true counts.
  let isReviewer = false;
  if (user) {
    const { data } = await supabase.rpc("is_reviewer");
    isReviewer = data === true;
  }

  return (
    <div style={styles.row}>
      {user ? (
        <>
          {isReviewer && (
            <Link href="/review" className="nav-link">
              {t(lang, "H4")}
            </Link>
          )}
          <Link href="/my-entries" className="nav-link">
            {t(lang, "H5")}
          </Link>
          <span style={styles.email} title={user.email}>
            {user.email}
          </span>
          <LogoutButton lang={lang} />
        </>
      ) : (
        <>
          <Link href="/login" className="nav-link">
            {t(lang, "H6")}
          </Link>
          <Link href="/signup" className="nav-btn btn-outline">
            {t(lang, "H7")}
          </Link>
        </>
      )}
    </div>
  );
}
