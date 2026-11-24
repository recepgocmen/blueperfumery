"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const FRAMES: Record<string, Keyframe[]> = {
  tile: [
    { opacity: 0, transform: "translateY(24px)" },
    { opacity: 1, transform: "none" },
  ],
  heading: [
    { clipPath: "inset(0 0 100% 0)", transform: "translateY(0.35em)" },
    { clipPath: "inset(0 0 0 0)", transform: "none" },
  ],
  rule: [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
};

const token = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// Plays a one-time entrance for [data-reveal] content that starts below the fold.
// It never touches attributes React owns, so hydration stays clean; without JS nothing
// is hidden, and content in view at load is left alone.
const RevealObserver = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = parseFloat(token("--dur-slow")) || 1000;
    const stagger = parseFloat(token("--stagger")) || 70;
    const easing = token("--ease-settle") || "ease-out";

    // Each below-fold element gets its animation up front, paused on its first frame,
    // so nothing that has painted can vanish and replay; it plays once on entering.
    const pending = new Map<Element, Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, order) => {
          const animation = pending.get(entry.target);
          if (animation) {
            animation.currentTime = -order * stagger;
            animation.play();
          }
          pending.delete(entry.target);
          observer.unobserve(entry.target);
        });
    });

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
      const frames = FRAMES[element.dataset.reveal ?? ""];
      if (!frames || element.getBoundingClientRect().top < window.innerHeight) return;
      const animation = element.animate(frames, { duration, easing, fill: "both" });
      animation.pause();
      pending.set(element, animation);
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      pending.forEach((animation) => animation.finish());
    };
  }, [pathname]);

  return null;
};

export default RevealObserver;
