import Link from "next/link";
import LogoutButton from "./LogoutButton.js";
import { createClient } from "../utils/supabase/server.js";

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  email: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 1,
    color: "#97A1B3",
  },
  link: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 1,
    color: "#2EE6A8",
    textDecoration: "none",
  },
};

export default async function AuthHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div style={styles.row}>
      {user ? (
        <>
          <span style={styles.email}>{user.email}</span>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/login" style={styles.link}>
            LOG IN
          </Link>
          <Link href="/signup" style={styles.link}>
            SIGN UP
          </Link>
        </>
      )}
    </div>
  );
}