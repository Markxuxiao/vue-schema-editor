<template>
  <el-table-column v-bind="$attrs" :label="label" />
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({ label: { type: String, default: '列' } })
</script>
