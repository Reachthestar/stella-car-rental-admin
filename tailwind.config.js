/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#FF7A00',
        'secondary-color': '#1154FF',
        'bg-children-container': '#f0f2f5',
        'side-bar': '#191919',
        'body-bg': '#0b0c28',
        'card-03-bg': '#725cff',
        'card-04-bg': '#2884ff',
        'heading-color': '#fff',
        'small-text-color': '#808191',
        'recommend-car01-bg': '#e1dfa4',
        'recommend-car02-bg': '#e3ecf1',
        'recommend-car03-bg': '#f4e3e5',
      },
      backgroundImage: {
        'card-01-bg': 'linear-gradient(#ef621c, #e1424e)',
        'card-02-bg': 'linear-gradient(#01d293, #56c57a)',
      },
    },
  },
  plugins: [],
};
