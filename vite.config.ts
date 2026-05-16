import { defineConfig } from 'vite'
import UnoCSS from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue(), UnoCSS(),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/ntrsv/',
})