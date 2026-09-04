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
          DEFAULT: "#F5F4EF",
          muted: "#ECEAE2",
          dark: "#0B0C0E",
          "dark-subtle": "#121418",
        },
        ink: {
          DEFAULT: "#0D0E11",
          secondary: "#484A54",
          muted: "#7A7D8A",
          faint: "#A5A8B5",
          inverted: "#F5F4EF",
        },
        accent: {
          DEFAULT: "#1D4ED8",
          electric: "#2563EB",
          ice: "#60A5FA",
        },
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
