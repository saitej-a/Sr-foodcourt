/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cotton: '#F6F1E7',
        dal: '#EDE4D3',
        iron: '#141210',
        ochre: '#C87D20',
        terracotta: '#A83820',
        leaf: '#24442E',
        brass: '#D4A843',
        ink: '#2A241C',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        telugu: ['"Noto Sans Telugu"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.025em',
      },
    },
  },
  plugins: [],
}
