import React from "react";

interface HalftonePatternProps {
  className?: string;
  density?: "sparse" | "normal" | "dense";
  color?: "dark" | "teal" | "white";
  width?: number | string;
  height?: number | string;
}

export function HalftonePattern({
  className = "",
  density = "normal",
  color = "dark",
  width = "100%",
  height = "100%",
}: HalftonePatternProps) {
  const dotSize = density === "sparse" ? 1 : density === "normal" ? 1.5 : 2;
  const spacing = density === "sparse" ? 16 : density === "normal" ? 12 : 8;

  const fill =
    color === "dark"
      ? "#2f3436"
      : color === "teal"
      ? "#84c0bf"
      : "rgba(255, 255, 255, 0.4)";

  const patternId = `halftone-pattern-${density}-${color}`;

  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={spacing / 2} cy={spacing / 2} r={dotSize} fill={fill} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
