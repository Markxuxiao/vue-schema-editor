<template>
  <el-input v-bind="$attrs" :type="type || 'text'" :placeholder="placeholder" :label="label" />
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
})
</script>
