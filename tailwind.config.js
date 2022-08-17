/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "turbo-pink": {
          DEFAULT: "#D7004D",
          50: "#FF90B7",
          100: "#FF7BAA",
          200: "#FF5290",
          300: "#FF2A76",
          400: "#FF015C",
          500: "#D7004D",
          600: "#9F0039",
          700: "#670025",
          800: "#2F0011",
          900: "#000000",
        }
      },
    },
  },
  plugins: [],
}