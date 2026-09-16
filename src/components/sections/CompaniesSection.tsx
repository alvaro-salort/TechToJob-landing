import React from "react";
import { getMessages } from "@/lib/messages";
import {
  IconGitPullRequest,
  IconSend,
  IconUsers,
} from "@tabler/icons-react";

export function CompaniesSection() {
  const messages = getMessages();

  const featureIcons = [
    <IconGitPullRequest key="0" size={22} className="text-brand-teal" stroke={1.8} />,
    <IconSend key="1" size={22} className="text-brand-teal" stroke={1.8} />,
    <IconUsers key="2" size={22} className="text-brand-teal" stroke={1.8} />,
  ];

  return (
    <section id="empresas" className="py-24 bg-[#161819] text-white border-b border-white/10 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {messages.companies.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            Evalúa cómo resuelven problemas técnicos{" "}
            <mark className="text-highlight">antes de contratar</mark>.
          </p>
        </div>

        {/* 3 Value Pillars - Modern Apple Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {messages.companies.features.map((feature, i) => (
            <div
              key={i}
              className="bg-white/[0.04] border border-white/10 rounded-3xl p-7 flex flex-col justify-between hover:border-brand-teal/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-teal/15 flex items-center justify-center mb-6">
                  {featureIcons[i]}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-brand-teal">
                <span>Evaluación práctica</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
