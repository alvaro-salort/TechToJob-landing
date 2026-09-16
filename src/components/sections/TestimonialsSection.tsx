import React from "react";
import { getMessages } from "@/lib/messages";
import { IconBrandLinkedin, IconQuote } from "@tabler/icons-react";

export function TestimonialsSection() {
  const messages = getMessages();

  return (
    <section id="testimonios" className="py-24 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
            {messages.testimonials.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-grayText font-normal leading-relaxed">
            Gente real del sector que ya está dentro y{" "}
            <mark className="text-highlight">construyendo en comunidad</mark>.
          </p>
        </div>

        {/* 5 Testimonial Cards - Clean Apple Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.testimonials.items.map((item, idx) => (
            <article
              key={idx}
              className={`bg-white border border-brand-border/80 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                idx === 3 ? "lg:col-span-1 md:col-span-2" : idx === 4 ? "lg:col-span-2 md:col-span-2" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-9 h-9 rounded-full bg-brand-teal/15 flex items-center justify-center text-brand-dark">
                    <IconQuote size={16} stroke={1.8} />
                  </div>
                  <a
                    href={item.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-grayText hover:text-brand-dark bg-brand-surface border border-brand-border px-3 py-1 rounded-full hover:border-brand-teal transition-colors"
                    aria-label={`Ver perfil de LinkedIn de ${item.name}`}
                  >
                    <IconBrandLinkedin size={14} />
                    <span>Verificar</span>
                  </a>
                </div>

                <p className="text-sm text-brand-dark/90 leading-relaxed italic mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-brand-border/60 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-dark text-white font-mono font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark leading-tight">{item.name}</h3>
                  <p className="text-xs text-brand-grayText font-medium">
                    {item.role} · {item.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
