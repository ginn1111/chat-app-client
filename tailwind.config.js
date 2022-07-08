module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      text: {
        sm: '14px',
      },
      keyframes: {
        'slide-from-left': {
          '0%': { transform: 'translateX(-10%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-from-right': {
          '0%': { transform: 'translateX(10%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
