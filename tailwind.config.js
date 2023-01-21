module.exports = {
  content: ["./**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["corporate"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
