/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // flowbite.content(),
  ],
  theme: {
    extend: {
      
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require("daisyui"),
  ],
};
