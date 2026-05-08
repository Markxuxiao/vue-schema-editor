<template>
  <el-container class="el-container" v-bind="$attrs">
    <el-header style="font-size:12px;color:#666">{{ title }}</el-header>
    <el-main class="children"><slot /></el-main>
  </el-container>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({ title: { type: String, default: '容器' } })
</script>

<style scoped>
.el-container { border: 1px dashed #ccc; border-radius: 6px; min-width: 160px; min-height: 80px; padding: 8px; }
.children { display: flex; gap: 8px; flex-wrap: wrap; padding: 8px 0; }
</style>
