# Especificación de girl-avatar-ui

## Purpose

Proporciona la representación gráfica y la experiencia de selección para el avatar femenino de los estudiantes en la pantalla de inicio y en el cuaderno de emoTIC.

## Requirements

### Requirement: Mostrar avatar de la niña en la selección de inicio
El sistema DEBE (SHALL) mostrar la ilustración actualizada de la niña con coletas y lazos azules dentro del botón de selección en la pantalla de inicio.

#### Scenario: Visualización del selector en la pantalla de inicio
- **CUANDO** el usuario accede a la pantalla principal
- **ENTONCES** el botón "Niña" muestra la nueva ilustración en primer plano sobre un marco con esquinas redondeadas y degradado melocotón/coral suave.

### Requirement: Visualización del avatar seleccionado en el cuaderno
El sistema DEBE (SHALL) actualizar la imagen del avatar central del cuaderno del estudiante al seleccionar la opción de la niña.

#### Scenario: Selección del avatar femenino
- **CUANDO** el usuario hace clic en el botón de selección de la niña
- **ENTONCES** la vista previa del cuaderno del estudiante muestra la ilustración de la niña en pose de saludo sin fondo.
