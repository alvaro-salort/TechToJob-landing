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
  const [activeSectionId, setActiveSectionId] = useState("");
  const messages = getMessages();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds = ["hero", "como-funciona", "talento", "empresas", "torneos", "networking", "noticias"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === "#hero" || href === "#" || href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#030507]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, "#hero")}
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
          className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md transition-all duration-200"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => {
            const isActive = activeSectionId === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-brand-teal bg-white/10 font-semibold shadow-inner"
                    : "text-[#94a3b8] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={SITE_CONFIG.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-brand-teal text-brand-dark rounded-full shadow-sm hover:bg-[#97d0cf] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
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
            {navLinks.map((link) => {
              const isActive = activeSectionId === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3.5 py-2.5 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-brand-teal bg-white/10 font-bold"
                      : "text-[#cbd5e1] hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="pt-3 border-t border-white/10">
            <a
              href={SITE_CONFIG.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-base font-bold bg-brand-teal text-brand-dark rounded-full shadow-sm transition-all"
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
