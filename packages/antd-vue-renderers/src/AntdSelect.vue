<template>
  <a-select v-bind="$attrs" :label="label" style="width: 200px">
    <a-select-option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</a-select-option>
  </a-select>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] },
})
</script>
