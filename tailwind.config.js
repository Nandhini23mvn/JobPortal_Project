/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customgreen: '#00B074', 
        customblack:'#2B3940',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        hebbo:['Hebbo', 'sans-serif']
      },
      fontSize: {
        '40xl': '40px',
        '10xl': '10px'
      },
      fontWeight: {
        bold: 700,
        normal:500
      },
    },
  },
  plugins: [],
}
