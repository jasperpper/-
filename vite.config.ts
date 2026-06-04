import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ['src'], rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DpUI',
      fileName: (format) => (format === 'es' ? 'dp-ui.js' : 'dp-ui.umd.cjs'),
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'dp-ui.css' : assetInfo.name!,
      },
    },
  },
})
