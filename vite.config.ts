import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-input-number/',
  plugins: [
    vue(),
    dts()
  ],
  build: {
    lib: {
      entry: 'src/VueInputNumberPlugin.ts',
      formats: ['es', 'cjs'],
      name: 'VueInputNumberPlugin',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
