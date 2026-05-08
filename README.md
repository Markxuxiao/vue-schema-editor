# vue-schema-editor

Vue 3 Schema 可视化编辑器，支持拖拽排序、原地编辑、动态添加组件。

## 功能特性

- **拖拽排序** — 任意可编辑节点可通过拖拽手柄重新排序
- **原地编辑** — 点击编辑按钮，在侧边面板修改节点属性
- **添加组件** — 鼠标悬停容器，点击「+」添加新节点；类型选择器根据容器类型过滤选项
- **递归嵌套** — 节点支持 `children[]`，可嵌套任意层级
- **易于扩展** — 在 `src/renderers/` 新增组件类型并在 `RENDERER_REGISTRY` 注册即可

## 组件类型

| 类型 | 说明 | 容器 |
|------|------|------|
| `box` | 带标题的彩色方块 | 否 |
| `container` | flex 容器 | 是 |
| `input` | 表单输入框 | 否 |
| `select` | 下拉选择框 | 否 |
| `table` | 表格容器 | 是（仅接受 `table-column`） |
| `table-column` | 表格列 | 否 |

## 快速开始

```bash
npm install
npm run dev
```

打开 http://localhost:5173

## 构建

```bash
npm run build
npm run preview
```

## 项目结构

```
src/
├── core/                    # 核心编辑引擎
│   ├── store.js             # Schema 状态、CRUD、moveNode、addNode
│   ├── SchemaRenderer.vue   # 递归类型 → 组件映射器
│   ├── Overlay.vue          # 悬停高亮、拖拽/添加/编辑 UI
│   └── EditorPanel.vue      # 属性编辑侧边栏
├── renderers/               # 组件类型实现
│   ├── index.js             # RENDERER_REGISTRY
│   ├── BoxComponent.vue
│   ├── ContainerComponent.vue
│   ├── InputComponent.vue
│   ├── SelectComponent.vue
│   ├── TableComponent.vue
│   └── TableColumnComponent.vue
├── App.vue                  # 根组件，定义初始 schema
└── main.js
```

## Schema 节点结构

```js
{
  id: 'unique-id',
  type: 'box',          // 对应 RENDERER_REGISTRY 中的 key
  props: { title: '...', color: '#9ad' },
  editable: true,       // 是否启用悬停 UI 和拖拽
  children: []          // 仅容器类型支持
}
```
