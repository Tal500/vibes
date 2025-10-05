import { test, expect, type Page } from '@playwright/test';

test.describe('vibe atlas navigation', () => {
  const waitForTransition = async (page: Page, state: 'animating' | 'idle', startLength: number) =>
    page.evaluate(({ expected, len }) => {
      const history = window.__vibesTransitions ?? [];
      if (history.length > len && history.slice(len).includes(expected)) {
        return true;
      }

      return new Promise<boolean>((resolve) => {
        let timeout: number | undefined;

        const handler = (event: Event) => {
          const custom = event as CustomEvent<string>;
          if (custom.detail === expected) {
            cleanup();
            resolve(true);
          }
        };

        const cleanup = () => {
          window.removeEventListener('vibes:transition', handler as EventListener);
          if (timeout !== undefined) {
            clearTimeout(timeout);
          }
        };

        window.addEventListener('vibes:transition', handler as EventListener);

        timeout = window.setTimeout(() => {
          cleanup();
          resolve(false);
        }, 2000);
      });
    }, { expected: state, len: startLength });

  test('animates between home and dummy pages', async ({ page }) => {
    await page.goto('/');

    const main = page.locator('main');
    const root = page.locator('html');
    const body = page.locator('body');
    await expect(body).toHaveAttribute('data-app-ready', 'true');
    await expect(main).toHaveAttribute('data-transition-state', 'idle');
    await expect(root).toHaveAttribute('data-transition-state', 'idle');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Stumble into a pocket universe of animated moods.'
    );

    const prefersReduced = await page.evaluate(() =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    expect(prefersReduced).toBe(false);

    const startLength = await page.evaluate(() => window.__vibesTransitions?.length ?? 0);

    const dummyLink = page.getByRole('link', { name: /dummy vibe/i }).first();
    const navigation = page.waitForURL(/\/dummy$/);
    const waitForStart = waitForTransition(page, 'animating', startLength);

    await dummyLink.click();

    const transitionStarted = await waitForStart;
    if (test.info().project.name !== 'webkit') {
      expect(transitionStarted).toBe(true);
    }
    await navigation;
    const waitForIdle = waitForTransition(page, 'idle', startLength);
    expect(await waitForIdle).toBe(true);
    const transitions = await page.evaluate(() => window.__vibesTransitions ?? []);
    expect(transitions.slice(startLength).filter((state: string) => state === 'animating').length).toBeGreaterThan(0);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'A sandbox signal for experimenting with vibes.'
    );
    await expect(page.locator('html')).toHaveAttribute('data-transition-state', 'idle');
    await expect(main).toHaveAttribute('data-transition-state', 'idle');
  });

  test('honors reduced motion preference', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const main = page.locator('main');
    const root = page.locator('html');
    const body = page.locator('body');
    await expect(body).toHaveAttribute('data-app-ready', 'true');
    await expect(main).toHaveAttribute('data-motion', 'reduced');

    const startLength = await page.evaluate(() => window.__vibesTransitions?.length ?? 0);
    const waitForStart = waitForTransition(page, 'animating', startLength);
    await page.getByRole('link', { name: /dummy vibe/i }).first().click();
    await expect(page).toHaveURL(/\/dummy$/);
    expect(await waitForStart).toBe(false);
    await expect(page.locator('html')).toHaveAttribute('data-transition-state', 'idle');
    await expect(main).toHaveAttribute('data-transition-state', 'idle');
  });

  test('direct entry to dummy page keeps layout state consistent', async ({ page }) => {
    await page.goto('/dummy');

    const main = page.locator('main');
    const root = page.locator('html');
    const body = page.locator('body');

    await expect(body).toHaveAttribute('data-app-ready', 'true');
    await expect(main).toHaveAttribute('data-transition-state', 'idle');
    await expect(root).toHaveAttribute('data-transition-state', 'idle');

    const dummyLink = page.getByRole('link', { name: /dummy vibe/i });
    await expect(dummyLink).toHaveClass(/active/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'A sandbox signal for experimenting with vibes.'
    );
  });
});
