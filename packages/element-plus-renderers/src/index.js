import ElBox from './ElBox.vue'
import ElContainer from './ElContainer.vue'
import ElInput from './ElInput.vue'
import ElSelect from './ElSelect.vue'
import ElTable from './ElTable.vue'
import ElTableColumn from './ElTableColumn.vue'

export const RENDERER_REGISTRY = {
  box: ElBox,
  container: ElContainer,
  input: ElInput,
  select: ElSelect,
  table: ElTable,
  'table-column': ElTableColumn,
}

export const DEFAULTS = {
  box: { title: '新 Box', color: '#409EFF' },
  container: { title: '新容器' },
  input: { label: '新输入框', placeholder: '请输入' },
  select: { label: '新选择框', options: ['选项1', '选项2'] },
  table: { title: '新表格' },
  'table-column': { label: '新列' },
}

export const ALLOWED_CHILDREN = {
  table: ['table-column'],
}
