"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollEffects() {
  useEffect(() => {
    // Developer Console Easter Egg (El Señor de los Anillos - sin emojis)
    console.log(
      "%c TECHTOJOB %c EL RETORNO DEL CODIGO \n\n" +
      "%c\"No se entra simplemente a la consola de TechToJob...\"\n\n" +
      "Forjado en los fuegos de Next.js y GSAP por Alvaro Salort.\n" +
      "Un desarrollador nunca tiene errores, Frodo Bolson; solo caracteristicas que se manifiestan exactamente cuando se lo proponen.\n\n" +
      "Di \"amigo\" y entra: https://github.com/alvaro-salort\n",
      "background: #2f3436; color: #84c0bf; font-weight: 700; font-size: 13px; padding: 4px 8px; border-radius: 4px 0 0 4px;",
      "background: #84c0bf; color: #030507; font-weight: 700; font-size: 13px; padding: 4px 8px; border-radius: 0 4px 4px 0;",
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

