# Phase 0 Research – Two-Page Vibes Website

## Transition Exploration
- **Native `crossfade` pairs**: Offers seamless blend between index and dummy hero sections. Requires keyed components and shared context but minimal custom code. Plan to export `crossfade` transition from `svelte/transition` with custom easing/duration.
- **`fly` + `scale` combo**: Provides playful entrance/exit but risks motion sickness if overused. Could be applied to page wrapper with `prefers-reduced-motion` guard.
- **Chosen Approach**: Use `crossfade` for primary route transitions supplemented by subtle opacity/scale adjustments. Provide reduced-motion fallback using CSS to skip animation while maintaining layout.

## Accessibility Considerations
- Respect `prefers-reduced-motion: reduce` by disabling animations and ensuring navigation still shows focus and content updates.
- Maintain logical heading hierarchy (`<h1>` per page) and ARIA landmarks (`<main>`, `<nav>`).
- Ensure interactive elements have focus outlines matching theme contrast.
- Test keyboard navigation while transition runs to verify focus is preserved.

## CI & Tooling Notes
- Initialize Playwright via `npm create svelte@latest` optional flag or run `npx playwright install --with-deps` during setup.
- Use GitHub Actions `microsoft/playwright-github-action` or manual install to ensure browsers available.
- Cache `node_modules` using `actions/setup-node` with npm cache for faster runs.
- Configure Playwright command `npm run test:e2e` to fail fast with trace on failure for debugging.

## Open Questions & Mitigations
- **Asset Needs**: Using CSS gradients and inline SVG to avoid large downloads. No external fonts unless available via system stack.
- **Responsive Layout**: Plan to use CSS clamp() for typography and flexbox layout to ensure small-screen readability.
- **Future Extensibility**: Document in README how to add additional vibe pages while keeping transitions scalable.
