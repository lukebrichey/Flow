/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coolGray: '#c2c2c2'
      },
      fontSize: {
        xxs: {
          fontSize: '0.625rem',
          lineHeight: '0.75rem'
        }
      }
    }
  },
  plugins: []
};
