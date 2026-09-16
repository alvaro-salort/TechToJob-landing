import React from "react";
import { getMessages } from "@/lib/messages";
import {
  IconCheck,
  IconShieldCheck,
  IconBriefcase,
} from "@tabler/icons-react";

export function TalentSection() {
  const messages = getMessages();
  const card = messages.talent.cardPreview;

  return (
    <section id="talento" className="py-24 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Value Proposition & Guarantees */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
              {messages.talent.title}
            </h2>
            <p className="text-base sm:text-lg text-brand-grayText font-normal leading-relaxed mb-8">
              {messages.talent.subtitle}
            </p>

            {/* 3 Pillars / Guarantees */}
            <div className="space-y-6">
              {messages.talent.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-teal/20 text-brand-dark flex items-center justify-center shrink-0 mt-0.5">
                    <IconCheck size={16} stroke={2.5} className="text-brand-dark" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-brand-grayText leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Mockup Talent Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Soft Ambient Background Glow */}
              <div className="absolute -inset-2 bg-brand-teal/15 rounded-3xl blur-xl pointer-events-none" />

              <div className="relative bg-white border border-brand-border/80 rounded-3xl p-7 shadow-xl shadow-black/5">
                {/* Header with status badge */}
                <div className="flex items-center justify-between pb-5 border-b border-brand-border mb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-brand-dark text-white font-mono font-bold text-base flex items-center justify-center shadow-sm">
                      {card.name.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-brand-dark">{card.name}</h4>
                      <p className="text-xs text-brand-grayText font-medium">{card.role}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {card.level}
                  </span>
                </div>

                {/* Availability banner */}
                <div className="flex items-center gap-2.5 p-3 mb-5 bg-brand-surface border border-brand-border/80 rounded-xl text-xs font-medium text-brand-dark">
                  <IconBriefcase size={16} className="text-brand-grayText" />
                  <span>{card.availability}</span>
                </div>

                {/* Tech Stack Chips */}
                <div className="mb-5">
                  <span className="text-xs font-semibold text-brand-grayText uppercase tracking-wider block mb-2.5">
                    Stack tecnológico
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {card.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-brand-surface text-brand-dark border border-brand-border rounded-full hover:border-brand-teal/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-brand-grayText leading-relaxed mb-5 italic border-l-2 border-brand-teal pl-3 py-0.5">
                  &ldquo;{card.bio}&rdquo;
                </p>

                {/* Verified Footer */}
                <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs text-brand-grayText font-medium">
                  <span className="inline-flex items-center gap-1.5 text-brand-dark font-semibold">
                    <IconShieldCheck size={16} className="text-brand-teal" />
                    {card.verified}
                  </span>
                  <span className="font-mono text-[11px] text-brand-grayMuted">id: #ttj-984</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
