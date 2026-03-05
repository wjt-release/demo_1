/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        beige: "rgb(var(--beige) / <alpha-value>)",
        navy: "rgb(var(--navy) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: ['"Cormorant Garamond"', '"Noto Serif SC"', '"Noto Sans SC"', "serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        float: "0 18px 50px rgba(0,0,0,0.14)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
