import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#2f3436",
          darker: "#232729",
          charcoal: "#383f41",
          teal: "#84c0bf",
          tealHover: "#6eafae",
          tealLight: "#e9f5f5",
          tealMuted: "#bde0df",
          white: "#ffffff",
          surface: "#f8fafb",
          border: "#e2e8ea",
          borderDark: "#434b4e",
          grayText: "#657277",
          grayMuted: "#8e9c9f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        halftone: "4px 4px 0px #2f3436",
        "halftone-sm": "2px 2px 0px #2f3436",
        "halftone-teal": "4px 4px 0px #84c0bf",
        "halftone-teal-sm": "2px 2px 0px #84c0bf",
        "halftone-hover": "6px 6px 0px #2f3436",
      },
      backgroundImage: {
        "halftone-dots": "radial-gradient(circle, #2f3436 1.2px, transparent 1.2px)",
        "halftone-dots-teal": "radial-gradient(circle, #84c0bf 1.2px, transparent 1.2px)",
        "halftone-dots-dense": "radial-gradient(circle, #2f3436 1.8px, transparent 1.8px)",
        "halftone-dots-white": "radial-gradient(circle, rgba(255, 255, 255, 0.25) 1.2px, transparent 1.2px)",
      },
      backgroundSize: {
        "dot-sm": "8px 8px",
        "dot-md": "12px 12px",
        "dot-lg": "16px 16px",
      },
    },
  },
  plugins: [],
};

export default config;
