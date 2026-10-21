# Spec Delta: hero-activity-ui

## Purpose

Provides expressive, dynamic visual assets and badge presentation for the Level 4 "Amigo que ayuda" prosocial activity in emoTIC.

## ADDED Requirements

### Requirement: Display superhero duo on Level 4 game selection card
The system SHALL display the combined superhero duo graphic (Heroine and Hero) and a custom hero badge icon on the Level 4 activity card.

#### Scenario: User views the games menu
- **WHEN** the user navigates to the activities/games menu
- **THEN** the card for "Amigo que ayuda" displays the new duo graphic in the avatar circle and a custom hero badge in the floating badge container.

### Requirement: Character selection and in-game avatars
The system SHALL display the individual Heroine and Hero character graphics during character selection, scenario gameplay, and the completion screen.

#### Scenario: User selects a hero character in Level 4
- **WHEN** the user begins the Level 4 activity and selects either Heroine or Hero
- **THEN** the interface displays the corresponding new character illustration in the intro view and during the helping scenario.

#### Scenario: Completing the Level 4 activity
- **WHEN** the user completes the prosocial situations and reflections
- **THEN** the final celebration card displays the superhero duo graphic and awards the hero badge.
