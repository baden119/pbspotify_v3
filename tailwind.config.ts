import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        babyPink: '#fac9b7',
        altBabyPink: '#ffdacc',
        navBarPurple: '#bb8bb6',
        altNavBarPurple: '#d164c6',
        tableStripe: '#cc968d',
      },
    },
  },
  plugins: [],
};
export default config;
