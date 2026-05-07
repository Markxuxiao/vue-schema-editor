import { reactive } from 'vue'

let state = null

function findNodeAndParent(nodes, id, parent = null) {
  for (const n of nodes) {
    if (n.id === id) return { node: n, parent }
    if (n.children) {
      const r = findNodeAndParent(n.children, id, n)
      if (r) return r
    }
  }
  return null
}

export function useSchemaStore(initialSchema) {
  if (!state) {
    state = reactive({
      schema: initialSchema ?? [],
      editingId: null,
    })
  } else if (initialSchema != null) {
    state.schema = initialSchema
  }

  return {
    get schema() { return state.schema },
    get editingId() { return state.editingId },
    openEditor(id) { state.editingId = id },
    closeEditor() { state.editingId = null },
    getNode(id) {
      const r = findNodeAndParent(state.schema, id)
      return r?.node ?? null
    },
    updateNodeProps(id, newProps) {
      const r = findNodeAndParent(state.schema, id)
      if (!r || !r.node) return false
      r.node.props = { ...r.node.props, ...newProps }
      return true
    },
    moveNode(id, targetId, position) {
      const source = findNodeAndParent(state.schema, id)
      const target = findNodeAndParent(state.schema, targetId)
      if (!source || !target || !source.node || !target.node) return false
      if (source.node === target.node) return false

      const sourceIndex = source.parent?.children?.findIndex(n => n.id === id) ?? -1
      if (sourceIndex >= 0) {
        source.parent.children.splice(sourceIndex, 1)
      }

      const targetIndex = target.parent?.children?.findIndex(n => n.id === targetId) ?? -1
      if (targetIndex >= 0) {
        if (position === 'left') {
          target.parent.children.splice(targetIndex, 0, source.node)
        } else {
          target.parent.children.splice(targetIndex + 1, 0, source.node)
        }
      }
      return true
    },
  }
}