/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class", // Enable class-based dark mode for manual control
  theme: {
    extend: {},
  },
  plugins: [],
};
