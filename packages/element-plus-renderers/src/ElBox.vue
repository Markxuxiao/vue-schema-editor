<template>
  <el-card class="el-box" v-bind="$attrs" :style="{ backgroundColor: color }">
    <template #header>
      <span>{{ title }}</span>
    </template>
    <slot />
  </el-card>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({
  title: { type: String, default: 'Box' },
  color: { type: String, default: '#409EFF' },
})
</script>

<style scoped>
.el-box { width: 180px; }
</style>
