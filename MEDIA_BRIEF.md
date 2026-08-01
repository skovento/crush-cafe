# Media Brief — Crush Cafe & Restro, Netaji Road, Ahmedabad

> **START HERE — the two videos are the priority.** The page already has the
> scroll-scrub section wired and pinned; it just has no footage to drive.

---

# THEIR ACTUAL ROOM — read this before generating anything

They have exactly **one photograph** in their entire public record: a single
interior shot on their Google listing, taken March 2022 by Chirag Gohil.
Every prompt below is built from it, so the footage looks like *their* place
rather than a generic cafe.

**What's actually in that room:**

- A **black bar counter** with **"The"** painted in bright green and
  **"Royal"** in orange across the front
- A backlit **MOCKTAIL** sign above the bar — white letters on charcoal, with
  a martini glass forming part of the wordmark
- A shelf of **colourful mocktail syrup bottles** — green, yellow, orange,
  red — lit from below
- A rail of **martini and cocktail glasses** under the sign
- A **bright yellow wall** on the left carrying a **turquoise mural**
- **Electric blue light** washing the right-hand wall
- Plain **wooden-topped tables** with **black plastic garden chairs**
- Artificial green foliage, a warm orange pendant light over the bar
- Small, dark, densely colourful. Not minimal, not polished.

**So: this is a mocktail bar, not a coffee shop.** Google categorises it as a
coffee shop, but their own signage says otherwise, and that changes what the
hero video should show.

**Palette, sampled from that photo** — use these in the prompts:
orange `#F5921E` · green `#4CBB3C` · yellow `#F2C230` · turquoise `#12B5C9` ·
near-black `#0D0D10`

**Two cautions:**
1. **"The Royal"** appears twice in the room. It may be a sub-brand, the
   mocktail bar's name, or a previous tenant. Ask the owner before putting it
   on a website.
2. The photo is from **March 2022**. Confirm the room still looks like this.

---

# PRIORITY — the two videos

Generate with **Veo**. Save into `public/videos/` with these exact filenames.

## `coffee-pour.mp4` — the scroll-scrubbed centrepiece

Keep the filename; the code references it. But the *content* should be a
**layered mocktail**, not coffee — that's what their bar actually sells, and
layered colour is far more dramatic when scrubbed than brown liquid.

Scroll position drives this clip's timeline, so it must be a **single
continuous action with a clear beginning and end**. No cuts, no camera moves.

```
A 10-second video of a colourful layered mocktail being built in a tall clear
glass filled with ice, shot in tight close-up on a fixed tripod with no camera
movement. Bright turquoise-blue syrup is poured first, then a vivid orange
syrup layers over it, then a splash of soda rises through, and finally a wedge
of lemon and a mint sprig are dropped on top. The glass sits on a plain wooden
table in a small dark cafe, a bright yellow wall and warm orange bar lighting
blurred behind. Photorealistic, saturated colours against a dark room,
shallow depth of field, condensation on the glass. Starts with an empty glass
and ends with the finished drink. Smooth continuous action, no cuts, no camera
motion, no text or signage.
```

**Critical for scrubbing:**
- Fixed camera. Any pan or handheld shake looks broken when scrubbed.
- One continuous action, empty → finished. The viewer is "making" the drink.
- Re-roll until the motion is even. A clip that rushes at the end scrubs badly.

### ⚙️ Re-encode the clip, or it will always stutter

This is the single biggest factor in how smooth the scrub feels, and no
amount of JavaScript fixes it.

Video is normally stored as sparse **keyframes** with compressed frames in
between. Seeking to an arbitrary time means decoding forward from the nearest
keyframe — so with keyframes every 2–3 seconds, scrubbing visibly jumps and
lags. Encoding **every frame as a keyframe** makes any frame instantly
seekable.

```bash
ffmpeg -i coffee-pour.mp4 \
  -c:v libx264 -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart -an \
  coffee-pour-scrub.mp4
```

- `-g 1` — keyframe on every frame. This is what makes it smooth.
- `-an` — drops audio, which the scrub never uses.
- `+faststart` — moves the index to the front so playback can begin sooner.

**Trade-off: file size.** An all-intra encode is typically 4–8× larger, so
your 2.6 MB clip may land around 10–20 MB. If that's too heavy, `-g 5` is a
good compromise — still far smoother than a default encode.

Also keep the clip **short (8–10s) and modest in resolution (720p is plenty)**.
It's a background texture behind text, not something anyone inspects
full-screen, and both cuts help seek performance.

## `night-exterior.mp4` — ambient hero loop

Despite the filename, shoot the **interior** — that colourful dark room is the
thing worth showing, and it's what their reviewers actually describe. Must
**loop seamlessly**.

```
An 8-second looping video of the interior of a small, dark, colourful Indian
cafe at night. A black bar counter runs along the back with a shelf of
brightly coloured syrup bottles glowing above it and a row of martini glasses
on a rail. A bright yellow wall with a turquoise painted mural fills the left
side; electric blue light washes the right. Plain wooden tables with black
plastic chairs in the foreground, a warm orange pendant light over the bar,
artificial green foliage. A couple of young customers sit talking, softly out
of focus. Static camera on a tripod, no zoom or pan. Photorealistic,
saturated colour against darkness, relaxed late-night atmosphere. Loops
seamlessly with no jarring cut. No legible text or signage anywhere.
```

**Critical:** no legible signage in the prompt. Veo invents brand names — it
generated a completely wrong one on a previous Skovento demo. Their real
"MOCKTAIL" and "The Royal" lettering should go on the page as HTML text, where
you control it.

---

## Better than any of this: shoot it on a phone

Twenty minutes in the actual room after dark would beat every prompt above.
That space is genuinely photogenic — saturated colour, backlit bar, mural —
and it's the one thing no generated clip can authentically fake. If you can
get the owner to let you film for twenty minutes, do that instead.

---

# SECONDARY — stills


Category = late-night coffee shop / student hangout. Locality = Netaji Road
(CG Road), two minutes from GLS College. Personality = casual, after-dark,
affordable, "beach like vibes".

## Before you generate anything — get real photos if you can

This business has **no usable photography at all**: their Google listing has
only a "Vibe" category, no Instagram, no menu board online. Generated imagery
is a fallback here, not the plan.

The far better move is a **20-minute phone shoot at the cafe**. Their whole
selling point is atmosphere after dark, which is exactly the thing generic
imagery cannot fake and a real photo captures instantly. Ask for:

- The outdoor seating at night, lights on
- The counter / signage (this also gives you their real brand colours)
- Three or four actual best-selling items
- A wide shot of the space with the late-night crowd in it

**Their real signage is the single most valuable thing to capture** — the
palette in this demo is guessed from review language, and both previous
Skovento demos had to be corrected after the real colours turned up.

---

## If you must generate — the constraints

**It's a night venue.** Every review talks about after dark. Bright daylight
food photography would misrepresent the place entirely.

**It's cheap and casual.** ₹1–200 per head, next to a college. Glossy
fine-dining styling would look absurd and set wrong expectations.

**Vegetarian by default** for a Gujarat cafe unless the owner confirms
otherwise. Do not generate meat imagery without checking.

---

## Photo 1 — Outdoor seating after dark (most important)

```
A wide photo of a small casual Indian street-side cafe at night, warm string
lights overhead, simple outdoor tables and chairs on a paved terrace, a few
young college-age customers sitting and talking, city street softly blurred
behind. Warm amber lighting against a deep blue night sky. Photorealistic,
relaxed and unpretentious, shallow depth of field. No legible text or signage.
```

## Photo 2 — Cold coffee, the hero item

```
A close-up 45-degree photo of a tall glass of Indian-style cold coffee topped
with foam and a drizzle of chocolate, condensation on the glass, on a simple
cafe table at night with warm string lights blurred in the background.
Photorealistic, warm amber lighting, shallow depth of field, casual and
inviting rather than luxury styled. No text, no signage.
```

## Photo 3 — Late-night snack plate

```
An overhead photo of casual Indian cafe snacks on a simple plate — steamed
vegetable momos with red chutney, and a small basket of fries — on a plain
table at night under warm lighting. Photorealistic, generous everyday
portions, relaxed styling, warm colour grade. Vegetarian. No text.
```

## Photo 4 — The vibe shot

```
An atmospheric photo looking out from inside a small casual cafe at night,
warm interior lighting in the foreground, the street and passing headlights
soft and blurred outside. A cup of coffee on the table in the foreground.
Photorealistic, moody but warm, shallow depth of field. Conveys a calm
late-night place to sit. No legible text or signage.
```

---

## Where they go

| Photo | Slot |
|---|---|
| 1 — Outdoor at night | Hero background, replacing the gradient |
| 2 — Cold coffee | Menu section, once the real menu is in |
| 3 — Snack plate | Menu section |
| 4 — Vibe | Between Reviews and Visit as a full-width band |

The `NightScene` CSS 3D sequence needs no photography and should stay as-is —
it's vector and gradient throughout.
