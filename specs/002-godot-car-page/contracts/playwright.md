# Playwright Contract · Drive Page

## Scenarios
1. **Navigation + hero shell**
   - Start on the home page.
   - Use the top navigation to open the Drive page.
   - Expect URL `/drive`, nav item with `aria-current="page"`, and hero heading "Vibe Rally".

2. **Game iframe readiness**
   - Wait for the Godot iframe to finish loading (canvas element present inside the frame).
   - Assert the iframe exposes a descriptive `title` and `aria-label` and that the "Focus game" button exists for keyboard users.

3. **Touch helper toggle**
   - Click the "Show touch controls" button to reveal touch guidance.
   - Validate touch hints mention steering, throttle, and brake gestures/buttons.
   - Toggle again to hide the helper.

4. **Full-window mode**
   - Activate the "Full window" button to expand the game overlay.
   - Confirm document scrolling is disabled, the close affordance appears, and the fallback link is visually hidden.
   - Press Escape (or click close) to exit and ensure body scrolling returns plus focus restores to the toggle button.

5. **Failure fallback surface**
   - Ensure the DOM includes a fallback link block that is only visible when the iframe fails (checked via attribute assertions, not by forcing failure in automation).
