import React from "react";
import { getMessages } from "@/lib/messages";
import { IconBrandDiscord, IconArrowUpRight } from "@tabler/icons-react";
import { SITE_CONFIG } from "@/lib/constants";
import { HeroPixelGrid } from "@/components/hero/HeroPixelGrid";

export function ClosingSection() {
  const messages = getMessages();

  return (
    <section className="relative py-28 sm:py-36 bg-[#030507] text-white border-b border-white/10 overflow-hidden">
      {/* Interactive Pixel Grid Canvas rising from bottom to top */}
      <HeroPixelGrid direction="bottom" cellSize={11} className="z-0" />

      {/* Subtle Ambient Grid Background */}
      <div
        className="absolute inset-0 dark-grid-bg opacity-15 pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-20">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight">
          {messages.closing.title}
        </h2>

        <p className="text-base sm:text-xl text-gray-300 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
          La comunidad ya está activa.{" "}
          <mark className="text-highlight">Entra y preséntate</mark>.
        </p>

        <div className="inline-block">
          <a
            id="closing-discord-cta"
            href={SITE_CONFIG.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3.5 px-8 sm:px-11 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-brand-dark bg-brand-teal rounded-full shadow-lg shadow-black/50 border border-brand-teal/30 hover:bg-[#9de1e0] hover:border-brand-teal/80 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <IconBrandDiscord
              size={24}
              stroke={2.2}
              className="text-brand-dark group-hover:scale-110 transition-transform duration-300"
            />
            <span className="tracking-tight">{messages.closing.cta}</span>
            <span className="w-7 h-7 rounded-full bg-brand-dark/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <IconArrowUpRight size={17} stroke={2.5} className="text-brand-dark" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
