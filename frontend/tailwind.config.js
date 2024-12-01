/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'card-light': 'rgba(255, 255, 255, 0.8)',
        'card-dark': 'rgba(17, 24, 39, 0.8)',
      },
    },
  },
  plugins: [],
};