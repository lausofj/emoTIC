# Design: Replace Hero Graphics

## Context

The emoTIC PWA organizes activities as standalone game modules defined in `data/activities.js`, rendered on the homepage via `js/navigation.js`, and executed via `js/games.js`. Currently, Level 4 ("Amigo que ayuda") references `assets/illustrations/heroe-heroina.svg` for the duo card, `assets/illustrations/heroe-avatar.svg` / `heroina-avatar.svg` for in-game avatars, and a raw emoji `🦸` for the card badge.

## Goals / Non-Goals

**Goals:**
- Extract, format, and optimize high-resolution illustrated graphics based on the provided artwork:
  - `assets/illustrations/heroe-heroina-duo.png` (combined composition for the card & intro)
  - `assets/illustrations/heroina-avatar.png` (individual heroine graphic for selection & gameplay)
  - `assets/illustrations/heroe-avatar.png` (individual hero graphic for selection & gameplay)
  - `assets/illustrations/hero-badge.png` (mini badge icon for the floating card indicator)
- Update code references across `data/activities.js`, `js/navigation.js`, and `js/games.js`.
- Update `service-worker.js` cache list to ensure offline functionality for all new assets.

**Non-Goals:**
- Modifying game rules, empathy situations, or audio tracks for Level 4.
- Changing graphics for Levels 1, 2, 3, 5, or 6.

## Decisions

### Decision 1: Transparent PNG format with comic textures
- **Choice**: Produce optimized transparent PNG assets rather than converting to vector SVG.
- **Rationale**: The target illustration has hand-drawn crayon/marker textures, shading, and expressive starburst gradients that are best preserved in high-fidelity raster format.
- **Alternative considered**: Pure SVG tracing. Rejected because vectorizing hand-drawn crayon strokes creates bloated SVG files with lost tactile texture.

### Decision 2: Combined duo asset for activity card & intro stage
- **Choice**: Compose the Heroine (left) and Hero (right) with their vibrant starbursts into a unified asset `heroe-heroina-duo.png`.
- **Rationale**: User confirmed Option A, presenting both heroes together as the "Superhéroes de la Ayuda" team.

### Decision 3: Image-based badge replacement for emoji
- **Choice**: Replace the system emoji `🦸` in `js/navigation.js` (`act.id === 'act-4'`) with an `<img>` tag pointing to `hero-badge.png`.
- **Rationale**: System emojis render inconsistently across Windows, Android, and iOS. An image badge ensures a unified, premium look.

## Risks / Trade-offs

- **[Asset loading & cache]** → Add new images to `service-worker.js` and ensure responsive CSS dimensions (`object-fit: contain`) so cards scale cleanly on mobile and desktop.
