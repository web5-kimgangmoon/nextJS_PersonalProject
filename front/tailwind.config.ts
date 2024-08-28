import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        sm: "320px",
        md: "768px",
        lg: "1400px",
        xl: "1920px",
      },
      fontSize: {
        xs: "0.2rem",
        sm: "0.5rem",
        base: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.563rem",
        "4xl": "1.953rem",
        "5xl": "2.441rem",
      },
      container: {
        center: true,
      },
      screens: {
        sm: { min: "320px", max: "767px" },
        md: { min: "768px", max: "1399px" },
        lg: { min: "1400px", max: "1919px" },
        xl: { min: "1920px" },
      },
      colors: {
        mainBlue: "#2E9FFF",
        alert: "#F05F70",
        pink: "#d81159",
      },
    },
  },
  plugins: [],
};
export default config;
