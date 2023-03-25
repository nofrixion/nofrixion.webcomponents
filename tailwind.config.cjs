/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        defaultText: '#00264D',
        greyText: '#73808C',
        controlGrey: '#8F99A3',
        controlGreyHover: '#454D54',
        redText: '#F32448',
        highlightedRedText: '#FF6681',
        greyBg: '#EDF2F7',
        greenText: '#05C786',
      },
      fontSize: {
        '13px': '0.8125rem',
      },
    },
  },
  plugins: [],
};
