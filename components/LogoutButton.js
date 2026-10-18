"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client.js";
import Loader from "./Loader.js";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      // Stay logged in and let the button be pressed again.
      console.error("Sign out failed:", error);
      setLoading(false);
      return;
    }
    // On success the header is redrawn with the log-in links, so this button
    // disappears; there is nothing to switch back.
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="nav-btn btn-outline"
    >
      {loading ? <Loader size={16} label="SIGNING OUT…" /> : "SIGN OUT"}
    </button>
  );
}
