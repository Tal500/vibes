# Vibe Atlas

A two-page SvelteKit 5 playground that leans into handcrafted CSS, fluid transitions, and accessibility-minded vibes. Navigate
between the home scene and a "dummy" sandbox to see a 420 ms fly + scale animation that gracefully falls back when motion is
reduced.

## Getting started

```sh
npm install
```

### Development

```sh
npm run dev -- --open
```

### Type checking

```sh
npm run check
```

## End-to-end tests

Playwright drives the transition experience and motion fallbacks.

```sh
# build once, then execute the suite
npm run build
npm run test:e2e
```

To explore the flows interactively:

```sh
npm run test:e2e:debug
```

> The Playwright config starts a preview server on port 4173 and records traces on the first retry.

## Continuous integration

GitHub Actions runs `npm run check`, `npm run build`, and the Playwright suite on every push to `master` and each pull request
that targets `master`.

## Project structure

- `src/routes/+layout.svelte` — shared shell with animated transitions, reduced-motion support, and navigation.
- `src/routes/+page.svelte` — the home scene with vibe highlights.
- `src/routes/dummy/+page.svelte` — the dummy playground timeline.
- `src/lib/styles/` — bespoke theme and animation CSS (no Tailwind).
- `tests/e2e/` — Playwright navigation coverage.
