module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto, sans-serif',
        montserrat: 'Montserrat, sans-serif',
        dancer: 'Dancing Script, cursive',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
