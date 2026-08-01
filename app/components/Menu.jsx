"use client";
import Image from "next/image";
import useReveal from "../hooks/useReveal";
import { menuPlaceholder, business, dishes } from "../data/business";

// This section is HONESTLY LABELLED AS PLACEHOLDER on the page itself.
// No menu is published anywhere public for this cafe — not on their Google
// listing, not on magicpin, and they have no Instagram. Rather than invent
// dishes for a real business, the demo shows the layout and says plainly
// that the content is pending. Swap in the real menu from the owner.
export default function Menu() {
  const ref = useReveal([
    { selector: ".dish-shot", stagger: 0.12, duration: 0.8, start: "top 84%" },
    { selector: ".menu-col", stagger: 0.08, duration: 0.7, start: "top 70%" },
  ]);

  return (
    <section id="menu" ref={ref} className="section-pad bg-night py-20 sm:py-28">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber">
        On The Counter
      </p>
      <h2 className="mb-4 max-w-2xl font-display text-[min(9vw,3rem)] leading-tight text-sand">
        Mocktails, and nothing over ₹200
      </h2>
      <p className="body-muted mb-8 sm:mb-12 max-w-xl text-sm sm:text-base">
        {business.priceBand} — which, two minutes from the GLS College gate, is
        rather the point.
      </p>

      {/* Real photography sits above the placeholder menu, so the section
          leads with something finished rather than with a caveat. */}
      <div className="mb-10 sm:mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {dishes.map((d) => (
          <figure
            key={d.src}
            className="dish-shot group relative aspect-[16/10] overflow-hidden rounded-2xl"
          >
            <Image
              src={d.src}
              alt={d.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl text-sand">{d.name}</h3>
              <p className="mt-1 text-xs sm:text-sm text-sand/75">{d.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Visible placeholder notice — the client should see exactly what is
          and isn't real in this demo. */}
      <div className="mb-8 sm:mb-10 flex items-start flex-col sm:flex-row gap-3 rounded-2xl border border-amber/35 bg-amber/[0.07] p-4 sm:p-5">
        <span className="mt-0.5 shrink-0 rounded-full bg-amber px-2.5 py-0.5 text-xs font-bold text-night">
          PLACEHOLDER
        </span>
        <p className="text-xs sm:text-sm leading-relaxed text-sand/85">{menuPlaceholder.note}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {menuPlaceholder.categories.map((c) => (
          <div
            key={c.title}
            className={`menu-col rounded-2xl p-4 sm:p-6 ${
              c.verified
                ? "border border-sunset/50 bg-sunset/[0.07]"
                : "border border-dashed border-sand/25 bg-sand/[0.03]"
            }`}
          >
            <h3
              className={`mb-4 font-display text-base uppercase tracking-wide ${
                c.verified ? "text-sunset" : "text-surf"
              }`}
            >
              {c.title}
            </h3>
            {c.verified && (
              <p className="-mt-2 mb-3 text-[11px] font-semibold uppercase tracking-wider text-leaf">
                Confirmed from their bar
              </p>
            )}
            <ul className="space-y-2.5">
              {c.items.map((item) => (
                <li key={item} className="text-sm text-sand/60">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
