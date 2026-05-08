import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vue-schema-editor/core': resolve(__dirname, '../../packages/core/src'),
      '@vue-schema-editor/element-plus-renderers': resolve(__dirname, '../../packages/element-plus-renderers/src'),
    }
  }
})
