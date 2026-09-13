"use client";

import { useState } from "react";
import EntryList from "./EntryList.js";

// Khmer copy for the empty state. This is a PLACEHOLDER.
// Paste a verified Khmer line here from family / native speaker before
// submitting (AGENTS.md: Khmer is first-class; never ship invented Khmer).
const EMPTY_KHMER = "សាកល្បងពាក្យផ្សេងទៀត — រាល់ការបញ្ចូលអាចរកបានដោយចំណងជើង ឬការពិពណ៌នារបស់វា ជាភាសាអង់គ្លេស ឬខ្មែរ។";

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
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 8,
    color: "#E8EDF2",
    outline: "none",
    boxSizing: "border-box",
  },
  clear: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    color: "#2EE6A8",
    backgroundColor: "transparent",
    border: "1px solid #2E3644",
    borderRadius: 6,
    padding: "8px 12px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  count: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    color: "#2EE6A8",
    marginTop: 12,
  },
  empty: {
    marginTop: 24,
    padding: 24,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
  },
  emptyTitle: {
    fontSize: 17,
    color: "#E8EDF2",
    margin: "0 0 8px",
  },
  emptyHint: {
    fontSize: 15,
    color: "#97A1B3",
    lineHeight: 1.7,
    margin: 0,
  },
  emptyKhmer: {
    fontSize: 15,
    color: "#7C8698",
    lineHeight: 1.8,
    margin: "14px 0 0",
    borderTop: "1px solid #2E3644",
    paddingTop: 10,
  },
};

export default function SearchFilter({ entries }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const matches = (entry) => {
    const searchable = [
      entry.title,
      entry.description,
      entry.titleKhmer,
      entry.descriptionKhmer,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return searchable.includes(q);
  };

  const filtered = q === "" ? entries : entries.filter(matches);
  const hasNoMatch = q !== "" && filtered.length === 0;

  return (
    <div>
      <div style={styles.searchRow}>
        <input
          type="text"
          placeholder="Search by title or description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
          aria-label="Search entries"
        />
        {query !== "" && (
          <button
            type="button"
            onClick={() => setQuery("")}
            style={styles.clear}
            aria-label="Clear search"
          >
            CLEAR ×
          </button>
        )}
      </div>

      <p style={styles.count}>
        {q === ""
          ? `${entries.length} entries in the archive`
          : `${filtered.length} match${filtered.length === 1 ? "" : "es"}
             for “${query}”`}
      </p>

      {hasNoMatch ? (
        <div style={styles.empty}>
          <p style={styles.emptyTitle}>
            Nothing in the archive matches “{query}” yet.
          </p>
          <p style={styles.emptyHint}>
            Try another word — every entry can be found by its title or
            description, in English or Khmer.
          </p>
          {EMPTY_KHMER && (
            <p style={styles.emptyKhmer}>{EMPTY_KHMER}</p>
          )}
        </div>
      ) : (
        <EntryList entries={filtered} />
      )}
    </div>
  );
}
