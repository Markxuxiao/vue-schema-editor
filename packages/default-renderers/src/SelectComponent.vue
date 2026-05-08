<template>
  <div class="form-select" v-bind="$attrs">
    <label v-if="label">{{ label }}</label>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-select { display: flex; flex-direction: column; gap: 4px; }
.form-select label { font-size: 12px; color: #666; }
.form-select select { padding: 6px 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; background: white; }
</style>
