"use client";

import React, { useEffect, useRef, useCallback } from "react";

/**
 * AsciiHandsCanvas
 * ================
 * Renders two hands (Creation of Adam) as native ASCII / halftone art
 * on two independent <canvas> elements, driven by the actual pixel data
 * of `/images/hands.jpg`.
 *
 * - The image is split in half horizontally to isolate each hand.
 * - Scroll-driven parallax moves the canvases via GPU-accelerated transforms.
 * - The expensive ASCII render runs only on mount / resize — NOT on every scroll frame.
 */

// ── ASCII ramp & colour palette ──────────────────────────────────────
const ASCII_RAMP = " .:-=+*#%X8@";

function lumaToChar(luma: number): string {
  const idx = Math.min(
    Math.floor(luma * (ASCII_RAMP.length - 1)),
    ASCII_RAMP.length - 1
  );
  return ASCII_RAMP[idx];
}

function lumaToColor(luma: number): string {
  if (luma > 0.65) return "#ffffff";
  if (luma > 0.35) return "#38bdf8";
  return "#0284c7";
}

// ── Find vertical content bounds for a slice of the image ────────────
// Scans for the first and last rows that contain visible (non-black) pixels
// within a horizontal slice [offsetX .. offsetX+sliceW).
function findContentBoundsY(
  data: Uint8ClampedArray,
  fullW: number,
  fullH: number,
  offsetX: number,
  sliceW: number
): { minY: number; maxY: number } {
  let minY = fullH;
  let maxY = 0;
  const step = 4; // sample every 4th column for speed

  for (let y = 0; y < fullH; y++) {
    for (let x = offsetX; x < offsetX + sliceW; x += step) {
      const idx = (y * fullW + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      if (a < 20) continue;
      const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (luma > 0.08) {
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        break; // found content on this row, skip to next
      }
    }
  }

  // Add a small padding (2% of range on each side)
  const range = maxY - minY;
  const pad = Math.floor(range * 0.02);
  return {
    minY: Math.max(0, minY - pad),
    maxY: Math.min(fullH, maxY + pad + 1),
  };
}

// ── Render one half of the image as ASCII onto a canvas ──────────────
function renderAscii(
  canvas: HTMLCanvasElement,
  imageData: ImageData,
  srcWidth: number,
  srcOffsetX: number,
  srcSliceW: number,
  srcMinY: number,    // cropped top (content start)
  srcMaxY: number,    // cropped bottom (content end)
  targetW: number,
  maxH: number
) {
  const dpr = window.devicePixelRatio || 1;
  const isMobile = window.innerWidth < 768;
  const cellSize = isMobile ? 3.5 : 5;

  const croppedH = srcMaxY - srcMinY;

  // How many ASCII columns fit in the target width?
  const asciiCols = Math.floor(targetW / cellSize);
  // Aspect ratio of the CROPPED region only
  const aspect = croppedH / srcSliceW;
  const naturalH = Math.floor(asciiCols * aspect) * cellSize;
  const logicalW = asciiCols * cellSize;
  const logicalH = Math.min(naturalH, maxH);
  const asciiRows = Math.floor(logicalH / cellSize);

  canvas.width = Math.round(logicalW * dpr);
  canvas.height = Math.round(logicalH * dpr);
  canvas.style.width = `${logicalW}px`;
  canvas.style.height = `${logicalH}px`;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, logicalW, logicalH);
  ctx.textBaseline = "top";
  ctx.font = `bold ${cellSize}px monospace`;

  const data = imageData.data;
  const fullW = srcWidth;

  for (let row = 0; row < asciiRows; row++) {
    for (let col = 0; col < asciiCols; col++) {
      // Map to the CROPPED source region
      const sx = srcOffsetX + Math.floor(col * (srcSliceW / asciiCols));
      const sy = srcMinY + Math.floor(row * (croppedH / asciiRows));
      const idx = (sy * fullW + sx) * 4;

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a < 20) continue;

      const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      if (luma < 0.08) continue;

      // Halftone / dithering on dark edges
      if (luma < 0.22 && Math.random() > luma * 3.5) continue;

      const ch = lumaToChar(luma);
      if (ch === " ") continue;

      ctx.fillStyle = lumaToColor(luma);
      ctx.fillText(ch, col * cellSize, row * cellSize);
    }
  }
}

// ── React component ──────────────────────────────────────────────────
export function AsciiHandsCanvas() {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftWrapRef = useRef<HTMLDivElement>(null);
  const rightWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // ── Draw both canvases ──────────────────────────────────────────
  const drawAll = useCallback(() => {
    const img = imageRef.current;
    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    if (!img || !leftCanvas || !rightCanvas) return;

    // Sample all pixels once via an offscreen canvas
    const offscreen = document.createElement("canvas");
    offscreen.width = img.naturalWidth;
    offscreen.height = img.naturalHeight;
    const octx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!octx) return;
    octx.drawImage(img, 0, 0);
    const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height);

    const halfW = Math.floor(img.naturalWidth / 2);

    // Auto-crop: find content bounds for each hand
    const leftBounds = findContentBoundsY(
      imgData.data, img.naturalWidth, img.naturalHeight, 0, halfW
    );
    const rightBounds = findContentBoundsY(
      imgData.data, img.naturalWidth, img.naturalHeight, halfW, img.naturalWidth - halfW
    );

    // On mobile: render HUGE (150% vw) so the fingertip area is large
    // and detailed — most of the canvas stays off-screen via parallax.
    // On desktop: ~45% vw per hand.
    const vw = window.innerWidth;
    const isMobile = vw < 768;
    const targetW = vw * (isMobile ? 1.5 : 0.45);

    // Clamp canvas height to fit inside the hero container
    // Hero heights: 320px (<640), 420px (sm), 480px (md), 540px (lg+)
    const containerH = vw >= 1024 ? 540 : vw >= 768 ? 480 : vw >= 640 ? 420 : 320;
    // On mobile allow taller canvas since most is off-screen
    const maxH = isMobile ? containerH * 1.4 : containerH * 0.85;

    // Left hand
    renderAscii(
      leftCanvas,
      imgData,
      img.naturalWidth,
      0,
      halfW,
      leftBounds.minY,
      leftBounds.maxY,
      targetW,
      maxH
    );

    // Right hand
    renderAscii(
      rightCanvas,
      imgData,
      img.naturalWidth,
      halfW,
      img.naturalWidth - halfW,
      rightBounds.minY,
      rightBounds.maxY,
      targetW,
      maxH
    );
  }, []);

  // ── On mount: load image, render, wire scroll ────────────────────
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/hands.jpg";
    imageRef.current = img;

    const onLoad = () => drawAll();
    img.addEventListener("load", onLoad);

    // Re-render on resize (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAll, 150);
    };
    window.addEventListener("resize", onResize);

    // ── Scroll parallax (GPU-only, no ASCII recalc) ──────────────
    // Large offset so at scroll=0 only fingertips peek in from the sides.
    // By the time the user scrolls ~400px (to the Discord CTA) the hands
    // are at full position (translateX = 0).
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = 400;
        const rawProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        // easeOutCubic for smooth glide
        const progress = 1 - Math.pow(1 - rawProgress, 3);

        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const vw = window.innerWidth;

        // Mobile: canvas is 150% vw, so offset=1.4*vw leaves only ~0.1*vw (≈40px)
        // peeking at scroll=0. At max scroll, gap=1.1*vw shows ~0.4*vw of fingertips.
        const offset = isMobile ? vw * 1.4 : isTablet ? 280 : 360;
        const gap    = isMobile ? vw * 1.1 : isTablet ? 50 : 70;

        // from -offset → -gap  (left) and +offset → +gap (right)
        const leftX = -offset + (offset - gap) * progress;
        const rightX = offset - (offset - gap) * progress;

        // Mobile: position lower (below button); Desktop: align fingertips with button
        const translateY = isMobile ? "-35%" : "-65%";

        if (leftWrapRef.current) {
          leftWrapRef.current.style.transform = `translateX(${leftX}px) translateY(${translateY})`;
        }
        if (rightWrapRef.current) {
          rightWrapRef.current.style.transform = `translateX(${rightX}px) translateY(${translateY})`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial position
    onScroll();

    return () => {
      img.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(resizeTimer);
    };
  }, [drawAll]);

  return (
    <>
      {/* Left hand – flush to left edge, fingertips aligned with CTA height */}
      <div
        ref={leftWrapRef}
        className="absolute left-0 top-1/2 flex items-center justify-end pointer-events-none z-10"
        style={{ willChange: "transform", transform: "translateY(-65%)" }}
        aria-hidden="true"
      >
        <canvas
          ref={leftCanvasRef}
          className="block drop-shadow-[0_0_30px_rgba(56,189,248,0.15)]"
        />
      </div>

      {/* Right hand – flush to right edge, fingertips aligned with CTA height */}
      <div
        ref={rightWrapRef}
        className="absolute right-0 top-1/2 flex items-center justify-start pointer-events-none z-10"
        style={{ willChange: "transform", transform: "translateY(-65%)" }}
        aria-hidden="true"
      >
        <canvas
          ref={rightCanvasRef}
          className="block drop-shadow-[0_0_30px_rgba(56,189,248,0.15)]"
        />
      </div>
    </>
  );
}
