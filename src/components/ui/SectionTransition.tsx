"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionTransitionProps {
  fromColor?: string;
  toColor?: string;
  direction?: "dark-to-light" | "light-to-dark";
  className?: string;
}

export function SectionTransition({
  fromColor,
  toColor,
  direction = "dark-to-light",
  className = "",
}: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Default colors based on direction
  const resolvedFrom =
    fromColor || (direction === "dark-to-light" ? "#030507" : "#ffffff");
  const resolvedTo =
    toColor || (direction === "dark-to-light" ? "#fbfbfd" : "#030507");

  // 10 columns for desktop, responsive classes handle visibility
  const totalColumns = 10;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const cols = columnsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cols.length === 0) return;

    // Responsive GSAP configuration with matchMedia for mobile safety
    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 640px)
    mm.add("(min-width: 640px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          end: "bottom 35%",
          scrub: 0.6,
        },
      });

      // Animate columns with stalactite / wave staggered curve
      cols.forEach((col, i) => {
        // Stalactite curve: center columns retract first, edge columns linger longer
        const distFromCenter =
          Math.abs(i - (cols.length - 1) / 2) / ((cols.length - 1) / 2);
        const staggerOffset = Math.pow(distFromCenter, 1.4) * 0.35;

        tl.fromTo(
          col,
          { scaleY: 1 },
          {
            scaleY: 0,
            ease: "none",
            duration: 0.65,
          },
          staggerOffset
        );
      });
    });

    // Mobile (< 640px): Optimized with fewer active columns and snappier scrub
    mm.add("(max-width: 639px)", () => {
      const activeMobileCols = cols.filter(
        (col) => window.getComputedStyle(col).display !== "none"
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 95%",
          end: "bottom 45%",
          scrub: 0.4,
        },
      });

      activeMobileCols.forEach((col, i) => {
        const distFromCenter =
          Math.abs(i - (activeMobileCols.length - 1) / 2) /
          ((activeMobileCols.length - 1) / 2 || 1);
        const staggerOffset = distFromCenter * 0.25;

        tl.fromTo(
          col,
          { scaleY: 1 },
          {
            scaleY: 0,
            ease: "none",
            duration: 0.75,
          },
          staggerOffset
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-16 sm:h-24 md:h-32 overflow-hidden pointer-events-none select-none z-10 ${className}`}
      style={{ backgroundColor: resolvedTo }}
      aria-hidden="true"
    >
      {/* Stepped Columns Grid: 6 columns on mobile, 8 on sm, 10 on md+ */}
      <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 w-full h-full">
        {Array.from({ length: totalColumns }).map((_, i) => {
          // Responsive visibility: 6 on mobile, 8 on sm, 10 on md
          const isExtraSm = i >= 6 && i < 8;
          const isExtraMd = i >= 8;
          const responsiveClass = isExtraMd
            ? "hidden md:block"
            : isExtraSm
            ? "hidden sm:block"
            : "block";

          return (
            <div
              key={i}
              ref={(el) => {
                columnsRef.current[i] = el;
              }}
              className={`relative h-full origin-top will-change-transform ${responsiveClass}`}
              style={{
                backgroundColor: resolvedFrom,
                transform: "scaleY(1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
