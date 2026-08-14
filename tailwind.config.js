/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: 'rgb(var(--brand-blue-rgb) / <alpha-value>)',
          yellow: 'rgb(var(--brand-yellow-rgb) / <alpha-value>)',
          orange: '#FF5100',
          pink: '#F86D86',
          green: '#0AA13B',
          black: 'rgb(var(--brand-black-rgb) / <alpha-value>)',
        },
        surface: {
          gray: '#F1F1F3',
          'pale-blue': '#EAF5FF',
          'pale-yellow': '#FFF5D8',
          'pale-pink': '#FFF0F3',
        },
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
      },
      maxWidth: {
        content: '1280px',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2.5s infinite',
      },
    },
  },
  plugins: [],
};
