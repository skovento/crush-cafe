"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Pinned sections change document height after other triggers have
    // measured the page; without a refresh those triggers never fire.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    // window.scrollTo() bypasses Lenis and won't update ScrollTrigger.
    // Use window.__lenis.scrollTo(y) when debugging scrub effects.
    if (process.env.NODE_ENV !== "production") window.__lenis = lenis;

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
