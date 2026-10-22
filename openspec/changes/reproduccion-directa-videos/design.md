# Diseño Técnico: Reproducción Directa de Videos en Niveles 1 y 2

## Contexto
En `js/games.js`, las funciones `renderMatchingIntro` y `renderGlobitoStory` renderizaban previamente un contenedor con clase `matching-video-placeholder-inner`, el cual contenía un botón con ícono de reproducción, un texto explicativo y un `input[type="file"]`. Al hacer clic en dicho botón, se reemplazaba el innerHTML por una etiqueta `<video>`.

## Metas / No Metas

**Metas:**
- Renderizar de forma inmediata la etiqueta `<video controls autoplay playsinline>` dentro de `matching-video-box` en las plantillas de Nivel 1 y Nivel 2.
- Utilizar como fuente `<source src="${videoData.placeholderUrl || 'assets/video/...'}" type="video/mp4">`.
- Eliminar los elementos y controladores de eventos de placeholder e input de archivo ya obsoletos.

**No Metas:**
- Modificar el flujo de los juegos posteriores (unir parejas con líneas o respiración de Globito).

## Decisiones Técnicas

- **Atributos de `<video>`**:
  - `controls`: Para que el usuario pueda reproducir, pausar, retroceder, ajustar volumen y maximizar el video.
  - `autoplay`: Para intentar arrancar el video inmediatamente al entrar a la pantalla (sujeto a las políticas de reproducción del navegador).
  - `playsinline`: Para reproducción fluida en dispositivos táctiles sin forzar pantalla completa nativa no deseada.
  - `style="width:100%; height:100%; object-fit:contain; border-radius:18px; background:#000;"`: Para mantener el encuadre estético impecable dentro del contenedor.

## Riesgos / Compensaciones
- *[Riesgo]*: Algunos navegadores bloquean el autoplay de video con sonido si no hubo interacción previa.
  - *Mitigación*: La presencia de `controls` permite que, si el navegador pausa el autoplay, el usuario simplemente presiona el botón nativo de Play sin ninguna barrera ni pantalla intermedia.
