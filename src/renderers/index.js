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
