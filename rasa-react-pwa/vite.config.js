import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from the site root. Absolute asset paths (/img, /icons, /manifest, /sw.js)
// stay consistent between dev and the built output.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
  },
})
