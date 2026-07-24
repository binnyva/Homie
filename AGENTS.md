# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

Homie is a small Vue 3 home/start-page app. Users create blocks of links or HTML snippets, edit/reorder them, and persist the whole layout in `window.localStorage` under the `blocks` key. The app also supports import/export of the block JSON.

The project uses:

- Vue 3 with mostly Options API components
- Pinia for shared state in `src/store.ts`
- Vite for development and builds
- `vite-plugin-singlefile` so production output is bundled into a single HTML artifact
- Bootstrap and Bootstrap Icons for styling/icons
- `vue-draggable-plus` for drag-and-drop item ordering

## Key Files

- `src/main.ts`: App entrypoint; imports global CSS, Bootstrap CSS, Bootstrap Icons, creates Pinia, mounts `App`.
- `src/App.vue`: Loads persisted store data and renders all blocks, the new-block form, and settings.
- `src/store.ts`: Pinia store for blocks, items, edit mode, and localStorage persistence.
- `src/components/DataBlock.vue`: Renders a block, block editing/deletion, item drag ordering, and the new-item form.
- `src/components/BlockItem.vue`: Renders and edits individual link/html items.
- `src/components/NewBlock.vue`: Creates list or HTML blocks.
- `src/components/NewItem.vue`: Creates link or HTML items.
- `src/components/AppSettings.vue`: Edit-mode toggle plus import/export modal.
- `0Meta/blocks.json`: Example/exported block data. Treat as reference data unless the user asks to modify it.

## Commands

Use npm; this repo has a committed `package-lock.json`.

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build and type-check: `npm run build`
- Type-check only: `npm run type-check`
- Build only: `npm run build-only`
- Lint and auto-fix: `npm run lint`
- Format source: `npm run format`

There is no dedicated test script at the moment. For behavior changes, at minimum run `npm run build`; use the dev server for manual browser verification when UI/localStorage behavior is involved.

## Data Model

The store currently treats blocks and items loosely, but existing components expect these shapes:

```ts
type Block = {
  name: string;
  type: "list" | "html";
  html?: string;
  items: Item[];
};

type Item = {
  name?: string;
  url?: string;
  html?: string;
  type: "link" | "html";
};
```

Persistence is immediate for store actions that mutate blocks/items. If you change mutation behavior, keep `save()` calls in mind so user edits are not lost after refresh.

## Coding Conventions

- Follow the current component style: Vue Options API with `defineComponent`, and expose `useStore()` from `setup()` when a component needs shared state.
- Prefer the existing `@/` alias for imports from `src`.
- Keep store mutations centralized in `src/store.ts` where practical.
- Preserve localStorage compatibility with existing `blocks` JSON unless the user explicitly wants a migration.
- Use Bootstrap/Bootstrap Icons before adding new UI dependencies.
- Keep changes small and local; this is a compact app and does not need broad abstractions for simple features.
- Avoid committing generated `dist/` changes unless the user specifically asks for built artifacts.

## Known Issues / Sharp Edges

- `README.md` notes: "Saving new item in a block does not work." Check this before assuming item creation/edit flows are healthy.
- In `DataBlock.vue`, `BlockItem` is passed `:item_index="index"`, while `BlockItem.vue` declares an `itemIndex` prop. Vue prop casing normally maps kebab-case such as `item-index`, not snake_case. This is a likely source of item save/delete issues.
- Several components mutate props directly through `v-model` (`block.name`, `block.items`, `item.name`, etc.). This matches the current app style, but be careful when refactoring because it can affect persistence and Vue warnings.
- `AppSettings.vue` import replaces all stored blocks after confirmation. Validate imported JSON shape if you broaden import behavior.
- HTML blocks/items render with `v-html`; do not treat imported/shared JSON as trusted user-safe HTML without additional sanitization.

## Verification Checklist

For most changes:

1. Run `npm run build`.
2. If UI behavior changed, run `npm run dev` and manually check create/edit/delete/reorder flows.
3. Verify refresh persistence by checking that changes survive a page reload.
4. For import/export changes, test both valid JSON and invalid JSON paths.

When fixing the known new-item bug, specifically verify:

1. Add a list block.
2. Add a link item to it.
3. Refresh and confirm the item remains.
4. Edit the item text/URL.
5. Delete the item.
