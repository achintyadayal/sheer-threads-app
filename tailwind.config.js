/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
   extend: {
  animation: {
    fadeUp: "fadeUp 1.2s ease-out forwards",
    fadeIn: "fadeIn 1s ease-out forwards",
  },
  keyframes: {
    fadeUp: {
      "0%": { opacity: "0", transform: "translateY(40px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    fadeIn: {
    "0%": { opacity: "0", transform: "translateY(20px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  },
},


  },

  plugins: [],
};
