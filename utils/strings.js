// Every piece of interface text, in English and Khmer, by ID. The IDs match
// ../Week13/Language_Toggle_Files/ (outside the repo), where the list was made and
// Gemini drafted the Khmer; the student reads and corrects every Khmer string.
// Entry content is not here: it comes from the database's own Khmer fields.
//
// The language is one of three modes, kept in a "lang" cookie:
//   "both" (the default): the site as it was before the toggle, English with
//          Khmer in the places that already had it;
//   "en": English only;   "km": Khmer only.
// A string with no Khmer falls back to its English, so a gap never breaks a page.

import collection from "../collection.config.js";

export const LANGS = ["both", "en", "km"];

// Show the English part / the Khmer part of something that has both.
export const showsEn = (lang) => lang !== "km";
export const showsKm = (lang) => lang !== "en";

// An entry's own text (title or description, from the database): Khmer-only
// shows its Khmer, or its English when it has none; the other modes the English.
// The Khmer line under the English is shown only in "both".
export const entryText = (lang, en, km) => (lang === "km" && km ? km : en);
export const isKhmerText = (lang, km) => lang === "km" && Boolean(km);

// The archive's identity (name, description, source, city) from
// collection.config.js, in Khmer in Khmer-only mode when it has one.
export const archive = (lang, key) => (lang === "km" && collection.km?.[key]) || collection[key];

// The text for one ID. {count} and {query} in the text are filled from `vars`.
export function t(lang, id, vars = {}) {
  const s = STRINGS[id];
  if (!s) {
    console.error("No string with ID", id);
    return "";
  }
  let text = lang === "km" && s.km ? s.km : vars.count === 1 && s.enOne ? s.enOne : s.en;
  for (const [name, value] of Object.entries(vars)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

// The same words in sentence case ("LOG IN" -> "Log in"), for an English link
// or title inside a sentence. Khmer has no capitals, so it comes back as it is.
export function sentenceCase(lang, id, vars) {
  const text = t(lang, id, vars);
  if (lang === "km" && STRINGS[id]?.km) return text;
  return text.charAt(0) + text.slice(1).toLowerCase();
}

export const STRINGS = {
  // Header and menu (top of every page)
  H1: { en: "KHMER LIVING ARCHIVE", km: "បណ្ណសាររស់ខ្មែរ" },
  H2: { en: "BROWSE", km: "រុករក" },
  H3: { en: "ADD AN ENTRY +", km: "បន្ថែមធាតុ +" },
  H4: { en: "REVIEW", km: "ការពិនិត្យ" },
  H5: { en: "MY ENTRIES", km: "ធាតុរបស់ខ្ញុំ" },
  H6: { en: "LOG IN", km: "ចូលគណនី" },
  H7: { en: "SIGN UP", km: "ចុះឈ្មោះ" },
  H8: { en: "SIGN OUT", km: "ចាកចេញ" },
  H9: { en: "SIGNING OUT…", km: "កំពុងចាកចេញ…" },

  // Shared across pages
  P1: { en: "← BACK TO HOMEPAGE", km: "← ត្រឡប់ទៅទំព័រដើម" },
  P2: { en: "← BACK TO BROWSE", km: "← ត្រឡប់ទៅការរុករក" },
  P3: { en: "← BACK TO ENTRY", km: "← ត្រឡប់ទៅធាតុ" },
  P4: { en: "LOADING THE ARCHIVE…", km: "កំពុងផ្ទុកបណ្ណសារ…" },
  P5: { en: "IMAGE PENDING", km: "កំពុងរង់ចាំរូបភាព" },
  P6: { en: "SOURCE", km: "ប្រភព" },
  P7: { en: "CONTRIBUTED BY", km: "រួមចំណែកដោយ" },
  P8: { en: "Something went wrong. Please try again.", km: "មានបញ្ហាអ្វីមួយបានកើតឡើង។ សូមព្យាយាមម្តងទៀត។" },
  P9: { en: "That change wasn't saved.", km: "ការផ្លាស់ប្តូរនោះមិនត្រូវបានរក្សាទុកទេ។" },

  // Home page
  HM1: { en: "CURATED BY", km: "រៀបចំដោយ" },
  HM2: { en: "CITY", km: "ទីក្រុង" },
  HM3: { en: "entries in the archive: {count}", km: "ចំនួនធាតុក្នុងបណ្ណសារ៖ {count}" },
  HM4: { en: "We couldn't load the archive right now. Please try again in a moment.", km: "យើងមិនអាចផ្ទុកបណ្ណសារបានទេនៅពេលនេះ។ សូមព្យាយាមម្តងទៀតក្នុងពេលបន្តិចទៀត។" },
  HM5: { en: "No entries in the archive yet.", km: "មិនទាន់មានធាតុណាមួយនៅក្នុងបណ្ណសារនៅឡើយទេ។" },
  HM6: { en: "Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall 2026. This archive is under construction all semester. Come back in December.", km: "បង្កើតឡើងក្នុងមុខវិជ្ជា ICT 340 — Vibe Coding នៃសាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ ឆមាសសរទរដូវ 2026។ បណ្ណសារនេះកំពុងស្ថិតក្រោមការកសាងពេញមួយឆមាស។ សូមត្រឡប់មកមើលម្តងទៀតនៅខែធ្នូ។" },

  // Home page: "About the mooncake" section
  AB1: { en: "ABOUT THE MOONCAKE", km: "អំពីនំសែនព្រះខែ" },
  AB2: { en: "What is a mooncake?", km: "តើនំសែនព្រះខែជាអ្វី?" },
  AB3: { en: "Mooncakes are eaten during the Mid-Autumn Festival, held on the 15th night of the 8th lunar month (usually mid-September to early October), when the moon is believed to be at its fullest and brightest of the year. The festival centers on the moon, family reunions, and mooncakes — dense, round pastries loaded with history, mythology, and meaning.", km: "នំសែនព្រះខែត្រូវបានទទួលទានក្នុងអំឡុងពិធីបុណ្យសែនព្រះខែ ដែលប្រារព្ធឡើងនៅរាត្រីថ្ងៃ 15 កើត ខែ 8 តាមចន្ទគតិចិន (ជាធម្មតាស្ថិតនៅពាក់កណ្តាលខែកញ្ញា ដល់ដើមខែតុលា) ជាពេលដែលគេជឿថាព្រះច័ន្ទពេញវង់ និងភ្លឺចែងចាំងបំផុតប្រចាំឆ្នាំ។ ពិធីបុណ្យនេះផ្តោតសំខាន់លើព្រះច័ន្ទ ការជួបជុំគ្រួសារ និងនំសែនព្រះខែ — ជានំមូលណែនដែលពោរពេញទៅដោយប្រវត្តិសាស្ត្រ រឿងព្រេងនិទាន និងអត្ថន័យជ្រាលជ្រៅ។" },
  AB4: { en: "Shape and symbolism", km: "រូបរាង និងនិមិត្តរូប" },
  AB5: { en: "The round shape became symbolic of the full moon, representing unity and completeness, making mooncakes an ideal treat for family gatherings. The classic version has a lotus seed paste center with a salted duck egg yolk representing the full moon itself.", km: "រូបរាងមូលបានក្លាយជានិមិត្តរូបនៃព្រះច័ន្ទពេញវង់ ដែលតំណាងឱ្យសាមគ្គីភាព និងភាពពេញលេញ ធ្វើឱ្យនំសែនព្រះខែក្លាយជានំដ៏ស័ក្តិសមបំផុតសម្រាប់ការជួបជុំគ្រួសារ។ ប្រភេទដើមបែបប្រពៃណីមានស្នូលគ្រាប់ឈូក និងពងក្រហមពងទាប្រៃនៅចំកណ្តាល ដែលតំណាងឱ្យដួងព្រះច័ន្ទពេញវង់តែម្តង។" },
  AB6: { en: "The rebellion legend", km: "រឿងព្រេងនៃការបះបោរ" },
  AB7: { en: "The most famous origin story dates to the Yuan Dynasty. Han Chinese revolutionaries are said to have hidden messages inside mooncakes to secretly coordinate an uprising against Mongol rulers — “Kill the Mongols on the 15th day of the 8th month” — and the successful rebellion gave rise to the Ming Dynasty. True or not, it's part of why mooncakes are tied to unity and resistance as much as reunion.", km: "រឿងរ៉ាវប្រវត្តិដើមដ៏ល្បីល្បាញបំផុតមានតាំងពីសម័យរាជវង្សយ័ន។ គេដំណាលថា ក្រុមបដិវត្តន៍ជនជាតិចិនហានបានលាក់សំបុត្រសម្ងាត់នៅខាងក្នុងនំសែនព្រះខែ ដើម្បីសម្របសម្រួលការបះបោរប្រឆាំងនឹងអ្នកគ្រប់គ្រងម៉ុងហ្គោល — «សម្លាប់ពួកម៉ុងហ្គោលនៅថ្ងៃទី 15 ខែ 8» — ហើយការបះបោរដ៏ជោគជ័យនោះបាននាំឱ្យកកើតរាជវង្សមីង។ ទោះជាការពិតឬអត់ក៏ដោយ នេះជាផ្នែកមួយដែលធ្វើឱ្យនំសែនព្រះខែត្រូវបានផ្សារភ្ជាប់ទៅនឹងសាមគ្គីភាព និងការតស៊ូ ក៏ដូចជាការជួបជុំគ្នាផងដែរ។" },
  AB8: { en: "Reaching Southeast Asia", km: "ការរីកសាយភាយមកកាន់អាស៊ីអាគ្នេយ៍" },
  AB9: { en: "The festival spread well beyond China to Southeast Asian countries with large ethnic Chinese populations, and remains an important festival in Vietnam and across the diaspora. Cambodia's Teochew (Chaozhou) and Cantonese communities carry this forward — Phnom Penh still holds public Mid-Autumn celebrations today, which is the living context my uncle's shop sits inside.", km: "ពិធីបុណ្យនេះបានរីកសាយភាយហួសពីប្រទេសចិនទៅកាន់បណ្តាប្រទេសអាស៊ីអាគ្នេយ៍ដែលមានសហគមន៍ជនជាតិដើមចិនច្រើន ហើយនៅតែជាពិធីបុណ្យដ៏សំខាន់នៅប្រទេសវៀតណាម និងក្នុងចំណោមជនជាតិចិននៅក្រៅប្រទេស។ សហគមន៍ចិនទាជីវ (ឆាវចូវ) និងកាតាំងនៅកម្ពុជាបានបន្តប្រពៃណីនេះ — រាជធានីភ្នំពេញនៅតែប្រារព្ធពិធីបុណ្យសែនព្រះខែជាសាធារណៈរហូតដល់សព្វថ្ងៃ ដែលនេះជាបរិបទរស់រវើកនៃហាងរបស់ពូខ្ញុំ។" },
  AB10: { en: "Egg yolks", km: "ពងក្រហម" },
  AB11: { en: "The salted duck egg yolk at the center is meant to visually and symbolically stand in for the moon itself. A no-yolk version gives a smoother, purely-paste texture, while double yolk is prized for extra richness and is often treated as a step up in indulgence — collectors of the classic Cantonese style will hunt for triple or even quadruple-yolk versions as the ultimate flex.", km: "ពងក្រហមពងទាប្រៃនៅចំកណ្តាលមានគោលបំណងតំណាងឱ្យដួងព្រះច័ន្ទទាំងរូបភាព និងនិមិត្តរូប។ ប្រភេទគ្មានពងក្រហមផ្តល់នូវរសជាតិស្នូលសុទ្ធដែលម៉ដ្ឋរលោងជាង ខណៈពេលដែលប្រភេទពងក្រហមពីរត្រូវបានគេពេញនិយមដោយសាររសជាតិឈ្ងុយឆ្ងាញ់ជាប់ចិត្តជាងមុន ហើយជារឿយៗត្រូវបានចាត់ទុកថាជាកម្រិតប្រណីតមួយកម្រិតទៀត — អ្នកនិយមនំបែបកាតាំងប្រពៃណីថែមទាំងតាមស្វែងរកប្រភេទពងក្រហមបី ឬរហូតដល់បួនទៀតផង ដើម្បីបង្ហាញពីភាពពិសេសបំផុត។" },
  AB12: { en: "As someone who came from a Teochew family lineage in Cambodia that produces mooncake, I have experience mooncake all my life but I never really put much thought into its fascinating history and origin. In this archive, I plan to preserve that piece and leave my marking in the world.", km: "ក្នុងនាមជាអ្នកដែលមានដើមកំណើតពីគ្រួសារខ្សែស្រឡាយទាជីវនៅកម្ពុជាដែលផលិតនំសែនព្រះខែ ខ្ញុំបានស្គាល់ និងទទួលទាននំសែនព្រះខែពេញមួយជីវិតរបស់ខ្ញុំ ប៉ុន្តែខ្ញុំមិនដែលបានគិតស៊ីជម្រៅអំពីប្រវត្តិសាស្ត្រ និងប្រភពដើមដ៏គួរឱ្យចាប់អារម្មណ៍របស់វាឡើយ។ នៅក្នុងបណ្ណសារនេះ ខ្ញុំមានគម្រោងថែរក្សាផ្នែកមួយនោះ និងបន្សល់ទុកនូវស្នាដៃរបស់ខ្ញុំនៅលើពិភពលោកនេះ។" },

  // Browse and search
  S1: { en: "BROWSE THE COLLECTION", km: "រុករកបណ្តុំធាតុ" },
  S2: { en: "Search by title, description or contributor…", km: "ស្វែងរកតាមចំណងជើង ការពិពណ៌នា ឬអ្នករួមចំណែក…" },
  S3: { en: "CLEAR ×", km: "សម្អាត ×" },
  S4: { en: "{count} entries in the archive", km: "{count} ធាតុក្នុងបណ្ណសារ" },
  S5: { en: "{count} matches for “{query}”", enOne: "{count} match for “{query}”", km: "លទ្ធផលត្រូវគ្នា {count} សម្រាប់ «{query}»" },
  S6: { en: "Nothing in the archive matches “{query}” yet.", km: "មិនទាន់មានអ្វីនៅក្នុងបណ្ណសារដែលត្រូវគ្នានឹង «{query}» នៅឡើយទេ។" },

  // An entry's page, edit and delete
  E1: { en: "Couldn't load this entry", km: "មិនអាចផ្ទុកធាតុនេះបានទេ" },
  E2: { en: "We couldn't reach the archive right now. Please try again in a moment.", km: "យើងមិនអាចភ្ជាប់ទៅបណ្ណសារបានទេនៅពេលនេះ។ សូមព្យាយាមម្តងទៀតក្នុងពេលបន្តិចទៀត។" },
  E3: { en: "Entry not found", km: "រកមិនឃើញធាតុនេះទេ" },
  E4: { en: "There is no entry with that id in the archive yet.", km: "មិនទាន់មានធាតុណាដែលមានលេខសម្គាល់នោះនៅក្នុងបណ្ណសារនៅឡើយទេ។" },
  E5: { en: "EDIT", km: "កែសម្រួល" },
  E6: { en: "DELETE", km: "លុប" },
  E7: { en: "Delete this entry? This can't be undone.", km: "លុបធាតុនេះឬ? សកម្មភាពនេះមិនអាចត្រឡប់ក្រោយវិញបានទេ។" },
  E8: { en: "YES, DELETE", km: "យល់ព្រម លុប" },
  E9: { en: "DELETING…", km: "កំពុងលុប…" },
  E10: { en: "CANCEL", km: "បោះបង់" },

  // Log in and sign up
  A1: { en: "MEMBER ACCESS", km: "ការចូលប្រើសម្រាប់សមាជិក" },
  A2: { en: "Sign in with the email and password you used to sign up.", km: "ចូលគណនីដោយប្រើអ៊ីមែល និងពាក្យសម្ងាត់ដែលអ្នកបានប្រើពេលចុះឈ្មោះ។" },
  A3: { en: "EMAIL", km: "អ៊ីមែល" },
  A4: { en: "PASSWORD", km: "ពាក្យសម្ងាត់" },
  A5: { en: "SIGN IN", km: "ចូលគណនី" },
  A6: { en: "SIGNING IN…", km: "កំពុងចូលគណនី…" },
  A7: { en: "Invalid email or password", km: "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ" },
  A8: { en: "Need an account?", km: "ត្រូវការគណនីមែនទេ?" },
  A9: { en: "JOIN THE ARCHIVE", km: "ចូលរួមក្នុងបណ្ណសារ" },
  A10: { en: "Create an account to take part in the archive.", km: "បង្កើតគណនីដើម្បីចូលរួមក្នុងបណ្ណសារនេះ។" },
  A11: { en: "At least 6 characters.", km: "យ៉ាងតិច 6 តួអក្សរ។" },
  A12: { en: "CREATE ACCOUNT", km: "បង្កើតគណនី" },
  A13: { en: "CREATING ACCOUNT…", km: "កំពុងបង្កើតគណនី…" },
  A14: { en: "Check your email to confirm your account.", km: "សូមពិនិត្យអ៊ីមែលរបស់អ្នក ដើម្បីបញ្ជាក់គណនីរបស់អ្នក។" },
  A15: { en: "Already have an account?", km: "មានគណនីរួចហើយមែនទេ?" },

  // Adding and editing an entry
  F1: { en: "CONTRIBUTE", km: "រួមចំណែក" },
  F2: { en: "Add an entry", km: "បន្ថែមធាតុ" },
  F3: { en: "Add something to the archive. Every field marked required must be filled in, and the photo is required.", km: "បន្ថែមអ្វីមួយទៅក្នុងបណ្ណសារ។ រាល់ប្រអប់ដែលសម្គាល់ថាត្រូវតែបំពេញ ត្រូវតែបំពេញឱ្យគ្រប់ ហើយរូបភាពក៏តម្រូវឱ្យមានដែរ។" },
  F4: { en: "You need to be logged in to add an entry.", km: "អ្នកត្រូវចូលគណនីជាមុនសិន ដើម្បីបន្ថែមធាតុ។" },
  F5: { en: "EDIT ENTRY", km: "កែសម្រួលធាតុ" },
  F6: { en: "Log in to edit", km: "ចូលគណនីដើម្បីកែសម្រួល" },
  F7: { en: "You need to be logged in to edit an entry.", km: "អ្នកត្រូវចូលគណនីជាមុនសិន ដើម្បីកែសម្រួលធាតុ។" },
  F8: { en: "You can't edit this entry", km: "អ្នកមិនអាចកែសម្រួលធាតុនេះបានទេ" },
  F9: { en: "Only the person who added an entry can edit it.", km: "មានតែអ្នកដែលបានបន្ថែមធាតុប៉ុណ្ណោះ ទើបអាចកែសម្រួលវាបាន។" },
  F10: { en: "Change anything you like, then save. Your current photo stays unless you choose a new one.", km: "កែប្រែអ្វីក៏បានតាមដែលអ្នកចង់ រួចរក្សាទុក។ រូបភាពបច្ចុប្បន្នរបស់អ្នកនឹងនៅដដែល លុះត្រាតែអ្នកជ្រើសរើសរូបភាពថ្មី។" },
  F11: { en: "ADD TO THE ARCHIVE", km: "បន្ថែមទៅក្នុងបណ្ណសារ" },
  F12: { en: "SAVE CHANGES", km: "រក្សាទុកការផ្លាស់ប្តូរ" },
  F13: { en: "SAVING…", km: "កំពុងរក្សាទុក…" },
  F14: { en: "CHECKING YOUR ENTRY…", km: "កំពុងពិនិត្យធាតុរបស់អ្នក…" },
  F15: { en: "UPLOADING PHOTO…", km: "កំពុងបង្ហោះរូបភាព…" },
  F16: { en: "SAVING ENTRY…", km: "កំពុងរក្សាទុកធាតុ…" },
  F17: { en: "SAVING CHANGES…", km: "កំពុងរក្សាទុកការផ្លាស់ប្តូរ…" },
  F18: { en: "CURRENT PHOTO", km: "រូបភាពបច្ចុប្បន្ន" },
  F19: { en: "NEW PHOTO (not saved yet)", km: "រូបភាពថ្មី (មិនទាន់រក្សាទុកនៅឡើយទេ)" },
  F20: { en: "Leave empty", km: "ទុកទទេ" },
  F21: { en: "characters", km: "តួអក្សរ" },
  F22: { en: "words", km: "ពាក្យ" },
  F23: { en: "Thank you", km: "សូមអរគុណ" },
  F24: { en: "Sent back for review", km: "បានបញ្ជូនទៅពិនិត្យឡើងវិញ" },
  F25: { en: "Your session has ended. Please log in again.", km: "វគ្គចូលប្រើរបស់អ្នកបានផុតកំណត់ហើយ។ សូមចូលគណនីម្តងទៀត។" },
  F26: { en: "Your entry couldn't be saved. Please try again in a moment.", km: "មិនអាចរក្សាទុកធាតុរបស់អ្នកបានទេ។ សូមព្យាយាមម្តងទៀតក្នុងពេលបន្តិចទៀត។" },
  F27: { en: "Your photo didn't upload. Check your connection and try again.", km: "មិនអាចបង្ហោះរូបភាពរបស់អ្នកបានទេ។ សូមពិនិត្យការតភ្ជាប់អ៊ីនធឺណិតរបស់អ្នក រួចព្យាយាមម្តងទៀត។" },

  // Form field labels
  FL1: { en: "TITLE", km: "ចំណងជើង" },
  FL2: { en: "TITLE (KHMER)", km: "ចំណងជើង (ភាសាខ្មែរ)" },
  FL3: { en: "DESCRIPTION", km: "ការពិពណ៌នា" },
  FL4: { en: "DESCRIPTION (KHMER)", km: "ការពិពណ៌នា (ភាសាខ្មែរ)" },
  FL5: { en: "CONTRIBUTOR", km: "អ្នករួមចំណែក" },
  FL6: { en: "FILLING", km: "ស្នូល" },
  FL7: { en: "SHAPE", km: "រូបរាង" },
  FL8: { en: "COLOR", km: "ពណ៌" },
  FL9: { en: "TEXTURE", km: "សាច់នំ (វាយនភាព)" },
  FL10: { en: "SWEETNESS", km: "កម្រិតផ្អែម" },
  FL11: { en: "SALTINESS", km: "កម្រិតប្រៃ" },
  FL12: { en: "PHOTO", km: "រូបភាព" },

  // Form field hints (small text under each field)
  FH1: { en: "Required. Up to 120 characters.", km: "ត្រូវតែបំពេញ។ អតិបរមា 120 តួអក្សរ។" },
  FH2: { en: "Optional. Up to 500 characters. Leave it empty if you don't know Khmer.", km: "ជាជម្រើស។ អតិបរមា 500 តួអក្សរ។ ទុកទទេប្រសិនបើអ្នកមិនចេះភាសាខ្មែរ។" },
  FH3: { en: "Required. Up to 1,000 words.", km: "ត្រូវតែបំពេញ។ អតិបរមា 1,000 ពាក្យ។" },
  FH4: { en: "Optional. Up to 6,000 characters. Leave it empty if you don't know Khmer.", km: "ជាជម្រើស។ អតិបរមា 6,000 តួអក្សរ។ ទុកទទេប្រសិនបើអ្នកមិនចេះភាសាខ្មែរ។" },
  FH5: { en: "Required. Who or where this comes from. Up to 300 characters.", km: "ត្រូវតែបំពេញ។ ប្រភព ឬអ្នកផ្តល់ព័ត៌មាននេះ។ អតិបរមា 300 តួអក្សរ។" },
  FH6: { en: "Required. Your name, as you want it shown. Up to 120 characters.", km: "ត្រូវតែបំពេញ។ ឈ្មោះរបស់អ្នកតាមដែលអ្នកចង់ឱ្យបង្ហាញ។ អតិបរមា 120 តួអក្សរ។" },
  FH7: { en: "Optional. Words, not numbers. Up to 120 characters.", km: "ជាជម្រើស។ សរសេរជាពាក្យ មិនមែនលេខទេ។ អតិបរមា 120 តួអក្សរ។" },
  FH8: { en: "Optional. 1 to 5.", km: "ជាជម្រើស។ ពី 1 ដល់ 5។" },
  FH9: { en: "Required. JPG, PNG or WebP, up to 5 MB.", km: "ត្រូវតែបំពេញ។ ប្រភេទ JPG, PNG ឬ WebP ទំហំអតិបរមា 5 MB។" },
  FH10: { en: "Optional. Choose a file only if you want to replace the current photo. JPG, PNG or WebP, up to 5 MB.", km: "ជាជម្រើស។ ជ្រើសរើសឯកសារតែនៅពេលអ្នកចង់ជំនួសរូបភាពបច្ចុប្បន្នប៉ុណ្ណោះ។ ប្រភេទ JPG, PNG ឬ WebP ទំហំអតិបរមា 5 MB។" },

  // Form error messages (shown in red under a field)
  V1: { en: "Add a title (up to 120 characters).", km: "សូមបន្ថែមចំណងជើង (អតិបរមា 120 តួអក្សរ)។" },
  V2: { en: "Say where this comes from (up to 300 characters).", km: "សូមបញ្ជាក់ប្រភពនៃធាតុនេះ (អតិបរមា 300 តួអក្សរ)។" },
  V3: { en: "Add the contributor's name (up to 120 characters).", km: "សូមបន្ថែមឈ្មោះអ្នករួមចំណែក (អតិបរមា 120 តួអក្សរ)។" },
  V4: { en: "Describe the filling (up to 120 characters).", km: "សូមពិពណ៌នាអំពីស្នូល (អតិបរមា 120 តួអក្សរ)។" },
  V5: { en: "Describe the shape (up to 120 characters).", km: "សូមពិពណ៌នាអំពីរូបរាង (អតិបរមា 120 តួអក្សរ)។" },
  V6: { en: "Describe the color (up to 120 characters).", km: "សូមពិពណ៌នាអំពីពណ៌ (អតិបរមា 120 តួអក្សរ)។" },
  V7: { en: "Khmer title: words, up to 500 characters, or leave it empty.", km: "ចំណងជើងជាភាសាខ្មែរ៖ សរសេរជាពាក្យ អតិបរមា 500 តួអក្សរ ឬទុកទទេ។" },
  V8: { en: "Add a description (up to 1,000 words).", km: "សូមបន្ថែមការពិពណ៌នា (អតិបរមា 1,000 ពាក្យ)។" },
  V9: { en: "Khmer description: words, up to 6,000 characters, or leave it empty.", km: "ការពិពណ៌នាជាភាសាខ្មែរ៖ សរសេរជាពាក្យ អតិបរមា 6,000 តួអក្សរ ឬទុកទទេ។" },
  V10: { en: "Texture should be words, not numbers (up to 120 characters).", km: "សាច់នំគួរសរសេរជាពាក្យ មិនមែនលេខទេ (អតិបរមា 120 តួអក្សរ)។" },
  V11: { en: "Pick 1 to 5, or leave it empty.", km: "ជ្រើសរើសពី 1 ដល់ 5 ឬទុកទទេ។" },
  V12: { en: "Choose a JPG, PNG or WebP photo under 5 MB.", km: "សូមជ្រើសរើសរូបភាពប្រភេទ JPG, PNG ឬ WebP ដែលមានទំហំក្រោម 5 MB។" },
  V13: { en: "Add a photo (JPG, PNG or WebP, under 5 MB).", km: "សូមបន្ថែមរូបភាព (ប្រភេទ JPG, PNG ឬ WebP ទំហំក្រោម 5 MB)។" },

  // My entries page
  M1: { en: "YOUR CONTRIBUTIONS", km: "ការរួមចំណែករបស់អ្នក" },
  M2: { en: "Everything you have added, and where each entry is in review.", km: "អ្វីគ្រប់យ៉ាងដែលអ្នកបានបន្ថែម និងស្ថានភាពការពិនិត្យនៃធាតុនីមួយៗ។" },
  M3: { en: "You need to be logged in to see your entries.", km: "អ្នកត្រូវចូលគណនីជាមុនសិន ដើម្បីមើលធាតុរបស់អ្នក។" },
  M4: { en: "We couldn't load your entries right now. Please try again in a moment.", km: "យើងមិនអាចផ្ទុកធាតុរបស់អ្នកបានទេនៅពេលនេះ។ សូមព្យាយាមម្តងទៀតក្នុងពេលបន្តិចទៀត។" },
  M5: { en: "You haven't added any entries yet.", km: "អ្នកមិនទាន់បានបន្ថែមធាតុណាមួយនៅឡើយទេ។" },
  M6: { en: "Add one", km: "បន្ថែមធាតុមួយ" },
  M7: { en: "Waiting for review. Only you and the reviewers can see it for now.", km: "កំពុងរង់ចាំការពិនិត្យ។ មានតែអ្នក និងអ្នកពិនិត្យប៉ុណ្ណោះដែលអាចមើលឃើញវានៅពេលនេះ។" },
  M8: { en: "This entry was returned. Edit it and save to send it for review again.", km: "ធាតុនេះត្រូវបានបញ្ជូនត្រឡប់មកវិញ។ សូមកែសម្រួល និងរក្សាទុក ដើម្បីបញ្ជូនទៅពិនិត្យម្តងទៀត។" },

  // Review queue (reviewers only)
  R1: { en: "FOR REVIEWERS", km: "សម្រាប់អ្នកពិនិត្យ" },
  R2: { en: "Review queue", km: "បញ្ជីរង់ចាំការពិនិត្យ" },
  R3: { en: "Pending entries, oldest first.", km: "ធាតុដែលកំពុងរង់ចាំ ដោយបង្ហាញពីចាស់បំផុតមុន។" },
  R4: { en: "SUBMITTED", km: "បានដាក់ស្នើ" },
  R5: { en: "UPDATED", km: "បានធ្វើបច្ចុប្បន្នភាព" },

  // Text for screen readers and images (not seen, but read aloud)
  X1: { en: "Main", km: "ម៉ឺនុយមេ" },
  X2: { en: "Search entries", km: "ស្វែងរកធាតុ" },
  X3: { en: "Clear search", km: "សម្អាតការស្វែងរក" },
  X4: { en: "Current photo", km: "រូបភាពបច្ចុប្បន្ន" },
  X5: { en: "Preview of the new photo", km: "ការមើលរូបភាពថ្មីជាមុន" },

  // Khmer the student wrote before the toggle (Labs 10 to 12). Kept as written, except
  // K2 and K5 (the PUBLISHED status and the RETURN button, the student's new choices) and the MY ENTRIES name in K14 and K15.
  K1: { en: "PENDING", km: "កំពុងរង់ចាំ" },
  K2: { en: "PUBLISHED", km: "បានផ្សព្វផ្សាយ" },
  K3: { en: "RETURNED", km: "បានបញ្ជូនត្រឡប់មកវិញ" },
  K4: { en: "PUBLISH", km: "ផ្សព្វផ្សាយ" },
  K5: { en: "RETURN", km: "បញ្ជូនត្រឡប់មកវិញ" },
  K6: { en: "REASON FOR RETURNING (OPTIONAL)", km: "មូលហេតុនៃការប្រគល់ត្រឡប់" },
  K7: { en: "PENDING", km: "កំពុងរង់ចាំ" },
  K8: { en: "REVIEWER'S NOTE", km: "កំណត់សម្គាល់របស់អ្នកវាយតម្លៃ" },
  K9: { en: "This page is for reviewers only.", km: "ទំព័រនេះសម្រាប់តែអ្នកពិនិត្យមើលប៉ុណ្ណោះ។" },
  K10: { en: "The queue could not be loaded.", km: "មិនអាចផ្ទុកបញ្ជីរង់ចាំបានទេ" },
  K11: { en: "The queue is empty. Every entry has been reviewed.", km: "បញ្ជីរង់ចាំគឺទទេ។ រាល់ធាតុទាំងអស់ត្រូវបានពិនិត្យរួចរាល់ហើយ។" },
  K12: { en: "That didn't go through. The entry may already have been reviewed, or you may not be allowed to review. Refresh the page and try again.", km: "ប្រតិបត្តិការនេះមិនបានជោគជ័យទេ។ ធាតុនេះអាចត្រូវបានពិនិត្យរួចហើយ ឬអ្នកប្រហែលជាមិនត្រូវបានអនុញ្ញាតឱ្យធ្វើការពិនិត្យនោះទេ។ សូមផ្ទុកទំព័រឡើងវិញ រួចសាកល្បងម្តងទៀត។" },
  K13: { en: "This entry is published. If you save changes, it goes back to review and is hidden from the public archive until a reviewer approves it again.", km: "ធាតុនេះត្រូវបានផ្សព្វផ្សាយរួចហើយ។ ប្រសិនបើអ្នករក្សាទុកការផ្លាស់ប្តូរ ធាតុនេះនឹងត្រឡប់ទៅស្ថានភាពរង់ចាំការពិនិត្យឡើងវិញ ហើយនឹងត្រូវបានលាក់ពីបណ្ណសារសាធារណៈ រហូតទាល់តែអ្នកពិនិត្យអនុម័តវាជាថ្មីម្តងទៀត។" },
  K14: { en: "Your entry has been received and is waiting for review. It will appear in the archive once it is published. You can follow its progress under MY ENTRIES.", km: "ការដាក់ស្នើរបស់អ្នកត្រូវបានទទួលហើយ ហើយកំពុងរង់ចាំការពិនិត្យ។ វានឹងបង្ហាញនៅក្នុងបណ្ណសារនៅពេលដែលវាត្រូវបានផ្សព្វផ្សាយ។ អ្នកអាចតាមដានដំណើរការរបស់វាបាននៅក្នុងផ្នែក «ធាតុរបស់ខ្ញុំ» (MY ENTRIES)។" },
  K15: { en: "Your changes were saved and sent back for review. The entry stays hidden from the public until it is approved. You can follow its progress under MY ENTRIES.", km: "ការកែប្រែរបស់អ្នកត្រូវបានរក្សាទុក និងបញ្ជូនទៅពិនិត្យឡើងវិញ។ ខ្លឹមសារនោះនឹងនៅតែលាក់មិនឱ្យសាធារណជនឃើញ រហូតទាល់តែវាត្រូវបានអនុម័ត។ អ្នកអាចតាមដានដំណើរការរបស់វាបាននៅក្នុងផ្នែក «ធាតុរបស់ខ្ញុំ» (MY ENTRIES)។" },
  K16: { en: "Try another word — every entry can be found by its title or description, in English or Khmer.", km: "សាកល្បងពាក្យផ្សេងទៀត — រាល់ការបញ្ចូលអាចរកបានដោយចំណងជើង ឬការពិពណ៌នារបស់វា ជាភាសាអង់គ្លេស ឬខ្មែរ។" },

  // The language switch in the header. L4 has no Khmer yet: it falls back to English.
  L1: { en: "EN + ខ្មែរ", km: "EN + ខ្មែរ" },
  L2: { en: "EN", km: "EN" },
  L3: { en: "ខ្មែរ", km: "ខ្មែរ" },
  L4: { en: "Language", km: "" },
};
