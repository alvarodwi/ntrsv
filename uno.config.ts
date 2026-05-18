// uno.config.ts
import {
  defineConfig,
  presetWind3,
  presetIcons,
  presetAttributify,
  presetWebFonts
} from 'unocss'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

export default defineConfig({
  dark: 'class',
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.1,
      warn: true,
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        display: 'Funnel Display',
        ui: 'Funnel Sans',
      },
      processors: createLocalFontProcessor({
        cacheDir: 'node_modules/.cache/unocss/fonts',
        fontAssetsDir: 'public/assets/fonts',
        fontServeBaseUrl: '/assets/fonts',
      })
    }),
  ],
  theme: {
    colors: {
      white: '#fdfdfd',
      cream: '#fdfcf9',
      charcoal: '#27262a',
      gold: '#f4cb8f',
      purple: '#b07bac',
      coral: '#d48275',
    },
  },
})