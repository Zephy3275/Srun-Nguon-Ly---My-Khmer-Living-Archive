// The glowing full moon at the top of the home page. Pure decoration, drawn
// with CSS only (no image): a round moon with a few faint craters, and a soft
// halo behind it that breathes slowly (the .moon-halo class in globals.css).
// aria-hidden: screen readers skip it. It sits ABOVE the heading, never behind
// text, so the heading stays easy to read.

const styles = {
  stage: {
    position: "relative",
    width: 132,
    height: 132,
    margin: "8px auto 32px",
  },
  halo: {
    position: "absolute",
    inset: -96,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, var(--glow-strong) 0%, var(--glow-soft) 42%, transparent 70%)",
    pointerEvents: "none",
  },
  moon: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: [
      "radial-gradient(circle at 62% 66%, var(--moon-crater) 0 9%, transparent 10%)",
      "radial-gradient(circle at 30% 58%, var(--moon-crater) 0 6%, transparent 7%)",
      "radial-gradient(circle at 54% 26%, var(--moon-crater) 0 5%, transparent 6%)",
      "radial-gradient(circle at 36% 30%, var(--moon-light) 0%, var(--moon-mid) 58%, var(--moon-edge) 100%)",
    ].join(", "),
    boxShadow: "0 0 36px var(--glow-strong)",
  },
};

export default function HeroMoon() {
  return (
    <div aria-hidden="true" style={styles.stage}>
      <div className="moon-halo" style={styles.halo} />
      <div style={styles.moon} />
    </div>
  );
}
