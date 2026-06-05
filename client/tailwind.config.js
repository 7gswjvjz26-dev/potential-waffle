/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        court: {
          hard: '#4A90D9',
          clay: '#C2714F',
          grass: '#4CAF50',
          indoor: '#7B68EE',
        },
      },
    },
  },
  plugins: [],
};
