module.exports = {
  content: ["./src/**/*.{tsx,ts,js}", "./index.html"],
  theme: {
    screens: {
      "2xl": { max: "1536px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "640px" },
      // => @media (max-width: 639px) { ... }
    },

    colors: {
      mg: "#212121",
      fg: "rgb(245,245,245)",
      dg: "grey",
      secondary: "rgb(254, 221, 39)",
      black: "black",
      white: "white",
      mask: "rgba(0,0,0,0.4)",
    },
    extend: {
      maxWidth: {},
      keyframes: {
        "spin-bounce": {
          "0%, 100%": {
            transform: "scale(0)",
          },
          "50%": {
            transform: "scale(1)",
          },
        },
        "placeholder-bounce": {
          "0%": {
            opacity: 0.6,
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0.6,
          },
        },
        "lds-ring": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: " rotate(360deg)",
          },
        },
      },
      animation: {
        "spin-loading": "spin-bounce 2s infinite ease-in-out",
        "placeholder-loading": "placeholder-bounce 1.5s infinite",
        "ring-spin-loading":
          "lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
        opacity: "opacity",
      },
    },
  },

  plugins: [],
}
