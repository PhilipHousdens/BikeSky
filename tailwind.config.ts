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
        gradientStart: "#2C3E50",
        gradientEnd: "#34495E"
      },
    },
  },
  plugins: [],
};
export default config;
