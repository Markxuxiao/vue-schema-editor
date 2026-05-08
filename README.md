# vue-schema-editor

Vue 3 schema editor with drag-to-reorder, in-place editing, and dynamic component addition.

## Features

- **Drag to reorder** — drag handle on any editable node to reposition siblings
- **In-place editing** — click the edit button to modify node props via the side panel
- **Add components** — hover a container and click `+` to add new nodes; type picker filters by container capability
- **Recursive schema** — nodes support `children[]` for nested structures
- **Extensible** — add new component types in `src/renderers/` and register them in `RENDERER_REGISTRY`

## Component Types

| Type | Description | Container |
|------|-------------|-----------|
| `box` | Colored box with title | No |
| `container` | Flex-wrap container | Yes |
| `input` | Form input with label | No |
| `select` | Dropdown select with label | No |
| `table` | Table container | Yes (only accepts `table-column`) |
| `table-column` | Table column with label | No |

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Architecture

```
src/
├── core/                    # Editing engine
│   ├── store.js             # Schema state, CRUD, moveNode, addNode
│   ├── SchemaRenderer.vue   # Recursive type → component mapper
│   ├── Overlay.vue          # Hover highlight, drag/add/edit UI
│   └── EditorPanel.vue      # Property editor sidebar
├── renderers/               # Component type implementations
│   ├── index.js             # RENDERER_REGISTRY
│   ├── BoxComponent.vue
│   ├── ContainerComponent.vue
│   ├── InputComponent.vue
│   ├── SelectComponent.vue
│   ├── TableComponent.vue
│   └── TableColumnComponent.vue
├── App.vue                  # Root component, defines initial schema
└── main.js
```

## Schema Node Structure

```js
{
  id: 'unique-id',
  type: 'box',          // maps to RENDERER_REGISTRY entry
  props: { title: '...', color: '#9ad' },
  editable: true,       // enables hover UI and drag
  children: []          // only for container/table types
}
```
