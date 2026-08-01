"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { business, facts, media } from "../data/business";

export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);

  // Ambient night loop behind the headline, once footage exists. Until then
  // the gradient below carries the section on its own.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const ok = () => setHasVideo(true);
    const fail = () => setHasVideo(false);
    if (v.readyState >= 2) ok();
    else {
      v.addEventListener("loadeddata", ok, { once: true });
      v.addEventListener("error", fail, { once: true });
    }
    return () => {
      v.removeEventListener("loadeddata", ok);
      v.removeEventListener("error", fail);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.09,
        delay: 0.15,
      });
      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const [line1, line2] = business.tagline.split(".").filter(Boolean).map((s) => s.trim() + ".");

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden section-pad pt-28 pb-16"
    >
      {/* Ambient night footage, when it exists. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          hasVideo ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={media.heroVideo} type="video/mp4" />
      </video>

      {/* Scrims sit over the footage; they also carry the section on their
          own while the footage is still missing. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,122,77,0.30),transparent_65%)]" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[26rem] w-[26rem] rounded-full bg-surf/15 blur-[130px]" />

      <p className="hero-sub relative z-10 mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber sm:text-sm">
        <span>{business.locality}</span>
        <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1 tracking-normal">
          ★ {business.rating.score} · {business.rating.count} {business.rating.source}
        </span>
      </p>

      <h1 className="relative z-10 font-display leading-[0.95] text-sand">
        <span className="block overflow-hidden">
          <span className="hero-word block text-[min(12vw,5rem)]">{line1}</span>
        </span>
        <span className="block overflow-hidden">
          <span className="hero-word block text-[min(12vw,5rem)] text-sunset neon">
            {line2}
          </span>
        </span>
      </h1>

      <p className="hero-sub body-muted relative z-10 mt-8 max-w-xl text-lg leading-relaxed">
        {business.intro}
      </p>

      <div className="hero-sub relative z-10 mt-9 flex flex-wrap gap-4">
        <a
          href={business.phone.href}
          className="rounded-full bg-sunset px-7 py-3.5 font-semibold text-night transition-transform hover:scale-105"
        >
          Call · {business.phone.display}
        </a>
        <a
          href="#visit"
          className="rounded-full border border-sand/35 px-7 py-3.5 font-semibold text-sand transition-colors hover:border-amber hover:text-amber"
        >
          Find Us
        </a>
      </div>

      <dl className="hero-sub relative z-10 mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-2xl border border-sand/12 bg-sand/[0.04] p-5">
            <dt className="font-display text-2xl text-amber">{f.value}</dt>
            <dd className="mt-1.5 text-sm text-sand/70">{f.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
