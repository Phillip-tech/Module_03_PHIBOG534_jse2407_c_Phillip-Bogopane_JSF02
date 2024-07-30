import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

/** @type {import('postcss').Processor} */
export default {
  plugins: [tailwindcss("./tailwind.config.js"), autoprefixer()],
};