import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",        // <-- AJOUT IMPORTANT !
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    port: 3000,
  },
})
