/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //these fonts will be used within the app(imported in index.html)
      fontFamily:{
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],

      }
    },
  },
  plugins: [],
}