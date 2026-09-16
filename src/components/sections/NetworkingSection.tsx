import React from "react";
import { getMessages } from "@/lib/messages";
import {
  IconMessage2,
  IconBriefcase2,
  IconCodeDots,
  IconHash,
  IconCircleCheck,
} from "@tabler/icons-react";

export function NetworkingSection() {
  const messages = getMessages();

  const channelTags = [
    { name: "frontend", members: "React, Next.js, Vue" },
    { name: "backend", members: "Node, Go, Python" },
    { name: "ui-ux", members: "Figma, Diseño, Accesibilidad" },
    { name: "mobile", members: "Flutter, React Native, Swift" },
    { name: "ofertas-internas", members: "Compartidas por miembros" },
    { name: "revision-codigo", members: "Feedback honesto y seniors" },
  ];

  const pointIcons = [
    <IconMessage2 key="0" size={20} className="text-brand-dark" stroke={1.8} />,
    <IconBriefcase2 key="1" size={20} className="text-brand-dark" stroke={1.8} />,
    <IconCodeDots key="2" size={20} className="text-brand-dark" stroke={1.8} />,
  ];

  return (
    <section id="networking" className="py-24 bg-[#fbfbfd] border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
            {messages.networking.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-grayText font-normal leading-relaxed">
            Las mejores ofertas y oportunidades{" "}
            <mark className="text-highlight">no se publican, te enteras</mark> dentro de la comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 3 Community Points */}
          <div className="lg:col-span-6 space-y-4">
            {messages.networking.points.map((pt, idx) => (
              <div
                key={idx}
                className="bg-white border border-brand-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-2xl bg-brand-teal/15 flex items-center justify-center shrink-0">
                  {pointIcons[idx]}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-1 tracking-tight">
                    {pt.title}
                  </h3>
                  <p className="text-sm text-brand-grayText leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Channels Preview Mockup without 'En tiempo real' badge */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-brand-border/80 rounded-3xl shadow-xl shadow-black/5 p-7">
              <div className="flex items-center gap-2 pb-4 border-b border-brand-border mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-dark">
                  Canales de la comunidad
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {channelTags.map((ch) => (
                  <div
                    key={ch.name}
                    className="p-3.5 bg-brand-surface border border-brand-border/80 rounded-2xl hover:border-brand-teal/50 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-1.5 font-mono text-sm font-semibold text-brand-dark mb-1">
                      <IconHash size={15} className="text-brand-teal" />
                      <span>{ch.name}</span>
                    </div>
                    <p className="text-[11px] text-brand-grayText font-medium">
                      {ch.members}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3.5 bg-brand-teal/10 border border-brand-teal/20 rounded-2xl flex items-center gap-2.5 text-xs text-brand-dark font-medium">
                <IconCircleCheck size={18} className="text-brand-teal shrink-0" />
                <span>Sin intermediarios: conversaciones directas entre devs y empresas.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
