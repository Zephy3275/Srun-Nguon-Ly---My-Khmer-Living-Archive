"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client.js";

const styles = {
  button: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 1,
    color: "#2EE6A8",
    backgroundColor: "transparent",
    border: "1px solid #2E3644",
    borderRadius: 6,
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button type="button" onClick={handleLogout} style={styles.button}>
      SIGN OUT
    </button>
  );
}