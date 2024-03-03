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
        yellow : "#fef08a",
        "dark-yellow": " #148ddd",
        orange: "#4c0519",
      }
    },
  },
  plugins: [],
}