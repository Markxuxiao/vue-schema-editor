<template>
  <div class="overlay-root" data-editable-ignore>
    <!-- 高亮框 -->
    <div
      v-if="visible"
      class="highlight"
      :style="{
        left: rect.x - 2 + 'px',
        top: rect.y - 2 + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px'
      }"
    />
    <!-- 编辑按钮 -->
    <button
      v-if="visible && !isDragging"
      class="edit-btn"
      data-editable-ignore
      :style="{ left: rect.x + rect.width - 35 + 'px', top: rect.y + 10 + 'px' }"
      @click.stop="openEditor"
    >✎</button>
    <!-- 添加子组件按钮 -->
    <button
      v-if="visible && !isDragging && canAddChild"
      class="add-btn"
      data-editable-ignore
      :style="{ left: rect.x + rect.width - 68 + 'px', top: rect.y + 10 + 'px' }"
      @click.stop="togglePicker"
    >+</button>
    <!-- 类型选择器 -->
    <div
      v-if="showPicker"
      class="type-picker"
      data-editable-ignore
      :style="{ left: rect.x + rect.width - 68 + 'px', top: rect.y - 8 + 'px' }"
    >
      <div
        v-for="type in filteredTypes"
        :key="type"
        class="type-option"
        @click.stop="addChild(type)"
      >{{ type }}</div>
    </div>
    <!-- 拖拽按钮 -->
    <button
      v-if="visible && !isDragging"
      class="drag-btn"
      data-editable-ignore
      :style="{ left: rect.x - 15 + 'px', top: rect.y + 10 + 'px' }"
      @pointerdown.stop="startDrag"
    >⋮⋮</button>
    <!-- 插入位置竖线 -->
    <div
      v-if="insertIndicator.visible"
      class="insert-indicator"
      :style="{
        left: insertIndicator.x + 'px',
        top: insertIndicator.y + 'px',
        height: insertIndicator.height + 'px'
      }"
    />
    <!-- 拖拽时跟随鼠标的小方框 -->
    <div
      v-if="isDragging && dragGhost.visible"
      class="drag-ghost"
      :style="{
        left: dragGhost.x + 'px',
        top: dragGhost.y + 'px'
      }"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useSchemaStore } from './store'
import { RENDERER_REGISTRY } from '../renderers/index.js'

const rect = ref({ x: 0, y: 0, width: 0, height: 0 })
const visible = ref(false)
const currentId = ref(null)
const store = useSchemaStore()

// 添加子组件相关
const showPicker = ref(false)
const availableTypes = Object.keys(RENDERER_REGISTRY)
const currentNodeType = ref(null)
const canAddChild = ref(false)

const ALLOWED_CHILDREN = {
  table: ['table-column'],
}

const filteredTypes = computed(() => {
  if (currentNodeType.value && ALLOWED_CHILDREN[currentNodeType.value]) {
    return ALLOWED_CHILDREN[currentNodeType.value]
  }
  return availableTypes
})

function syncHighlight(id) {
  nextTick(() => {
    const el = document.querySelector(`[data-editable-id="${id}"]`)
    if (el) {
      const r = el.getBoundingClientRect()
      rect.value = { x: r.left, y: r.top, width: r.width, height: r.height }
    }
  })
}

function togglePicker() {
  showPicker.value = !showPicker.value
}

const DEFAULT_PROPS = {
  box: { title: '新 box', color: '#9ad' },
  container: { title: '新容器' },
  input: { label: '新输入框', placeholder: '请输入', modelValue: '' },
  select: { label: '新选择器', options: ['选项1', '选项2'], modelValue: '' },
  table: { title: '新表格' },
  'table-column': { label: '新列' },
}

function addChild(type) {
  if (!currentId.value) return
  store.addNode(currentId.value, type, { ...DEFAULT_PROPS[type] })
  showPicker.value = false
  syncHighlight(currentId.value)
}

// 拖拽相关状态
const isDragging = ref(false)
const insertIndicator = ref({ visible: false, x: 0, y: 0, height: 0 })
const dragGhost = ref({ visible: false, x: 0, y: 0 })

function findNodeAndParent(nodes, id, parentArr = null, parentNode = null) {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    if (n.id === id) return { node: n, parentArr, parentNode }
    if (n.children) {
      const r = findNodeAndParent(n.children, id, n.children, n)
      if (r) return r
    }
  }
  return null
}

function getEditableSiblings(id) {
  const result = findNodeAndParent(store.schema, id)
  if (!result || !result.parentArr) return []
  return result.parentArr.filter(n => n.editable && n.id !== id)
}

function updatePosition(e) {
  const path = e.path ?? e.composedPath?.() ?? []
  if (!path.length) return

  // 如果正在拖拽，跳过普通高亮更新
  if (isDragging.value) return

  // 如果鼠标在编辑/拖拽/添加按钮或选择器上，保持当前高亮
  if (e.target.classList && (e.target.classList.contains('edit-btn') || e.target.classList.contains('drag-btn') || e.target.classList.contains('add-btn') || e.target.classList.contains('type-option'))) {
    if (visible.value && currentId.value) return
  }

  const ignoreIndex = path.findIndex(n => n?.dataset?.editableIgnore != null)
  const targetPath = ignoreIndex >= 0 ? path.slice(ignoreIndex + 1) : path
  const target = targetPath.find(n => n?.dataset?.editableId)

  if (target) {
    const id = target.dataset.editableId
    const node = store.getNode(id)
    if (node) {
      const r = target.getBoundingClientRect()
      rect.value = { x: r.left, y: r.top, width: r.width, height: r.height }
      visible.value = true
      currentId.value = id
      currentNodeType.value = node.type
      canAddChild.value = !!node.children
      showPicker.value = false
      return
    }
  }
  visible.value = false
  currentId.value = null
  currentNodeType.value = null
  canAddChild.value = false
  showPicker.value = false
}

function onDragMove(e) {
  if (!isDragging.value) return

  dragGhost.value = { ...dragGhost.value, x: e.clientX - 20, y: e.clientY - 10 }

  const siblings = getEditableSiblings(currentId.value)
  if (!siblings.length) return

  // 获取当前拖拽节点的容器
  const sourceInfo = findNodeAndParent(store.schema, currentId.value)
  if (!sourceInfo || !sourceInfo.parentArr) return

  // 找到鼠标下的可编辑节点
  const path = e.composedPath?.() ?? []
  const ignoreIndex = path.findIndex(n => n?.dataset?.editableIgnore != null)
  const targetPath = ignoreIndex >= 0 ? path.slice(ignoreIndex + 1) : path
  const target = targetPath.find(n => n?.dataset?.editableId && n?.dataset?.editableId !== currentId.value)

  if (!target) {
    insertIndicator.value = { ...insertIndicator.value, visible: false }
    return
  }

  const targetId = target.dataset.editableId

  // 检查目标节点是否在同一容器
  const targetInfo = findNodeAndParent(store.schema, targetId)
  if (!targetInfo || targetInfo.parentArr !== sourceInfo.parentArr) {
    insertIndicator.value = { ...insertIndicator.value, visible: false }
    return
  }

  const r = target.getBoundingClientRect()
  const centerX = r.left + r.width / 2
  const position = e.clientX < centerX ? 'left' : 'right'

  const indicatorX = position === 'left' ? r.left - 2 : r.left + r.width - 2

  insertIndicator.value = {
    visible: true,
    x: indicatorX,
    y: r.top,
    height: r.height,
    targetId,
    position
  }
}

function onDragEnd(e) {
  if (!isDragging.value) return

  isDragging.value = false
  dragGhost.value = { ...dragGhost.value, visible: false }
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onDragEnd)

  if (insertIndicator.value.visible && insertIndicator.value.targetId) {
    store.moveNode(currentId.value, insertIndicator.value.targetId, insertIndicator.value.position)
  }

  insertIndicator.value = { ...insertIndicator.value, visible: false }

  // 拖拽完成后，等待 Vue 渲染完成再重新定位高亮框
  if (currentId.value) {
    syncHighlight(currentId.value)
  }
}

function startDrag(e) {
  isDragging.value = true
  dragGhost.value = { visible: true, x: e.clientX - 20, y: e.clientY - 10 }

  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onDragEnd)
}

function openEditor() {
  if (!currentId.value) return
  store.openEditor(currentId.value)
}

onMounted(() => {
  window.addEventListener('pointermove', updatePosition)
  window.addEventListener('scroll', onScroll, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', updatePosition)
  window.removeEventListener('scroll', onScroll, true)
})

function onScroll() {
  if (!currentId.value) return
  syncHighlight(currentId.value)
}
</script>

<style>
.overlay-root { position: fixed; top:0; left:0; right:0; bottom:0; pointer-events: none; z-index: 9999; }
.highlight {
  position: absolute;
  border: 2px solid #42b983;
  background: rgba(66,185,131,0.06);
  border-radius: 4px;
  pointer-events: none;
  transition: all 120ms linear;
}
.edit-btn {
  position: absolute;
  transform: translate(50%, -50%);
  background: #42b983;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.14);
}
.drag-btn {
  position: absolute;
  transform: translate(50%, -50%);
  background: #555;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: grab;
  pointer-events: auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.14);
  font-size: 12px;
  line-height: 24px;
  text-align: center;
}
.insert-indicator {
  position: absolute;
  width: 5px;
  background: #42b983;
  pointer-events: none;
  z-index: 10000;
}
.drag-ghost {
  position: fixed;
  width: 40px;
  height: 20px;
  background: rgba(66,185,131,0.3);
  border: 2px solid #42b983;
  border-radius: 4px;
  pointer-events: none;
  z-index: 10001;
}
.add-btn {
  position: absolute;
  transform: translate(50%, -50%);
  background: #42b983;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.14);
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}
.type-picker {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 10002;
  pointer-events: auto;
  min-width: 80px;
}
.type-option {
  padding: 6px 12px;
  cursor: pointer;
  font-size: 13px;
  color: #333;
}
.type-option:hover {
  background: #f5f5f5;
}
.type-option:first-child {
  border-radius: 6px 6px 0 0;
}
.type-option:last-child {
  border-radius: 0 0 6px 6px;
}
</style>
