/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: '#1A1A1A',
        secondary: '#6B6B6B',
        accent: {
          beige: '#E8E0D5',
          navy: '#1E3A5F',
        },
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
