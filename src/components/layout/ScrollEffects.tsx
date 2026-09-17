"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    console.log(
      "%c \"No se entra simplemente a la consola...\" %c\n\n" +
      "Forjado en los fuegos de Next.js por Alvaro Salort.\n" +
      "Speak, friend, and enter: https://github.com/alvaro-salort\n" +
      "Portfolio: https://alvaro-salort.dev/\n",
      "background: #2f3436; color: #84c0bf; font-weight: 700; font-size: 12px; padding: 4px 8px; border-radius: 4px;",
      "color: #94a3b8; font-family: monospace; font-size: 11px; line-height: 1.6;"
    );

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

