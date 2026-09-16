import React from "react";
import { getMessages } from "@/lib/messages";
import { IconCalendar, IconArrowUpRight } from "@tabler/icons-react";

export function NewsSection() {
  const messages = getMessages();

  return (
    <section id="noticias" className="py-24 bg-[#fbfbfd] border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
            {messages.news.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-grayText font-normal leading-relaxed">
            Novedades del proyecto, torneos y lo que pasa en el{" "}
            <mark className="text-highlight">ecosistema tech</mark>.
          </p>
        </div>

        {/* 3 News Articles - Clean without category pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {messages.news.items.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-brand-border/80 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-start mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-brand-grayText font-medium">
                    <IconCalendar size={14} />
                    {item.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-tealHover transition-colors mb-3 leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-grayText leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-dark">
                <span>Leer artículo completo</span>
                <span className="w-7 h-7 rounded-full bg-brand-surface flex items-center justify-center group-hover:bg-brand-teal group-hover:text-brand-dark transition-colors">
                  <IconArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
