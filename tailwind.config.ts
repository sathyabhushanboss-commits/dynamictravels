import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: {
          DEFAULT: "#161B22",
          50: "#F4F5F6",
          100: "#E4E6E9",
          400: "#5B6472",
          600: "#333B47",
          800: "#1E2530",
          900: "#161B22",
        },
        concrete: {
          DEFAULT: "#F1EDE3",
          50: "#FBFAF7",
          100: "#F1EDE3",
          200: "#E5DFCF",
        },
        signal: {
          green: "#1E5B3F",
          "green-light": "#2C7A54",
          amber: "#F2A93B",
        },
        steel: "#707A87",
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
