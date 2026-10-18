import type { Config } from "tailwindcss";

export default {
  content: { relative: true, files: ["./index.html", "./src/**/*.{ts,tsx}"] },
  theme: {
    extend: {
      fontFamily: {
        display: ["Montserrat", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        paper: "#f4f4f5",
        ink: "#0a0a0a",
        lavender: "#d9d0fb",
        mint: "#c8eed9",
        peach: "#f6c9b4",
        rose: "#f2a7c3",
      },
    },
  },
  plugins: [],
} satisfies Config;
