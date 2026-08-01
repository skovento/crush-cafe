"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { media } from "../data/business";

/**
 * Scroll-SCRUBBED video — the same centrepiece technique as the Burgerito
 * demo. Scroll position drives the clip's timeline directly rather than the
 * video playing on its own clock: scroll down and the pour happens, scroll
 * back up and it un-pours.
 *
 * The footage does not exist yet for this business. Until it's generated
 * (see MEDIA_BRIEF.md), this renders a designed "awaiting footage" state
 * rather than a black box — the section still reads as intentional in a
 * pitch, and swapping the real file in requires no code change.
 *
 * Debug note: window.scrollTo() bypasses Lenis and will NOT update
 * ScrollTrigger, which makes a working scrub look broken. Use
 * window.__lenis.scrollTo(y) or real wheel scrolling to test.
 */
export default function ScrollScrubVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    let ctx;

    const buildScrub = () => {
      setHasVideo(true);
      ctx = gsap.context(() => {
        const d = video.duration;
        if (!d || !isFinite(d)) return;

        // Tween `currentTime` as a property rather than assigning it inside
        // onUpdate. Assigning directly pins the frame to raw scroll position,
        // so every small wheel movement snaps the decoder to a new time and
        // the playback visibly stutters.
        //
        // Letting GSAP own the property means scrub smoothing is applied to
        // the value itself: the video eases toward the scroll position over
        // ~1.2s instead of tracking it exactly, which is what reads as
        // "smooth". Clamped just inside the end — seeking exactly to duration
        // stalls the decoder in some browsers.
        gsap.fromTo(
          video,
          { currentTime: 0 },
          {
            currentTime: d - 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              // Longer travel than the section height, so the clip advances
              // gently per pixel scrolled rather than racing through.
              end: "+=320%",
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          ".scrub-copy",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }, sectionRef);
    };

    // No footage yet: pin the section anyway so the layout and copy rhythm
    // match the finished build, but skip the scrub wiring.
    const buildFallback = () => {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          anticipatePin: 1,
        });
        gsap.fromTo(
          ".scrub-copy",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }, sectionRef);
    };

    if (!video) {
      buildFallback();
      return () => ctx?.revert();
    }

    const onReady = () => buildScrub();
    const onFail = () => buildFallback();

    if (video.readyState >= 1) onReady();
    else {
      video.addEventListener("loadedmetadata", onReady, { once: true });
      video.addEventListener("error", onFail, { once: true });
    }

    // Safari and iOS refuse to seek a video that has never been "activated"
    // by playback, so a scrub silently does nothing there. Nudging play then
    // immediately pausing on the first user gesture unlocks seeking without
    // the viewer ever seeing it move.
    const prime = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("touchstart", prime, { once: true });

    return () => {
      ctx?.revert();
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("error", onFail);
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("touchstart", prime);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-night">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          hasVideo ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={media.scrubVideo} type="video/mp4" />
      </video>

      {/* Designed fallback so a missing file never reads as a broken page. */}
      {!hasVideo && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(255,122,77,0.30),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_25%,rgba(31,182,166,0.18),transparent_55%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night to-transparent" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night/60" />

      <div className="absolute inset-x-0 bottom-0 section-pad pb-16">
        <p className="scrub-copy mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber">
          Poured To Order
        </p>
        <h2 className="scrub-copy max-w-2xl font-display text-[min(9vw,3rem)] leading-[1.05] text-sand">
          Scroll. Watch it pour.
        </h2>
        <p className="scrub-copy body-muted mt-4 max-w-md">
          Layer by layer, at the mocktail bar — at two in the morning, when
          every other place on the road has shut.
        </p>

        {!hasVideo && (
          <p className="scrub-copy mt-5 inline-flex items-center gap-2 rounded-full border border-amber/35 bg-amber/[0.07] px-4 py-2 text-xs text-sand/85">
            <span className="rounded-full bg-amber px-2 py-0.5 font-bold text-night">
              AWAITING FOOTAGE
            </span>
            Generate <code className="font-mono">coffee-pour.mp4</code> — see MEDIA_BRIEF.md
          </p>
        )}
      </div>
    </section>
  );
}
