import { reactive } from 'vue'
import { v4 as uuid } from 'uuid' // npm i uuid

// 简单全局 store（你也可以用 Pinia）
const state = reactive({
  schema: [
    {
      id: 'root',
      type: 'container',
      props: { title: '页面容器' },
      editable: true,
      children: [
        {
          id: 'n1',
          type: 'box',
          props: { title: '可编辑 Box A', color: '#9ad' },
          editable: true,
        },
        {
          id: 'n11',
          type: 'box',
          props: { title: '可编辑 Box A1', color: '#9ad' },
          editable: true,
        },
        {
          id: 'n12',
          type: 'box',
          props: { title: '可编辑 Box A2', color: '#9ad' },
          editable: true,
        },
        {
          id: 'n2',
          type: 'box',
          props: { title: '不可编辑 Box B', color: 'rgb(145, 62, 104)' },
          // editable: false,
        },
         {
          id: 'n13',
          type: 'box',
          props: { title: '可编辑 Box A3', color: '#9ad' },
          editable: true,
        },
        {
          id: 'n14',
          type: 'input',
          props: { label: '用户名', placeholder: '请输入用户名', modelValue: '' },
          editable: true,
        },
        {
          id: 'n15',
          type: 'input',
          props: { label: '邮箱', placeholder: '请输入邮箱', type: 'email', modelValue: '' },
          editable: true,
        },
        {
          id: 'n16',
          type: 'select',
          props: { label: '城市', options: ['北京', '上海', '广州', '深圳'], modelValue: '' },
          editable: true,
        },
        {
          id: 'n3',
          type: 'container',
          props: { title: '嵌套容器' },
          editable: false,
          children: [
            {
              id: 'n4',
              type: 'box',
              props: { title: '嵌套的可编辑1', color: 'rgb(55, 214, 63)' },
              editable: true,
            },
            {
              id: 'n41',
              type: 'box',
              props: { title: '嵌套的可编辑2', color: 'rgb(79, 25, 84)' },
              editable: true,
            },
            {
              id: 'n42',
              type: 'box',
              props: { title: '嵌套的可编辑3', color: 'rgb(210, 34, 87)' },
              editable: true,
            },
          ],
        },
      ],
    },
  ],
  editingId: null,
})

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

export function useSchemaStore() {
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
      // 找到被移动的节点和目标节点
      const source = findNodeAndParent(state.schema, id)
      const target = findNodeAndParent(state.schema, targetId)
      if (!source || !target || !source.node || !target.node) return false
      if (source.node === target.node) return false // 不能拖到自己

      // 从原位置移除
      const [sourceParent, sourceIndex] = [source.parent, source.parent?.children?.findIndex(n => n.id === id) ?? -1]
      if (sourceIndex >= 0) {
        source.parent.children.splice(sourceIndex, 1)
      }

      // 插入到目标位置
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