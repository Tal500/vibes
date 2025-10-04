# Implementation Plan: Two-Page Vibes Website

**Branch**: `001-two-page-site-plan` | **Date**: 2024-05-31 | **Spec**: [Two-Page Vibes Website](spec.md)
**Input**: Feature specification from `/specs/001-two-page-site-plan/spec.md`

## Summary
Craft a minimal yet expressive SvelteKit 5 experience with exactly two routes—`/` and `/dummy`—that lean into a playful, vibe-coded narrative. Navigation must showcase a signature Svelte transition, use bespoke CSS (no Tailwind), and be validated through Playwright end-to-end tests executed locally and within GitHub Actions on every push to `master` and during pull requests.

## Technical Context
**Language/Version**: SvelteKit 5 (TypeScript)
**Primary Dependencies**: `@sveltejs/kit`, `@playwright/test`, `@sveltejs/vite-plugin-svelte`, `svelte` built-in transition utilities (e.g., `crossfade`, `scale`)
**Storage / Data Sources**: None (static content)
**Testing**: Playwright for e2e flows; Vitest optional (not in current scope)
**Target Platform**: Modern evergreen browsers on desktop and mobile
**Project Type**: Web (SvelteKit)
**Performance Goals**: Sub-2.5 s LCP on 4G, transitions at 60 fps, interactivity ready in <100 ms after hydration
**Constraints**: Custom-authored CSS only (no Tailwind), transitions must degrade gracefully, accessible color contrast AA+, CI must run Playwright on push/PR
**Scale/Scope**: Two SvelteKit routes with shared layout, one animated navigation interaction, small stylesheet (<10 KB)

## Principle Alignment Notes
- **Principle I – Vibe-Led Experience**: Develop a vibe brief (see `vibe-brief.md`) that defines palette, typography, and narrative cues. Route content should lean into a curious-explorer mood with animation telling the story. Navigation copy and hero elements must reinforce the vibe while keeping messaging concise for two-page scope.
- **Principle II – SvelteKit 5 + TypeScript**: Initialize a fresh SvelteKit 5 project with TypeScript strict mode, using `src/routes/+layout.svelte` for shared shell, page-specific `+page.svelte` files for `/` and `/dummy`, and `src/lib/styles` for modular CSS. Rely on native Svelte transitions to avoid extra libraries. Configure Playwright via SvelteKit's `create-svelte` tooling.
- **Principle III – Fluid Performance**: Keep assets inline or lightweight (SVG, gradients). Use CSS variables and GPU-friendly transforms for transitions. Ensure navigation uses `goto` with `prefetch` to minimize waiting. Capture performance notes in research and add CI caching to speed test runs.
- **Principle IV – Inclusive & Accessible Delight**: Ensure focus states remain visible during transitions, prefer transform-based animations with reduced-motion respect via `prefers-reduced-motion`. Provide semantic headings, alt text, and maintain at least 4.5:1 contrast. Document accessibility checks in contracts and quickstart.
- **Principle V – Authentic Interactivity & Testing**: Define Playwright contracts covering navigation animation, ARIA landmarks, and CI workflow. Tests will run locally via `npm run test:e2e` and in GitHub Actions using the official Playwright container. Include instructions in quickstart for running tests before commits.

## Constitution Check
- **Principle I — Vibe Definition**: ✅ Vibe brief captures mood, color, and storytelling anchors to guide component design.
- **Principle II — Stack Alignment**: ✅ Plan uses SvelteKit 5 scaffolding with TypeScript, no conflicting CSS frameworks.
- **Principle III — Performance Budget**: ✅ Research outlines transition techniques and asset constraints to keep interactions smooth.
- **Principle IV — Accessibility**: ✅ Plan enforces reduced-motion support, keyboard navigation, and contrast checks documented in contracts.
- **Principle V — Testing Discipline**: ✅ Playwright-first workflow with CI enforcement described and quickstart instructions prepared.

## Project Structure

### Documentation (this feature)
```
specs/001-two-page-site-plan/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── vibe-brief.md
├── AGENTS.md
└── contracts/
    └── navigation.md
```

### Source Code (repository root)
```
/
├── package.json            # Created via create-svelte
├── playwright.config.ts
├── src/
│   ├── app.d.ts
│   ├── lib/
│   │   └── styles/
│   │       ├── animations.css
│   │       └── theme.css
│   └── routes/
│       ├── +layout.svelte
│       ├── +layout.ts (if load guard needed)
│       ├── +page.svelte (index)
│       └── dummy/
│           └── +page.svelte
├── static/
│   └── favicon.png
└── tests/
    └── e2e/
        └── navigation.spec.ts
```

## Phase 0 – Research Highlights
See `research.md` for:
- Transition exploration comparing `crossfade` vs. custom `fly/scale` combo with reduced-motion fallback.
- Accessibility checklist for animated navigation and focus management.
- CI considerations (Playwright dependencies, caching strategies).

## Phase 1 – Design & Prototyping Outputs
- `vibe-brief.md`: Defines narrative, palette, typography, and motion language.
- `data-model.md`: Documents minimal state (active page context, motion preferences) and shared layout structure.
- `contracts/navigation.md`: Describes expected Playwright scenarios (page load, animated navigation, reduced-motion).
- `quickstart.md`: Provides setup commands, dev server instructions, testing scripts, and CI tips.
- `AGENTS.md`: Guidance for contributors/agents implementing the feature.

## Phase 2 – Task Generation Approach (Preview)
Tasks will be grouped into setup (project scaffolding, configuration), tests-first (Playwright spec + snapshots), implementation (layouts, pages, transitions, CSS), integration (CI workflow authoring), and polish (accessibility verification, documentation). Tests will be committed before implementation to honor TDD expectations.

## Phase 3.1: Setup
- [ ] T001 Initialize SvelteKit 5 project with TypeScript using `npm create svelte@latest` in repo root and configure Playwright support.
- [ ] T002 Configure project scripts (`package.json`) for linting, build, and Playwright (`test:e2e`).
- [ ] T003 Create base layout shell `src/routes/+layout.svelte` with shared navigation linking index and dummy pages.
- [ ] T004 Author global theme file `src/lib/styles/theme.css` defining palette, typography, and CSS variables.

## Phase 3.2: Tests First (TDD)
- [ ] T005 Write Playwright spec `tests/e2e/navigation.spec.ts` covering home rendering, navigation to dummy page, and animation assertions (including reduced-motion toggle).
- [ ] T006 Configure Playwright test runner (`playwright.config.ts`) with project-specific settings and add npm script.

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T007 Implement index page content in `src/routes/+page.svelte` leveraging theme tokens and motion classes.
- [ ] T008 Implement dummy page content in `src/routes/dummy/+page.svelte` mirroring vibe narrative.
- [ ] T009 Create animation styles in `src/lib/styles/animations.css` and wire Svelte transitions (with reduced-motion guard) into layout/pages.
- [ ] T010 Import theme/animation CSS into layout and ensure focus management + accessible landmarks.

## Phase 3.4: Integration
- [ ] T011 Author GitHub Actions workflow `.github/workflows/ci.yml` running install, build, and `npm run test:e2e` on push to `master` and pull requests.
- [ ] T012 Update repository README with setup, run, and CI status instructions referencing the new vibe experience.

## Phase 3.5: Polish
- [ ] T013 Validate accessibility manually (keyboard nav, contrast) and document results in `specs/001-two-page-site-plan/research.md`.
- [ ] T014 Capture screenshots or GIF for PR (optional) and confirm Playwright in CI passes reliably.
- [ ] T015 Final Playwright regression run locally and attach summary to PR notes.

## Dependencies
- Setup tasks (T001–T004) must complete before Playwright spec due to project scaffolding.
- Tests (T005–T006) must exist and fail before implementing pages (T007–T010).
- GitHub Actions workflow (T011) depends on Playwright script availability (T006) and implemented pages (T007–T010) for stable runs.
- README updates (T012) and polish tasks (T013–T015) occur after implementation and CI configuration.

## Parallel Example
```
After scaffolding, run in parallel:
- Write Playwright config (T006)
- Draft theme CSS tokens (T004)
```

## Notes
- Respect `prefers-reduced-motion` in transitions and ensure Playwright toggles this flag for coverage.
- Keep CSS modular; import from `src/lib/styles` using `+layout.svelte` to share tokens.
- Commit after each major task to maintain traceability and align with testing discipline.

## Task Generation Rules Confirmation
- All interactive features (navigation, transitions) have matching Playwright coverage.
- Accessibility and performance mitigations tracked in research/polish tasks.
- Parallelizable tasks only operate on distinct files or configs.
