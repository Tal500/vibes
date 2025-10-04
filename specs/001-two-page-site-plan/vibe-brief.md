# Vibe Brief – Two-Page Vibes Website

## Mood & Narrative
- **Mood Words**: curious, buoyant, luminous, welcoming.
- **Story Arc**: Visitor arrives at a glowing portal (home page) inviting them to explore a "dummy" dimension filled with playful copy. Transition feels like stepping through a shimmering doorway.
- **Emotional Goal**: Spark delight and curiosity through smooth motion and vibrant color gradients while keeping content approachable.

## Visual Language
- **Palette**: Electric violet (#7F5AF0), sunset orange (#FF8E3C), deep space blue (#16161A), and soft cream (#F8F5F2).
- **Typography**: Use system font stack emphasizing rounded sans-serif (e.g., "Inter", "Nunito", fallback to `system-ui`). Employ clamp-based sizing for hero text.
- **Imagery**: Abstract shapes created with CSS gradients and pseudo-elements—no heavy bitmap assets.

## Motion & Interaction
- **Primary Transition**: `crossfade` combined with slight scale/opacity shift to mimic portal traversal.
- **Secondary Motion**: Hover/focus states using gentle color shifts and outline glows.
- **Reduced Motion**: Snap transitions with color change only, no transform or opacity animation.

## Accessibility Promises
- Focus outlines remain visible against background gradients.
- Text contrast meets WCAG AA (check with accessible palette values).
- Navigation order intuitive: Logo/title → nav links → main CTA.
- Provide `aria-current="page"` on active navigation link.

## Success Signals
- Playwright tests confirm transitions and content for both pages.
- GitHub Actions workflow runs cleanly without retries.
- User feedback (manual review) notes smooth navigation and cohesive styling.
