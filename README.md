# Crush Cafe & Restro — Skovento Concept Demo

A one-page concept homepage for **Crush cafe & Restro**, Netaji Road,
Ahmedabad — built from publicly available business data.

## Run it

```bash
npm install
npm run dev      # http://localhost:3002
```

Runs on port 3002 so it can sit alongside the Burgerito (3000) and
House of Meals (3001) demos.

---

## ⚠️ Read this before pitching

This demo was built on a **much thinner evidence base** than the Burgerito or
House of Meals demos, and there are open questions about the business itself.

### The business may not be trading

- **Every Google review is around 4 years old.** There is no sign of recent
  activity on the listing.
- Their **Hebatpur branch** (Silaj, S.P. Ring Road) is flagged by Google as
  **"This place may be closed"**, has no phone number or hours listed, and a
  reviewer notes *"the owner of the cafe has been changed"*.

**Confirm they're still open before you spend a meeting on this.**

### There is a serious name collision

**"Crush Coffee" is a separate, much larger Ahmedabad chain** — not this
business. At least five outlets:

| Outlet | Rating |
|---|---|
| SG Highway | 4.4 (4,405) |
| Rajpath Rangoli Road | 4.3 (1,705) |
| Science City | 4.3 (994) |
| Sindhu Bhavan Marg | 4.4 (417) |
| CG Road (Umashankar Joshi Marg) | 4.6 (270) |

All are ₹200–400 with online ordering and table reservations. Crush cafe &
Restro is ₹1–200 with 20 reviews — a different business at a different scale.
Do not conflate them in a pitch.

This collision is also **the strongest argument for the website**: anyone
searching "Crush cafe Ahmedabad" lands on the chain, not on your client.

---

## What's VERIFIED

From their Google Business listing:

- **Rating**: 5.0★ from 20 reviews — every single one five stars
- **Category**: Coffee shop · **₹1–200 per person**
- **Address**: 01, Galexy Complex, Netaji Rd, opp. National Handloom, nr. GLS College, Ahmedabad 380006
- **Phone**: 083478 88000
- **Hours**: Open till 2 AM
- **Service options**: Dine-in · Drive-through · No-contact delivery
- **No website** — the "Add website" prompt is on their listing
- **Reviews**: the three quoted on the page are real and publicly posted

## What's PLACEHOLDER

- **The entire menu.** Nothing is published anywhere public — not the Google
  listing, not magicpin, and there's no Instagram account. The menu section
  is visibly labelled PLACEHOLDER on the page itself, with dashed borders,
  so the client can see exactly what is and isn't real.
- **Tagline and intro copy**, written from review language and the room.
- **Individual drinks.** The Mocktails *category* is real; the specific items
  under it are not.

## They are a MOCKTAIL BAR, not a coffee shop

Google files them under "Coffee shop". Their own room says otherwise — there
is a backlit **MOCKTAIL** sign above the bar, a shelf of coloured syrup
bottles and a rail of martini glasses. The demo leads with that, because it's
both true and far more distinctive than "another cafe".

## The palette IS sampled from their signage

Their single Google photo (March 2022) was the source:

| Token | Colour | Where it comes from |
|---|---|---|
| `sunset` | `#F5921E` | "Royal" lettering on the bar |
| `leaf` | `#4CBB3C` | "The" lettering on the bar |
| `amber` | `#F2C230` | the yellow wall |
| `surf` | `#12B5C9` | turquoise mural + blue wall wash |
| `night` | `#0D0D10` | the dark room and bar panels |

An earlier version of this demo used a navy/coral "beach at dusk" scheme
guessed from review language before that photo had been looked at. It was
wrong — the real room is far more saturated. Corrected.

## ⚠️ "The Royal"

The words **"The Royal"** are painted twice in their room — green "The",
orange "Royal". It may be a sub-brand, the mocktail bar's name, or a previous
tenant's signage. **Ask the owner before putting it on a live site.**

## What's MISSING entirely

**All video, and all photography except that one interior shot.** See
`MEDIA_BRIEF.md`, which is now written around their actual room.

---

## ▶ Generate the two videos first

The page has **two video slots already wired and pinned** — they just have no
footage. Until then both render designed gradient states rather than black
boxes, and the scroll-scrub section carries a visible AWAITING FOOTAGE badge.

| File | Slot | Behaviour |
|---|---|---|
| `public/videos/coffee-pour.mp4` | Scroll-scrub centrepiece | Scroll drives the clip's timeline, both directions |
| `public/videos/night-exterior.mp4` | Hero background | Ambient seamless loop |

Prompts are at the top of `MEDIA_BRIEF.md`. **No code change is needed** —
drop the files in and both sections activate automatically.

This is the single highest-value thing you can do to this demo. The scroll-
scrub is what makes the Burgerito demo land, and it's the one technique this
build can't fake without real footage.

## The 3D moment — and why this technique

`NightScene.jsx` is a scroll-driven **dusk → 2 AM** scene: the sky drains from
sunset to midnight, the sun sinks, stars come out, a neon sign flickers on,
and steam rises off a cup — all on layered planes at different `translateZ`
depths inside a real `perspective` space, tilting as you scroll.

The skill's 3D ladder puts real photography above WebGL, and the House of
Meals demo used exactly that. **It wasn't available here** — this business has
no usable photographs at all. So instead of faking it with stock imagery of
somebody else's cafe, the dimensional moment renders the single line their
reviews keep repeating:

> *"The best place to hang out at night which gives a beach like vibes"*

Everything is vector and gradient, so it costs nothing to load and can't be
mistaken for a stock photo. Respects `prefers-reduced-motion`.

## Structure

- `app/data/business.js` — single source of truth; VERIFIED vs PLACEHOLDER marked inline
- `app/lib/gsap.js` — ScrollTrigger registered once
- `app/hooks/useReveal.js` — shared scroll reveal
- `app/components/Hero.jsx` — headline, rating badge, four verified facts
- `app/components/NightScene.jsx` — the CSS 3D dusk-to-2AM sequence
- `app/components/Reviews.jsx` — placed high on the page, since it's the only real content
- `app/components/Menu.jsx` — visibly labelled placeholder
- `app/components/Visit.jsx` — address, service options, hours
- `app/components/Footer.jsx` — call + directions
