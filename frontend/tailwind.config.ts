// tailwind.config.ts  (or tailwind.config.js if you’re using JS)
/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',                     // Vite injects into this
    './src/**/*.{js,ts,jsx,tsx}',       // all components, pages, etc.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
