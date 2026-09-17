"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Text Highlights animation on scroll
      const highlights = gsap.utils.toArray<HTMLElement>(".text-highlight");
      highlights.forEach((highlight) => {
        ScrollTrigger.create({
          trigger: highlight,
          start: "top 88%",
          onEnter: () => highlight.classList.add("active"),
        });
      });

      // 2. Subtle header entrance reveal on scroll
      const sectionHeaders = gsap.utils.toArray<HTMLElement>("main section h2");
      sectionHeaders.forEach((h2) => {
        gsap.fromTo(
          h2,
          { opacity: 0.7, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: h2,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}

