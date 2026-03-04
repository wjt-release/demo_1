/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#333333",
        accent: "#000080", // Navy Blue
        beige: "#F5F5DC",
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
