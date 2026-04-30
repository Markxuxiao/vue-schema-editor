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
import BoxComponent from './BoxComponent.vue'
import ContainerComponent from './ContainerComponent.vue'
import InputComponent from './InputComponent.vue'
import SelectComponent from './SelectComponent.vue'
import { defineProps } from 'vue'

const props = defineProps({ nodes: Array })

function componentFor(type) {
  if (type === 'box') return BoxComponent
  if (type === 'container') return ContainerComponent
  if (type === 'input') return InputComponent
  if (type === 'select') return SelectComponent
  return 'div'
}
</script>

<style>
.render-node { display: inline-block; margin:8px; }
</style>