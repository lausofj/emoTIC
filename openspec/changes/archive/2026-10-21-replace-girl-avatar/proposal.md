# Propuesta: Reemplazar Avatar de la Niña

## Por qué

La opción de avatar femenino actual utiliza una ilustración vectorial plana genérica que no se alinea con la nueva línea gráfica ilustrada y cálida de emoTIC. La sustitución por la ilustración en primer plano de la niña de coletas con lazos azules en pose de saludo aporta mayor cercanía, expresividad y calidad visual tanto en la pantalla de inicio como en el cuaderno del estudiante.

## Qué Cambia

- **Botón de selección en inicio**: Actualizar el icono del botón "Niña" (`#btn-avatar-nina`) en `index.html` con la nueva ilustración en pose de saludo sobre un contenedor con esquinas redondeadas y degradado coral/melocotón suave.
- **Visualización del avatar en el cuaderno**: Actualizar en `js/app.js` la imagen del avatar seleccionado (`#notebook-avatar-main-img`) para mostrar la nueva ilustración sin fondo al seleccionar "Niña".
- **Caché offline**: Registrar los nuevos recursos en `service-worker.js` para asegurar disponibilidad sin conexión.

## Capacidades

### Nuevas Capacidades
- `girl-avatar-ui`: Presentación visual y selección del avatar de la niña en la pantalla principal y en el cuaderno del estudiante.

### Capacidades Modificadas
*(Ninguna)*

## Impacto

- **Recursos**: Nuevas imágenes en `assets/illustrations/` (`nina-home.png`, `avatar-display-nina.png`).
- **Código**: Actualizaciones en `index.html`, `js/app.js` y `service-worker.js`.
- **Compatibilidad**: Sin cambios que rompan compatibilidad con versiones anteriores.
