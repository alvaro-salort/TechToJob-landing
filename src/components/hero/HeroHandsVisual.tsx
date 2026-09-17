"use client";

import React from "react";
import { AsciiHandsCanvas } from "./AsciiHandsCanvas";

interface HeroHandsVisualProps {
  children?: React.ReactNode;
  className?: string;
}

export function HeroHandsVisual({
  children,
  className = "",
}: HeroHandsVisualProps) {
  return (
    <div
      className={`relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[540px] flex items-center justify-center overflow-visible select-none ${className}`}
    >
      {/* Interactive ASCII Canvas Hands */}
      <AsciiHandsCanvas />

      {/* Center Interactive CTA Hub */}
      <div className="relative z-30 flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}

