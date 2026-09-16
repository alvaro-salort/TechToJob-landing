import React from "react";
import { getMessages } from "@/lib/messages";
import {
  IconTrophy,
  IconCodeAsterisk,
  IconGavel,
  IconRocket,
  IconBrandDiscord,
} from "@tabler/icons-react";
import { SITE_CONFIG } from "@/lib/constants";

export function TournamentsSection() {
  const messages = getMessages();
  const current = messages.tournaments.current;

  return (
    <section id="torneos" className="py-24 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
            {messages.tournaments.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-grayText font-normal leading-relaxed">
            {messages.tournaments.subtitle}
          </p>
        </div>

        {/* Current Active Tournament Callout Box - Apple Style */}
        <div className="relative mb-14 bg-gradient-to-br from-brand-tealLight/60 via-white to-white border border-brand-teal/30 rounded-3xl p-7 sm:p-10 shadow-sm hover:shadow-md transition-all overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-brand-teal text-brand-dark rounded-full">
                  <IconTrophy size={14} />
                  {current.tag}
                </span>
                <span className="text-xs font-medium text-brand-dark bg-white border border-brand-border px-3 py-1 rounded-full">
                  {current.status}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-brand-grayText max-w-2xl leading-relaxed">
                {current.description}
              </p>
            </div>

            <a
              href={SITE_CONFIG.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-brand-dark bg-brand-teal rounded-full shadow-sm hover:bg-[#9de1e0] hover:shadow-md active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <IconBrandDiscord size={18} stroke={2} />
              <span>Ver bases en Discord</span>
            </a>
          </div>
        </div>

        {/* 3 Pillars - Clean without bottom footer bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {messages.tournaments.features.map((item, idx) => (
            <article
              key={idx}
              className="bg-white border border-brand-border/80 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start"
            >
              <div className="w-11 h-11 rounded-2xl bg-brand-teal/15 flex items-center justify-center mb-5 text-brand-dark">
                {idx === 0 && <IconRocket size={20} stroke={1.8} />}
                {idx === 1 && <IconGavel size={20} stroke={1.8} />}
                {idx === 2 && <IconCodeAsterisk size={20} stroke={1.8} />}
              </div>
              <h4 className="text-lg font-bold text-brand-dark mb-2 tracking-tight">{item.title}</h4>
              <p className="text-sm text-brand-grayText leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
