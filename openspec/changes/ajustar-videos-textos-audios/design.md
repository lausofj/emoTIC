# Diseño Técnico: Ajuste de Videos, Textos e Indicadores de Audio

## Contexto
La interfaz de los niveles se renderiza modularmente a través de `js/games.js`, utilizando metadatos curriculares definidos en `data/activities.js`. El usuario ha provisto los videos en `assets/video/emociones-video.mp4` y `assets/video/globito-cuento.mp4` y ha eliminado los archivos secundarios no utilizados `data/activities-g*.js`. Véase `proposal.md` para la motivación.

## Metas / No Metas

**Metas:**
- Configurar las rutas de video a `assets/video/emociones-video.mp4` y `assets/video/globito-cuento.mp4`.
- Limpiar el contenido textual innecesario de las presentaciones en Niveles 1 y 2, destacando el video.
- Suprimir la tarjeta de video de Kori el Cuy en el Nivel 6 (`cuy-video-card`), asegurando que el botón de inicio del juego permanezca accesible y funcional dentro de la tarjeta de Kori.
- Suprimir la visualización de las etiquetas `audio-file-indicator` (`📁 assets/audio/...`) en las plantillas de todos los niveles.

**No Metas:**
- Modificar la lógica interna de los minijuegos (emparejamiento de emociones, respiración de Globito, misiones de Sofi y Nico, retos de héroes o canastas de Kori).
- Descargar o generar nuevos archivos de medios en el servidor.

## Decisiones Técnicas

- **Rutas de Video (`assets/video/` vs `assets/videos/`)**:
  - **Decisión**: Apuntar principalmente a `assets/video/` que es donde el usuario ya colocó los archivos MP4, manteniendo un fallback automático hacia `assets/videos/` en caso de variaciones de nombres.
  - **Razón**: Asegura que los videos reproduzcan inmediatamente sin exigir al usuario mover archivos.

- **Reubicación del botón de inicio en Nivel 6**:
  - **Decisión**: Mover el elemento `<button id="btn-start-baskets-game">` directamente dentro de `<div class="character-speech-bubble">` en la tarjeta de Kori el Cuy.
  - **Razón**: Al suprimir `cuy-video-card`, el botón de inicio debe mantenerse para que el niño pueda avanzar a la actividad de clasificación.

- **Eliminación de `audio-file-indicator`**:
  - **Decisión**: Remover los bloques `<div class="audio-file-indicator">...</div>` en las vistas de bienvenida de los niveles en `js/games.js`.
  - **Razón**: Eran indicadores visuales auxiliares para el desarrollo que ya no son requeridos por el usuario.

## Riesgos / Compensaciones
- *[Riesgo]*: Que un navegador bloquee el autoplay de videos si no está silenciado o si no hay interacción previa del usuario.
  - *Mitigación*: Mantener el botón de reproducción interactivo y controles estándar (`controls`) en la etiqueta `<video>`.
