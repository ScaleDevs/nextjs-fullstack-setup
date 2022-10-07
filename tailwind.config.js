/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
      roboto: ['Roboto Condensed', 'sans-serif'],
      pacifico: ['Pacifico', 'cursive'],
    },
    extend: {
      animationDuration: {
        00005: '0.5ms',
        1000: '1000ms',
        2000: '2000ms',
        3000: '3000ms',
        4000: '4000ms',
        5000: '5000ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0.1' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(200%)' },
          '100%': { transform: 'translateX(30%)' },
        },
      },
      animation: {
        slideIn: 'slideIn ease-in',
        fadeIn: 'fadeIn ease-in',
      },
    },
  },
  plugins: [require('tailwindcss-animation')],
};
