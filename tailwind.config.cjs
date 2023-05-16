/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainGrey: '#F6F8F9',
        defaultText: '#00264D',
        greyText: '#73808C',
        controlGrey: '#8F99A3',
        controlGreyHover: '#454D54',
        negativeRed: '#F32448',
        highlightedNegativeRed: '#FF6681',
        darkerNegativeRed: '#DA0C30',
        greyBg: '#EDF2F7',
        positiveActionBackground: '#40BFBF',
        negativeActionBackground: '#E9EDF1',
        greenText: '#05C786',
        primaryGreen: '#40BFBF',
        primaryGreenHover: '#00807F',
        borderGrey: '#D5DBDD',
        errorBg: '#FEE7EB',
      },
      fontSize: {
        '13px': '0.8125rem',
      },
    },
  },
  plugins: [],
};
