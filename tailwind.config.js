/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agente-blue': '#114552',
        'agente-teal': '#5DA6AA',
      },
    },
  },
  plugins: [],
}