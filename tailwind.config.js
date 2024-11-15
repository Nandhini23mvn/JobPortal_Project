/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customgreen: '#00b074',
        dark: '#2B3940',
        lightgrey: '#666565',
        lightblue: '#EFFDF5' // Removed the extra semicolon
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        hebbo: ['Hebbo', 'sans-serif'],
      },
      fontSize: {
        '40xl': '40px',
        '15xl': '15px',
        '16xl': '16px',
      },
      fontWeight: {
        bold: 700,
        normal: 500,
        normal_1: 600,
      },
    },
  },
  plugins: [],
}
