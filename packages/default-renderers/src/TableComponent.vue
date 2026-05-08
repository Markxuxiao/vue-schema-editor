<template>
  <div class="table-comp" v-bind="$attrs">
    <div class="label">{{ title }}</div>
    <div class="children"><slot /></div>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({ title: { type: String, default: '表格' } })
</script>

<style>
.table-comp { border: 1px dashed #ccc; padding: 8px; border-radius: 6px; min-width: 200px; min-height: 80px }
.label { font-size: 12px; color: #666; margin-bottom: 6px }
.children { display: flex; gap: 8px; flex-wrap: wrap }
</style>
