/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Russo One', 'system-ui', 'sans-serif'],
        sans: ['Chakra Petch', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
