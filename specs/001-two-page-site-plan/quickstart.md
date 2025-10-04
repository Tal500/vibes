# Quickstart – Two-Page Vibes Website

## Prerequisites
- Node.js 20.x (aligns with SvelteKit 5 support matrix)
- npm 10+
- GitHub Actions runners use Ubuntu Latest; ensure scripts are cross-platform friendly

## Setup
```bash
# Install dependencies after SvelteKit scaffold exists
npm install

# Initialize Playwright browsers (also handled in CI)
npx playwright install --with-deps
```

## Development Workflow
```bash
# Start dev server with hot reload
npm run dev -- --open

# Run Playwright tests locally (headed for debugging)
npm run test:e2e

# Build production bundle
npm run build
```

## Testing Discipline
- Write or update Playwright specs before implementing components.
- Ensure `npm run test:e2e` fails prior to feature implementation, then passes once work is complete.
- Capture traces on failure by running `npx playwright test --trace on` when reproducing issues.

## CI Guidance
- GitHub Actions workflow (`.github/workflows/ci.yml`) installs dependencies, runs Playwright install, executes `npm run build`, then `npm run test:e2e`.
- Use `actions/setup-node` with caching keyed by `package-lock.json`.
- Upload Playwright traces/screenshots as workflow artifacts when failures occur.

## Accessibility & Performance Checks
- Use browser devtools to emulate reduced-motion and verify transition fallback.
- Run Lighthouse (Chrome devtools or `npm create @lhci/cli`) to confirm performance goals if time allows.
