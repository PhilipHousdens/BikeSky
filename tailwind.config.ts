import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bikeOrange: "#FF4141",
        test: "#3B2F45",
        gradientStart: "black",
        gradientEnd: "#2B3B4A"
      },
      fontFamily: {
        orbitron: ["Orbitron", 'sans-serif'],
        quantico: ["Quantico", "sans-serif"],
        teko: ["Teko", 'sans-serif']
      },
      animation: {
        glow: 'glow 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': {
            textShadow: '0 0 5px #FF4141', // Initial faint red glow
            boxShadow: '0 0 5px #FF4141', // Initial faint red glow
          },
          '50%': {
            textShadow: '0 0 20px #FF4141', // Bright red glow
            boxShadow: '0 0 20px #FF4141', // Bright red glow
          },
          '100%': {
            textShadow: '0 0 5px #FF4141', // Back to faint red glow
            boxShadow: '0 0 5px #FF4141', // Back to faint red glow
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
