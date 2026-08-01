"use client";
import { useEffect, useState } from "react";
import { business } from "../data/business";

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between section-pad transition-all duration-300 ${
        solid
          ? "bg-night/95 py-3 shadow-lg shadow-black/40 backdrop-blur-md"
          : "bg-gradient-to-b from-night/80 to-transparent py-5"
      }`}
    >
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
