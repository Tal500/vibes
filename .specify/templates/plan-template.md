# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Summarize the vibe brief
   → Extract mood adjectives, reference inspirations, and primary interaction goals
3. Fill Technical Context
   → Project type MUST be identified as "SvelteKit web"
   → Capture SvelteKit 5 + TypeScript stack, dependencies, data/asset needs
4. Constitution Check (see section below)
   → Fail fast if any gate cannot be satisfied; record mitigation ideas
5. Execute Phase 0 → research.md
   → Resolve open questions around mood fidelity, assets, or integrations
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code, or `AGENTS.md` for all other agents)
   → Ensure interaction prototypes describe both UX flow and associated tests
7. Re-evaluate Constitution Check section
   → If violations remain: refine approach before concluding plan
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
[Extract from feature spec: primary vibe objective + headline interaction]

## Technical Context
**Language/Version**: SvelteKit 5 (TypeScript) or [NEEDS CLARIFICATION]
**Primary Dependencies**: [e.g., Svelte Motion, Three.js, Tone.js or NEEDS CLARIFICATION]
**Storage / Data Sources**: [e.g., static JSON, Supabase, third-party API or N/A]
**Testing**: Vitest (unit), Playwright (e2e), Storybook/screenshot tooling
**Target Platform**: Modern browsers (desktop + mobile)
**Project Type**: Web (SvelteKit)
**Performance Goals**: <100 ms interactivity, <2.5 s LCP on 4G, 60 fps animations
**Constraints**: [e.g., asset size caps, accessibility sensitivities or NEEDS CLARIFICATION]
**Scale/Scope**: [expected page count, interaction complexity]

## Principle Alignment Notes
For each principle, explain the plan-level strategy and cite supporting documents.
- **Principle I – Vibe-Led Experience**: [How the vibe mood, interactions, and success signals will be satisfied]
- **Principle II – SvelteKit 5 + TypeScript**: [Stack decisions, shared components, routing pattern]
- **Principle III – Fluid Performance**: [Performance risks, budgets, mitigation tasks/tests]
- **Principle IV – Inclusive & Accessible Delight**: [Accessibility commitments, opt-outs, inclusive design steps]
- **Principle V – Authentic Interactivity & Testing**: [Planned automated tests, prototypes, validation approach]

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Principle I — Vibe Definition: Does the plan articulate the exact vibe mood, interactive anchors, and success signals?
- Principle II — Stack Alignment: Are we using core SvelteKit 5 routing/load patterns with TypeScript and scoped assets?
- Principle III — Performance Budget: Are mitigation strategies outlined for animations, data fetching, and asset weight?
- Principle IV — Accessibility: Are keyboard flows, contrast choices, and sensory opt-outs addressed up front?
- Principle V — Testing Discipline: Are Vitest + Playwright (and visual regression when needed) planned before implementation?

If any answer is "No", document remediation steps before progressing.

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── vibe-brief.md        # Mood board & narrative summary
├── contracts/           # Interaction contracts (Playwright scenarios, API stubs)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
src/
├── lib/                 # Shared UI primitives, design tokens, utilities
│   ├── components/
│   ├── theme/
│   └── stores/
├── routes/              # Feature pages (one directory per vibe)
│   └── [vibe]/+page.svelte
├── params/              # Custom route params (if needed)
└── hooks.server.ts      # Global hooks for session, headers, etc.

tests/
├── unit/                # Vitest suites for components/stores
├── e2e/                 # Playwright specs exercising vibe flows
└── visual/              # Screenshot or Storybook baselines

static/                  # Optimized media assets per vibe
```

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: vibe mood, tech stack, asset requirements
2. Load optional design documents:
   → data-model.md: Define state machines or data contracts
   → contracts/: Each Playwright spec → test-first tasks
   → research.md: Capture experiential or technical spikes
3. Generate tasks by category:
   → Setup: theme tokens, routing scaffolds, asset pipelines
   → Tests: Vitest components, Playwright flows, visual baselines
   → Core: Svelte components, stores, animations, audio/GLSL modules
   → Integration: API calls, third-party SDK wiring, performance tuning
   → Polish: accessibility refinements, documentation, analytics events
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (Vitest/Playwright)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → Every planned interaction has tests
   → Performance and accessibility follow-ups captured
   → Assets prepared or sourcing tasks listed
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Setup
- [ ] T001 Scaffold vibe route directory in `src/routes/[vibe]/`
- [ ] T002 Configure or extend design tokens in `src/lib/theme/`
- [ ] T003 [P] Import or generate mood assets under `static/[vibe]/`

## Phase 3.2: Tests First (TDD)
**CRITICAL: Tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] Vitest skeleton for core component in `tests/unit/[vibe].test.ts`
- [ ] T005 Playwright contract for primary interaction in `tests/e2e/[vibe].spec.ts`
- [ ] T006 [P] Visual baseline setup (Storybook/screenshot) in `tests/visual/[vibe].md`

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T007 Implement Svelte component structure in `src/routes/[vibe]/+page.svelte`
- [ ] T008 Wire interaction state/store in `src/lib/stores/[vibe].ts`
- [ ] T009 Animate transitions/motion sequences respecting performance budgets
- [ ] T010 Integrate audio/video/shader assets with lazy loading guards
- [ ] T011 Document vibe brief in `specs/[###-feature]/vibe-brief.md`

## Phase 3.4: Integration
- [ ] T012 Connect external APIs or data sources with caching in `src/routes/[vibe]/+page.server.ts`
- [ ] T013 Run Lighthouse audit script and capture metrics
- [ ] T014 Harden accessibility (ARIA, focus traps) in `src/lib/components/`

## Phase 3.5: Polish
- [ ] T015 [P] Update README/landing copy referencing new vibe
- [ ] T016 [P] Refresh Storybook entries or marketing assets
- [ ] T017 Ensure analytics/telemetry hooks respect privacy expectations
- [ ] T018 Final Playwright regression run and attach results to PR

## Dependencies
- Tests (T004-T006) MUST precede implementation (T007-T010)
- T007 blocks T008-T010
- T012 depends on stores/components being ready (T007-T010)
- Audits and polish (T013-T018) happen after integration

## Parallel Example
```
# Launch these together after setup:
Task: "Vitest skeleton for core component in tests/unit/[vibe].test.ts"
Task: "Visual baseline setup in tests/visual/[vibe].md"
```

## Notes
- [P] tasks = different files, no dependencies
- Reference vibe brief when naming components, animations, and assets
- Commit after each task and link to metrics/screenshots when applicable
- Avoid vague tasks; each entry must map to a specific file or artifact

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each Playwright contract → matching implementation + regression task
   - Each animation/audio cue → performance budget verification task
2. **From Data Model**:
   - Each store/state machine → creation and test tasks
   - External data dependencies → integration and caching tasks
3. **From Vibe Brief**:
   - Mood anchors → component or asset creation tasks
   - Accessibility promises → explicit testing tasks
4. **Ordering**:
   - Setup → Tests → Components/Stores → Integrations → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All interactions have associated tests
- [ ] Accessibility and performance mitigations captured
- [ ] Parallel tasks target different files
- [ ] Each task cites exact file path or artifact
- [ ] Tests precede implementation tasks
