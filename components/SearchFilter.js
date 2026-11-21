"use client";

import { useState } from "react";
import EntryList from "./EntryList.js";
import SearchSuggestions from "./SearchSuggestions.js";
import { STRINGS, showsEn, showsKm, t } from "../utils/strings.js";

// The search still looks through both languages in every mode; the language
// switch only changes the words around it. The empty-state hint in Khmer (K16)
// is the student's own, now kept in utils/strings.js.

const styles = {
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 32,
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    fontSize: 16,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--text)",
    outline: "none",
    boxSizing: "border-box",
  },
  clear: {
    fontFamily: "var(--font-label)",
    fontSize: 14,
    color: "var(--accent)",
    backgroundColor: "transparent",
    border: "1px solid var(--border)",
    borderRadius: 6,
    padding: "8px 12px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  suggestWrap: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 10,
    marginTop: 4,
  },
  count: {
    fontFamily: "var(--font-label)",
    fontSize: 14,
    color: "var(--accent)",
    marginTop: 12,
  },
  empty: {
    marginTop: 24,
    padding: 24,
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
  },
  emptyTitle: {
    fontSize: 17,
    color: "var(--text)",
    margin: "0 0 8px",
  },
  emptyHint: {
    fontSize: 15,
    color: "var(--muted)",
    lineHeight: 1.7,
    margin: 0,
  },
  emptyKhmer: {
    fontSize: 15,
    color: "var(--muted-dim)",
    lineHeight: 1.8,
    margin: "14px 0 0",
    borderTop: "1px solid var(--border)",
    paddingTop: 10,
  },
};

export default function SearchFilter({ entries, lang }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const q = query.trim().toLowerCase();

  const matches = (entry) => {
    const searchable = [
      entry.title,
      entry.description,
      entry.titleKhmer,
      entry.descriptionKhmer,
      entry.contributor,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return searchable.includes(q);
  };

  const filtered = q === "" ? entries : entries.filter(matches);
  const suggestions = q === "" ? [] : filtered.slice(0, 5);
  const showDropdown = open && suggestions.length > 0;
  const hasNoMatch = q !== "" && filtered.length === 0;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder={t(lang, "S2")}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            style={styles.input}
            aria-label={t(lang, "X2")}
          />
          {query !== "" && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
              style={styles.clear}
              aria-label={t(lang, "X3")}
            >
              {t(lang, "S3")}
            </button>
          )}
        </div>

        {showDropdown && (
          <div style={styles.suggestWrap}>
            <SearchSuggestions suggestions={suggestions} lang={lang} />
          </div>
        )}
      </div>

      <p style={styles.count}>
        {q === ""
          ? t(lang, "S4", { count: entries.length })
          : t(lang, "S5", { count: filtered.length, query })}
      </p>

      {hasNoMatch ? (
        <div style={styles.empty}>
          <p style={styles.emptyTitle}>{t(lang, "S6", { query })}</p>
          {/* The hint: English in "both" and "en", the student's Khmer in "both" and "km". */}
          {showsEn(lang) && <p style={styles.emptyHint}>{STRINGS.K16.en}</p>}
          {showsKm(lang) && (
            <p lang="km" style={styles.emptyKhmer}>
              {STRINGS.K16.km}
            </p>
          )}
        </div>
      ) : (
        <EntryList entries={filtered} lang={lang} />
      )}
    </div>
  );
}
