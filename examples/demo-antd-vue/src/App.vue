<template>
  <div id="app">
    <h3>Ant Design Vue Schema Editor</h3>
    <div class="canvas">
      <SchemaRenderer :nodes="schemaData" />
    </div>

    <Overlay />
    <EditorPanel />
  </div>
</template>

<script setup>
import { computed, provide } from 'vue'
import SchemaRenderer from '@vue-schema-editor/core/SchemaRenderer.vue'
import Overlay from '@vue-schema-editor/core/Overlay.vue'
import EditorPanel from '@vue-schema-editor/core/EditorPanel.vue'
import { useSchemaStore } from '@vue-schema-editor/core/store.js'
import { RENDERER_REGISTRY, DEFAULTS, ALLOWED_CHILDREN } from '@vue-schema-editor/antd-vue-renderers'

provide('RENDERER_REGISTRY', RENDERER_REGISTRY)
provide('DEFAULTS', DEFAULTS)
provide('ALLOWED_CHILDREN', ALLOWED_CHILDREN)

const schema = [
  {
    id: 'root',
    type: 'container',
    props: { title: '页面容器' },
    editable: true,
    children: [
      { id: 'n1', type: 'box', props: { title: 'Box A', color: '#1890ff' }, editable: true },
      { id: 'n2', type: 'box', props: { title: 'Box B', color: '#52c41a' }, editable: true },
      { id: 'n3', type: 'input', props: { label: '用户名', placeholder: '请输入用户名' }, editable: true },
      { id: 'n4', type: 'select', props: { label: '城市', options: ['北京', '上海', '广州', '深圳'] }, editable: true },
    ],
  },
]

const store = useSchemaStore(schema)
const schemaData = computed(() => store.schema)
</script>

<style>
#app { padding: 20px; font-family: sans-serif; }
.canvas { border: 1px dashed #ddd; padding: 12px; min-height: 300px; position: relative; background:#fafafa }
</style>
