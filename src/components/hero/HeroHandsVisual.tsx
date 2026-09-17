"use client";

import React, { useState } from "react";
import { AsciiHandsCanvas } from "./AsciiHandsCanvas";

interface HeroHandsVisualProps {
  children?: React.ReactNode;
  videoSrc?: string;
  className?: string;
}

export function HeroHandsVisual({
  children,
  videoSrc,
  className = "",
}: HeroHandsVisualProps) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div
      className={`relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[540px] flex items-center justify-center overflow-visible select-none ${className}`}
    >
      {/*
        FUTURE VIDEO WITH GLITCH EFFECT:
        If a video is provided, render it full-bleed in background.
      */}
      {videoSrc && !videoError ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center filter contrast-125 brightness-110"
        />
      ) : (
        /* ASCII Canvas Hands – real pixel-sampled halftone with scroll parallax */
        <AsciiHandsCanvas />
      )}

      {/* Center Interactive CTA Hub */}
      <div className="relative z-30 flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
