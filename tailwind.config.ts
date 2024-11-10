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
    },
  },
  plugins: [],
};
export default config;
