"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { sceneCaptions } from "../data/business";

/**
 * Scroll-driven dusk → 2 AM scene, built in CSS 3D.
 *
 * WHY THIS TECHNIQUE
 * Per the skill's 3D ladder, real photography beats WebGL — but this
 * business has *no* usable photographs at all: their Google listing has only
 * a "Vibe" category, no food shots, no menu board, and no Instagram. So the
 * photo-on-a-plane approach used for House of Meals isn't available.
 *
 * What IS available is the single most repeated line in their reviews:
 * "the best place to hang out at night which gives a beach like vibes",
 * and the fact they're open till 2 AM. So the dimensional moment renders
 * that sentence literally — layered parallax planes at different translateZ
 * depths inside a real perspective space, with the sky moving from dusk to
 * midnight as you scroll.
 *
 * Everything here is vector and gradient, so it costs nothing to load and
 * can't look like a stock photo of somebody else's cafe.
 */
export default function NightScene() {
  const sectionRef = useRef(null);
  const [caption, setCaption] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=240%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) =>
            setCaption(
              Math.min(
                sceneCaptions.length - 1,
                Math.floor(self.progress * sceneCaptions.length)
              )
            ),
        },
      });

      // Sky drains from dusk to night by cross-fading two stacked gradient
      // layers. GSAP cannot interpolate `linear-gradient()` strings — tweening
      // the background property directly would snap rather than transition.
      tl.fromTo(
        ".sky-night",
        { opacity: 0 },
        { opacity: 1, ease: "none", duration: 4 },
        0
      );

      // Sun sinks below the horizon and dims.
      tl.fromTo(
        ".sun",
        { y: 0, opacity: 1, scale: 1 },
        { y: 190, opacity: 0.15, scale: 0.8, ease: "none", duration: 4 },
        0
      );

      // Stars come out in the second half.
      tl.fromTo(".stars", { opacity: 0 }, { opacity: 1, ease: "none", duration: 2 }, 2);

      // The whole stage tilts, so the depth between planes reads as real.
      tl.fromTo(
        ".stage",
        { rotateX: 6, scale: 1.06 },
        { rotateX: 15, scale: 1, ease: "none", duration: 4 },
        0
      );

      // Parallax: nearer layers travel further, which is what sells depth.
      tl.fromTo(".sea", { y: 0 }, { y: -22, ease: "none", duration: 4 }, 0);
      tl.fromTo(".palms", { y: 0 }, { y: -55, ease: "none", duration: 4 }, 0);
      tl.fromTo(".table", { y: 0 }, { y: -105, ease: "none", duration: 4 }, 0);

      // Neon sign flickers on as night falls. Hand-authored keyframes rather
      // than RoughEase — the "rough(...)" string needs EasePack registered
      // explicitly when GSAP is imported as a module, and silently falls back
      // otherwise.
      tl.fromTo(
        ".neon-sign",
        { opacity: 0.2 },
        {
          keyframes: [
            { opacity: 0.9, duration: 0.12 },
            { opacity: 0.25, duration: 0.1 },
            { opacity: 1, duration: 0.14 },
            { opacity: 0.35, duration: 0.1 },
            { opacity: 0.85, duration: 0.12 },
            { opacity: 1, duration: 0.5 },
          ],
          ease: "none",
        },
        1.8
      );

      // Steam only reads once it's dark and cool.
      tl.fromTo(".steam", { opacity: 0 }, { opacity: 0.7, ease: "none", duration: 1.5 }, 2.2);

      gsap.to(".scene-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=240%",
          scrub: 0.3,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (reduced) {
    return (
      <section className="section-pad bg-dusk py-28 text-center">
        <h2 className="font-display text-[min(9vw,3rem)] leading-tight text-sand">
          Open till 2 AM
        </h2>
        <p className="body-muted mx-auto mt-4 max-w-md">
          &ldquo;The best place to hang out at night which gives a beach like
          vibes.&rdquo;
        </p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{ perspective: "1100px", perspectiveOrigin: "50% 42%" }}
    >
      <div
        className="stage absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* SKY — furthest plane. Two stacked gradients cross-faded by scroll
            (see the note in the timeline above). */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translateZ(-600px) scale(1.65)",
            background:
              "linear-gradient(180deg,#2A1B54 0%,#FF7A4D 62%,#FFB65C 100%)",
          }}
        />
        <div
          className="sky-night absolute inset-0 opacity-0"
          style={{
            transform: "translateZ(-600px) scale(1.65)",
            background:
              "linear-gradient(180deg,#05081C 0%,#0B1030 60%,#2A1B54 100%)",
          }}
        />

        {/* STARS */}
        <div
          className="stars absolute inset-0 opacity-0"
          style={{ transform: "translateZ(-560px) scale(1.6)" }}
        >
          <svg viewBox="0 0 800 400" className="h-full w-full" aria-hidden="true">
            {[
              [60, 40], [140, 90], [220, 30], [300, 70], [380, 45],
              [470, 95], [540, 35], [620, 80], [700, 50], [760, 100],
              [110, 150], [260, 130], [430, 160], [590, 140], [720, 170],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={i % 3 === 0 ? 2 : 1.2}
                fill="#F6E9D6"
                opacity={i % 2 ? 0.9 : 0.55}
              />
            ))}
          </svg>
        </div>

        {/* SUN */}
        <div
          className="sun absolute left-1/2 top-[34%] h-40 w-40 -translate-x-1/2 rounded-full"
          style={{
            transform: "translateZ(-520px) scale(1.5)",
            background:
              "radial-gradient(circle,#FFD79A 0%,#FFB65C 45%,rgba(255,122,77,0) 72%)",
          }}
        />

        {/* SEA */}
        <div
          className="sea absolute inset-x-0 bottom-0 h-[46%]"
          style={{ transform: "translateZ(-380px) scale(1.4)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-surf/55 via-dusk/80 to-night" />
          <svg viewBox="0 0 800 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {[40, 78, 116, 154].map((y, i) => (
              <path
                key={y}
                d={`M0 ${y} q50 -7 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0`}
                stroke="#F6E9D6"
                strokeWidth="1.5"
                fill="none"
                opacity={0.30 - i * 0.06}
              />
            ))}
          </svg>
        </div>

        {/* PALMS */}
        <div
          className="palms absolute inset-x-0 bottom-0 h-[62%]"
          style={{ transform: "translateZ(-140px) scale(1.14)" }}
        >
          <svg viewBox="0 0 800 300" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <g fill="#05081C">
              {[70, 735].map((x, i) => (
                <g key={x} transform={`translate(${x},0) scale(${i ? -1 : 1},1)`}>
                  <path d="M0 300 C6 220 10 170 4 120 L18 120 C14 172 18 224 24 300 Z" />
                  <path d="M12 120 C-24 96 -56 92 -80 104 C-50 84 -18 86 12 106 Z" />
                  <path d="M12 118 C-14 76 -40 56 -70 50 C-34 48 -4 74 14 108 Z" />
                  <path d="M14 118 C22 74 44 44 76 30 C52 58 34 86 22 116 Z" />
                  <path d="M14 120 C46 100 82 96 108 106 C78 88 44 88 14 110 Z" />
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* TABLE + CUP — nearest plane */}
        <div
          className="table absolute inset-x-0 bottom-0 h-[38%]"
          style={{ transform: "translateZ(60px)" }}
        >
          <svg viewBox="0 0 800 220" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            {/* steam */}
            <g className="steam opacity-0" stroke="#F6E9D6" strokeWidth="3.5" fill="none" strokeLinecap="round">
              <path d="M392 96 c-9 -16 9 -26 0 -42" opacity="0.8" />
              <path d="M408 92 c-9 -18 9 -28 0 -44" opacity="0.6" />
            </g>
            {/* cup */}
            <g fill="#05081C">
              <path d="M366 108 h68 v34 a34 34 0 0 1 -68 0 z" />
              <path d="M434 114 h12 a15 15 0 0 1 0 30 h-12 z" />
              <rect x="352" y="176" width="96" height="7" rx="3.5" />
            </g>
            {/* table edge */}
            <rect x="0" y="188" width="800" height="32" fill="#05081C" />
          </svg>
        </div>
      </div>

      {/* Foreground copy — sits above the 3D stage */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center pt-10 sm:pt-12 px-4 text-center">
        <p className="mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-sand/70">
          Netaji Road · Ahmedabad
        </p>
        <p className="neon-sign font-display text-[min(10vw,4rem)] leading-none text-sunset neon">
          OPEN TILL 2 AM
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 bg-night/85 pb-8 sm:pb-10 pt-4 sm:pt-5 section-pad backdrop-blur-sm">
        <p className="mx-auto min-h-[2.5rem] max-w-xl text-center text-xs sm:text-base text-sand flex items-center justify-center">
          {sceneCaptions[caption]}
        </p>
        <div className="mx-auto mt-2 sm:mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-sand/15">
          <div className="scene-progress h-full origin-left scale-x-0 rounded-full bg-sunset" />
        </div>
      </div>
    </section>
  );
}
