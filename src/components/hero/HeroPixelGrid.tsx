"use client";

import React, { useEffect, useRef } from "react";

interface HeroPixelGridProps {
  className?: string;
  cellSize?: number;
  direction?: "top" | "bottom";
}

interface FloatingPixel {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function HeroPixelGrid({
  className = "",
  cellSize = 11,
  direction = "top",
}: HeroPixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const context: CanvasRenderingContext2D = ctx;

    let animFrameId: number;
    const cell = cellSize;
    const s = cell - 1; // 1px gutter between cells
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let heat = new Float32Array(0);
    const SEED = Math.random() * 1000;
    let t = 0;
    let lastTime = 0;

    // Compact cursor brush (subtle, sleek trail)
    let mx = -1;
    let my = -1;
    let pmx = -1;
    let pmy = -1;
    const BRUSH = 1.8;

    // Headline safe zone (ensures 100% legibility of the white H1 text)
    let headSafe = { left: 0, right: 0, top: 0, bottom: 0, active: false };

    // Discord CTA button tracking for subtle floating pixel droplets on hover
    let isBtnHovered = false;
    let btnSafe = { left: 0, right: 0, top: 0, bottom: 0, active: false };
    const floatingPixels: FloatingPixel[] = [];

    // Pseudo-random 2D hash (from heroinspo)
    function hsh(c: number, r: number): number {
      const n = Math.sin(c * 127.1 + r * 311.7 + SEED * 0.13) * 43758.5453;
      return n - Math.floor(n);
    }

    // 2D base noise field
    function base(nx: number, ny: number, tt: number): number {
      const sVal = SEED;
      nx += Math.sin(ny * 5 + tt * 0.5 + sVal) * 0.05;
      ny += Math.cos(nx * 5 - tt * 0.4) * 0.05;
      const v =
        Math.sin(nx * 5.6 + sVal * 1.3 + tt * 0.3) *
          Math.cos(ny * 4.7 - sVal * 0.7 + tt * 0.22) +
        Math.sin((nx * 1.4 + ny * 1.7) * 4.1 - sVal + tt * 0.16) +
        Math.sin(ny * 9 + sVal * 2.1 + nx * 3) * 0.5 +
        Math.sin(nx * 13 - sVal * 1.7) * 0.28;
      return 0.5 + 0.5 * (v / 2.55);
    }

    // Low-frequency clustering region
    function region(nx: number, ny: number, tt: number): number {
      return (
        0.5 +
        0.5 *
          Math.sin(nx * 2.1 + tt * 0.12 + SEED * 0.7) *
          Math.cos(ny * 1.8 - tt * 0.09 + SEED * 0.3)
      );
    }

    // Deposit heat onto grid cells around a point
    function dep(x: number, y: number, amt: number, sig: number) {
      const cc = x / cell;
      const cr = y / cell;
      const rad = Math.max(1, Math.ceil(sig * 1.3));
      const inv = 1 / (2 * sig * sig * 0.3);

      for (let dr = -rad; dr <= rad; dr++) {
        for (let dc = -rad; dc <= rad; dc++) {
          const c = (cc + dc) | 0;
          const r = (cr + dr) | 0;
          if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
          const dx = c + 0.5 - cc;
          const dy = r + 0.5 - cr;
          const w = Math.exp(-(dx * dx + dy * dy) * inv);
          if (w < 0.03) continue;
          const id = r * cols + c;
          const vv = heat[id] + amt * w;
          heat[id] = vv > 1 ? 1 : vv;
        }
      }
    }

    // Continuous brush stroke interpolation along mouse movement
    function follow(x: number, y: number, sig: number) {
      if (pmx < 0) {
        pmx = x;
        pmy = y;
      }
      const dx = x - pmx;
      const dy = y - pmy;
      const dl = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.min(24, Math.round(dl / (cell * 0.8))));
      for (let sIdx = 1; sIdx <= steps; sIdx++) {
        const f = sIdx / steps;
        dep(pmx + dx * f, pmy + dy * f, 0.32, sig);
      }
      pmx = x;
      pmy = y;
    }

    const parentSection = canvas.closest("section") || canvas.parentElement;

    function updateElementsBounding() {
      if (!canvas) return;
      const cr = canvas.getBoundingClientRect();

      // Heading safe zone (H1 or H2)
      const heading = parentSection?.querySelector("h1") || parentSection?.querySelector("h2");
      if (heading) {
        const hr = heading.getBoundingClientRect();
        headSafe = {
          left: hr.left - cr.left - 24,
          right: hr.right - cr.left + 24,
          top: hr.top - cr.top - 18,
          bottom: hr.bottom - cr.top + 18,
          active: true,
        };
      }

      // Discord button bounds (hero or closing section)
      const btn = (parentSection?.querySelector("#hero-discord-cta") ||
        parentSection?.querySelector("#closing-discord-cta")) as HTMLElement | null;
      if (btn) {
        const br = btn.getBoundingClientRect();
        btnSafe = {
          left: br.left - cr.left,
          right: br.right - cr.left,
          top: br.top - cr.top,
          bottom: br.bottom - cr.top,
          active: true,
        };
      }
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      context.setTransform(DPR, 0, 0, DPR, 0, 0);

      cols = Math.ceil(W / cell) + 1;
      rows = Math.ceil(H / cell) + 1;
      heat = new Float32Array(cols * rows);

      updateElementsBounding();
    }

    resize();
    window.addEventListener("resize", resize);

    // Track mouse over hero section
    const handlePointerMove = (e: PointerEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const curX = e.clientX - rect.left;
      const curY = e.clientY - rect.top;

      if (curX >= 0 && curX <= W && curY >= 0 && curY <= H) {
        mx = curX;
        my = curY;
        follow(mx, my, BRUSH);
      }
    };

    const handlePointerLeave = () => {
      mx = -1;
      my = -1;
      pmx = -1;
      pmy = -1;
    };

    const targetEl = parentSection || window;
    targetEl.addEventListener("pointermove", handlePointerMove as EventListener);
    targetEl.addEventListener("pointerleave", handlePointerLeave as EventListener);

    // Discord button hover listeners (no rectangle, only scattered floating pixels)
    const btnEl = (parentSection?.querySelector("#hero-discord-cta") ||
      parentSection?.querySelector("#closing-discord-cta")) as HTMLElement | null;
    const handleBtnEnter = () => {
      isBtnHovered = true;
      updateElementsBounding();
    };
    const handleBtnLeave = () => {
      isBtnHovered = false;
    };

    if (btnEl) {
      btnEl.addEventListener("mouseenter", handleBtnEnter);
      btnEl.addEventListener("mouseleave", handleBtnLeave);
    }

    // Stealthy, sophisticated dark canopy bands (deep slates, steel, no harsh pure white)
    const CANOPY_BANDS: [number, string][] = [
      [0.26, "#0f1720"], // Deep subtle slate
      [0.42, "#1a2835"], // Dark slate
      [0.58, "#283c4e"], // Mid steel slate
      [0.72, "#415d73"], // Muted teal-slate
      [0.86, "#6b8b9f"], // Soft slate highlight
    ];

    // Heat color palette for cursor interaction (TechToJob brand teal glow)
    function getHeatColor(v: number): string {
      if (v > 0.8) return "#ffffff"; // Peak center white
      if (v > 0.58) return "#a5dedd"; // Bright mint cyan
      if (v > 0.35) return "#84c0bf"; // Brand primary teal
      if (v > 0.18) return "#356a73"; // Deep teal
      return "#16333a"; // Subtle dark teal
    }

    function render(now: number) {
      if (!lastTime) lastTime = now;
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      t += dt;
      const tt = t * 0.0007;

      // Dissipate heat smoothly
      for (let i = 0; i < heat.length; i++) {
        heat[i] *= 0.84;
        if (heat[i] < 0.003) heat[i] = 0;
      }

      context.clearRect(0, 0, W, H);

      // 1. Subtle hairline grid
      context.strokeStyle = "rgba(255, 255, 255, 0.025)";
      context.lineWidth = 1;
      context.beginPath();
      for (let gx = 0; gx <= W; gx += cell) {
        context.moveTo(gx + 0.5, 0);
        context.lineTo(gx + 0.5, H);
      }
      for (let gy = 0; gy <= H; gy += cell) {
        context.moveTo(0, gy + 0.5);
        context.lineTo(W, gy + 0.5);
      }
      context.stroke();

      // 2. Discord CTA Button Hover: Scattered floating pixels ONLY (No hard rectangular frame)
      if (isBtnHovered && btnSafe.active) {
        // Spawn a few subtle floating pixel droplets drifting around the button
        if (Math.random() < 0.32 && floatingPixels.length < 12) {
          const edge = Math.floor(Math.random() * 4);
          let spawnX = btnSafe.left;
          let spawnY = btnSafe.top;
          let pvx = (Math.random() - 0.5) * 1.0;
          let pvy = (Math.random() - 0.5) * 1.0;

          if (edge === 0) {
            // Top: drift gently upward
            spawnX = btnSafe.left + Math.random() * (btnSafe.right - btnSafe.left);
            spawnY = btnSafe.top - 2 - Math.random() * 8;
            pvy = -(Math.random() * 1.2 + 0.4);
          } else if (edge === 1) {
            // Bottom: drift gently downward
            spawnX = btnSafe.left + Math.random() * (btnSafe.right - btnSafe.left);
            spawnY = btnSafe.bottom + 2 + Math.random() * 8;
            pvy = Math.random() * 1.2 + 0.4;
          } else if (edge === 2) {
            // Left: drift outward
            spawnX = btnSafe.left - 2 - Math.random() * 8;
            spawnY = btnSafe.top + Math.random() * (btnSafe.bottom - btnSafe.top);
            pvx = -(Math.random() * 1.2 + 0.4);
          } else {
            // Right: drift outward
            spawnX = btnSafe.right + 2 + Math.random() * 8;
            spawnY = btnSafe.top + Math.random() * (btnSafe.bottom - btnSafe.top);
            pvx = Math.random() * 1.2 + 0.4;
          }

          const colors = ["#84c0bf", "#a5dedd", "#cbd5e1", "#5ca3a2"];
          floatingPixels.push({
            x: spawnX,
            y: spawnY,
            vx: pvx,
            vy: pvy,
            life: 1,
            maxLife: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }

      // Render floating pixel droplets around button
      for (let pIdx = floatingPixels.length - 1; pIdx >= 0; pIdx--) {
        const fp = floatingPixels[pIdx];
        fp.x += fp.vx;
        fp.y += fp.vy;
        fp.life -= 0.03;

        if (fp.life <= 0) {
          floatingPixels.splice(pIdx, 1);
          continue;
        }

        const snappedX = Math.round(fp.x / cell) * cell;
        const snappedY = Math.round(fp.y / cell) * cell;

        context.save();
        context.globalAlpha = Math.max(0, fp.life * 0.9);
        context.fillStyle = fp.color;
        context.fillRect(snappedX, snappedY, s, s);
        context.restore();
      }

      // 3. Render Stalactite Canopy
      // Reaches MUCH deeper at the borders/edges (left & right), staying high in the center above H1
      for (let r = 0; r < rows; r++) {
        const vy = r * cell;
        const ny = vy / H;

        for (let c = 0; c < cols; c++) {
          const vx = c * cell;
          const nx = vx / W;
          const id = r * cols + c;
          const heatVal = heat[id];

          // Check if inside heading safe zone
          if (
            headSafe.active &&
            vx >= headSafe.left &&
            vx <= headSafe.right &&
            vy >= headSafe.top &&
            vy <= headSafe.bottom
          ) {
            // Clear canopy completely behind the H1 text
            if (heatVal > 0.05) {
              context.fillStyle = getHeatColor(heatVal);
              context.fillRect(vx, vy, s, s);
            }
            continue;
          }

          // Flank canopy curve:
          // Center (nx = 0.5): ~75px height (stays completely above the H1)
          // Borders (nx = 0 or 1): drops deeply down (up to ~360px - 420px)
          const distFromCenter = Math.abs(nx - 0.5) * 2; // 0 to 1
          const flankFactor = Math.pow(distFromCenter, 1.7); // smooth non-linear curve
          const maxCanopyH = Math.min(H * 0.72, 75 + flankFactor * 320);
          const canopyEnd = maxCanopyH * 0.35;
          const fadeSpan = Math.max(1, maxCanopyH * 0.55);

          // Organic stalactite drip waves
          const colWave =
            (Math.sin(c * 0.38 + SEED) + Math.sin(c * 0.16 - SEED * 1.3)) * 0.22 +
            hsh(Math.floor(c / 2) + 3.3, Math.floor(r / 3)) * 0.55 +
            0.12;
          const effDist = direction === "bottom" ? H - vy : vy;
          const depth = effDist + colWave * 60;
          const regThr =
            depth <= canopyEnd ? 0 : Math.min(1, (depth - canopyEnd) / fadeSpan);

          let canopyActive = false;
          let canopyVal = 0;

          if (depth < maxCanopyH + 30) {
            const reg = region(nx, ny, tt);
            if (reg > regThr) {
              canopyVal =
                base(nx, ny, tt) +
                (hsh(c, r) - 0.5) * 0.14 +
                Math.sin((c * 0.5 + r * 0.7) + tt * 1.4) * 0.04;

              // Soften outer boundary row so there is never an artificial horizontal stripe
              const isBoundaryRow =
                direction === "bottom" ? r === rows - 1 : r === 0;
              if (isBoundaryRow) canopyVal *= 0.65;

              if (canopyVal >= CANOPY_BANDS[0][0]) {
                canopyActive = true;
              }
            }
          }

          // Render cursor heat first
          if (heatVal > 0.04) {
            context.fillStyle = getHeatColor(heatVal);
            context.fillRect(vx, vy, s, s);
          } else if (canopyActive) {
            let col = CANOPY_BANDS[0][1];
            if (canopyVal >= CANOPY_BANDS[1][0]) col = CANOPY_BANDS[1][1];
            if (canopyVal >= CANOPY_BANDS[2][0]) col = CANOPY_BANDS[2][1];
            if (canopyVal >= CANOPY_BANDS[3][0]) col = CANOPY_BANDS[3][1];
            if (canopyVal >= CANOPY_BANDS[4][0]) col = CANOPY_BANDS[4][1];

            // Rare subtle teal spark in canopy (~3% chance)
            if (canopyVal > 0.84 && hsh(c + 17.2, r + 9.4) < 0.05) {
              col = "#5ea6a5";
            }

            context.fillStyle = col;
            context.fillRect(vx, vy, s, s);
          }
        }
      }

      animFrameId = requestAnimationFrame(render);
    }

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      targetEl.removeEventListener("pointermove", handlePointerMove as EventListener);
      targetEl.removeEventListener("pointerleave", handlePointerLeave as EventListener);
      if (btnEl) {
        btnEl.removeEventListener("mouseenter", handleBtnEnter);
        btnEl.removeEventListener("mouseleave", handleBtnLeave);
      }
    };
  }, [cellSize, direction]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
