<template>
  <a-table-column v-bind="$attrs" :title="label" />
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({ label: { type: String, default: '列' } })
</script>
