<template>
  <el-table class="el-table" v-bind="$attrs">
    <template #header>
      <span>{{ title }}</span>
    </template>
    <slot />
  </el-table>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({ title: { type: String, default: '表格' } })
</script>

<style scoped>
.el-table { width: 300px; }
</style>
