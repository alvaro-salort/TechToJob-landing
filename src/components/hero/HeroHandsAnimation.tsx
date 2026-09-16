"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface HeroHandsAnimationProps {
  children?: React.ReactNode;
}

export function HeroHandsAnimation({ children }: HeroHandsAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current || !leftHandRef.current || !rightHandRef.current) {
            ticking = false;
            return;
          }

          // Calculate scroll progress through the hero (0 at top, 1 at 350px scroll)
          const scrollY = window.scrollY;
          const maxScroll = 300;
          const rawProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
          
          // Easing: easeOutCubic for natural gliding movement
          const progress = 1 - Math.pow(1 - rawProgress, 3);

          const isMobile = window.innerWidth < 768;
          const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

          // Starting and ending translation offsets (hands move towards center)
          // On mobile: subtle movement so hands don't cover button text
          const leftStart = isMobile ? -60 : isTablet ? -120 : -160;
          const leftEnd = isMobile ? 15 : isTablet ? 30 : 50;
          const currentLeft = leftStart + (leftEnd - leftStart) * progress;

          const rightStart = isMobile ? 60 : isTablet ? 120 : 160;
          const rightEnd = isMobile ? -15 : isTablet ? -30 : -50;
          const currentRight = rightStart + (rightEnd - rightStart) * progress;

          leftHandRef.current.style.transform = `translateX(${currentLeft}px)`;
          rightHandRef.current.style.transform = `translateX(${currentRight}px)`;

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto my-6 sm:my-10 flex items-center justify-center min-h-[220px] sm:min-h-[280px] md:min-h-[320px] overflow-visible select-none"
    >
      {/* Left Hand (2.png) - Pointing Right towards center */}
      <div
        ref={leftHandRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 will-change-transform transition-transform duration-75 pointer-events-none z-10 hidden sm:flex items-center justify-end w-1/3 md:w-5/12 overflow-visible"
        style={{ transform: "translateX(-120px)" }}
        aria-hidden="true"
      >
        <div className="relative w-64 sm:w-80 md:w-[440px] lg:w-[500px] xl:w-[540px] aspect-[7/4] drop-shadow-md">
          <Image
            src="/images/2.png"
            alt="Mano ilustrada señalando hacia el botón de Discord"
            fill
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 440px, 540px"
            className="object-contain object-right"
            priority
          />
        </div>
      </div>

      {/* Center Children (Discord CTA Button) */}
      <div className="relative z-20 px-4">
        {children}
      </div>

      {/* Right Hand (1.png) - Pointing Left towards center */}
      <div
        ref={rightHandRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 will-change-transform transition-transform duration-75 pointer-events-none z-10 hidden sm:flex items-center justify-start w-1/3 md:w-5/12 overflow-visible"
        style={{ transform: "translateX(120px)" }}
        aria-hidden="true"
      >
        <div className="relative w-64 sm:w-80 md:w-[440px] lg:w-[500px] xl:w-[540px] aspect-[7/4] drop-shadow-md">
          <Image
            src="/images/1.png"
            alt="Mano ilustrada señalando hacia el botón de Discord"
            fill
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 440px, 540px"
            className="object-contain object-left"
            priority
          />
        </div>
      </div>
    </div>
  );
}
