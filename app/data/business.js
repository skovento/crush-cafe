// ─────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for this demo's business content.
//
// ⚠️ READ THIS BEFORE PITCHING ⚠️
//
// This business has a very thin public footprint. Verified facts are marked
// VERIFIED; everything else is placeholder written from the *vibe* their
// reviews describe, and must be replaced with real content from the owner.
//
// Also unresolved at time of building:
//   • Every Google review is ~4 years old. No sign of recent activity.
//   • Their Hebatpur branch is flagged "This place may be closed" by Google,
//     and a reviewer notes the ownership changed.
//   • "Crush Coffee" is a SEPARATE, much larger Ahmedabad chain (5+ outlets,
//     4,400+ reviews at SG Highway). Do not conflate the two.
//
// Confirm the business is trading before spending more time on this.
// ─────────────────────────────────────────────────────────────────────────

export const business = {
  name: "Crush Cafe & Restro",
  // VERIFIED — Google Business listing
  rating: { score: "5.0", count: 20, source: "Google reviews" },
  category: "Coffee shop",
  priceBand: "₹1–200 per person",
  hours: "Open till 2 AM",
  phone: { display: "083478 88000", href: "tel:08347888000" },
  address:
    "01, Galexy Complex, Netaji Rd, opp. National Handloom, nr. GLS College, Ahmedabad, Gujarat 380006",
  locality: "Netaji Road · CG Road",
  serviceOptions: ["Dine-in", "Drive-through", "No-contact delivery"],
  mapUrl:
    "https://www.google.com/maps/search/Crush+cafe+%26+Restro+Netaji+Road+Ahmedabad",

  // VERIFIED from their one Google listing photo (Mar 2022): the bar carries
  // a backlit MOCKTAIL sign, a shelf of colourful syrup bottles and a rail of
  // martini glasses. Google files them as a "Coffee shop", but their own
  // signage says mocktail bar — and that's the more interesting truth.
  isMocktailBar: true,

  // ⚠️ "The Royal" is painted twice in that room — green "The", orange
  // "Royal". Could be a sub-brand, the bar's name, or a previous tenant.
  // ASK THE OWNER before putting it anywhere on a live site.
  unresolvedSignage: "The Royal",

  // PLACEHOLDER — written from review language and the room, not the owner.
  tagline: "Mocktails. Till 2 AM.",
  intro:
    "A small, loud-coloured room off Netaji Road, two minutes from the GLS " +
    "College gate and a stone's throw from Law Garden. Mocktails poured till " +
    "two in the morning, and nothing on the menu breaks ₹200.",
};

// VERIFIED — real, publicly posted Google reviews. These are the only
// substantive pieces of content that exist publicly for this business, which
// is why the demo leans on them so heavily.
export const reviews = [
  {
    name: "Mahesh Barad",
    meta: "Local Guide · 19 reviews",
    quote:
      "The best place to hang out at night which gives a beach like vibes",
  },
  {
    name: "Raj Barot",
    meta: "Local Guide · 9 reviews",
    quote: "Best place to visit for Cafe and Hangout.",
  },
  {
    name: "kumar jeet",
    meta: "Local Guide · 30 reviews",
    quote: "Very beautiful and relax space and place.",
  },
];

// VERIFIED — pulled straight from the listing. These are the strongest
// factual hooks available, so the demo leads with them.
export const facts = [
  { value: "5.0★", label: "Every review, five stars" },
  { value: "Till 2 AM", label: "Open when nowhere else is" },
  { value: "₹1–200", label: "Student-budget pricing" },
  { value: "GLS", label: "Minutes from the college gate" },
];

// PLACEHOLDER — no menu is published anywhere public: not on their listing,
// not on magicpin, and they have no Instagram. These are category-typical
// placeholders so the section has shape. REPLACE WITH THE REAL MENU.
export const menuPlaceholder = {
  isPlaceholder: true,
  note:
    "No menu is published online for this cafe. The Mocktails category is " +
    "real — their bar carries a lit MOCKTAIL sign, a shelf of syrup bottles " +
    "and a rail of martini glasses. The individual drinks and every other " +
    "category below are placeholders. Get the real menu from the owner.",
  categories: [
    {
      title: "Mocktails",
      verified: true,
      items: ["Their bar's headline act", "Layered, colourful, poured to order"],
    },
    { title: "Coffee", items: ["Cold coffee", "Cappuccino"] },
    { title: "Shakes", items: ["Oreo", "Chocolate", "Fresh juice"] },
    { title: "Bites", items: ["Momos", "Sandwiches", "Maggi", "Fries"] },
  ],
};

// ── MEDIA ────────────────────────────────────────────────────────────────
// None of these files exist yet. Generate them with Veo using the prompts in
// MEDIA_BRIEF.md and drop them into public/videos/.
//
// Both video components degrade to a designed gradient state when the file
// is absent, so the page never shows a black box or a broken element — but
// the scroll-scrub is the centrepiece and it needs real footage to land.
// Files live in public/ root (not public/videos, public/images) — paths match
// where they actually are rather than where a tidier structure would put them.
export const media = {
  heroVideo: "/night-exterior.mp4",  // ambient loop behind the hero
  scrubVideo: "/coffee-pour.mp4",    // scroll drives this timeline
  vibe: "/the-vibe-shot.png",
  outdoor: "/outdoor-seating-after-dark.png",
};

// NOTE ON THE PHOTOGRAPHY
// These were generated from the first version of the media brief — a warm
// amber street-cafe look — before their real interior photo had been found.
// They're cohesive and good, but they do NOT show the saturated yellow wall,
// turquoise mural and lit MOCKTAIL bar that the room actually has.
//
// The palette below therefore leads with warm orange (which is both their
// real "Royal" orange AND matches these photos) and keeps turquoise as a
// small cool accent only. If the photography is ever reshot in the real room,
// push turquoise and yellow much harder.
// Panels for the pinned horizontal carousel. Each slides in from the right,
// rotates to face the viewer at centre, then rotates away to the left.
// Adding a panel is one entry here — no component changes needed.
export const gallery = [
  {
    src: "/outdoor-seating-after-dark.png",
    kicker: "Out Front",
    title: "Tables on the pavement, lights on",
    body:
      "String lights up, autos going past on Netaji Road, and the Law Garden " +
      "crowd drifting over. This is the bit the reviews keep describing.",
    tags: ["Dine-in", "Open till 2 AM"],
  },
  {
    src: "/the-vibe-shot.png",
    kicker: "Inside",
    title: "Or a seat by the window, and nowhere to be",
    body:
      "Warm light, a cup, and the street going quiet outside. Two minutes " +
      "from the GLS gate, and nothing on the menu over ₹200.",
    tags: ["Drive-through", "No-contact delivery"],
  },
];

export const dishes = [
  {
    src: "/cold-coffee.png",
    name: "Cold Coffee",
    note: "Thick, cold, and gone in a minute.",
  },
  {
    src: "/late-night-snack-plate.png",
    name: "Momos & Fries",
    note: "The 1 AM order, basically every time.",
  },
];

// Scroll-driven dusk-to-midnight scene. Layers are ordered back to front;
// `depth` is translateZ in px, which drives the parallax as the scene tilts.
export const sceneLayers = [
  { id: "sky", depth: -600 },
  { id: "sun", depth: -520 },
  { id: "sea", depth: -380 },
  { id: "palms", depth: -140 },
  { id: "table", depth: 60 },
];

export const sceneCaptions = [
  "6 PM — the light goes soft on Netaji Road",
  "9 PM — the college crowd rolls in",
  "Midnight — still going",
  "2 AM — last cup, and nowhere else is open",
];

export const mocktailPourStages = [
  {
    step: "01",
    tab: "01 BASE",
    kicker: "STEP 01 · THE BASE",
    title: "Turquoise Blue Base",
    desc: "Chilled clear glass filled with ice. Bright turquoise-blue syrup pours first into the base.",
    color: "#12B5C9",
    badge: "TURQUOISE SYRUP",
    progressAt: 0.12,
  },
  {
    step: "02",
    tab: "02 LAYER",
    kicker: "STEP 02 · THE DENSITY",
    title: "Vivid Sunset Orange",
    desc: "Vivid orange syrup layers over the turquoise base, forming a vibrant dual-tone gradient.",
    color: "#FF7A4D",
    badge: "ORANGE LAYER",
    progressAt: 0.37,
  },
  {
    step: "03",
    tab: "03 FIZZ",
    kicker: "STEP 03 · THE FIZZ",
    title: "Sparkling Soda Rise",
    desc: "A splash of crisp soda rises through the ice, mingling the saturated colors with effervescent bubbles.",
    color: "#F5921E",
    badge: "SPARKLING SODA",
    progressAt: 0.62,
  },
  {
    step: "04",
    tab: "04 FINISH",
    kicker: "STEP 04 · THE FINISH",
    title: "Lemon & Mint Finish",
    desc: "A juicy lemon wedge and fresh aromatic mint sprig land on top. Poured to order at two in the morning.",
    color: "#38BDF8",
    badge: "MINT & CITRUS",
    progressAt: 0.88,
  },
];
