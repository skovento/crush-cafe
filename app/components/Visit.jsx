"use client";
import { business } from "../data/business";

export default function Visit() {
  return (
    <section id="visit" className="section-pad bg-night py-28">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber">
        Find Us
      </p>
      <h2 className="mb-14 max-w-2xl font-display text-[min(9vw,3rem)] leading-tight text-sand">
        Opposite National Handloom
      </h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-sand/12 bg-sand/[0.04] p-8 lg:col-span-2">
          <h3 className="font-display text-2xl text-sand">{business.name}</h3>
          <p className="body-muted mt-3 leading-relaxed">{business.address}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {business.serviceOptions.map((s) => (
              <span
                key={s}
                className="rounded-full border border-sand/20 px-4 py-1.5 text-sm text-sand/75"
              >
                {s}
              </span>
            ))}
          </div>

          <a
            href={business.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-block font-semibold text-sunset hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-dusk to-night p-8 ring-1 ring-sand/12">
          <p className="text-sm uppercase tracking-widest text-sand/55">Tonight</p>
          <p className="mt-3 font-display text-3xl text-amber">{business.hours}</p>
          <p className="body-muted mt-6">
            Kitchen and counter run late — call ahead if you&apos;re bringing
            the whole group.
          </p>
          <a
            href={business.phone.href}
            className="mt-6 inline-block font-semibold text-amber hover:underline"
          >
            {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
