/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
      },
      flexBasis: {
        "1/3-gap-1": "calc(33.3% - (2/3 * 0.25rem))"
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ADC178",
          "secondary": "#DDE5B6",
          "accent": "#A98467",
          "neutral": "#6C584C",
          "base-100": "#F0EAD2",
          "info": "#F6BD60",
          "success": "#B3B394",
          "warning": "#EE7444",
          "error": "#EC4946",
        },
      },
    ],
  },
  // eslint-disable-next-line global-require
  plugins: [require("daisyui")],
};
