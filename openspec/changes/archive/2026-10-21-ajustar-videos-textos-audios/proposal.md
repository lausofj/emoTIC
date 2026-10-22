# Propuesta: Ajuste de Videos, Textos e Indicadores de Audio

## Por qué
Los niños de primer grado de primaria asimilan mejor el aprendizaje socioemocional a través del formato audiovisual que leyendo bloques extensos de texto. En los Niveles 1 y 2 se requiere priorizar los videos locales de las historias («El Gato de las Emociones» y «Globito»), suprimiendo los textos extensos introductorios. Asimismo, en los Niveles 3, 4, 5 y 6 se debe retirar la sección de video que no aplica y suprimir las etiquetas informativas de desarrollo (`📁 assets/audio/*.mp3`), puesto que los audios reales ya están siendo integrados y la interfaz debe quedar limpia para los estudiantes en esta parte dejar el texto.

## Qué Cambia
- **Nivel 1 (El Gato)**: Eliminar el bloque de texto explicativo extenso. Dejar la presentación del personaje y vincular directamente el reproductor de video local a `assets/video/emociones-video.mp4` antes de iniciar la dinámica de unir con líneas.
- **Nivel 2 (Globito)**: Eliminar el texto extenso del cuento de Globito. Convertir el video local `assets/video/globito-cuento.mp4` en el medio principal de aprendizaje de la técnica de autorregulación.
- **Niveles 3, 4, 5 y 6**:
  - Eliminar los indicadores visuales tipo pill (`📁 assets/audio/*.mp3`) en las tarjetas de presentación de todos los personajes.
  - Eliminar la tarjeta de video de Kori el Cuy en el Nivel 6, nivel 5, nivel 4 y nivel 3 (`cuy-video-card`), trasladando el botón de inicio («¡Comenzar el Juego de las Canastas! 🧺») dentro de la tarjeta de presentación del personaje.
  - Actualizar los textos y diálogos de Kori el Cuy en `data/activities.js` para suprimir referencias al video.

## Capacidades

### Nuevas Capacidades
- `media-presentation-ui`: Reglas de presentación audiovisual en las pantallas introductorias de los niveles, priorizando video en niveles 1 y 2 y suprimiendo marcos de video e indicadores de depuración en niveles 3 a 6.

### Capacidades Modificadas
*(Ninguna)*

## Impacto
- **Código**: Modificaciones directas en `data/activities.js` y `js/games.js`.
- **Medios**: Consumo de videos locales ubicados en `assets/video/emociones-video.mp4` y `assets/video/globito-cuento.mp4`.
