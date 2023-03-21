/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        defaultText: '#00264D',
        greyText: '#73808C',
        redText: '#F32448',
        greyBg: '#EDF2F7',
      },
      fontSize: {
        '13px': '0.8125rem',
      },
    },
  },
  plugins: [],
};
