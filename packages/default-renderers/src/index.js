import BoxComponent from './BoxComponent.vue'
import ContainerComponent from './ContainerComponent.vue'
import InputComponent from './InputComponent.vue'
import SelectComponent from './SelectComponent.vue'
import TableComponent from './TableComponent.vue'
import TableColumnComponent from './TableColumnComponent.vue'

export const RENDERER_REGISTRY = {
  box: BoxComponent,
  container: ContainerComponent,
  input: InputComponent,
  select: SelectComponent,
  table: TableComponent,
  'table-column': TableColumnComponent,
}

export const DEFAULTS = {
  box: { title: '新 box', color: '#9ad' },
  container: { title: '新容器' },
  input: { label: '新输入框', placeholder: '请输入', modelValue: '' },
  select: { label: '新选择器', options: ['选项1', '选项2'], modelValue: '' },
  table: { title: '新表格' },
  'table-column': { label: '新列' },
}

export const ALLOWED_CHILDREN = {
  table: ['table-column'],
}
