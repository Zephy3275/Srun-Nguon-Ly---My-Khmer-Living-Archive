import {
  Cormorant_Garamond,
  Jost,
  Noto_Sans_Khmer,
  Noto_Serif_Khmer,
} from "next/font/google";
import collection from "../collection.config.js";
import "./globals.css";
import SiteHeader from "../components/SiteHeader.js";

// Fonts come with Next.js (next/font/google): they are downloaded when the site
// is built and served from our own site, not from Google at visit time. Each
// font sets a CSS variable on <html>; globals.css puts them in order
// (--font-heading, --font-body). A browser picks a font per character, so an
// English letter uses the first font and a Khmer letter falls through to the
// Khmer font, even inside one sentence.
const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--f-heading",
  display: "swap",
});
const bodyFont = Jost({
  subsets: ["latin"],
  variable: "--f-body",
  display: "swap",
});
const khmerSans = Noto_Sans_Khmer({
  subsets: ["khmer"],
  variable: "--f-khmer-sans",
  display: "swap",
});
const khmerSerif = Noto_Serif_Khmer({
  subsets: ["khmer"],
  variable: "--f-khmer-serif",
  display: "swap",
});

const fontVariables = [
  headingFont.variable,
  bodyFont.variable,
  khmerSans.variable,
  khmerSerif.variable,
].join(" ");

export const metadata = {
  title: `${collection.name} — Khmer Living Archive`,
  description: collection.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontVariables}>
      <body
        style={{
          margin: 0,
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          fontFamily: "var(--font-body)",
          minHeight: "100vh",
        }}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
