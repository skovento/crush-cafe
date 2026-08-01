"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { gallery } from "../data/business";

/**
 * Pinned horizontal carousel with 3D perspective.
 *
 * The section pins, and vertical scroll is translated into horizontal
 * movement of the track. Each panel slides in from the right rotated away
 * from the viewer, turns to face front as it reaches centre, then rotates
 * away again as it exits left. Once the last panel clears, the pin releases
 * and the page continues down normally.
 *
 * HOW THE PER-PANEL 3D WORKS
 * The rotation can't be driven by the page scrollbar, because horizontally
 * the panels are moving through the *track*, not the page. GSAP's
 * `containerAnimation` solves exactly this: it lets a ScrollTrigger measure a
 * panel's progress across the viewport within another tween's motion. So each
 * panel gets its own trigger keyed to the track animation, running
 * rotateY 38° → 0° → -38° as it crosses.
 */
export default function VibeBand() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const panels = gsap.utils.toArray(".hpanel");

      // Distance the track must travel to bring the last panel fully in.
      const distance = () => track.scrollWidth - window.innerWidth;

      const trackTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // Slightly longer than the horizontal travel, so each panel gets
          // dwell time at centre where its details are readable — at a strict
          // 1:1 mapping the copy flashes past before you can read it.
          end: () => "+=" + distance() * 1.5,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        const card = panel.querySelector(".hcard");
        const detail = panel.querySelector(".hdetail");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: panel,
              containerAnimation: trackTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          })
          // entering from the right, angled away
          .fromTo(
            card,
            { rotateY: 38, scale: 0.84, opacity: 0.45 },
            { rotateY: 0, scale: 1, opacity: 1, ease: "none", duration: 1 }
          )
          // leaving to the left, angling away again
          .to(card, {
            rotateY: -38,
            scale: 0.84,
            opacity: 0.45,
            ease: "none",
            duration: 1,
          })
          // details are only readable while the panel is near centre
          .fromTo(
            detail,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, ease: "none", duration: 0.55 },
            0.45
          )
          .to(detail, { opacity: 0, y: -28, ease: "none", duration: 0.55 }, 1.1);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Reduced motion: the same panels, stacked and static.
  if (reduced) {
    return (
      <section className="section-pad bg-night py-24">
        <h2 className="mb-10 max-w-2xl font-display text-[min(9vw,3rem)] leading-tight text-sand">
          Law Garden&apos;s still awake. So are we.
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {gallery.map((g) => (
            <figure key={g.src} className="overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/3]">
                <Image src={g.src} alt={g.title} fill className="object-cover" sizes="50vw" />
              </div>
              <figcaption className="p-5">
                <h3 className="font-display text-lg text-sand">{g.title}</h3>
                <p className="mt-2 text-sm text-sand/75">{g.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-night">
      {/* Subtle depth wash behind the track. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(245,146,30,0.10),transparent_60%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 section-pad pt-8 sm:pt-10">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-amber">
          After Dark
        </p>
        <h2 className="mt-1 sm:mt-2 max-w-xl font-display text-[min(6vw,2rem)] leading-tight text-sand">
          Law Garden&apos;s still awake. So are we.
        </h2>
      </div>

      {/* perspective on the viewport wrapper, preserve-3d on the track —
          this is what makes the panels rotate in real depth rather than
          just skewing. */}
      <div className="h-full w-full" style={{ perspective: "1600px" }}>
        <div
          ref={trackRef}
          className="flex h-full items-center"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {gallery.map((g) => (
            <div
              key={g.src}
              className="hpanel flex h-full w-screen shrink-0 items-center justify-center px-[4vw] sm:px-[6vw]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <figure
                className="hcard relative h-[65vh] sm:h-[62vh] w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-2xl shadow-black/70 ring-1 ring-sand/15"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={g.src}
                  alt={g.title}
                  fill
                  className="object-cover"
                  sizes="90vw"
                  priority={false}
                />
                {/* glossy sheen, per the reference look */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-sand/[0.06] to-sand/[0.14]" />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-transparent" />

                <figcaption className="hdetail absolute inset-x-0 bottom-0 p-5 sm:p-10">
                  <p className="mb-1.5 sm:mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-amber">
                    {g.kicker}
                  </p>
                  <h3 className="max-w-2xl font-display text-[min(6vw,2rem)] leading-tight text-sand">
                    {g.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 max-w-lg text-xs sm:text-base leading-relaxed text-sand/85">
                    {g.body}
                  </p>
                  <div className="mt-3 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                    {g.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-sand/25 bg-night/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs text-sand/85 backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Nudge, so the sideways movement doesn't read as the page being stuck. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center">
        <span className="rounded-full border border-sand/20 bg-night/60 px-4 py-2 text-xs tracking-wide text-sand/70 backdrop-blur-sm">
          Keep scrolling →
        </span>
      </div>
    </section>
  );
}
