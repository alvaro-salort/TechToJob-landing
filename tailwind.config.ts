import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#2f3436",
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
    },
  },
  plugins: [],
};

export default config;
