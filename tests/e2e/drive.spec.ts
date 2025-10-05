import { test, expect } from '@playwright/test';

test.describe('godot drive page', () => {
  test('navigates from home and highlights the drive nav item', async ({ page }) => {
    await page.goto('/');

    const driveLink = page.getByRole('link', { name: /^drive$/i });
    const navigation = page.waitForURL(/\/drive$/);
    await driveLink.click();
    await navigation;

    await expect(page).toHaveURL(/\/drive$/);
    await expect(driveLink).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('heading', { level: 1, name: /vibe rally/i })).toBeVisible();
    await expect(page.getByText('If the game never loads', { exact: false })).toBeVisible();
  });

  test('loads the Godot canvas and toggles touch helper guidance', async ({ page }) => {
    await page.goto('/drive');

    const iframeLocator = page.locator('iframe[title="Vibe Rally Godot playground"]');
    await expect(iframeLocator).toBeVisible();
    await expect(iframeLocator).toHaveAttribute('aria-label', /godot rally driving/i);

    const frame = page.frameLocator('iframe[title="Vibe Rally Godot playground"]');
    await frame.locator('#canvas').waitFor({ state: 'visible' });

    const focusButton = page.getByRole('button', { name: /focus the game canvas/i });
    await focusButton.click();

    const activeTag = await page.evaluate(() => document.activeElement?.tagName ?? '');
    expect(activeTag.toLowerCase()).toBe('iframe');

    const toggle = page.getByRole('button', { name: /touch overlay tips/i });
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    const helperHeading = page.getByRole('heading', { level: 3, name: /touch quickstart/i });
    await expect(helperHeading).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(helperHeading).toBeHidden();
  });

  test('opens and exits the full window mode for the game', async ({ page }) => {
    await page.goto('/drive');

    const iframeLocator = page.locator('iframe[title="Vibe Rally Godot playground"]');
    await expect(iframeLocator).toBeVisible();

    const fullWindowToggle = page.getByRole('button', { name: /open full window view/i });
    await expect(fullWindowToggle).toHaveAttribute('aria-pressed', 'false');

    await fullWindowToggle.click();

    const overlay = page.locator('#drive-full-window');
    await expect(overlay).toHaveClass(/full-window-active/);

    const exitButton = page.getByRole('button', { name: /exit full window view/i });
    await expect(exitButton).toBeVisible();

    const overflowState = await page.evaluate(() => document.documentElement.style.overflow);
    expect(overflowState).toBe('hidden');

    await exitButton.click();

    await expect(fullWindowToggle).toHaveAttribute('aria-pressed', 'false');
    await expect(overlay).not.toHaveClass(/full-window-active/);

    const restoredOverflow = await page.evaluate(() => document.documentElement.style.overflow);
    expect(restoredOverflow === '' || restoredOverflow === 'visible').toBe(true);
  });
});
