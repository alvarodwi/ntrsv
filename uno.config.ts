// uno.config.ts
import {
  defineConfig,
  presetWind3,
  presetIcons,
  presetAttributify,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
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