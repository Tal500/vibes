# Playwright Contract · Drive Page

## Scenarios
1. **Navigation + page shell**
   - Start from home page.
   - Click the "Drive" link in the top navigation.
   - Expect URL `/drive` and nav item to have `aria-current="page"`.
   - Confirm hero heading "Godot Truck Town" is visible.

2. **Game iframe readiness**
   - After navigation, wait for the Godot iframe to load its `<canvas>` element.
   - Validate the iframe has descriptive `title` and `aria-label`.
   - Ensure a focus helper button exists to send focus into the game frame.

3. **Touch helper overlay**
   - Toggle "Show touch controls" button.
   - Confirm helper instructions become visible, containing gesture + virtual control hints.
   - Toggle again to hide instructions.

4. **Fallback messaging**
   - Simulate reduced motion preference or network failure? (Not covered via automation; check for presence of fallback notice element in DOM.)

