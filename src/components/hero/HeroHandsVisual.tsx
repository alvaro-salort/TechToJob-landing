"use client";

import React, { useState } from "react";
import Image from "next/image";

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
      className={`relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[540px] flex items-center justify-center overflow-hidden select-none ${className}`}
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
        <>
          {/* Left Hand (2.png): Emerges directly from the browser's left edge towards center */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[42vw] sm:w-[44vw] md:w-[45vw] max-w-[720px] h-[75%] sm:h-[85%] md:h-[90%] pointer-events-none z-10"
            aria-hidden="true"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/2.png"
                alt="Mano izquierda en arte ASCII apuntando al centro"
                fill
                priority
                sizes="(max-width: 768px) 45vw, 720px"
                className="object-contain object-left drop-shadow-[0_0_20px_rgba(132,192,191,0.25)]"
              />
            </div>
          </div>

          {/* Right Hand (1.png): Emerges directly from the browser's right edge towards center */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[42vw] sm:w-[44vw] md:w-[45vw] max-w-[720px] h-[75%] sm:h-[85%] md:h-[90%] pointer-events-none z-10"
            aria-hidden="true"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/1.png"
                alt="Mano derecha en arte ASCII apuntando al centro"
                fill
                priority
                sizes="(max-width: 768px) 45vw, 720px"
                className="object-contain object-right drop-shadow-[0_0_20px_rgba(132,192,191,0.25)]"
              />
            </div>
          </div>
        </>
      )}

      {/* Center Ethereal Cyan Radial Aura Glow right behind fingertips & CTA button */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 md:w-[460px] h-44 sm:h-60 md:h-72 rounded-full pointer-events-none animate-glow-pulse z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(132, 192, 191, 0.55) 0%, rgba(132, 192, 191, 0.22) 40%, rgba(132, 192, 191, 0) 75%)",
          filter: "blur(32px)",
        }}
        aria-hidden="true"
      />

      {/* Intense Core Cyan Ambient Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 sm:w-52 h-24 sm:h-32 rounded-full pointer-events-none opacity-90 z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(132, 192, 191, 0.8) 0%, rgba(132, 192, 191, 0) 70%)",
          filter: "blur(14px)",
        }}
        aria-hidden="true"
      />

      {/* Center Interactive CTA Hub */}
      <div className="relative z-30 flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
