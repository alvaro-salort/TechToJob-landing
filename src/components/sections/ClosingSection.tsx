import React from "react";
import { getMessages } from "@/lib/messages";
import { IconBrandDiscord, IconArrowUpRight } from "@tabler/icons-react";
import { SITE_CONFIG } from "@/lib/constants";

export function ClosingSection() {
  const messages = getMessages();

  return (
    <section className="py-28 bg-[#030507] text-white border-b border-white/10 relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-teal/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight">
          {messages.closing.title}
        </h2>

        <p className="text-base sm:text-xl text-gray-300 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
          {messages.closing.subtitle}
        </p>

        <div className="inline-block">
          <a
            href={SITE_CONFIG.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3.5 px-9 sm:px-12 py-4 sm:py-4.5 text-base sm:text-lg font-bold text-brand-dark bg-brand-teal rounded-full shadow-[0_0_35px_rgba(132,192,191,0.5),0_0_70px_rgba(132,192,191,0.2)] hover:bg-[#9de1e0] hover:shadow-[0_0_50px_rgba(132,192,191,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <IconBrandDiscord size={24} stroke={2.2} className="group-hover:scale-110 transition-transform duration-300" />
            <span>{messages.closing.cta}</span>
            <span className="w-7 h-7 rounded-full bg-brand-dark/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <IconArrowUpRight size={17} stroke={2.5} className="text-brand-dark" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
