import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/react-refresh'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio_with_react.js/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
