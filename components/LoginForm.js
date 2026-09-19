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

export default function LoginForm() {
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

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "SIGNING IN…" : "SIGN IN"}
      </button>

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