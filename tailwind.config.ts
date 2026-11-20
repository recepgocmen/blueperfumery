import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bordo: {
          DEFAULT: "#561726",
          deep: "#3b0f1a",
          mute: "#b07f88",
        },
        ivory: "#f6efe6",
        sand: "#eadfcf",
        gold: "#c9a45c",
        ink: {
          DEFAULT: "#2a1418",
          soft: "#6b4a50",
        },
      },
      fontFamily: {
        display: ["var(--font-bodoni)", "Didot", "Bodoni MT", "serif"],
        sans: ["var(--font-jost)", "Futura", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        pour: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        pour: {
          from: { clipPath: "inset(100% 0 0 0)" },
          to: { clipPath: "inset(0 0 0 0)" },
        },
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pour: "pour 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        fade: "fade 300ms cubic-bezier(0.16, 1, 0.3, 1) both",
        rise: "rise 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
