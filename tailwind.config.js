/** @type {import('tailwindcss').Config} */

var colors = require('tailwindcss/colors');

colors.primary = {
  base: '#00bcd4',
  '50': '#a3e9ec',
  '100': '#80e8eb',
  '200': '#4de4e7',
  '300': '#26d9e2',
  '400': '#00cedb',
  '500': '#00bbc4',
  '600': '#00a3ad',
  '700': '#008b97',
  '800': '#00727f',
  '900': '#00585f',
}

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: colors,
  },
  plugins: [],
}

