<template>
  <a-table class="antd-table" v-bind="$attrs" :title="title" />
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({ title: { type: String, default: '表格' } })
</script>

<style scoped>
.antd-table { width: 300px; }
</style>
