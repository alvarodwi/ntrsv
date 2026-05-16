// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
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
})