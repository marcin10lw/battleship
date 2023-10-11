/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        ship: '#b3ccff',
        hit: '#ff5050',
        miss: '#46545f',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 100 },
        },
      },
      animation: {
        pop: 'pop 400ms',
      },
    },
  },
  plugins: [],
};
