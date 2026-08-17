import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // InternNow palette — confident, modern, "career" feel.
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b7ceff",
          300: "#8aabff",
          400: "#5b81f7",
          500: "#3a5ce8",
          600: "#2a44c9",
          700: "#2337a1",
          800: "#213280",
          900: "#1f2f66",
        },
        accent: {
          400: "#ffb44d",
          500: "#ff9e1b",
          600: "#e5850a",
        },
        ink: {
          DEFAULT: "#0f1729",
          soft: "#3a4358",
          muted: "#69728a",
        },
        paper: "#f7f8fc",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 6px 20px -8px rgba(15, 23, 41, 0.15)",
        card: "0 12px 34px -14px rgba(15, 23, 41, 0.25)",
        pop: "0 18px 44px -16px rgba(58, 92, 232, 0.4)",
      },
      borderRadius: {
        xl2: "1.1rem",
        xl3: "1.6rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
