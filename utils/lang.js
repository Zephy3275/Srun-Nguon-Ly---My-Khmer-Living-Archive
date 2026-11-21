import { cookies } from "next/headers";
import { LANGS } from "./strings.js";

// The visitor's language mode ("both", "en" or "km"), read on the server from
// the "lang" cookie that the header's LangSwitch sets. A missing or unknown
// value means "both", the site's default. Server components call this and pass
// `lang` down as a prop; browser components get it from their parent.
export async function getLang() {
  const value = (await cookies()).get("lang")?.value;
  return LANGS.includes(value) ? value : "both";
}
