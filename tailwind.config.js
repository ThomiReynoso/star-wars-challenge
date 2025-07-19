/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Star Wars themed colors
        'sith-red': '#FF0000',
        'jedi-blue': '#0066CC',
        'empire-gray': '#2C2C2C',
        'rebel-orange': '#FF8800',
      },
      fontFamily: {
        'starjedi': ['Star Jedi', 'sans-serif'],
      }
    },
  },
  plugins: [],
}