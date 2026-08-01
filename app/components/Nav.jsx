"use client";
import { business } from "../data/business";

/**
 * Header navigation — positioned absolutely at top: 0 of the Hero section.
 * Only visible when at the top of the page; scrolls away so all subsequent
 * sections (NightScene, Poured To Order video, VibeBand) have full viewport real estate.
 */
export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between section-pad py-5 bg-gradient-to-b from-night/80 to-transparent">
      {/* Green + orange split echoes the "The Royal" lettering painted on
          their actual bar counter. */}
      <a href="#" className="font-display text-base tracking-tight sm:text-lg">
        <span className="text-leaf">CRUSH</span>{" "}
        <span className="text-sunset">CAFE</span>
      </a>
      <a
        href={business.phone.href}
        className="rounded-full bg-sunset px-5 py-2 text-sm font-semibold text-night transition-transform hover:scale-105"
      >
        Call to Order
      </a>
    </header>
  );
}
