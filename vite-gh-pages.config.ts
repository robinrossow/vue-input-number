import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: "/vue-input-number/",
  plugins: [vue()],
  build: {
    outDir: 'dist-gh-pages',
  }
})
