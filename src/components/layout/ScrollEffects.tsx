"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollEffects() {
  useEffect(() => {
    // Developer Console Signature & Easter Egg
    if (typeof window !== "undefined") {
      const w = window as unknown as { __ttj_logged__?: boolean };
      if (!w.__ttj_logged__) {
        w.__ttj_logged__ = true;
        console.log(
          `%c TechToJob %c Landing Page %c Diseñado y desarrollado por Álvaro Salort %c\n` +
          `%cGitHub: https://github.com/alvaro-salort`,
          "background: #2f3436; color: #84c0bf; font-weight: 700; font-size: 12px; padding: 4px 8px; border-radius: 4px 0 0 4px;",
          "background: #84c0bf; color: #030507; font-weight: 700; font-size: 12px; padding: 4px 8px;",
          "background: #111827; color: #f8fafc; font-size: 11px; padding: 4px 10px; border-radius: 0 4px 4px 0;",
          "",
          "color: #84c0bf; font-size: 11px; padding-top: 4px; font-weight: 500;"
        );
      }
    }

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

