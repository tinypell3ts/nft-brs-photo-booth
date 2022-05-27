module.exports = {
  mode: "jit",
  content: [
    "./forms/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Rubik Mono One"],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
