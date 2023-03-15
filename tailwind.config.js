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
        'toast-auto-close': {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
      },
      animation: {
        'toast-auto-close': 'toast-auto-close 3s ease-in-out forwards',
      },
      fontFamily: {
        'tt-norms-pro': ['tt-norms-pro', 'sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
