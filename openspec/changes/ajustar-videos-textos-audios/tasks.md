# Tareas de Implementación

## 1. Actualización de Datos y Rutas de Medios en data/activities.js

- [x] 1.1 Actualizar las rutas de video a `assets/video/emociones-video.mp4` (Nivel 1) y `assets/video/globito-cuento.mp4` (Nivel 2) en `data/activities.js`.
- [x] 1.2 Ajustar los textos y descripciones de Nivel 1 y Nivel 2 en `data/activities.js` para simplificar la bienvenida y no requerir lectura de cuentos largos.
- [x] 1.3 Suprimir el objeto `video` y ajustar el texto de Kori el Cuy en el Nivel 6 en `data/activities.js` para retirar menciones a video educativo.

## 2. Ajuste de Interfaz y Eliminación de Secciones en js/games.js

- [x] 2.1 Reestructurar la presentación del Nivel 1 (Gato) en `js/games.js` para eliminar el bloque de texto extenso y dejar el reproductor de video como elemento central con el botón de inicio.
- [x] 2.2 Reestructurar la presentación del Nivel 2 (Globito) en `js/games.js` para eliminar la tarjeta de texto extenso del cuento y priorizar el video de la técnica de autorregulación.
- [x] 2.3 Suprimir la tarjeta de video `cuy-video-card` en Nivel 6 en `js/games.js` y reubicar el botón «¡Comenzar el Juego de las Canastas! 🧺» dentro de la tarjeta de Kori el Cuy.
- [x] 2.4 Eliminar los elementos visuales de desarrollo `audio-file-indicator` (`📁 assets/audio/...`) en las vistas de presentación de los Niveles 3, 4, 5 y 6 en `js/games.js`.

## 3. Verificación de Integración y Flujo

- [x] 3.1 Verificar mediante comprobación de sintaxis y renderizado que los videos cargan correctamente desde `assets/video/` y que todos los niveles inician fluidamente sin errores.
