module.exports = {
  purge: ['./pages/**/*', './components/**/*'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      translate: ['active'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
