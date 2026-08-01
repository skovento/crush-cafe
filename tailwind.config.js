/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ── SAMPLED FROM THEIR ONE REAL PHOTO ───────────────────────────
        // Google listing, March 2022. Their room is a dark space lit with
        // saturated colour: a black bar with a backlit MOCKTAIL sign, "The"
        // in green and "Royal" in orange across the counter, a bright yellow
        // wall carrying a turquoise mural, and blue light on the right.
        //
        // An earlier version of this palette was a navy/coral "beach at
        // dusk" guess made from review language alone, before their photo
        // had been looked at. The real place is far more saturated and
        // playful. Token names are kept from that version so the components
        // didn't need rewriting; only the values changed.
        //
        // RECONCILED WITH THE PHOTOGRAPHY: the generated shots came back in a
        // warm amber street-cafe register, not the saturated turquoise/yellow
        // of the real room. Orange leads because it's both their genuine
        // "Royal" colour AND sits naturally with those photos. Turquoise is
        // demoted to a small cool accent — at full strength it fights the
        // warm imagery. If the photos are ever reshot in the actual room,
        // push surf and amber much harder.
        night: "#0D0D10",   // the dark room / bar panels
        dusk: "#17171C",    // slightly lifted dark, for section contrast
        surf: "#2E9FB0",    // turquoise, muted to sit with warm photography
        sunset: "#F5921E",  // "Royal" orange — the primary accent
        amber: "#EFC04A",   // the yellow wall, warmed slightly
        leaf: "#4CBB3C",    // "The" green
        sand: "#FBF7EC",    // text on dark
      },
      fontFamily: {
        display: ["'Archivo Black'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
