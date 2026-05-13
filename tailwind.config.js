export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d7edff',
          200: '#b3dbff',
          300: '#7db8ff',
          400: '#4c90f1',
          500: '#2c6bdb',
          600: '#2355b5',
          700: '#1f4a90',
          800: '#24406f',
          900: '#283352'
        },
        tealsoft: '#d7f3f0',
        blueglass: '#eef8ff'
      },
      boxShadow: {
        soft: '0 15px 40px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
