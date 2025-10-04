# Playwright Contract – Navigation & Transitions

## Scenario 1: Home Page Renders
- **Given** the user visits `/`
- **Then** the hero heading "Vibes Portal" (final copy TBD) is visible
- **And** navigation link to "Dummy Dimension" is present and focusable

## Scenario 2: Navigate to Dummy Page with Animation
- **Given** the user is on `/`
- **When** they click the "Enter Dummy Dimension" link/button
- **Then** a transition begins within 50 ms applying `aria-busy="true"` or CSS class indicating animation
- **And** within 1 s the dummy page heading becomes visible
- **And** focus is moved to the dummy page hero container

## Scenario 3: Reduced Motion Navigation
- **Given** the user is on `/` with reduced motion preference enabled
- **When** they navigate to `/dummy`
- **Then** navigation completes without opacity/transform animation (verify absence of motion class)
- **And** content still appears within 500 ms

## Scenario 4: Return to Home
- **Given** the user is on `/dummy`
- **When** they activate the navigation back to home
- **Then** the home hero content reappears with the same transition/ fallback rules as above
- **And** the nav link for home is marked with `aria-current="page"`
