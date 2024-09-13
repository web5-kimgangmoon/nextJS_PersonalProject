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
        textBlue: "#042552",
        darkBlue: "#006ba6",
        alert: "#F05F70",
        pink: "#d81159",
        bgGray: "#687A86",
        textGray: "#656C7A",
        borderGray: "#DCDBDD",
        categoryGray: "#F5F5F5",
        userInfoGray: "#F6F8FC",
        XMarkGray: "#C2C9D4",
        fakeBlack: "#2A2E2E",
        blankStar: "#EBEEF2",
        star: "#FFD34F",
        modalText: "#494E58",
        textStrongGray: "#546673",
      },
    },
  },
  plugins: [],
};
export default config;
