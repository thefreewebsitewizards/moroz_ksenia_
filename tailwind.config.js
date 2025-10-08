/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7f4',
          100: '#e8ede5',
          200: '#d2dccb',
          300: '#b4c4a7',
          400: '#91a68a', /* Main green color */
          500: '#768c6f',
          600: '#5f7158',
          700: '#4c5a47',
          800: '#3e493a',
          900: '#343d31',
        },
        accent: {
          50: '#fdf8f1',
          100: '#f9edd9',
          200: '#f2d8b3',
          300: '#e7be85',
          400: '#cf955f', /* Main orange/gold color */
          500: '#c27c45',
          600: '#b06339',
          700: '#924d31',
          800: '#78402d',
          900: '#653628',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lora': ['Lora', 'serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'patrick-hand-sc': ['Patrick Hand SC', 'sans-serif'],
        'patrick-hand': ['Patrick Hand', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};