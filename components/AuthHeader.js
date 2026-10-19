import Link from "next/link";
import LogoutButton from "./LogoutButton.js";
import { createClient } from "../utils/supabase/server.js";

// The account part of the site header: your email and SIGN OUT when logged in,
// LOG IN and SIGN UP links when not. Server component: it reads the session.

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

export default async function AuthHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div style={styles.row}>
      {user ? (
        <>
          <span style={styles.email} title={user.email}>
            {user.email}
          </span>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/login" className="nav-link">
            LOG IN
          </Link>
          <Link href="/signup" className="nav-btn btn-outline">
            SIGN UP
          </Link>
        </>
      )}
    </div>
  );
}
