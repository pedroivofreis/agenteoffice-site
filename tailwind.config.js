/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // compat com o código legado
        'agente-blue': '#114552',
        'agente-teal': '#5DA6AA',
        // Marca
        ink: '#114552',        // teal escuro — títulos
        brand: {
          50:  '#ecfbfb',
          100: '#d2f3f3',
          200: '#a8e6e8',
          300: '#74d2d6',
          400: '#5DA6AA',      // teal principal
          500: '#3f8b90',
          600: '#2f6e73',
          700: '#285a5e',
          800: '#244a4e',
          900: '#114552',
        },
        // Acentos (ClickUp + calor de viagem)
        coral: {
          50:  '#fff3ef',
          100: '#ffe3d8',
          300: '#ffab8f',
          400: '#ff8a66',
          500: '#ff6a3d',      // coral quente — CTA/destaque
          600: '#ed4f21',
        },
        sun: {
          400: '#ffc24b',
          500: '#ffb01f',      // âmbar/sol
        },
        sand: {
          50:  '#fbf9f5',
          100: '#f5f1e9',
          200: '#ece5d8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(17,69,82,0.18)',
        soft: '0 4px 24px -6px rgba(17,69,82,0.12)',
        glow: '0 14px 40px rgba(255,106,61,0.4)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'pop-in': 'pop-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
