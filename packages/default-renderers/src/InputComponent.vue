<template>
  <div class="form-input" v-bind="$attrs">
    <label v-if="label">{{ label }}</label>
    <input :type="type || 'text'" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  modelValue: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-input { display: flex; flex-direction: column; gap: 4px; }
.form-input label { font-size: 12px; color: #666; }
.form-input input { padding: 6px 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
</style>
