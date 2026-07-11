import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#102033",
        paper: "#f8f7f3",
        line: "#d9dee3",
        moss: "#2f6f6a",
        brass: "#6f7f8f",
        oxford: "#0b1726",
        slate: "#536273",
        mist: "#eef2f4",
        ivory: "#fffdf8"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
