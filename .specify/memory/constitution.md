<!--
Sync Impact Report
Version change: N/A → 1.0.0
Modified principles: Added core principles I–V
Added sections: Experience Composition Standards; Delivery Workflow & Quality Gates
Removed sections: None
Templates requiring updates:
  ✅ .specify/templates/plan-template.md
  ✅ .specify/templates/tasks-template.md
  ✅ .specify/templates/spec-template.md
Follow-up TODOs: None
-->

# Vibes Constitution

## Core Principles

### I. Vibe-Led Experience Design (NON-NEGOTIABLE)
Every page MUST communicate a clear "vibe" through coherent copy, motion, color, and audio/visual assets. Plans MUST state the desired emotional outcome, the interactive elements that reinforce it, and how success will be observed (e.g., animation triggers, responsive copy). Implementation MAY NOT ship half-themed placeholders; incomplete vibes return to design until the full mood is delivered.

### II. SvelteKit 5 + TypeScript Foundation
All production code MUST be authored in SvelteKit 5 with TypeScript enabled. Use official SvelteKit routing, load functions, and server endpoints; no ad-hoc bundlers or vanilla HTML islands. Shared UI primitives belong in `src/lib/`, and feature pages live under `src/routes/` with co-located assets. Third-party libraries MUST justify how they elevate the vibe without bloating the bundle.

### III. Fluid Performance & Responsiveness
Each vibe MUST feel effortless on mobile and desktop: core interactions target <100 ms input response, <2.5 s Largest Contentful Paint on 4G, and maintain 60 fps animations on modern hardware. Plans MUST declare performance risks and mitigation (code splitting, lazy loading, request caching). Shipping work requires confirming Core Web Vitals budgets via Lighthouse or Playwright traces.

### IV. Inclusive & Accessible Delight
Vibes MUST remain usable for everyone. Provide keyboard navigation, visible focus states, color-contrast-compliant palettes (WCAG AA minimum), and accessible alternative text or transcripts for sensory media. Any intentional sensory overload requires an opt-in or bypass. Accessibility checks MUST be documented before release.

### V. Authentic Interactivity & Testing Discipline
Each vibe-coded app MUST include at least one meaningful interaction or demo that reflects the theme (e.g., mini-game, generative art, reactive soundscape) validated by automated tests. Write component/unit tests (Vitest) and end-to-end flows (Playwright) before final implementation changes. Visual regressions require Storybook or screenshot baselines when animation timing is critical.

## Experience Composition Standards
- Maintain a shared design token system for color, typography, spacing, and motion curves in `src/lib/theme/` so vibes feel unique yet cohesive.
- Media assets (audio, video, shaders) live under `static/` with metadata describing licensing and compression settings.
- Dark/light variants MUST be handled explicitly: either provide both or document why a single mode preserves the vibe.
- Localization scaffolding (i18n-ready copy blocks) SHOULD be used so vibes can expand globally without structural changes.

## Delivery Workflow & Quality Gates
1. Start every feature with a vibe brief describing mood words, reference inspirations, and primary interaction goals.
2. During planning, capture risk spikes (performance, accessibility, asset pipeline) and outline mitigation tasks tied to tests.
3. Implement via feature branches; commit after tests. Keep layout/animation tweaks isolated for targeted review.
4. Run automated Vitest + Playwright suites plus Lighthouse audits in CI before merging. Document results in the PR.
5. Peer review MUST cover vibe fidelity, accessibility, and performance budget compliance before approval.

## Governance
- This constitution supersedes other guidelines. Every plan, spec, and implementation MUST cite how it honors Principles I–V.
- Amendments require consensus from project maintainers plus evidence from at least one shipped vibe showing why change is necessary.
- Versioning follows Semantic Versioning. Major bumps for principle changes/removals, minor for new principles or sections, patch for clarifications.
- Compliance is reviewed quarterly. Any deviations demand remediation tasks tracked to completion before the next release cycle.

**Version**: 1.0.0 | **Ratified**: 2025-10-04 | **Last Amended**: 2025-10-04
