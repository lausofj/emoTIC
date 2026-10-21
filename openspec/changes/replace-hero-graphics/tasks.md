# Tasks

## 1. Asset Preparation

- [ ] 1.1 Generate and format `assets/illustrations/heroe-heroina-duo.png` with both characters and their starburst effects, and verify transparent background and dimensions
- [ ] 1.2 Generate `assets/illustrations/heroina-avatar.png` with the standalone Heroine and verify file integrity
- [ ] 1.3 Generate `assets/illustrations/heroe-avatar.png` with the standalone Hero with star wand and verify file integrity
- [ ] 1.4 Generate `assets/illustrations/hero-badge.png` for the mini card badge and verify crisp rendering at small scale

## 2. Code Implementation

- [ ] 2.1 Update `data/activities.js` to reference the new assets for `act-4` (`avatarSvg`, `heroinaSvg`, `heroeSvg`) and verify object structure
- [ ] 2.2 Update `js/navigation.js` to render the duo illustration in the card circle and the new image badge instead of the emoji `🦸`
- [ ] 2.3 Update `js/games.js` Level 4 methods (`renderHeroIntro`, character selection pills, in-game empathy sprites, and final completion screen) to render the new graphics
- [ ] 2.4 Update `service-worker.js` to include the new image files in the offline cache list and increment cache version

## 3. Verification

- [ ] 3.1 Verify game menu renders the Level 4 card with the new duo graphic and custom badge cleanly across desktop and mobile viewport sizes
- [ ] 3.2 Test Level 4 interactive flow in browser to confirm avatar selection, dragging/helping scenarios, and final star celebration show the new graphics
