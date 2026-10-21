# Diseño: Reemplazar Avatar de la Niña

## Contexto

El selector de avatar en la pantalla de inicio (`index.html`) y el visualizador del cuaderno (`js/app.js`) utilizan gráficos vectoriales SVG planos (`nina-home.svg` y `avatar-display-nina.svg`). La nueva identidad visual requiere actualizar estos elementos con la ilustración cálida e infantil de la niña de coletas con lazos azules saludando, garantizando fondo transparente y acabado armonioso.

## Metas / No Metas

**Metas:**
- Procesar la imagen proporcionada para extraer la figura de la niña con fondo 100% transparente.
- Generar `assets/illustrations/nina-home.png` (120 × 120 px) con la niña centrada sobre un marco con esquinas redondeadas y degradado coral/melocotón suave (`#FED7AA` a `#FB7185`).
- Generar `assets/illustrations/avatar-display-nina.png` con la niña sobre fondo transparente para el cuaderno.
- Actualizar el botón `#btn-avatar-nina` en `index.html` y la asignación en `js/app.js`.
- Actualizar `service-worker.js` e incrementar la versión de caché a `emotic-v17`.

**No Metas:**
- Modificar el avatar del niño (`nino-home.svg` o `avatar-display-nino.svg`).
- Modificar el flujo de guardado en IndexedDB ni la selección de accesorios.

## Decisiones

### Decisión 1: Formato PNG transparente optimizado
- **Elección**: Producir archivos PNG transparentes a 32 bits.
- **Justificación**: La imagen original cuenta con trazados artísticos y textura suave en las mejillas, el cabello y el vestido que se reproducen de manera óptima en PNG sin perder nitidez.

### Decisión 2: Composición del botón con degradado melocotón/coral suave
- **Elección**: Integrar la niña sin fondo sobre el marco con degradado suave en `nina-home.png`.
- **Justificación**: Mantiene una presentación visual idéntica en estructura a la tarjeta del niño (`nino-home.svg`), permitiendo que el vestido azul destaque con un contraste agradable.

## Riesgos y Mitigaciones

- **[Caché offline en PWA]** → Incluir los nuevos archivos en `service-worker.js` y actualizar el nombre de caché a `emotic-v17` para forzar la recarga de activos.
