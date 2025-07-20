/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Include the main HTML file
    './src/**/*.{vue,js,ts,jsx,tsx}', // Include all Vue, JS, and TS files in the src directory
    './App.vue', // Include the main Vue component
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode using the 'class' strategy
}

