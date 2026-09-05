// ============================================================
//  ARCHIVE ENTRIES
//
//  This is the single source of truth for the archive's entries.
//  Previously this array lived inside app/page.js; it was moved
//  here so the data can later be backed by a database.
//
//  Every entry shares the same shape:
//    - id:          stable, unique string (used as React key and,
//                   later, as the primary key in the database)
//    - title:       display title
//    - source:      where this entry/knowledge came from (person,
//                   place, or community)
//    - description: a sentence or two about the entry
//    - image:       image path under /public/images, or "" until
//                   the image is uploaded
//    - ingredients: recipe ingredients; [] until filled in
//    - taste:       taste scale 1-5 plus a short flavor note;
//                   placeholder values until the real data arrives
// ============================================================

const entries = [
  {
    id: "mooncake-egg-1",
    title: "Mooncake Ngoyen Egg 1",
    source: "My uncle's shop",
    description:
      "A classic style mooncake. When people think of mooncake, they think of a cake that have mixture of various ingredients packing many flavors.",
    image: "/images/mooncake_egg_1.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "mooncake-egg-2",
    title: "Mooncake Ngoyen Egg 2",
    source: "My uncle's shop",
    description:
      "A premium classic. Only slightly bigger than the mooncake egg 1 but with 2 eggs. Perfect for those with a bigger appetite.",
    image: "/images/mooncake_egg_2.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "entry-3",
    title: "Entry 3 (placeholder)",
    source: "Pending",
    description: "Fill this entry in with a real archive record.",
    image: "",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "entry-4",
    title: "Entry 4 (placeholder)",
    source: "Pending",
    description: "Fill this entry in with a real archive record.",
    image: "",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "entry-5",
    title: "Entry 5 (placeholder)",
    source: "Pending",
    description: "Fill this entry in with a real archive record.",
    image: "",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "entry-6",
    title: "Entry 6 (placeholder)",
    source: "Pending",
    description: "Fill this entry in with a real archive record.",
    image: "",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "entry-7",
    title: "Entry 7 (placeholder)",
    source: "Pending",
    description: "Fill this entry in with a real archive record.",
    image: "",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
];

export default entries;