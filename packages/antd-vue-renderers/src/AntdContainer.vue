<template>
  <a-card class="antd-container" v-bind="$attrs">
    <template #title>{{ title }}</template>
    <div class="children"><slot /></div>
  </a-card>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({ title: { type: String, default: '容器' } })
</script>

<style scoped>
.antd-container { border: 1px dashed #ccc; min-width: 160px; min-height: 80px; }
.children { display: flex; gap: 8px; flex-wrap: wrap; padding-top: 8px; }
</style>
