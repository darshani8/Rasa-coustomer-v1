import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Service worker + manifest live in /public and are copied as-is to the build.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
});
