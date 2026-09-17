import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconBrandDiscord,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getMessages } from "@/lib/messages";

export function Footer() {
  const messages = getMessages();
  const f = messages.footer;

  return (
    <footer suppressHydrationWarning className="bg-white border-t border-brand-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-brand-border/80">
          {/* Brand Info & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="TechToJob Inicio"
            >
              <div className="w-9 h-9 border border-brand-border bg-brand-surface p-1.5 rounded-xl flex items-center justify-center group-hover:border-brand-teal transition-colors">
                <Image
                  src="/logos/SVG/simbolo-positivo.svg"
                  alt="TechToJob Símbolo"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-brand-dark">
                TechTo<span className="text-brand-teal">Job</span>
              </span>
            </Link>

            <p className="text-sm text-brand-grayText font-normal max-w-sm leading-relaxed">
              {f.description}
            </p>

            {/* Official Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={f.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-teal hover:border-brand-teal hover:scale-105 active:scale-95 transition-all"
                aria-label="Discord Oficial de TechToJob"
              >
                <IconBrandDiscord size={18} />
              </a>
              <a
                href={f.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-teal hover:border-brand-teal hover:scale-105 active:scale-95 transition-all"
                aria-label="LinkedIn Oficial de TechToJob"
              >
                <IconBrandLinkedin size={18} />
              </a>
              <a
                href={f.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-teal hover:border-brand-teal hover:scale-105 active:scale-95 transition-all"
                aria-label="X (Twitter) Oficial de TechToJob"
              >
                <IconBrandX size={18} />
              </a>
              <a
                href={f.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-teal hover:border-brand-teal hover:scale-105 active:scale-95 transition-all"
                aria-label="Instagram Oficial de TechToJob"
              >
                <IconBrandInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Column: Talento */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-dark uppercase tracking-wider font-mono">
              {f.columns.talent.title}
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-grayText font-normal">
              {f.columns.talent.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-brand-dark transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Empresas */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-dark uppercase tracking-wider font-mono">
              {f.columns.companies.title}
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-grayText font-normal">
              {f.columns.companies.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-brand-dark transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Comunidad */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-dark uppercase tracking-wider font-mono">
              {f.columns.community.title}
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-grayText font-normal">
              {f.columns.community.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-brand-dark transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brand-dark uppercase tracking-wider font-mono">
              {f.columns.legal.title}
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-grayText font-normal">
              {f.columns.legal.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-brand-dark transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-grayMuted font-medium">
          <p suppressHydrationWarning>© {new Date().getFullYear()} TechToJob · {f.credits}</p>
          <p className="flex items-center gap-1">
            Diseñado y desarrollado por{" "}
            <a
              href="https://github.com/alvaro-salort"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark font-semibold hover:text-brand-teal transition-colors underline underline-offset-4 decoration-brand-teal/50"
            >
              Alvaro Salort
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
