"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Text Highlights animation on scroll
    const highlights = gsap.utils.toArray<HTMLElement>(".text-highlight");
    highlights.forEach((highlight) => {
      ScrollTrigger.create({
        trigger: highlight,
        start: "-100px center",
        onEnter: () => highlight.classList.add("active"),
      });
    });

    // 2. Smooth section entrance transitions between sections on scroll
    const sections = document.querySelectorAll<HTMLElement>("main > section");
    sections.forEach((sec, i) => {
      if (i === 0) return; // Skip Hero so it renders instantly
      gsap.fromTo(
        sec,
        { opacity: 0.9, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}
