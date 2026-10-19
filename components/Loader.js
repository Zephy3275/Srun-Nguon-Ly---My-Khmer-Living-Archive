// The site's "please wait" sign, with an optional line of text next to it (or
// under it with `vertical`). Used for page loads and for every button that is
// waiting on the server. It takes the colour of its surroundings for the text.
//
// Two looks, chosen by size, because detail disappears when a picture is tiny:
//  - big (RICH_FROM px and up, e.g. the page-load loader): the rich picture, in
//    two layers. The orbiting rings turn slowly (.loader-rings in globals.css)
//    while the mooncake in the middle stands still on top of them.
//  - small (buttons): the plain mooncake icon turning (.loader-icon).
// Both turnings stop for visitors whose system asks for reduced motion.

const RICH_FROM = 56;
// The still mooncake is this fraction of the rings picture (cut that way in the
// image files, public/loader-rings.png and public/loader-center.png).
const CENTER_SHARE = 0.407;

const styles = {
  row: { display: "inline-flex", alignItems: "center", gap: 10 },
  column: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 14 },
  icon: { display: "block" },
  stack: { position: "relative", display: "block" },
  rings: { position: "absolute", top: 0, left: 0, display: "block" },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "block",
  },
  label: {
    fontFamily: "var(--font-label)",
    fontWeight: 700,
    letterSpacing: 1,
    color: "inherit",
  },
};

export default function Loader({ size = 24, label, vertical = false }) {
  const centerSize = Math.round(size * CENTER_SHARE);

  return (
    <span style={vertical ? styles.column : styles.row} role="status" aria-live="polite">
      {size >= RICH_FROM ? (
        <span style={{ ...styles.stack, width: size, height: size }}>
          <img
            src="/loader-rings.png"
            alt=""
            width={size}
            height={size}
            className="loader-rings"
            style={styles.rings}
          />
          <img
            src="/loader-center.png"
            alt=""
            width={centerSize}
            height={centerSize}
            style={styles.center}
          />
        </span>
      ) : (
        <img
          src="/icon.png"
          alt=""
          width={size}
          height={size}
          className="loader-icon"
          style={styles.icon}
        />
      )}
      {label && <span style={styles.label}>{label}</span>}
    </span>
  );
}
