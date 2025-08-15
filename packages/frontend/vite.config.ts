import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// UnoCSS is ESM-only and may cause require-time errors when vite's config is loaded
// Temporarily disabled to allow local dev startup. Re-enable after switching to ESM config or compatible loader.

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // UnoCSS(), // disabled: see note above
    react(),
  ],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
  // optimizeDeps: {
  //   include: ['unocss'],
  // },
})
