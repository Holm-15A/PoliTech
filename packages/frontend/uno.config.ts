import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  // キャッシュの設定を追加
  envMode: 'dev',
  configDeps: ['./uno.config.ts'],
  transformers: []
})
