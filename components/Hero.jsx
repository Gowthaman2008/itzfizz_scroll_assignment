"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS, SCROLL } from "../lib/config";
import CarTrack from "./CarTrack";
import StatCard from "./StatCard";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          mobile: "(max-width: 768px)",
        },
        (context) => {
          const { reduce, mobile } = context.conditions;
          const q = gsap.utils.selector(root.current);
          const car = q(".car")[0];
          const fill = q(".hl-fill")[0];
          const lines = q(".road-lines")[0];

          gsap.set(car, { yPercent: -50 });

          // Reduced motion: show the final state, no pinning or scrubbing.
          if (reduce) {
            fill.style.clipPath = "inset(0 0% 0 0)";
            gsap.set(car, { x: () => root.current.clientWidth - car.offsetWidth });
            return;
          }

          /* 1) INTRO (time-based): staggered headline, then stats one by one */
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from(q(".hl-letter"), { opacity: 0, y: 40, duration: 0.9, stagger: 0.05 })
            .from(car, { opacity: 0, duration: 0.8 }, 0.2)
            .from(q(".stat"), { opacity: 0, y: 40, duration: 0.8, stagger: 0.15 }, "-=0.3");

          /* 2) SCROLL (progress-based): car drives across, headline is revealed behind it */
          let vw = 0;
          let carW = 0;
          const measure = () => {
            vw = root.current.clientWidth;
            carW = car.offsetWidth;
          };
          measure();

          const setX = gsap.quickSetter(car, "x", "px");
          const progress = { p: 0 };
          const startX = () => -carW * 0.3;
          const endX = () => vw - carW * 0.92;

          const update = () => {
            const x = startX() + progress.p * (endX() - startX());
            setX(x);
            // reveal everything the car's nose has passed
            const pct = Math.min(100, Math.max(0, ((x + carW * 0.92) / vw) * 100));
            fill.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
          };
          update();

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: `+=${mobile ? SCROLL.mobile : SCROLL.desktop}%`,
              pin: true,
              scrub: 1, // smoothing/interpolation: motion eases toward scroll position
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: () => {
                measure();
                update();
              },
            },
          });

          tl.to(progress, { p: 1, ease: "none", duration: 1, onUpdate: update }, 0)
            .to(lines, { xPercent: -30, ease: "none", duration: 1 }, 0)
            .to(car, { scale: 1.08, ease: "sine.inOut", yoyo: true, repeat: 1, duration: 0.5 }, 0)
            .fromTo(
              q(".stat-inner"),
              { y: 0, opacity: 0.55 },
              { y: -24, opacity: 1, ease: "none", duration: 0.3, stagger: 0.12 },
              0.3
            );
        }
      );
    }, root);

    // Cleanup: kills tweens, ScrollTriggers and matchMedia listeners.
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex h-screen w-full flex-col justify-center gap-8 overflow-hidden px-0 py-6 sm:gap-12"
    >
      <p className="px-6 text-xs font-semibold tracking-[0.4em] text-white/40">ITZFIZZ DIGITAL</p>
      <CarTrack />
      <div className="grid grid-cols-2 gap-3 px-4 sm:gap-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
