<template>
  <div>
    <template v-for="node in nodes" :key="node.id">
      <component
        :is="componentFor(node.type)"
        v-bind="node.props"
        v-if="!node._hidden"
        :data-editable-id="node.editable ? node.id : undefined"
        class="render-node"
      >
        <template v-if="node.children">
          <SchemaRenderer :nodes="node.children" />
        </template>
      </component>
    </template>
  </div>
</template>

<script setup>
import SchemaRenderer from './SchemaRenderer.vue'
import { RENDERER_REGISTRY } from '../renderers/index.js'
import { defineProps } from 'vue'

const props = defineProps({ nodes: Array })

function componentFor(type) {
  return RENDERER_REGISTRY[type] ?? 'div'
}
</script>

<style>
.render-node { display: inline-block; margin:8px; }
</style>