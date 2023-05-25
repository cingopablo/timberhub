/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '960px',
      desktop: '1248px',
    },
    colors: {
      white: '#FFFFFF',
      primary: '#23D899',
      'primary-light': 'var(--primary-400)',
      'primary-dark': '#20BE87',
      black: '#000000',
      gray: '#939393',
      metal: '#707786',
      border: '#D5D5D5',
      danger: '#FF453A',
      chip: {
        background: '#F4F4F6',
        color: '#1F2937',
      },
    },
    boxShadow: {
      header: '0px 0px 24px rgba(0, 0, 0, 0.13)',
      default: '0px 3px 24px rgba(0, 0, 0, 0.05)',
    },
    fontSize: {
      '2xs': ['11px', { lineHeight: '13px', fontWeight: 400 }],
      xs: ['12px', { lineHeight: '15px', fontWeight: 400 }],
      sm: ['13px', { lineHeight: '16px', fontWeight: 500 }],
      m: ['14px', { lineHeight: '23px', fontWeight: 400 }],
      lg: ['15px', { lineHeight: '25px', fontWeight: 700 }],
      xl: ['24px', { lineHeight: '40px', fontWeight: 600 }],
      '2xl': ['33px', { lineHeight: '55px', fontWeight: 700 }],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        new: 'auto 1',
      },
    },
  },
  plugins: [],
}
