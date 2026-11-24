import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sampled from the owner's printed label photos (Nov 2026); re-tune here.
        brand: {
          DEFAULT: "#152468",
          deep: "#0e1747",
          mute: "#919dd6",
        },
        // Warm neutrals, in the gold's family: paper (text on blue, ivory buttons,
        // the floating Mira sheet), ground (page base), sand (alternating bands).
        ivory: "#f9f4e8",
        ground: "#f3ecdc",
        sand: "#e8dcc0",
        gold: {
          DEFAULT: "#e2cd7c",
          light: "#f3e6b4",
          deep: "#c2a54a",
          ink: "#8a7226",
        },
        ink: {
          DEFAULT: "#1c2550",
          soft: "#485278",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Bodoni MT", "Didot", "serif"],
        sans: ["var(--font-jost)", "Futura", "system-ui", "sans-serif"],
      },
      // Motion tokens: tune here and in the :root variables in globals.css.
      transitionTimingFunction: {
        pour: "var(--ease-settle)",
      },
      transitionDuration: {
        quick: "var(--dur-quick)",
        enter: "var(--dur-enter)",
        slow: "var(--dur-slow)",
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
        settle: {
          from: { transform: "scale(1.06)" },
          to: { transform: "scale(1)" },
        },
        drift: {
          from: { transform: "scale(1) translate3d(0, 0, 0)" },
          to: { transform: "scale(1.045) translate3d(-1%, -0.6%, 0)" },
        },
        sheen: {
          from: { backgroundPosition: "100% 0" },
          to: { backgroundPosition: "0% 0" },
        },
        rule: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        lift: {
          from: { transform: "translateY(24px)" },
          to: { transform: "translateY(0)" },
        },
        glint: {
          "0%, 100%": { opacity: "0.25" },
          "40%": { opacity: "1" },
        },
      },
      animation: {
        pour: "pour var(--dur-slow) var(--ease-settle) both",
        fade: "fade var(--dur-quick) var(--ease-settle) both",
        rise: "rise var(--dur-enter) var(--ease-settle) both",
        settle: "settle 1400ms var(--ease-settle) both",
        drift: "drift var(--dur-drift) ease-in-out 1400ms infinite alternate",
        sheen: "sheen 1600ms var(--ease-settle) 300ms",
        rule: "rule var(--dur-enter) var(--ease-settle) both",
        glint: "glint 1200ms ease-in-out infinite",
        lift: "lift 450ms var(--ease-settle) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
