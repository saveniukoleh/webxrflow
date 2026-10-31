import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// GitHub Pages publishes this repo at /webxrflow/. Local dev keeps the root path.
const pagesBase = process.env.GITHUB_PAGES === 'true' ? '/webxrflow/' : '/'

export default defineConfig({
  base: pagesBase,
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
