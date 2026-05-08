import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vue-schema-editor/core': resolve(__dirname, '../../packages/core/src'),
      '@vue-schema-editor/default-renderers': resolve(__dirname, '../../packages/default-renderers/src'),
    }
  }
})
