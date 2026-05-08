<template>
  <div class="table-col" v-bind="$attrs">
    <div class="col-label">{{ label }}</div>
    <slot />
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({ label: { type: String, default: '列' } })
</script>

<style scoped>
.table-col { border: 1px solid #ddd; border-radius: 4px; padding: 6px 8px; min-width: 80px; background: #fafafa }
.col-label { font-size: 12px; color: #666; margin-bottom: 4px }
</style>
