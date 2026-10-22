# Propuesta: Migración de Ilustraciones SVG a PNG y Remoción de PWA

## Por qué

La plataforma emoTIC cuenta con gráficos en formatos mixtos (`.svg` y `.png`) donde la mayoría de los personajes principales (`lumi`, `timo`, `cuy`, avatares de exploradores) ya disponen de versiones rasterizadas en PNG de alta calidad y fondo transparente. Al mismo tiempo, la funcionalidad de Progressive Web App (PWA), Service Worker y manifest genera problemas de caché persistente y no es requerida para el despliegue actual de la plataforma web.

Esta propuesta unifica el catálogo gráfico en PNG, remueve las referencias y archivos SVG obsoletos, y desactiva por completo el soporte PWA (Service Worker, manifest y botón de instalación).

## Qué Cambia

- **Migración Gráfica a PNG**:
  - Reemplazo de referencias de `lumi.svg`, `timo.svg`, `cuy.svg`, `avatar-explorador.svg`, `avatar-exploradora.svg` y `avatar-fantastico.svg` por sus contrapartes `.png` en código (`js/guide.js`, `js/games.js`, `js/navigation.js`, `data/activities.js`).
  - Actualización de favicons y accesos directos en `index.html` hacia `assets/illustrations/lumi.png`.
  - Eliminación física de los 6 archivos `.svg` obsoletos en `assets/illustrations/`.
  - Mantenimiento intacto de referencias que no poseen archivo SVG físico en disco.
- **Remoción de PWA**:
  - Retiro de la vinculación a `manifest.webmanifest` y registro de `service-worker.js` en `index.html`.
  - Desregistro programático preventivo de cualquier Service Worker previamente activo en el navegador del cliente.
  - Eliminación del botón de instalación de la aplicación (`btn-install-app`) en el encabezado de `index.html`.
  - Desactivación de lógica PWA en `js/pwa.js`, `js/app.js` y el panel diagnóstico de `js/teacher.js`.

## Capacidades

### Nuevas Capacidades
*(Ninguna)*

### Capacidades Modificadas
- `app-navigation`: Actualiza los requisitos del encabezado (eliminación del botón de instalación PWA), la supresión de la infraestructura PWA/Service Worker, y la sustitución de ilustraciones vectoriales SVG por ilustraciones PNG en el catálogo de activos.

## Impacto

- **Código Afectado**:
  - `index.html`: enlaces de favicons a `lumi.png`, remoción de etiqueta manifest y botón `btn-install-app`.
  - `js/guide.js`, `js/games.js`, `js/navigation.js`, `data/activities.js`: rutas a imágenes `.png`.
  - `js/pwa.js`, `js/app.js`, `js/teacher.js`: desregistro y desactivación de PWA.
- **Activos**:
  - Eliminación de 6 archivos `.svg` en `assets/illustrations/`.
