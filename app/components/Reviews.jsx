"use client";
import useReveal from "../hooks/useReveal";
import { reviews, business } from "../data/business";

// These three reviews are the only substantive public content that exists
// for this business, so the demo gives them real weight rather than burying
// them at the bottom.
export default function Reviews() {
  const ref = useReveal([
    { selector: ".rev", stagger: 0.12, duration: 0.75, start: "top 82%" },
  ]);

  return (
    <section ref={ref} className="section-pad bg-dusk py-28">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber">
        {business.rating.score} Stars · Every Single Review
      </p>
      <h2 className="mb-14 max-w-2xl font-display text-[min(9vw,3rem)] leading-tight text-sand">
        Twenty reviews. Not one below five.
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="rev rounded-2xl border border-sand/12 bg-sand/[0.05] p-7"
          >
            <p className="mb-4 text-amber" aria-label="5 out of 5 stars">
              ★★★★★
            </p>
            <blockquote className="body-muted leading-relaxed">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6">
              <span className="block text-sm font-semibold text-sunset">{r.name}</span>
              <span className="block text-xs text-sand/55">{r.meta}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
