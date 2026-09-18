/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wine: {
          950: "#0A0305",
          900: "#1A060E",
          850: "#270815",
          800: "#360C1E",
          700: "#4D122B",
          600: "#6B193C",
          500: "#8C224E",
          400: "#B83268",
        },
        gold: {
          100: "#FDF8E8",
          200: "#FAF0CE",
          300: "#F4DF94",
          400: "#ECCB64",
          500: "#D4AF37",
          600: "#B8860B",
          700: "#8C6508",
          800: "#634706",
        },
        noir: {
          950: "#060405",
          900: "#0D0A0C",
          850: "#141012",
          800: "#1C171A",
          700: "#282125",
          600: "#382F34",
          500: "#4D4148",
        },
        cream: {
          50: "#FDFBF7",
          100: "#FAF6EF",
          200: "#F2ECE0",
          300: "#E5DCCE",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "wine-gradient":
          "radial-gradient(ellipse at top, #2C0A17 0%, #120409 60%, #080204 100%)",
        "gold-shimmer":
          "linear-gradient(135deg, #ECCB64 0%, #D4AF37 50%, #B8860B 100%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(39, 8, 21, 0.75) 0%, rgba(13, 10, 12, 0.9) 100%)",
      },
      boxShadow: {
        luxury: "0 10px 40px -10px rgba(0, 0, 0, 0.7)",
        "gold-glow": "0 0 25px rgba(212, 175, 55, 0.25)",
        "wine-glow": "0 0 30px rgba(107, 25, 60, 0.3)",
      },
    },
  },
  plugins: [],
};
