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
        primary: {
          DEFAULT: '#00d4aa',
          dark: '#00b894',
          light: '#00ffcc',
        },
        dark: {
          DEFAULT: '#0a0a0f',
          lighter: '#12121a',
          card: '#1a1a24',
          border: '#2a2a3a',
        },
        accent: {
          cyan: '#00d4aa',
          blue: '#00a8ff',
          purple: '#9b59b6',
        }
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4aa, 0 0 10px #00d4aa, 0 0 15px #00d4aa' },
          '100%': { boxShadow: '0 0 10px #00d4aa, 0 0 20px #00d4aa, 0 0 30px #00d4aa' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(0, 212, 170, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 170, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
};
