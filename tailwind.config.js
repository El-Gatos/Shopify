/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your custom matcha palette
        matcha: {
          light: '#f1f5e9', // Backgrounds
          DEFAULT: '#cddaa3', // Buttons and accents
          dark: '#7e994e', // Text or hovers
        },
        cream: '#fdfdfc',
      },
      fontFamily: {
        // Recess uses clean, soft sans-serifs. Steal this vibe.
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}