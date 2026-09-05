"use client";

import { useState } from "react";
import EntryList from "./EntryList.js";

const styles = {
  search: {
    marginTop: 32,
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
    fontSize: 15,
    color: "#97A1B3",
    lineHeight: 1.6,
  },
};

export default function SearchFilter({ entries }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const matches = (entry) =>
    (entry.title + " " + entry.description).toLowerCase().includes(q);

  const filtered = q === "" ? entries : entries.filter(matches);

  return (
    <div>
      <div style={styles.search}>
        <input
          type="text"
          placeholder="Search by title or description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
      </div>

      <p style={styles.count}>
        {q === ""
          ? `${entries.length} entries in the archive`
          : `${filtered.length} match${filtered.length === 1 ? "" : "es"}
             for “${query}”`}
      </p>

      {filtered.length === 0 ? (
        <div style={styles.empty}>
          Nothing here matches that yet. Try another word — every entry can be
          found by its title or description.
        </div>
      ) : (
        <EntryList entries={filtered} />
      )}
    </div>
  );
}