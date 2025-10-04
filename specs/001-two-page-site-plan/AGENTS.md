# Agent Guidance – Two-Page Vibes Website

## Scope
These instructions apply to all files within `/specs/001-two-page-site-plan` and the implementation files listed in the plan when contributing to this feature.

## Key Expectations
- Maintain alignment with the vibe brief (`vibe-brief.md`) when creating or modifying UI copy, colors, or motion behaviors.
- Use native Svelte transitions (`svelte/transition`) before considering custom animation libraries.
- All CSS must be authored manually; do not introduce Tailwind or similar utility frameworks.
- Respect accessibility promises: keyboard navigability, visible focus, contrast checks, and reduced-motion fallbacks.
- Playwright tests must be updated alongside any change that affects navigation or page content.
- Keep documentation artifacts (research, quickstart) in sync with implementation changes.
