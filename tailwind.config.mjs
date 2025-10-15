import typography from '@tailwindcss/typography';
import tailwindcssAnimate from 'tailwindcss-animate'; 

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    tailwindcssAnimate
  ],
};

export default config;
