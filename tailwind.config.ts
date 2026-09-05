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
        canvas: {
          DEFAULT: "var(--canvas-bg)",
          muted: "var(--canvas-muted)",
          card: "var(--canvas-card)",
          dark: "var(--canvas-dark)",
          "dark-subtle": "var(--canvas-dark-subtle)",
        },
        ink: {
          DEFAULT: "var(--ink-primary)",
          secondary: "var(--ink-secondary)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
          inverted: "var(--ink-inverted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          electric: "var(--accent-electric)",
          ice: "var(--accent-ice)",
        },
      },
      borderColor: {
        editorial: "var(--border)",
        "editorial-dark": "var(--border-dark)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "Inter", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Instrument Serif", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
        "12xl": "14rem",
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        mega: "0.3em",
      },
      lineHeight: {
        tighter: "0.88",
        tight: "0.95",
      },
      borderWidth: {
        hairline: "0.5px",
      },
    },
  },
  plugins: [],
};

export default config;
