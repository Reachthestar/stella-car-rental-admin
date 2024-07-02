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
        'heading-color': '#fff',
        'small-text-color': '#808191',
        'recommend-car01-bg': '#e1dfa4',
        'recommend-car02-bg': '#e3ecf1',
        'recommend-car03-bg': '#f4e3e5',
        'success-status-text': '#16a34a',
        'success-status-bg': '#dcfce7',
        'process-status-text': '#818cf8',
        'process-status-bg': '#e0e7ff',
        'fail-status-text': '#f87171',
        'fail-status-bg': '#fee2e2',
      },
      backgroundImage: {
        'card-01-bg': 'linear-gradient(#ffc52d,#ef621c)',
        'card-02-bg': 'linear-gradient(#90d99c,#16a085)',
        'card-03-bg': 'linear-gradient(#aa98f5,#725cff)',
        'card-04-bg': 'linear-gradient(#5ecde1,#2884ff)',
      },
    },
  },
  plugins: [],
};
