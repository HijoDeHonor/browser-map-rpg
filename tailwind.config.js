/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      scale: {
        '25': '0.25',
      },
      mx: {
        'asd': '1rem',
      },
    },
    
  },
  plugins: [],
};
