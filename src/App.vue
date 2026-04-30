<template>
  <div id="app">
    <h3>Schema 编辑 Demo</h3>
    <div class="canvas">
      <SchemaRenderer :nodes="schema" />
    </div>

    <!-- Overlay 挂载在 App 内部（也可以挂到 body） -->
    <Overlay />
    <EditorPanel />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SchemaRenderer from './components/SchemaRenderer.vue'
import Overlay from './components/Overlay.vue'
import EditorPanel from './components/EditorPanel.vue'
import { useSchemaStore } from './store'

const store = useSchemaStore()
const schema = computed(() => store.schema)
</script>

<style>
#app { padding: 20px; font-family: sans-serif; }
.canvas { border: 1px dashed #ddd; padding: 12px; min-height: 300px; position: relative; background:#fafafa }
</style>