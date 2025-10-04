# Implementation Plan · 002-godot-car-page

## Goal
Create a new showcase page in the SvelteKit app that embeds a Godot-powered car driving experience, works well on desktop and touch devices, and is covered by end-to-end tests.

## Tech stack & integration notes
- **Frontend**: Existing SvelteKit 2 + TypeScript project using Svelte components and static assets served from `static/`.
- **Game runtime**: Use an exported Godot Web build (HTML/JS/WASM/PCK) served from `static/` to keep everything same-origin so keyboard events flow correctly.
- **Layout**: Reuse existing site chrome from `src/routes/+layout.svelte`; add a new navigation link that points to the new game route.
- **Testing**: Extend Playwright suite (`tests/`) with scenarios that visit the new page, confirm the iframe/embedded canvas is ready, and simulate basic interactions such as focusing the canvas and toggling touch controls overlay.

## File structure changes
```
static/
  truck-town/…        # Godot export assets (HTML, JS, PCK, WASM, icons, manifest)
src/routes/
  drive/+page.svelte  # New route with responsive layout and instructions
tests/
  drive.spec.ts       # Playwright coverage for navigation + runtime smoke checks
```

## Page behavior & UX
- Provide a hero section with page title, description, and quick instruction summary.
- Embed the Godot export inside a responsive container using `<iframe>` pointed at `/truck-town/index.html`.
- Overlay an optional touch control helper UI (e.g., virtual buttons that explain gestures) and ensure keyboard users can focus the iframe via a dedicated button.
- Provide fallback content when WebAssembly fails to load, prompting users to try a different browser/device.
- Keep layout accessible: label the iframe, provide alt text, ensure color contrast, and respect reduced motion preference.

## Responsive strategy
- Use CSS grid/flex to stack info and iframe on narrow screens, and place them side-by-side on large screens.
- Maintain a 16:9 aspect ratio wrapper for the game iframe while allowing it to expand to available width.
- Include toggles for "Show touch controls" that display overlay instructions for phone/tablet users.

## Testing strategy
- Playwright test navigates from home nav link to the drive page and verifies the iframe has loaded the Godot canvas by waiting for the `<canvas>` within the iframe's content document.
- Validate that the touch controls toggle reveals helper content and is keyboard accessible.
- Ensure the nav highlight works for the new route.

## Out of scope
- Deep integration with the Godot game internals (no modifications to the PCK/WASM other than hosting).
- Full gameplay automation (Playwright smoke-check only verifies rendering + UI helpers).

