const colorPalette = require('./src/style/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern:
        /(bg|text|border|ring|ring-offset)-scale-(good|medium|critical)(-dark)?/,
    },
  ],
  theme: {
    fontFamily: {
      // prettier-ignore
      sans: ['Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      serif: ['PT Serif', 'serif'],
      mono: ['monospace'],
    },
    colors: {
      ...colorPalette,
    },
    extend: {
      // TODO: Ideally we want to use Tailwind's built-in breakpoints as
      // much as possible. This might be possible because these custom
      // breakpoints are (partially) close to Tailwind's breakpoints.
      // For now I'm leaving them as-is because I can't ensure that the
      // homepage scrollytelling works with Tailwind's breakpoints.
      // This requires some deeper visual testing.
      screens: {
        screen600: '600px',
        screen1200: '1200px',
        screen1440: '1440px',
        screen1920: '1920px',
      },
      minWidth: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
      },
      animation: {
        'slide-up': 'slide-up 0.125s ease-in-out',
      },
      keyframes: {
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
