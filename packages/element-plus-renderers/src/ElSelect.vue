<template>
  <el-select v-bind="$attrs" :label="label">
    <el-option v-for="opt in options" :key="opt" :label="opt" :value="opt" />
  </el-select>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] },
})
</script>
