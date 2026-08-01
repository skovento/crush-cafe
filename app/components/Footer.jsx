"use client";
import { business } from "../data/business";

export default function Footer() {
  return (
    <footer className="section-pad bg-sunset py-24 text-night">
      <h2 className="max-w-3xl font-display text-[min(10vw,3.5rem)] leading-tight">
        It&apos;s late. Everything else is shut. We&apos;re not.
      </h2>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href={business.phone.href}
          className="rounded-full bg-night px-7 py-3.5 font-semibold text-sand transition-transform hover:scale-105"
        >
          Call {business.phone.display}
        </a>
        <a
          href={business.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-night/40 px-7 py-3.5 font-semibold text-night transition-colors hover:bg-night/10"
        >
          Get Directions
        </a>
      </div>

      <p className="mt-8 text-sm text-night/80">
        {business.address} · {business.hours}
      </p>

      <p className="mt-16 text-sm text-night/70">
        Concept demo built by Skovento for {business.name}. Not an official
        site. Content marked placeholder is illustrative only.
      </p>
    </footer>
  );
}
