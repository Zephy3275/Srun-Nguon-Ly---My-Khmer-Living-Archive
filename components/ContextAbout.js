const styles = {
  section: {
    marginTop: 48,
    padding: 24,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#2EE6A8",
    fontSize: 14,
    letterSpacing: 1,
    margin: 0,
  },
  heading: { fontSize: 24, fontWeight: 700, margin: "12px 0 16px" },
  intro: {
    fontSize: 16,
    color: "#97A1B3",
    lineHeight: 1.7,
    margin: "0 0 16px",
  },
  point: {
    fontSize: 15,
    color: "#97A1B3",
    lineHeight: 1.7,
    margin: "0 0 12px",
  },
  lead: { color: "#E8EDF2" },
  closing: {
    fontSize: 15,
    color: "#97A1B3",
    lineHeight: 1.7,
    margin: "16px 0 0",
    paddingTop: 16,
    borderTop: "1px solid #2E3644",
  },
};

const intro =
  "Mooncakes are eaten during the Mid-Autumn Festival, held on the 15th night " +
  "of the 8th lunar month (usually mid-September to early October), when the " +
  "moon is believed to be at its fullest and brightest of the year. The " +
  "festival centers on the moon, family reunions, and mooncakes — dense, " +
  "round pastries loaded with history, mythology, and meaning.";

const points = [
  {
    lead: "Shape and symbolism",
    body:
      "The round shape became symbolic of the full moon, representing unity " +
      "and completeness, making mooncakes an ideal treat for family " +
      "gatherings. The classic version has a lotus seed paste center with a " +
      "salted duck egg yolk representing the full moon itself.",
  },
  {
    lead: "The rebellion legend",
    body:
      "The most famous origin story dates to the Yuan Dynasty. Han Chinese " +
      "revolutionaries are said to have hidden messages inside mooncakes to " +
      "secretly coordinate an uprising against Mongol rulers — “Kill the " +
      "Mongols on the 15th day of the 8th month” — and the successful " +
      "rebellion gave rise to the Ming Dynasty. True or not, it's part of why " +
      "mooncakes are tied to unity and resistance as much as reunion.",
  },
  {
    lead: "Reaching Southeast Asia",
    body:
      "The festival spread well beyond China to Southeast Asian countries " +
      "with large ethnic Chinese populations, and remains an important " +
      "festival in Vietnam and across the diaspora. Cambodia's Teochew " +
      "(Chaozhou) and Cantonese communities carry this forward — Phnom Penh " +
      "still holds public Mid-Autumn celebrations today, which is the living " +
      "context your uncle's shop sits inside.",
  },
  {
    lead: "Egg yolks",
    body:
      "The salted duck egg yolk at the center is meant to visually and " +
      "symbolically stand in for the moon itself. A no-yolk version gives a " +
      "smoother, purely-paste texture, while double yolk is prized for extra " +
      "richness and is often treated as a step up in indulgence — collectors " +
      "of the classic Cantonese style will hunt for triple or even " +
      "quadruple-yolk versions as the ultimate flex.",
  },
];

const closing =
  "As someone who came from a Teochew family lineage in Cambodia that produces " +
  "mooncake, I have experience mooncake all my life but I never really put much " +
  "thought into its fascinating history and origin. In this archive, I plan to " +
  "preserve that piece and leave my marking in the world.";

export default function ContextAbout() {
  return (
    <section style={styles.section}>
      <p style={styles.kicker}>ABOUT THE MOONCAKE</p>
      <h2 style={styles.heading}>What is a mooncake?</h2>
      <p style={styles.intro}>{intro}</p>
      {points.map((p) => (
        <p key={p.lead} style={styles.point}>
          <strong style={styles.lead}>{p.lead}:</strong> {p.body}
        </p>
      ))}
      <p style={styles.closing}>{closing}</p>
    </section>
  );
}