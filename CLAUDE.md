# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue 3 schema renderer demo with drag-to-reorder and editable components. Renders a tree-based schema where each node has a type, props, and optional children.

## Commands

```bash
npm run dev      # Start dev server
npm run build   # Production build
npm run preview # Preview production build
```

## Architecture

**Schema Tree Structure** - Nodes have `id`, `type`, `props`, `editable`, `children[]`. Recursive `SchemaRenderer` maps `type` to Vue components.

**Component Mapping** - `renderers/index.js` exports `RENDERER_REGISTRY`. SchemaRenderer uses it to resolve `type` → component. Add new types here without touching core files.

**Node Identification** - Uses `data-editable-id` on rendered elements for hover/drag detection. `data-editable-ignore` excludes child elements (buttons, panels) from the hover highlight system.

**Overlay System** (`Overlay.vue`) - Fixed-position overlay handles:
- Hover highlighting via `pointermove` listener
- Edit button (opens EditorPanel)
- Drag handle (triggers reorder via `moveNode` store action)
- Insert indicator and drag ghost during drag operations

**Store** (`core/store.js`) - `useSchemaStore(initialSchema)` accepts the schema as a parameter, making the store reusable across different pages with different schemas. Key methods: `getNode`, `updateNodeProps`, `moveNode` (handles sibling reordering via splice), `openEditor`/`closeEditor`.

**Drag-to-Reorder Logic** - `Overlay.vue` computes editable siblings, determines left/right position relative to target center, then calls `store.moveNode(id, targetId, position)`.
