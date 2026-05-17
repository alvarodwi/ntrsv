import { defineConfig } from 'vite'
import UnoCSS from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import packageJson from './package.json'

export default defineConfig({
  plugins: [vue(), UnoCSS(),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/ntrsv/',
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
})