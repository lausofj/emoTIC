# Especificación de hero-activity-ui

## Purpose

Proporciona recursos visuales expresivos y dinámicos, así como la presentación de insignias para la actividad prosocial de Nivel 4 "Amigo que ayuda" en emoTIC.

## Requirements

### Requirement: Mostrar dúo de superhéroes en la tarjeta de selección del Nivel 4
El sistema DEBE mostrar el gráfico combinado del dúo de superhéroes (Heroína y Héroe) y un icono de insignia de héroe personalizado en la tarjeta de la actividad de Nivel 4.

#### Scenario: El usuario visualiza el menú de juegos
- **CUANDO** el usuario navega al menú de actividades y juegos
- **ENTONCES** la tarjeta de "Amigo que ayuda" muestra la nueva ilustración del dúo en el círculo del avatar y una insignia personalizada en el contenedor flotante.

### Requirement: Selección de personaje y avatares dentro del juego
El sistema DEBE mostrar los gráficos individuales de los personajes Heroína y Héroe durante la selección de personaje, las etapas del juego y la pantalla de felicitación final.

#### Scenario: El usuario selecciona un personaje héroe en el Nivel 4
- **CUANDO** el usuario inicia la actividad de Nivel 4 y selecciona a la Heroína o al Héroe
- **ENTONCES** la interfaz muestra la nueva ilustración del personaje correspondiente en la vista de presentación y durante la situación de ayuda.

#### Scenario: Completar la actividad de Nivel 4
- **CUANDO** el usuario completa las situaciones prosociales y las reflexiones
- **ENTONCES** la tarjeta de celebración final muestra el gráfico del dúo de superhéroes y otorga la insignia de héroe.
