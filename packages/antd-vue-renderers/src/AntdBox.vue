<template>
  <a-card class="antd-box" v-bind="$attrs" :style="{ backgroundColor: color }">
    <template #title>{{ title }}</template>
    <slot />
  </a-card>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({
  title: { type: String, default: 'Box' },
  color: { type: String, default: '#1890ff' },
})
</script>

<style scoped>
.antd-box { width: 180px; }
</style>
