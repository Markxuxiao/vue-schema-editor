<template>
  <a-input v-bind="$attrs" :placeholder="placeholder" />
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
})
</script>
