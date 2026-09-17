"use client";

import React from "react";
import { IconBrandDiscord, IconArrowUpRight } from "@tabler/icons-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getMessages } from "@/lib/messages";
import { HeroHandsVisual } from "./HeroHandsVisual";
import { HeroPixelGrid } from "./HeroPixelGrid";

export function HeroSection() {
  const messages = getMessages();

  return (
    <section className="relative overflow-x-clip pt-20 sm:pt-28 pb-12 sm:pb-20 bg-[#030507] text-white">
      {/* Interactive Pixel Grid Canvas*/}
      <HeroPixelGrid cellSize={11} className="z-0" />

      {/* High-End Ambient Background Gradients & Grid */}
      <div className="absolute inset-0 dark-grid-bg opacity-20 pointer-events-none z-0" aria-hidden="true" />

      {/* Top Ambient Glow Orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-teal/10 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Hero Typography (Centered Content Container) */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center mb-6 sm:mb-10 z-20">
        {/* Primary Page Heading (Single H1) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] mb-5">
          Haz que las empresas <span className="block">te encuentren</span>
        </h1>

        {/* Short Punchy Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#94a3b8] font-normal max-w-2xl mx-auto leading-relaxed">
          Construye, colabora y hazte visible.
        </p>
      </div>

      {/*
        Full-Width Screen Visual: ASCII Hands stretching across 100% of viewport
        with center glowing Apple-style Discord pill CTA
      */}
      <HeroHandsVisual className="z-10">
        <a
          id="hero-discord-cta"
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
          <span className="tracking-tight">Unirse a Discord</span>
          <span className="w-7 h-7 rounded-full bg-brand-dark/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
            <IconArrowUpRight size={17} stroke={2.5} className="text-brand-dark" />
          </span>
        </a>
      </HeroHandsVisual>

      {/* Smooth Bottom Edge Vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-b from-transparent to-[#030507]"
        aria-hidden="true"
      />
    </section>
  );
}
