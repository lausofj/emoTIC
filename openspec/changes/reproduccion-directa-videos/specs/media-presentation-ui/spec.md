# Spec Delta

## MODIFIED Requirements

### Requirement: Presentación con Video Prioritario en Niveles 1 y 2
La aplicación SHALL presentar el reproductor de video nativo HTML5 directamente en los Niveles 1 y 2 sin marquesinas previas de interacción ni selectores de carga manual de archivos, vinculado a los archivos de video configurados en `assets/video/`, manteniendo los controles de reproducción y el botón para iniciar el juego.

#### Scenario: Carga de video local en Nivel 1
- **WHEN** el usuario ingresa al Nivel 1 («Emociones»)
- **THEN** la interfaz muestra la tarjeta del Gato y renderiza de inmediato el reproductor `<video controls autoplay playsinline>` con la fuente `assets/video/emociones-video.mp4` sin marquesina intermedia de reproducción

#### Scenario: Carga de video local en Nivel 2
- **WHEN** el usuario ingresa al Nivel 2 («La historia de Globito»)
- **THEN** la interfaz muestra a Globito y renderiza de inmediato el reproductor `<video controls autoplay playsinline>` con la fuente `assets/video/globito-cuento.mp4` sin marquesina intermedia de reproducción
