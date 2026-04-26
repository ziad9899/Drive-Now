/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F7F3',
        ink: '#111827',
        midnight: '#0B0F19',
        gold: '#C89B3C',
        royal: '#1E3A8A',
        line: '#E5E2D9',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', '"Tajawal"', 'system-ui', 'sans-serif'],
        display: ['"IBM Plex Sans Arabic"', '"Tajawal"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -12px rgba(11,15,25,0.18)',
        card: '0 2px 12px -6px rgba(11,15,25,0.10)',
        ring: '0 0 0 1px rgba(200,155,60,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
