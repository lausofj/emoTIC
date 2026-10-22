# media-presentation-ui Specification

## Purpose
Define las reglas de presentación de medios audiovisuales e interfaces introductorias por nivel, priorizando el video educativo en los niveles 1 y 2, y eliminando secciones de video e indicadores de depuración en niveles superiores.

## Requirements

### Requirement: Presentación con Video Prioritario en Niveles 1 y 2
La aplicación SHALL presentar el reproductor de video nativo HTML5 directamente en los Niveles 1 y 2 sin marquesinas previas de interacción ni selectores de carga manual de archivos, vinculado a los archivos de video configurados en `assets/video/`, manteniendo los controles de reproducción y el botón para iniciar el juego.

#### Scenario: Carga de video local en Nivel 1
- **WHEN** el usuario ingresa al Nivel 1 («Emociones»)
- **THEN** la interfaz muestra la tarjeta del Gato y renderiza de inmediato el reproductor `<video controls autoplay playsinline>` con la fuente `assets/video/emociones-video.mp4` sin marquesina intermedia de reproducción

#### Scenario: Carga de video local en Nivel 2
- **WHEN** el usuario ingresa al Nivel 2 («La historia de Globito»)
- **THEN** la interfaz muestra a Globito y renderiza de inmediato el reproductor `<video controls autoplay playsinline>` con la fuente `assets/video/globito-cuento.mp4` sin marquesina intermedia de reproducción

### Requirement: Supresión de Video e Indicadores de Audio en Niveles 3 a 6
La aplicación SHALL suprimir las secciones de video en los niveles 3, 4, 5 y 6, y SHALL ocultar o suprimir todas las etiquetas visuales de desarrollo de rutas de archivos de audio (`📁 assets/audio/*.mp3`), ubicando el botón de inicio de juego en la tarjeta del personaje.

#### Scenario: Visualización limpia en Nivel 6
- **WHEN** el usuario ingresa al Nivel 6 («Kori el Cuy»)
- **THEN** la interfaz no muestra la tarjeta de video ni la etiqueta informativa de audio, y el botón «¡Comenzar el Juego de las Canastas!» se ubica dentro de la tarjeta de presentación de Kori

#### Scenario: Ausencia de etiquetas de ruta de audio en Niveles 3 a 6
- **WHEN** el usuario accede a las pantallas de bienvenida de los Niveles 3, 4, 5 o 6
- **THEN** los botones de reproducción de voz permanecen activos y no se muestra ninguna etiqueta con la ruta del archivo MP3
