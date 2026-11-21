"use client";

import { useRouter } from "next/navigation";
import { LANGS, t } from "../utils/strings.js";

// The three-way language switch in the header: English and Khmer (the
// default), English only, Khmer only. Pressing one saves the choice in a
// "lang" cookie for a year, then asks the server to redraw the page with it
// (router.refresh keeps the page's own state, such as a typed search).

const LABELS = { both: "L1", en: "L2", km: "L3" };

const styles = {
  group: {
    display: "inline-flex",
    border: "1px solid var(--border)",
    borderRadius: 6,
    overflow: "hidden",
  },
  button: {
    padding: "6px 10px",
    font: "700 13px var(--font-label)",
    backgroundColor: "transparent",
    color: "var(--muted)",
    border: "none",
    cursor: "pointer",
  },
  active: { backgroundColor: "var(--surface)", color: "var(--accent)" },
};

export default function LangSwitch({ lang }) {
  const router = useRouter();

  function choose(next) {
    if (next === lang) return;
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div role="group" aria-label={t(lang, "L4")} style={styles.group}>
      {LANGS.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={value === lang}
          onClick={() => choose(value)}
          style={value === lang ? { ...styles.button, ...styles.active } : styles.button}
        >
          {t(lang, LABELS[value])}
        </button>
      ))}
    </div>
  );
}
