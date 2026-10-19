"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../utils/supabase/client.js";
import Loader from "./Loader.js";

const styles = {
  form: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  label: {
    fontFamily: "var(--font-label)",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1,
    color: "var(--text-soft)",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: 17,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--text)",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  // Colours come from the .btn-filled class in globals.css (the main action).
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 18px",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 1,
    borderRadius: 8,
    cursor: "pointer",
  },
  error: {
    color: "var(--danger)",
    fontSize: 14,
    margin: "16px 0 0",
  },
  linkRow: {
    fontFamily: "var(--font-label)",
    fontSize: 14,
    color: "var(--accent)",
    marginTop: 16,
  },
  link: {
    color: "var(--accent)",
    textDecoration: "none",
  },
  // A fieldset lets `disabled` lock every field and the button at once. Reset
  // its default border/padding and give it the same stacked layout as the form.
  fields: {
    border: 0,
    margin: 0,
    padding: 0,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
};

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      // Fixed, non-specific message: never leaks whether the email, password,
      // or confirmation state was the actual problem.
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      <fieldset disabled={loading} style={styles.fields}>
        <label style={styles.label} htmlFor="login-email">
          EMAIL
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={styles.input}
          required
        />

        <label style={styles.label} htmlFor="login-password">
          PASSWORD
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={styles.input}
          required
        />

        <button type="submit" className="btn-filled" style={styles.button}>
          {loading ? <Loader size={20} label="SIGNING IN…" /> : "SIGN IN"}
        </button>
      </fieldset>

      {error && <p style={styles.error}>{error}</p>}

      <p style={styles.linkRow}>
        Need an account?{" "}
        <Link href="/signup" style={styles.link}>
          Sign up
        </Link>
      </p>
    </form>
  );
}