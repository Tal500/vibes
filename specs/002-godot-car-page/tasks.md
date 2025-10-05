# Task List · 002-godot-car-page

## Setup & research
- [X] T1 · Analyze existing navigation/layout code and confirm requirements for adding the Drive destination.
- [X] T2 · Capture Godot Web export requirements (CLI download, template paths, hosting constraints) and document them in spec-kit files.

## Godot build pipeline
- [X] T3 · Add the `godot/truck-town` source project and configure export presets targeting `static/vibe-rally/`.
- [X] T4 · Author `scripts/build-godot.mjs` to download the CLI/templates, respect proxy env vars, and export during `npm run build`.
- [X] T5 · Ensure the Web preset disables thread support (`variant/thread_support=false`) so the export runs without COOP/COEP headers.

## SvelteKit experience
- [X] T6 · Implement `/drive` route content with instructions, touch helper toggle, fallback messaging, and iframe embed.
- [X] T7 · Add full-window overlay controls with focus/scroll management and Escape handling.

## Testing & quality
- [X] T8 · Cover navigation, loading, touch toggle, and full-window flows in `tests/e2e/drive.spec.ts`.
- [X] T9 · Re-run `npm run build` and `npm run test:e2e` after thread-support updates to confirm regression-free behavior.

## Spec-kit maintenance
- [X] T10 · Update plan, task list, and Playwright contract to reflect the current implementation (source-built Godot, full-window mode, thread-support change).
