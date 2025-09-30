/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        red: {
          600: '#dc2626',
          700: '#991b1b',
        },
        zinc: {
          950: '#09090b',
          900: '#18181b',
          800: '#27272a',
          700: '#3f3f46',
          600: '#52525b',
          500: '#71717a',
          400: '#a1a1aa',
          300: '#d4d4d8',
          200: '#e4e4e7',
          100: '#f4f4f5',
        }
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(220, 38, 38, 0.5)',
      }
    },
  },
  plugins: [],
};