import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        accent: {
          primary: "#7F77DD",
          secondary: "#1D9E75",
          highlight: "#EF9F27",
        },
        text: {
          primary: "#F0EFE8",
          muted: "#8A8880",
        },
        surface: {
          DEFAULT: "#12121A",
          elevated: "#1A1A24",
          border: "#2A2A36",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(127, 119, 221, 0.25)",
        "glow-teal": "0 0 20px rgba(29, 158, 117, 0.25)",
        "glow-amber": "0 0 20px rgba(239, 159, 39, 0.2)",
      },
      animation: {
        bounce: "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
