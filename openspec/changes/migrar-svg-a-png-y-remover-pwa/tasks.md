# Tareas de Implementación

## 1. Migración de Referencias Gráficas a PNG

- [ ] 1.1 Actualizar las referencias de `lumi.svg` a `assets/illustrations/lumi.png` en `js/guide.js`, `index.html` (favicon y apple-touch-icon) y `data/activities-g*.js`, verificando que el personaje guía y el favicon se visualicen correctamente.
- [ ] 1.2 Actualizar las referencias de `timo.svg` a `assets/illustrations/timo.png` en `js/games.js`, `js/navigation.js` y `data/activities.js`, comprobando que las actividades y avatares de Timo carguen la imagen PNG.
- [ ] 1.3 Actualizar las referencias de `cuy.svg` a `assets/illustrations/cuy.png` en `js/games.js`, `js/navigation.js` y `data/activities.js`, comprobando que las actividades y avatares de Kori el Cuy carguen la imagen PNG.
- [ ] 1.4 Actualizar las rutas de los avatares secundarios (`avatar-explorador.svg`, `avatar-exploradora.svg`, `avatar-fantastico.svg`) a sus equivalentes `.png` en `data/activities.js` y `js/games.js`, verificando el selector de avatares en la aventura de Timo.

## 2. Remoción de PWA y Desregistro de Service Worker

- [ ] 2.1 Remover el enlace `<link rel="manifest">` y el botón de instalación `<button id="btn-install-app">` en `index.html`, verificando que el encabezado no muestre el botón de instalación.
- [ ] 2.2 Modificar `js/pwa.js` para eliminar el registro de `service-worker.js`, desactivar el prompt de instalación PWA e implementar el desregistro automático de cualquier Service Worker existente (`navigator.serviceWorker.getRegistrations()`).
- [ ] 2.3 Actualizar el panel de diagnóstico en `js/teacher.js` para reflejar que el modo PWA está deshabilitado y retirar acciones de precaché innecesarias.

## 3. Limpieza de Activos y Verificación Final

- [ ] 3.1 Eliminar los 6 archivos obsoletos de `assets/illustrations/` (`avatar-explorador.svg`, `avatar-exploradora.svg`, `avatar-fantastico.svg`, `cuy.svg`, `lumi.svg`, `timo.svg`) y verificar que el directorio solo contenga archivos PNG activos.
- [ ] 3.2 Realizar una búsqueda global en el código fuente para confirmar que no queden referencias activas a los 6 archivos eliminados ni fallos 404 en el navegador.
