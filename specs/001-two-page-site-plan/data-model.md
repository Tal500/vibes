# Phase 1: Data & Interaction Model

## Route Structure
- `/` – Home/index page presenting hero message, vibe summary, and navigation button to dummy page.
- `/dummy` – Secondary page extending the vibe narrative with complementary content and link back home.

## Shared Layout State
- **Navigation Links**: Array of route descriptors used by layout to render nav UI.
- **Transition Context**: Svelte store or module exporting transition handlers (e.g., `createCrossfade`) shared across pages via layout.
- **Reduced Motion Preference**: Derived from `prefers-reduced-motion` media query; stored in a reactive boolean to bypass transitions when true.

## Components & Assets
- `src/routes/+layout.svelte`: Wraps page content, imports theme/animation CSS, renders `<nav>` with interactive elements, and applies transitions to page slot.
- `src/routes/+page.svelte`: Home page component referencing layout-provided transition and theme tokens.
- `src/routes/dummy/+page.svelte`: Dummy page component with complementary copy and navigation.
- `src/lib/styles/theme.css`: CSS variables for colors, typography, spacing.
- `src/lib/styles/animations.css`: Transition classes (duration, easing), reduced-motion overrides.

## Testing Contracts Mapping
- Each route ensures hero heading renders with accessible text (`getByRole('heading', { level: 1 })`).
- Navigation actions emit transition start/end states tracked via Playwright wait conditions.
- Reduced-motion mode toggled via `page.emulateMedia({ reducedMotion: 'reduce' })` verifying immediate navigation without animation delays.

## Data Dependencies
- No remote data. Content stored within Svelte components.
- Potential future extension: load vibe metadata from static JSON; plan leaves hook points via layout script.
