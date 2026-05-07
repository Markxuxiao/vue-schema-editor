<template>
  <div id="app">
    <h3>Schema 编辑 Demo</h3>
    <div class="canvas">
      <SchemaRenderer :nodes="schemaData" />
    </div>

    <!-- Overlay 挂载在 App 内部（也可以挂到 body） -->
    <Overlay />
    <EditorPanel />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SchemaRenderer from './core/SchemaRenderer.vue'
import Overlay from './core/Overlay.vue'
import EditorPanel from './core/EditorPanel.vue'
import { useSchemaStore } from './core/store'

const schema = [
  {
    id: 'root',
    type: 'container',
    props: { title: '页面容器' },
    editable: true,
    children: [
      { id: 'n1', type: 'box', props: { title: '可编辑 Box A', color: '#9ad' }, editable: true },
      { id: 'n11', type: 'box', props: { title: '可编辑 Box A1', color: '#9ad' }, editable: true },
      { id: 'n12', type: 'box', props: { title: '可编辑 Box A2', color: '#9ad' }, editable: true },
      { id: 'n2', type: 'box', props: { title: '不可编辑 Box B', color: 'rgb(145, 62, 104)' } },
      { id: 'n13', type: 'box', props: { title: '可编辑 Box A3', color: '#9ad' }, editable: true },
      { id: 'n14', type: 'input', props: { label: '用户名', placeholder: '请输入用户名', modelValue: '' }, editable: true },
      { id: 'n15', type: 'input', props: { label: '邮箱', placeholder: '请输入邮箱', type: 'email', modelValue: '' }, editable: true },
      { id: 'n16', type: 'select', props: { label: '城市', options: ['北京', '上海', '广州', '深圳'], modelValue: '' }, editable: true },
      {
        id: 'n3',
        type: 'container',
        props: { title: '嵌套容器' },
        editable: false,
        children: [
          { id: 'n4', type: 'box', props: { title: '嵌套的可编辑1', color: 'rgb(55, 214, 63)' }, editable: true },
          { id: 'n41', type: 'box', props: { title: '嵌套的可编辑2', color: 'rgb(79, 25, 84)' }, editable: true },
          { id: 'n42', type: 'box', props: { title: '嵌套的可编辑3', color: 'rgb(210, 34, 87)' }, editable: true },
        ],
      },
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