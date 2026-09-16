import React from "react";
import { getMessages } from "@/lib/messages";
import {
  IconDoorEnter,
  IconCode,
  IconEyeCheck,
  IconMessageHeart,
} from "@tabler/icons-react";

export function HowItWorksSection() {
  const messages = getMessages();

  const stepIcons = [
    <IconDoorEnter key="0" size={24} className="text-brand-dark" stroke={1.8} />,
    <IconCode key="1" size={24} className="text-brand-dark" stroke={1.8} />,
    <IconEyeCheck key="2" size={24} className="text-brand-dark" stroke={1.8} />,
    <IconMessageHeart key="3" size={24} className="text-brand-dark" stroke={1.8} />,
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#fbfbfd] border-b border-brand-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
            {messages.howItWorks.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-grayText font-normal leading-relaxed">
            {messages.howItWorks.subtitle}
          </p>
        </div>

        {/* 4-Step Grid - Clean Apple-Style Cards without step numbers or bottom indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {messages.howItWorks.steps.map((step, idx) => (
            <article
              key={idx}
              className="relative bg-white border border-brand-border/80 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-start group"
            >
              {/* Icon Header */}
              <div className="w-12 h-12 rounded-2xl bg-brand-teal/15 text-brand-dark flex items-center justify-center mb-6 group-hover:bg-brand-teal/25 transition-colors">
                {stepIcons[idx]}
              </div>

              <h3 className="text-xl font-bold text-brand-dark mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-brand-grayText leading-relaxed">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
