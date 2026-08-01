"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { media, mocktailPourStages } from "../data/business";

/**
 * Scroll-Driven LIVE Mocktail Video Engine with 4-Stage Interactive Pour Tabs.
 *
 * Mobile-first optimization with h-[100svh], touch horizontal tabs, and adaptive scroll pinning.
 */
export default function ScrollScrubVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(true);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const scrollTriggerRef = useRef(null);

  const activeStage = mocktailPourStages[activeStageIndex] || mocktailPourStages[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let gsapCtx = null;
    let tickerFn = null;
    let onSeeked = null;

    const setupScrub = () => {
      setHasVideo(true);
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;

      // CAUSE 1: the clip must never play on its own clock.
      // The previous version called play() while you scrolled and only
      // paused 120ms AFTER you stopped. So mid-scroll you were watching
      // playback rather than your scroll position, and the correct frame
      // only snapped in once that timeout fired. Hence "it shows the video
      // when I stop scrolling".
      video.pause();
      video.playbackRate = 1;

      const maxTime = duration - 0.05;
      const isMobile = window.innerWidth < 640;

      let targetTime = 0; // where the scroll position says we should be
      let shownTime = 0;  // eased value we actually seek to
      let seekPending = false;

      // CAUSE 2: seek pile-up.
      // Assigning currentTime faster than the decoder can service it queues
      // seeks, and the picture freezes until that backlog drains — which
      // also lands right when you stop moving. Keeping at most ONE seek in
      // flight, and always seeking to the newest value, drops intermediate
      // positions instead of queueing them. This is the reason the old code
      // reached for play() in the first place.
      onSeeked = () => {
        seekPending = false;
      };
      video.addEventListener("seeked", onSeeked);

      const requestSeek = () => {
        if (seekPending) return;
        if (Math.abs(video.currentTime - shownTime) < 0.012) return;
        seekPending = true;
        try {
          video.currentTime = shownTime;
        } catch (e) {
          seekPending = false;
        }
      };

      // Smoothness now comes from easing toward the target here, on every
      // frame — not from ScrollTrigger lag. That keeps the frame tracking
      // your scroll live instead of trailing it.
      tickerFn = () => {
        shownTime += (targetTime - shownTime) * 0.22;
        requestSeek();
      };
      gsap.ticker.add(tickerFn);

      gsapCtx = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=220%" : "+=320%",
          // Immediate: the scroll position feeds targetTime with no lag.
          // All smoothing happens in the ticker above.
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const pourProgress = Math.min(1, self.progress / 0.78);
            setProgressPercent(Math.round(pourProgress * 100));
            setActiveStageIndex(
              Math.min(
                mocktailPourStages.length - 1,
                Math.floor(pourProgress * mocktailPourStages.length)
              )
            );
            targetTime = pourProgress * maxTime;
          },
        });

        scrollTriggerRef.current = st;

        gsap.fromTo(
          ".scrub-copy",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }, sectionRef);

      ScrollTrigger.refresh();
    };

    const buildFallback = () => {
      setHasVideo(false);
      const isMobile = window.innerWidth < 640;

      gsapCtx = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=140%" : "+=160%",
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const pourProgress = Math.min(1, p / 0.78);
            setProgressPercent(Math.round(pourProgress * 100));
            const stageIdx = Math.min(
              mocktailPourStages.length - 1,
              Math.floor(pourProgress * mocktailPourStages.length)
            );
            setActiveStageIndex(stageIdx);
          },
        });
        scrollTriggerRef.current = st;

        gsap.fromTo(
          ".scrub-copy",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }, sectionRef);

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      setupScrub();
    } else {
      video.addEventListener("loadedmetadata", setupScrub, { once: true });
      video.addEventListener("error", buildFallback, { once: true });
    }

    const prime = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("touchstart", prime, { once: true });

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (onSeeked) video.removeEventListener("seeked", onSeeked);
      gsapCtx?.revert();
      video.removeEventListener("loadedmetadata", setupScrub);
      video.removeEventListener("error", buildFallback);
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("touchstart", prime);
    };
  }, []);

  const scrollToStage = (stageIndex) => {
    const st = scrollTriggerRef.current;
    const stage = mocktailPourStages[stageIndex];
    if (!stage || !st) return;

    const targetP = stage.progressAt * 0.78;
    const targetScroll = st.start + (st.end - st.start) * targetP;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-night">
      <video
        ref={videoRef}
        src={media.scrubVideo}
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

      {!hasVideo && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(255,122,77,0.30),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_25%,rgba(31,182,166,0.22),transparent_55%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night to-transparent" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night/60 pointer-events-none" />

      {/* Top Bar: Interactive Stage Tabs */}
      <div className="absolute inset-x-0 top-4 sm:top-10 z-20 section-pad flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3">
        {/* py/pr give the pills room inside the scroll container. Without
            trailing space the last pill sits flush against the clip edge, so
            its rounded cap and any glow get sliced off into a hard-edged
            rectangle. */}
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full px-0.5 py-1.5 pr-5 sm:pr-1 no-scrollbar">
          {/* Both tab states keep an identical box: same padding, same 1px
              border, no scale. Previously the active tab dropped its border
              (1px -> 0) and scaled up, and `transition-all` animated that
              size change — so every stage change briefly widened the strip,
              tripped overflow, and flashed a scrollbar. Only colours
              transition now, so the layout never moves. */}
          {mocktailPourStages.map((stg, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stg.step}
                onClick={() => scrollToStage(idx)}
                className={`shrink-0 rounded-full border px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold tracking-wider transition-colors duration-300 ${
                  isActive
                    ? "bg-sand text-night"
                    : "border-sand/20 bg-night/60 text-sand/75 hover:border-sand/40 hover:text-sand backdrop-blur-sm"
                }`}
                style={isActive ? { borderColor: stg.color } : undefined}
              >
                {stg.tab}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-sand/20 bg-night/70 px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono text-sand/90 backdrop-blur-sm">
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: activeStage.color }}
          />
          <span>{progressPercent >= 100 ? "POUR COMPLETE" : `POURING ${progressPercent}%`}</span>
        </div>
      </div>

      {/* Bottom Overlay: Dynamic Stage Details */}
      <div className="absolute inset-x-0 bottom-0 section-pad pb-6 sm:pb-14 pointer-events-none z-10">
        <div className="pointer-events-auto max-w-xl">
          <p
            className="scrub-copy mb-1 sm:mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] transition-colors duration-500"
            style={{ color: activeStage.color }}
          >
            {activeStage.kicker}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <h2 className="scrub-copy font-display text-[min(8vw,2.8rem)] leading-[1.05] text-sand">
              {activeStage.title}
            </h2>
            <span
              className="rounded-full px-2.5 sm:px-3 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wide uppercase text-night"
              style={{ backgroundColor: activeStage.color }}
            >
              {activeStage.badge}
            </span>
          </div>

          <p className="scrub-copy body-muted mt-1 sm:mt-2 text-xs sm:text-base leading-relaxed">
            {activeStage.desc}
          </p>

          <div className="mt-3 sm:mt-4 h-1.5 w-full max-w-xs sm:max-w-md overflow-hidden rounded-full bg-sand/15">
            {/* No width transition — a CSS ease here makes the bar trail the
                scroll by its own duration, which reads as more lag. Colour
                still eases, since that only changes between stages. */}
            <div
              className="h-full rounded-full transition-colors duration-500"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: activeStage.color,
              }}
            />
          </div>

          {!hasVideo && (
            <p className="scrub-copy mt-3 inline-flex items-center gap-2 rounded-full border border-amber/35 bg-amber/[0.07] px-3 py-1 text-[11px] text-sand/85">
              <span className="rounded-full bg-amber px-2 py-0.5 font-bold text-night">
                AWAITING FOOTAGE
              </span>
              Generate <code className="font-mono">coffee-pour.mp4</code>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
