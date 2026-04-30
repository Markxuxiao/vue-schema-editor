<template>
  <div v-if="editingNode" class="editor-panel" data-editable-ignore>
    <div class="header">
      <strong>编辑：{{ editingNode.id }}</strong>
      <button @click="close">✕</button>
    </div>
    <div class="form">
      <div v-for="(v,k) in editingNode.props" :key="k" class="field">
        <label>{{ k }}</label>
        <input v-model="local[k]" />
      </div>
      <div class="actions">
        <button @click="save">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { useSchemaStore } from '../store'

const store = useSchemaStore()
const editingId = computed(() => store.editingId)
const editingNode = computed(() => editingId.value ? store.getNode(editingId.value) : null)

const local = reactive({})

watch(editingNode, (node) => {
  if (node) {
    // shallow copy props to local reactive object
    Object.keys(local).forEach(k => delete local[k])
    Object.entries(node.props || {}).forEach(([k, v]) => { local[k] = v })
  }
})

function save() {
  if (!editingNode.value) return
  store.updateNodeProps(editingNode.value.id, { ...local })
  store.closeEditor()
}

function close() {
  store.closeEditor()
}
</script>

<style>
.editor-panel {
  position: fixed;
  right: 16px;
  top: 80px;
  width: 280px;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  border-radius: 6px;
  padding: 12px;
  z-index: 10000;
  pointer-events: auto;
}
.header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px }
.field { margin-bottom:8px; display:flex; flex-direction:column }
.field label { font-size:12px; color:#666; margin-bottom:4px }
.field input { padding:6px 8px; border-radius:4px; border:1px solid #ddd }
.actions { text-align:right; margin-top:6px }
.actions button { background:#42b983; color:white; border:none; padding:6px 10px; border-radius:4px }
</style>