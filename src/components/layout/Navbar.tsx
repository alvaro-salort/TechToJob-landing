"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandDiscord, IconMenu2, IconX } from "@tabler/icons-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getMessages } from "@/lib/messages";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const messages = getMessages();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: messages.nav.links.howItWorks, href: "#como-funciona" },
    { label: messages.nav.links.talent, href: "#talento" },
    { label: messages.nav.links.companies, href: "#empresas" },
    { label: messages.nav.links.tournaments, href: "#torneos" },
    { label: messages.nav.links.networking, href: "#networking" },
    { label: messages.nav.links.news, href: "#noticias" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#030507]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-brand-teal rounded-lg group"
          aria-label="TechToJob Inicio"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 border border-brand-teal/30 bg-brand-teal/10 p-1.5 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(132,192,191,0.2)] group-hover:border-brand-teal/60 transition-colors">
            <Image
              src="/logos/SVG/simbolo-negativo.svg"
              alt="TechToJob Símbolo"
              width={28}
              height={28}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            TechTo<span className="text-brand-teal">Job</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
            isScrolled ? "bg-white/[0.04] border border-white/10" : "bg-transparent border border-transparent"
          }`}
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={SITE_CONFIG.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-brand-teal text-brand-dark rounded-full shadow-[0_0_20px_rgba(132,192,191,0.35)] hover:bg-[#97d0cf] hover:shadow-[0_0_30px_rgba(132,192,191,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <IconBrandDiscord size={18} stroke={2.2} />
            <span>{messages.nav.cta}</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 focus:outline-none transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030507]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 text-base font-medium text-[#cbd5e1] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10">
            <a
              href={SITE_CONFIG.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-base font-bold bg-brand-teal text-brand-dark rounded-full shadow-[0_0_25px_rgba(132,192,191,0.4)] transition-all"
            >
              <IconBrandDiscord size={20} stroke={2.2} />
              <span>{messages.nav.cta}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
