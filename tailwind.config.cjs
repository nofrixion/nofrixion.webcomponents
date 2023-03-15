/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        defaultText: '#00264D',
        greyText: '#73808C',
      },
    },
  },
  plugins: [],
};
