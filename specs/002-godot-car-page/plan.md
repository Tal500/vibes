# Implementation Plan · 002-godot-car-page

## Goal
Deliver a first-party driving showcase at `/drive` that builds the Godot "Vibe Rally" project from source during `npm run build`, serves the export from the SvelteKit app without cross-origin requirements, and exercises the experience with Playwright coverage (including the full-window presentation mode).

## Technical context & constraints
- **SvelteKit app** – Existing navigation shell lives in `src/routes/+layout.svelte`; the Drive page implementation is in `src/routes/drive/+page.svelte` with local state for touch hints and full-window overlay management.
- **Godot project** – Source files sit in `godot/truck-town/`. A Node script (`scripts/build-godot.mjs`) downloads the 4.2.2 CLI + export templates on demand and exports into `static/vibe-rally/` during the `prebuild` hook.
- **Hosting limitations** – Deployments run on Vercel without configurable COOP/COEP headers, so the export must avoid requiring SharedArrayBuffer/cross-origin isolation. The export preset must remain single-threaded and decline the thread-support variant so browsers without COOP/COEP still load successfully.
- **Testing** – End-to-end checks live under `tests/e2e/` and use Playwright. The suite runs against the production build output (`npm run test:e2e`).

## File touchpoints
```
godot/truck-town/export_presets.cfg   # Web export settings (thread support toggle, paths, canvas policy)
scripts/build-godot.mjs               # Build pipeline for fetching CLI/templates and exporting Web build
src/routes/drive/+page.svelte         # UI, guidance content, touch helpers, and full-window button logic
tests/e2e/drive.spec.ts               # Navigation, loading, and full-window Playwright assertions
specs/002-godot-car-page/**           # Spec-kit plan, task list, and contracts kept current with implementation
```

## Key behaviors & UX requirements
- Present the Drive hero section with instructions, touch helper toggle, and a "Focus game" button.
- Embed the Godot export via `<iframe>` that points at `/vibe-rally/index.html`; manage loading state and hide fallback link when full-window mode is active.
- Provide a full-window toggle that expands the iframe to fill the viewport, locks body scrolling, and restores focus/scroll when dismissed (via Escape or close button).
- Offer device-specific hints: keyboard mapping for desktop, touch guidance for mobile, and fallback messaging if WASM fails.

## Build & deployment requirements
- `scripts/build-godot.mjs` must be idempotent, cache downloads under `.godot/`, respect proxy env vars, and clean/recreate `static/vibe-rally/` per export.
- The Web preset must export with `variant/thread_support=false` (single-threaded) so COOP/COEP headers aren't required; keep `rendering/threads/thread_model=0`.
- Generated artifacts (`static/vibe-rally/*`) stay untracked via `.gitignore`; the repo stores only Godot source plus build script.

## Testing strategy
- Extend `tests/e2e/drive.spec.ts` to cover navigation, iframe readiness, touch toggle, and the full-window expand/collapse behavior.
- Ensure Playwright waits for the Godot canvas frame to render before asserting; use feature-detection-friendly selectors rather than brittle animation timings.
- Run `npm run build` and `npm run test:e2e` in CI/local verification.

## Documentation & spec-kit upkeep
- Keep this plan, the task list, and the Playwright contract aligned with the shipped implementation so future updates have accurate context.
- Note any host-specific constraints (cross-origin isolation, template caching) that motivated config choices within the plan/tasks files.
