"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../utils/supabase/client.js";

const styles = {
  form: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 16,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 8,
    color: "#E8EDF2",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px 16px",
    fontSize: 15,
    fontWeight: 600,
    backgroundColor: "#1C222C",
    color: "#2EE6A8",
    border: "1px solid #2E3644",
    borderRadius: 8,
    cursor: "pointer",
  },
  error: {
    color: "#E86A5A",
    fontSize: 14,
    margin: "16px 0 0",
  },
  hint: {
    fontSize: 12,
    color: "#7C8698",
    margin: 0,
  },
  linkRow: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    color: "#2EE6A8",
    marginTop: 16,
  },
  link: {
    color: "#2EE6A8",
    textDecoration: "none",
  },
};

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    if (data.session) {
      // A session is returned only when email confirmation is disabled,
      // which is how this project is configured. Log straight in.
      router.push("/");
      router.refresh();
      return;
    }

    // Safety net: if confirmation were enabled, no session is returned yet.
    setLoading(false);
    setError("Check your email to confirm your account.");
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      <label style={styles.label} htmlFor="signup-email">
        EMAIL
      </label>
      <input
        id="signup-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        style={styles.input}
        required
      />

      <label style={styles.label} htmlFor="signup-password">
        PASSWORD
      </label>
      <input
        id="signup-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        style={styles.input}
        minLength={6}
        title="At least 6 characters"
        required
      />
      <p style={styles.hint}>At least 6 characters.</p>

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "CREATING ACCOUNT…" : "CREATE ACCOUNT"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <p style={styles.linkRow}>
        Already have an account?{" "}
        <Link href="/login" style={styles.link}>
          Log in
        </Link>
      </p>
    </form>
  );
}