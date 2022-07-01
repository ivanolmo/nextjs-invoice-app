const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      emerald: {
        400: '#33d69f',
      },
      gray: {
        200: '#f0f1f4',
        800: '#141625',
        900: '#0c0e16',
      },
      indigo: {
        100: '#dfe3fa',
        400: '#7e88c3',
      },
      orange: {
        500: '#ff8f00',
      },
      red: {
        300: '#ff9797',
        500: '#ec5757',
      },
      slate: {
        400: '#888eb0',
        500: '#777f98',
        600: '#494e6e',
        700: '#373b53',
        800: '#252945',
        900: '#1e2139',
      },
      violet: {
        50: '#f8f8fb',
        400: '#9277ff',
        500: '#7c5dfa',
      },
      gradient: 'rgba(0, 0, 0, 0.7)',
    },
    lineHeight: {
      zero: '0',
      normal: '1.5',
      medium: '1.6',
      large: '1.8',
    },
    extend: {},
  },
  plugins: [],
};
