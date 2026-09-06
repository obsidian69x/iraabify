/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        siliguri: ['"Hind Siliguri"', 'sans-serif'],
        amiri: ['"Amiri"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        ruqaa: ['"Aref Ruqaa"', 'serif']
      },
      colors: {
        parchment: "#f4ecdc",
        royalGold: "#9b722b",
        darkGold: "#614614",
        antiqueBorder: "#c7b299",
        ornateBorder: "#8c6d46"
      }
    },
  },
  plugins: [],
}
