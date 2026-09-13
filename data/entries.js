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
    titleKhmer: "នំព្រះច័ន្ទគ្រប់មុខពងទា ១",
    source: "My uncle's shop",
    description:
      "A classic style mooncake. When people think of mooncake, they think of a cake that have mixture of various ingredients packing many flavors. " +
      "The crust is baked and hand-stamped in gold, wrapped around a dense filling of mixed nuts and seeds — likely a five-kernel style blend, though the exact mix is still being confirmed with family. At the center sits a single salted duck egg yolk, baked until firm and slightly crumbly, standing in for the full moon the way mooncakes have for generations.",
    descriptionKhmer:
      "នំព្រះច័ន្ទបែបបុរាណមួយប្រភេទ។ នៅពេលមនុស្សគិតដល់នំព្រះច័ន្ទ ភាគច្រើនតែងនឹកឃើញដល់នំដុំមួយដែលលាយបញ្ចូលគ្រឿងផ្សំច្រើនប្រភេទ សម្បូរទៅដោយរសជាតិចម្រុះ។ " +
      "សំបកនំត្រូវបានដុត ហើយចាប់ត្រាពណ៌មាសដោយដៃ ខាងក្នុងសម្បូរទៅដោយគ្រាប់គ្រៀបនិងគ្រាប់ធញ្ញជាតិលាយច្របល់គ្នា ប្រហែលជាបែបលាយគ្រឿងផ្សំប្រាំមុខ ប៉ុន្តែសមាសធាតុពិតប្រាកដនៅតែកំពុងសុំការបញ្ជាក់ពីគ្រួសារ។ នៅចំកណ្ដាលដាក់ស្នូលពងទាប្រៃមួយគ្រាប់ ដុតរហូតដល់រឹង និងបែកបន្តិចៗ តំណាងឱ្យព្រះច័ន្ទពេញវង់ ដូចដែលនំព្រះច័ន្ទធ្លាប់តំណាងជាច្រើនជំនាន់មកហើយ។",
    image: "/images/mooncake_egg_1.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "mooncake-egg-2",
    title: "Mooncake Ngoyen Egg 2",
    titleKhmer: "នំព្រះច័ន្ទគ្រប់មុខពងទា ២",
    source: "My uncle's shop",
    description:
      "A premium classic. Only slightly bigger than the mooncake egg 1 but with 2 eggs. Perfect for those with a bigger appetite. " +
      "Cutting it open reveals both yolks side by side, wrapped in the same golden, hand-stamped crust and nut-and-seed filling as Egg 1. A second yolk has traditionally marked a richer, more generous mooncake — often the one set aside for gifting or a bigger gathering.",
    descriptionKhmer:
      "នំបុរាណកម្រិតខ្ពស់មួយប្រភេទ។ មានទំហំធំជាងនំពងទា ១ បន្តិចប៉ុណ្ណោះ ប៉ុន្តែមានពងទាដល់ទៅ ២ គ្រាប់ សមស្របសម្រាប់អ្នកដែលចង់បានពេញចិត្ត។ " +
      "នៅពេលកាត់បើក នឹងឃើញស្នូលពងទាទាំងពីរដាក់ជាប់គ្នា រុំដោយសំបកនំពណ៌មាសចាប់ត្រាដោយដៃ និងគ្រឿងផ្សំគ្រាប់គ្រៀបដូចគ្នានឹងនំពងទា ១ដែរ។ តាមប្រពៃណី ការដាក់ស្នូលពងទាទីពីរ សំដៅបង្ហាញពីនំដែលសម្បូរបែប និងសប្បុរសជាងគេ — ជាញឹកញាប់ត្រូវបានរក្សាទុកសម្រាប់ជូនជាអំណោយ ឬសម្រាប់ការជួបជុំគ្រួសារកាន់តែធំ។",
    image: "/images/mooncake_egg_2.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  // ---- New entries (images wired; titles provisional from filenames) ----
  // source / description are intentionally "Pending" / empty until the student
  // supplies the real heritage facts (AGENTS.md: never invent heritage content).
  {
    id: "mooncake-bean-paste-egg-1",
    title: "Mooncake Bean Paste Egg 1",
    titleKhmer: "នំព្រះច័ន្ទសាច់សណ្ដែកពងទា ១",
    source: "Pending",
    description:
      "A baked mooncake filled with smooth, pale bean paste — milder and lighter than the nut filling above — wrapped around a single salted egg yolk. Bean paste is one of the oldest mooncake fillings still made today, valued for a gentler sweetness that lets the egg yolk's saltiness come through more clearly.",
    descriptionKhmer:
      "នំព្រះច័ន្ទដុតមួយប្រភេទ ដែលមានសាច់ក្នុងជាសណ្ដែកកិនម៉ដ់ពណ៌ស្រអាប់ — ស្រាលនិងម៉ដ់ជាងគ្រឿងផ្សំគ្រាប់គ្រៀបខាងលើ — រុំជុំវិញស្នូលពងទាប្រៃមួយគ្រាប់។ សាច់សណ្ដែកគឺជាសាច់ក្នុងចាស់បំផុតមួយក្នុងចំណោមសាច់ក្នុងនំព្រះច័ន្ទដែលនៅតែធ្វើរហូតមកទល់សព្វថ្ងៃ ដែលគេពេញចិត្តដោយសារភាពផ្អែមស្រទន់ ធ្វើឱ្យរសជាតិប្រៃរបស់ពងទាលេចធ្លោកាន់តែច្បាស់។",
    image: "/images/Mooncake_BeanPaste_Egg1.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "mooncake-lotus-paste-egg-1",
    title: "Mooncake Lotus Paste Egg 1",
    titleKhmer: "នំព្រះច័ន្ទសាច់ឈូកពងទា ១",
    source: "Pending",
    description:
      "Baked with pure lotus seed paste, the filling most associated with “mooncake” worldwide, and finished with a single salted egg yolk. Lotus paste is prized for turning out smoother than nuttier or bean-based fillings, and it's traditionally treated as the more refined, formal choice among mooncake styles.",
    descriptionKhmer:
      "ដុតជាមួយសាច់គ្រាប់ឈូកសុទ្ធ ជាសាច់ក្នុងដែលគេនឹកឃើញច្រើនជាងគេនៅពេលនិយាយពី «នំព្រះច័ន្ទ» នៅទូទាំងពិភពលោក ហើយបញ្ចប់ដោយស្នូលពងទាប្រៃមួយគ្រាប់។ សាច់ឈូកត្រូវបានគេស្រឡាញ់ដោយសារភាពម៉ដ់ល្មួតជាងសាច់គ្រាប់គ្រៀប ឬសាច់សណ្ដែក ហើយតាមប្រពៃណីត្រូវបានចាត់ទុកជាជម្រើសដ៏ថ្លៃថ្នូ និងផ្លូវការជាងគេក្នុងចំណោមប្រភេទនំព្រះច័ន្ទ។",
    image: "/images/Mooncake_LotusPaste_Egg1.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "mooncake-lotus-paste-egg-2",
    title: "Mooncake Lotus Paste Egg 2",
    titleKhmer: "នំព្រះច័ន្ទសាច់ឈូកពងទា ២",
    source: "Pending",
    description:
      "A second lotus-paste mooncake from the same line as Lotus Paste 1 — same silky filling, same single egg yolk, same baked golden crust. Shops typically sell lotus paste mooncakes as a small run like this rather than a one-off, which is likely why it exists as its own entry alongside the first.",
    descriptionKhmer:
      "នំសាច់ឈូកទីពីរ ចេញពីខ្សែផលិតកម្មដូចនំសាច់ឈូក ១ដែរ — សាច់ក្នុងម៉ដ់ដូចគ្នា ស្នូលពងទាតែមួយគ្រាប់ដូចគ្នា សំបកនំពណ៌មាសដុតដូចគ្នា។ ជាទូទៅហាងលក់នំសាច់ឈូកតែងលក់ជាសំណុំតូចៗបែបនេះ ជាជាងលក់តែមួយប្រភេទ ដែលនេះប្រហែលជាមូលហេតុដែលវាមានធាតុរបស់ខ្លួនដាច់ដោយឡែកនៅជាប់នឹងនំទីមួយ។",
    image: "/images/Mooncake_LotusPaste_Egg2.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "mooncake-pandan-lotus-paste-egg-1",
    title: "Mooncake Pandan Lotus Paste Egg 1",
    titleKhmer: "នំព្រះច័ន្ទសាច់ឈូកស្លឹកតីពងទា ១",
    source: "Pending",
    description:
      "Unlike every baked mooncake above, this one isn't baked at all — it's a snow skin mooncake, with a soft, chewy glutinous-rice “skin” tinted and flavored green with pandan, wrapped around lotus paste and a salted egg custard center. Served chilled rather than at room temperature, it's a lighter, more modern variation, closer to Southeast Asian dessert traditions than to the older baked styles in this collection.",
    descriptionKhmer:
      "ខុសពីនំព្រះច័ន្ទដុតទាំងអស់ខាងលើ នំនេះមិនត្រូវបានដុតទាល់តែសោះ — វាជា «នំព្រះច័ន្ទសំបកព្រិល» ដែលមាន «សំបក» ទន់ស្អិតធ្វើពីម្សៅអង្ករចំណី លាបពណ៌ និងផ្សំរសជាតិបៃតងពីស្លឹកតី រុំជុំវិញសាច់ឈូក និងស្នូលពងទាបែបគ្រីមនៅកណ្ដាល។ គេបម្រើដោយត្រជាក់ជាជាងសីតុណ្ហភាពបន្ទប់ ធ្វើឱ្យវាមានលក្ខណៈស្រាល និងទំនើបជាង ជិតស្និទ្ធនឹងបែបបទបង្អែមអាស៊ីអាគ្នេយ៍ជាងបែបនំដុតបុរាណក្នុងបណ្ដុំនេះ។",
    image: "/images/Mooncake_PandanLotusPaste_Egg1.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "mooncake-big-peah",
    title: "Mooncake Big Peah",
    titleKhmer: "ពាធំ",
    source: "Pending",
    description:
      "The largest of the shop's three Pia sizes — Teochew-style flaky pastries built from alternating layers of water dough and oil dough folded into thin, delicate sheets, a completely different construction from the thick baked crust of the mooncakes above. Big Pia is made with two salted egg yolks at its center, wrapped in the customer's choice of taro, bean paste, or winter melon paste — the same three fillings offered across all three Pia sizes.",
    descriptionKhmer:
      "ជាទំហំធំបំផុតក្នុងចំណោមពា (Pia) ទាំងបីទំហំរបស់ហាង — ជានំចំណិតបែបទាំចូវ (Teochew) ធ្វើពីម្សៅទឹក និងម្សៅប្រេងជាន់គ្នាច្រើនស្រទាប់ បត់ជាសន្លឹកស្ដើងៗ ខុសគ្នាទាំងស្រុងពីសំបកនំដុតក្រាស់របស់នំព្រះច័ន្ទខាងលើ។ ពាធំធ្វើឡើងដោយស្នូលពងទាប្រៃពីរគ្រាប់នៅចំកណ្ដាល រុំជុំវិញដោយសាច់ត្រាវ សាច់សណ្ដែក ឬសាច់ត្រឡាច តាមជម្រើសរបស់អតិថិជន — ជាសាច់ក្នុងបីប្រភេទដូចគ្នាដែលមានផ្ដល់ជូនគ្រប់ទំហំទាំងបីរបស់ពា។",
    image: "/images/Moocake_BigPeah.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "mooncake-round-peah",
    title: "Mooncake Round Peah",
    titleKhmer: "ពាមូល",
    source: "Pending",
    description:
      "A mid-sized Pia with the same laminated Teochew crust as Big Pia, stamped in red with 福 (“fortune/blessing”). Round Pia is made with a single salted egg yolk, wrapped in whichever of the three traditional fillings — taro, bean paste, or winter melon — the customer chooses.",
    descriptionKhmer:
      "ជាពាទំហំមធ្យម មានសំបកនំបត់ស្រទាប់ៗបែបទាំចូវដូចពាធំដែរ ត្រូវបានបោះត្រាពណ៌ក្រហមអក្សរចិន 福 (មានន័យថា «សំណាង/ពរជ័យ»)។ ពាមូលធ្វើឡើងដោយស្នូលពងទាប្រៃមួយគ្រាប់ រុំជុំវិញដោយសាច់ត្រាវ សាច់សណ្ដែក ឬសាច់ត្រឡាច មួយណាក៏បានតាមជម្រើសរបស់អតិថិជន។",
    image: "/images/Mooncake_RoundPeah.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
  {
    id: "mooncake-small-peah",
    title: "Mooncake Small Peah",
    titleKhmer: "ពាតូច",
    source: "Pending",
    description:
      "The smallest of the three Pia sizes, with the same flaky layered crust and red 福 stamp as its larger siblings, and the same single-egg-yolk center as Round Pia. Same three filling choices apply here too, just scaled down to a smaller, single-serving size.",
    descriptionKhmer:
      "ជាទំហំតូចបំផុតក្នុងចំណោមពាទាំងបី មានសំបកនំបត់ស្រទាប់ និងត្រាក្រហមអក្សរ 福 ដូចពាទំហំធំជាងគេដែរ ព្រមទាំងមានស្នូលពងទាប្រៃមួយគ្រាប់ដូចពាមូល។ ជម្រើសសាច់ក្នុងបីប្រភេទដូចគ្នានៅតែអាចជ្រើសរើសបាននៅទីនេះដែរ គ្រាន់តែបានកាត់បន្ថយទំហំឱ្យតូច សម្រាប់បរិភោគម្នាក់ឯង។",
    image: "/images/Mooncake_SmallPeah.jpg",
    ingredients: [],
    taste: { scale: 3, notes: "" },
  },
];

export default entries;