"use client";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * Shared scroll-reveal.
 *
 * fromTo with immediateRender:false, not gsap.from(). With `from`, a trigger
 * that never fires leaves the element stranded at opacity 0 and the section
 * renders blank. fromTo degrades to "just visible" — the safe failure mode.
 */
export default function useReveal(groups) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      groups.forEach(
        ({ selector, y = 40, stagger = 0.1, duration = 0.8, start = "top 82%" }) => {
          if (!ref.current.querySelector(selector)) return;
          gsap.fromTo(
            selector,
            { y, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger,
              duration,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: ref.current,
                start,
                toggleActions: "play none none none",
              },
            }
          );
        }
      );
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
