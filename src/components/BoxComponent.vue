<template>
  <div class="box" :style="{ background: color }" v-bind="$attrs">
    <div class="title">{{ title }}</div>
    <slot />
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
const props = defineProps({
  title: { type: String, default: 'Box' },
  color: { type: String, default: '#dde' },
})
</script>

<style>
.box { width:160px; height:80px; border-radius:6px; padding:8px; box-shadow:0 1px 3px rgba(0,0,0,0.08); color:#222 }
.title { font-weight:600; font-size:14px }
</style>