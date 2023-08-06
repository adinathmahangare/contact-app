/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: " #212f3d ",
        yellow : "#40E0D0",
        "dark-yellow": " #148ddd",
        orange: "#0369ad",
      }
    },
  },
  plugins: [],
}