const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        sans:['"PT Sans"', 'sans-serif']
      },
      colors:{
        fuchsia: colors.fuchsia,
        lime: colors.lime
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
