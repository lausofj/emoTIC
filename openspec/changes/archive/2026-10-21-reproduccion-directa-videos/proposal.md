# Propuesta: Reproducción Directa de Videos en Niveles 1 y 2

## Por qué
Anteriormente, al ingresar al Nivel 1 o Nivel 2, la interfaz mostraba una marquesina previa de presentación («Reproducir Video Educativo • Toca aquí para reproducir el video... O carga tu video local: Seleccionar archivo»), requiriendo una interacción obligatoria antes de insertar y renderizar la etiqueta `<video>` en el DOM. Con los archivos locales ya integrados en `assets/video/`, se requiere que el reproductor de video nativo se renderice directamente desde la carga de la vista, permitiendo a los estudiantes visualizar y reproducir el video configurado sin pantallas intermedias ni selectores innecesarios.

## Qué Cambia
- **Nivel 1 (El Gato)**: Reemplazar el contenedor placeholder `.matching-video-placeholder-inner` por el elemento `<video controls autoplay playsinline>` directo apuntando a `assets/video/emociones-video.mp4`.
- **Nivel 2 (Globito)**: Reemplazar el contenedor placeholder `.matching-video-placeholder-inner` por el elemento `<video controls autoplay playsinline>` directo apuntando a `assets/video/globito-cuento.mp4`.
- **Limpieza**: Suprimir los escuchadores de evento de clic del botón placeholder y los selectores de archivo locales en `js/games.js`.

## Capacidades

### Nuevas Capacidades
*(Ninguna)*

### Capacidades Modificadas
- `media-presentation-ui`: Se actualiza el requerimiento de presentación para exigir el renderizado directo del elemento de video HTML5 en lugar del marco de bienvenida interactivo intermedio.

## Impacto
- **Código**: `js/games.js` (métodos `renderMatchingIntro` y `renderGlobitoStory`).
- **Comportamiento del usuario**: Al ingresar a los Niveles 1 y 2, los estudiantes ven y pueden interactuar directamente con el video educativo.
