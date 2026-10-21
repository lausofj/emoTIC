# Proposal: Replace Hero Graphics

## Why

The current Level 4 activity ("Amigo que ayuda") uses generic flat vector illustrations that do not match the expressive, child-friendly comic/crayon artistic style intended for the emoTIC characters. Upgrading to the dynamic, illustrated hero graphics (featuring the lightning-mask heroine and the star-wand hero with comic starburst backgrounds) will make the activity significantly more engaging, immersive, and visually coherent.

## What Changes

- **Card Visuals**: Replace the generic duo vector in the Level 4 game selection card with a high-resolution combined graphic of both heroes (Heroine and Hero) in action poses with their starburst background effects.
- **Floating Badge**: Replace the generic superhero emoji (`🦸`) with a custom mini badge icon derived from the new hero aesthetics.
- **In-Game Avatars**: Provide dedicated transparent PNG assets for both the Heroine and the Hero to be used in character selection, gameplay interaction (approaching peers in need), and reward screens.
- **Service Worker Cache**: Update asset caching in `service-worker.js` to ensure the new illustrations are available offline.

## Capabilities

### New Capabilities
- `hero-activity-ui`: Visual presentation, character assets, and badge styling for the Level 4 "Amigo que ayuda" prosocial activity.

### Modified Capabilities
*(None - no existing specs recorded in openspec/specs)*

## Impact

- **Assets**: New image files in `assets/illustrations/` (`heroe-heroina-duo.png`, `heroina-avatar.png`, `heroe-avatar.png`, `hero-badge.png`).
- **Code**: Updates in `data/activities.js`, `js/navigation.js`, `js/games.js`, and `service-worker.js`.
- **Breaking changes**: None. Backward-compatible asset path updates.
