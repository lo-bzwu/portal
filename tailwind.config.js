/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'secondary': 'var(--secondary)',
        'primary': '#FFFFFF',
        'brand-positive': 'var(--brand-positive)',
        'brand-positive-shade': 'var(--brand-positive-shade)',
        'brand-negative': 'var(--brand-negative)',
        'brand-negative-shade': 'var(--brand-negative-shade)',
        'brand-theme': 'var(--brand-theme)',
        'brand-theme-shade': 'var(--brand-theme-shade)'
      }
    },
    fontFamily: {
      'sans': ["Atkinson Hyperlegible", "sans-serif"]
    }
  },
  plugins: [],
}
