/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customgreen: '#00B074', 
        dark:'#2B3940',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        hebbo:['Hebbo', 'sans-serif']
      },
      fontSize: {
        '40xl': '40px',
        '15xl': '15px',
        '16xl': '16xl'
      },
      fontWeight: {
        bold: 700,
        normal:500,
        normal_1:600,
        arrow:700
      },
    },
  },
  plugins: [],
}
