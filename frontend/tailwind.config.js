/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        headerBlob: "url(/assets/images/headerBlob.png)",
        tryBlob: "url(/assets/images/trySection-blob.png)",
        loginbg: "url('/assets/images/login-bg.png')",
        "custom-gradient":
          "linear-gradient(to top, #F9970420 2%, #1D1D1B01 50%)",
      },
      fontFamily: {
        baloo: ['"Baloo 2"', "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        k2d: ["K2D", "sans-serif"],
        lilita: ["'Lilita One'", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
      screens: {
        xsm: "360px", // Extra small devices
        sm: "500px", // Small devices
        md: "768px", // Medium devices
        lg: "1024px", // Large devices
        xl: "1280px", // Extra large devices
        "2xl": "1440px", // 2x Extra large devices
      },
    },
    colors: {
      white: "#FFFFFF",
      transparent: "#FFFFFF00",
      outline: "#777777",
      black: "#00000025",
      landing: "#1E1E1E",
      "about-cards": "#212121",
      "alternative-text": "#C0C0C0",
      "light-gray": "#787878",
      "tree-poppy-50": "#FFFAEA",
      "tree-poppy-100": "#FFF2C6",
      "tree-poppy-200": "#FFE587",
      "tree-poppy-300": "#FFD049",
      "tree-poppy-400": "#FFBB1F",
      "tree-poppy-500": "#F99704",
      "tree-poppy-600": "#DE7101",
      "tree-poppy-700": "#B84D05",
      "tree-poppy-800": "#953B0B",
      "tree-poppy-900": "#7B310C",
      "tree-poppy-950": "#471701",
      "oxford-blue-50": "#F6F7F9",
      "oxford-blue-100": "#EBEEF3",
      "oxford-blue-200": "#D3DAE4",
      "oxford-blue-300": "#ACBBCD",
      "oxford-blue-400": "#8097B0",
      "oxford-blue-500": "#607A97",
      "oxford-blue-600": "#4C617D",
      "oxford-blue-700": "#3E4F66",
      "oxford-blue-800": "#334051",
      "oxford-blue-900": "#313B49",
      "oxford-blue-950": "#202631",
      "night-blue": "#1F252F",
    },
  },
  plugins: [],
};
