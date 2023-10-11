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
    },
  },
  plugins: [],
};
