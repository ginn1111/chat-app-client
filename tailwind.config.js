const colors = require('./src/themes/colors.js');
const spacing = require('./src/themes/spacing.js');
const borderRadius = require('./src/themes/border-radius.js');
const fontWeight = require('./src/themes/font-weight.js');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: { max: '767px' },
      md: { min: '1199px' },
      xl: { min: '1399px' },
      xxl: { min: '1400px' },
    },
    extend: {
      colors: {
        ...colors,
      },
      spacing: {
        ...spacing,
      },
      borderRadius: {
        ...borderRadius,
      },
      fontWeight: {
        ...fontWeight,
      },
      fontSize: { ...spacing },
      keyframes: {
        'slide-from-left': {
          '0%': { transform: 'translateX(-10%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-from-right': {
          '0%': { transform: 'translateX(10%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        rotate: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'loading-1': 'rotate 1000ms ease infinite',
        'loading-2': 'rotate 1300ms ease-in-out infinite',
        'loading-3': 'rotate 1500ms ease-in-out infinite',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
