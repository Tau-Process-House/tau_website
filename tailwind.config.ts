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
        'primary': '#000000',
        'secondary': '#ffffff',
        'gold': {
          DEFAULT: '#C8962E',
          light: '#E8B84A',
          dark: '#A67A1E',
        },
      },
      spacing: {
        'section': '100vh',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  safelist: [
    'section',
    'section-black',
  ],
  plugins: [],
}

export default config;
