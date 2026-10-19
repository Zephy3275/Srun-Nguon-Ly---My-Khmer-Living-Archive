// The home page's top section: a full-width painted night scene (a glowing moon
// over misty mountains and a lake, made with Gemini and compressed; the picture
// holds no text) with the archive's title laid over its lower part.
//   children: the label, title and description, drawn below the moon.
//
// How it is laid out: the picture is shown at its natural shape (about 2.4 wide
// to 1 tall), but never shorter than 340px, so on a phone it is cropped around
// the moon instead of shrinking to a sliver. The text block is pulled UP over the
// bottom of the picture (negative top margin) so the title sits on the mountains,
// below the moon. A dark layer behind the text (the "scrim") keeps it readable;
// it starts below the moon so the moon itself stays bright. The picture's own
// bottom edge dissolves into the page, so there is no hard line.
//
// Two copies of the picture are offered (srcSet): a phone downloads the small one
// (27 KB), a wide screen the larger one (92 KB). It is decoration, so alt is empty.

const fade = "linear-gradient(180deg, black 70%, transparent 100%)";

const styles = {
  image: {
    display: "block",
    width: "100%",
    height: "clamp(340px, 41.7vw, 860px)",
    objectFit: "cover",
    objectPosition: "50% 30%",
    WebkitMaskImage: fade,
    maskImage: fade,
  },
  content: {
    position: "relative",
    marginTop: "calc(-1 * clamp(110px, 16vw, 230px))",
    padding: "56px 24px 40px",
    textAlign: "center",
    background:
      "linear-gradient(180deg, transparent 0%, var(--scrim) 40%, var(--scrim) 75%, transparent 100%)",
  },
  inner: { maxWidth: 720, margin: "0 auto" },
};

export default function HeroBanner({ children }) {
  return (
    <section>
      <img
        src="/hero-moon-2000.webp"
        srcSet="/hero-moon-900.webp 900w, /hero-moon-2000.webp 2000w"
        sizes="100vw"
        alt=""
        fetchPriority="high"
        style={styles.image}
      />
      <div style={styles.content}>
        <div style={styles.inner}>{children}</div>
      </div>
    </section>
  );
}
