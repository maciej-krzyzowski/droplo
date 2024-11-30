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
        primary: {
          100: "#D6BBFB",
          200: "#7F56D9",
          300: "#6941C6",
        },
        secondary: {
          50: "#F9FAFB",
          100: "#FFFFFF",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#667085",
          500: "#475467",
          600: "#344054",
          700: "#101828",
        },
      },
    },
  },
  plugins: [],
};

export default config;
