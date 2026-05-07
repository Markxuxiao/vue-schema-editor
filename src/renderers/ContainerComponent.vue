<template>
  <div class="container-comp" v-bind="$attrs">
    <div class="label">{{ title }}</div>
    <div class="children"><slot /></div>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({ title: { type: String, default: 'Container' } })
</script>

<style>
.container-comp { border:1px dashed #ccc; padding:8px; border-radius:6px; min-width: 160px; min-height: 80px }
.label { font-size:12px; color:#666; margin-bottom:6px }
.children { display:flex; gap:8px; flex-wrap:wrap }
</style>