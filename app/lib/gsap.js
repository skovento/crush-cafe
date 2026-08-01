"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered once here instead of repeated in every component.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
