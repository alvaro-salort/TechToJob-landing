"use client";

import React, { useState } from "react";
import { getMessages } from "@/lib/messages";
import { IconMail, IconCheck, IconLock } from "@tabler/icons-react";

export function NewsletterSection() {
  const messages = getMessages();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 bg-white border-b border-brand-border relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-white to-[#fbfbfd] border border-brand-border/80 rounded-3xl p-8 sm:p-14 text-center shadow-xl shadow-black/[0.02]">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
            {messages.newsletter.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-grayText font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
            {messages.newsletter.subtitle}
          </p>

          {submitted ? (
            <div className="max-w-md mx-auto p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center gap-2.5 text-emerald-800 font-medium text-sm shadow-sm">
              <IconCheck size={18} className="text-emerald-600" stroke={2.5} />
              <span>¡Listo! Te avisaremos cada lunes con lo mejor del sector.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico para recibir ofertas y novedades
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-grayMuted">
                    <IconMail size={18} />
                  </div>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={messages.newsletter.placeholder}
                    className="w-full pl-11 pr-5 py-3.5 bg-white border border-brand-border rounded-full text-sm text-brand-dark placeholder:text-brand-grayMuted font-medium focus:outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/15 shadow-sm transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-brand-dark bg-brand-teal rounded-full shadow-sm hover:bg-[#9de1e0] hover:shadow-md active:scale-[0.98] transition-all shrink-0 cursor-pointer"
              >
                {messages.newsletter.cta}
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-brand-grayMuted font-medium flex items-center justify-center gap-1.5">
            <IconLock size={14} />
            <span>{messages.newsletter.disclaimer}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
