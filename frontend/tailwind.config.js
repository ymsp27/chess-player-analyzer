/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F7F4',
          100: '#E1EFE7',
          200: '#C0DFC6',
          300: '#8FBFA7',
          400: '#52967A',
          500: '#2E775B',
          600: '#1E5E44',
          700: '#1A4D39',
          800: '#1E3A2B',
          900: '#132E1E',
          950: '#0A1B11',
        },
        gold: {
          50: '#FAF7ED',
          100: '#F3E8C8',
          200: '#E8D494',
          300: '#D4AF37',
          400: '#C5A059',
          500: '#B8902A',
          600: '#9B741E',
          700: '#7B5818',
          800: '#644619',
          900: '#533919',
        },
        warmbg: '#FAFAF8',
        cardbg: '#FFFFFF',
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(19, 46, 30, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
