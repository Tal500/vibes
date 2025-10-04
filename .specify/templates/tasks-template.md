# Implementation Tasks: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE]
**Input**: `/specs/[###-feature-name]/plan.md`

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract vibe objective, stack, tests, and asset needs
2. Load supporting documents when present:
   → research.md → unresolved risks / experiments
   → data-model.md → stores, state machines, data contracts
   → contracts/ → Playwright flows or API stubs
   → vibe-brief.md → mood anchors, accessibility promises
3. Derive tasks grouped by Constitution principles:
   → Vibe design, stack alignment, performance, accessibility, testing
4. Validate test-first ordering
   → Vitest/Playwright/visual baselines before implementation tasks
5. Expand each task with exact file paths, acceptance notes, and dependency hints
6. Mark `[P]` for tasks in different files with no blocking relationship
7. Generate dependency graph & parallel execution examples
8. Confirm gates (tests planned, performance/accessibility covered, assets sourced)
9. Return SUCCESS with ordered task list
```

## Format: `[ID] [P?] Description — Acceptance`  *(include acceptance notes when clarifying success criteria)*
- **[P]**: Task can run in parallel (different file/asset, no dependency)
- Prefix tests with "Test:" and implementation with "Implement:" when useful

## Task List

### Phase 3.1 — Setup & Vibe Foundations
- [ ] T001 Establish feature route skeleton in `src/routes/[vibe]/` — Acceptance: route loads layout + placeholder content referencing vibe brief
- [ ] T002 Configure/extend shared tokens in `src/lib/theme/` — Acceptance: tokens include palette, typography, motion easing for vibe
- [ ] T003 [P] Import/compress assets into `static/[vibe]/` — Acceptance: assets optimized (<500 KB each unless justified) with metadata file
- [ ] T004 [P] Document vibe brief in `specs/[###-feature]/vibe-brief.md` — Acceptance: includes mood words, success signals, accessibility considerations

### Phase 3.2 — Tests First (Vitest / Playwright / Visual)
- [ ] T005 Create Vitest failing spec for core component in `tests/unit/[vibe].test.ts` — Acceptance: asserts interaction contract from plan
- [ ] T006 Author Playwright journey for hero interaction in `tests/e2e/[vibe].spec.ts` — Acceptance: covers keyboard + pointer flows, fails before implementation
- [ ] T007 [P] Capture baseline visuals in `tests/visual/[vibe].md` or Storybook scenario — Acceptance: includes screenshot command + diff threshold
- [ ] T008 [P] Add accessibility smoke test in `tests/e2e/[vibe].accessibility.spec.ts` — Acceptance: uses axe or aria audit, fails on WCAG violations

### Phase 3.3 — Core Implementation
- [ ] T009 Implement vibe page structure in `src/routes/[vibe]/+page.svelte` — Acceptance: renders planned layout regions with semantic markup
- [ ] T010 Wire interaction state/store in `src/lib/stores/[vibe].ts` — Acceptance: exposes reactive API used by page + tests
- [ ] T011 Animate transitions respecting performance budgets — Acceptance: animation timings logged in comments + measured via requestAnimationFrame probe
- [ ] T012 Integrate media/assets with lazy loading in `src/routes/[vibe]/+page.ts` or loaders — Acceptance: ensures LCP asset <2.5 s on 4G simulation

### Phase 3.4 — Integration & Performance
- [ ] T013 Connect external data/API in `src/routes/[vibe]/+page.server.ts` — Acceptance: data fetching cached or streamed per plan
- [ ] T014 Implement performance guards (code splitting, preloading strategy) — Acceptance: documented in plan + validated by Lighthouse script
- [ ] T015 Harden accessibility in `src/lib/components/` — Acceptance: focus traps, ARIA roles, contrast tokens verified via tests
- [ ] T016 [P] Instrument analytics/telemetry respecting privacy — Acceptance: events documented with opt-out toggle if required

### Phase 3.5 — Validation & Polish
- [ ] T017 Run Vitest + Playwright suites and commit results — Acceptance: tests pass locally with artifacts captured
- [ ] T018 Execute Lighthouse audit and store report under `specs/[###-feature]/reports/` — Acceptance: LCP <2.5 s, interaction target met, attach score summary
- [ ] T019 [P] Update docs/README landing content referencing new vibe — Acceptance: copy includes vibe name, interaction hook, accessibility statement
- [ ] T020 [P] Final visual regression diff and accessibility sign-off — Acceptance: screenshots approved, axe report attached to PR

## Dependencies
- Tests (T005-T008) must precede implementation (T009-T012)
- Implementation tasks block integration/performance (T013-T016)
- Validation tasks (T017-T020) occur after prior phases succeed
- Parallel `[P]` tasks must target distinct files/assets

## Parallel Execution Example
```
# After completing setup tasks:
Task: "Create Vitest failing spec for core component in tests/unit/[vibe].test.ts"
Task: "Capture baseline visuals in tests/visual/[vibe].md"
Task: "Document vibe brief in specs/[###-feature]/vibe-brief.md"
```

## Validation Checklist
- [ ] Every interaction defined in plan has at least one test task
- [ ] Accessibility, performance, and analytics responsibilities captured
- [ ] All tasks reference concrete file paths or artifacts
- [ ] `[P]` tasks are conflict-free (different files/resources)
- [ ] Test tasks appear before dependent implementation tasks
