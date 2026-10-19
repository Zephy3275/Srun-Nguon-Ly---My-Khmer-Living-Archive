// A divider: a row of moon phases (waxing to full to waning) between two thin
// gold lines. Decoration only, drawn with CSS (no image), hidden from screen
// readers. Each phase is a transparent circle with a gold inset shadow; the
// shadow's sideways offset sets how much of the moon is lit (a bigger offset =
// a fatter crescent; 16 = the whole circle, since the circle is 16px wide).

const SIZE = 16;
const phases = [5, 9, 13, SIZE, -13, -9, -5];

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    margin: "32px 0",
  },
  line: {
    flex: "1 1 0",
    maxWidth: 120,
    height: 1,
    background:
      "linear-gradient(90deg, transparent, var(--gold-line), transparent)",
  },
  moons: { display: "flex", alignItems: "center", gap: 14 },
  moon: {
    width: SIZE,
    height: SIZE,
    borderRadius: "50%",
    boxSizing: "border-box",
  },
};

export default function MoonPhases() {
  return (
    <div aria-hidden="true" style={styles.row}>
      <span style={styles.line} />
      <div style={styles.moons}>
        {phases.map((offset, i) => (
          <span
            key={i}
            style={{
              ...styles.moon,
              boxShadow: `inset ${offset}px 0 0 0 var(--accent), 0 0 0 1px var(--gold-line)`,
            }}
          />
        ))}
      </div>
      <span style={styles.line} />
    </div>
  );
}
