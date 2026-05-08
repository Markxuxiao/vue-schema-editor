import AntdBox from './AntdBox.vue'
import AntdContainer from './AntdContainer.vue'
import AntdInput from './AntdInput.vue'
import AntdSelect from './AntdSelect.vue'
import AntdTable from './AntdTable.vue'
import AntdTableColumn from './AntdTableColumn.vue'

export const RENDERER_REGISTRY = {
  box: AntdBox,
  container: AntdContainer,
  input: AntdInput,
  select: AntdSelect,
  table: AntdTable,
  'table-column': AntdTableColumn,
}

export const DEFAULTS = {
  box: { title: '新 Box', color: '#1890ff' },
  container: { title: '新容器' },
  input: { label: '新输入框', placeholder: '请输入' },
  select: { label: '新选择框', options: ['选项1', '选项2'] },
  table: { title: '新表格' },
  'table-column': { label: '新列' },
}

export const ALLOWED_CHILDREN = {
  table: ['table-column'],
}
