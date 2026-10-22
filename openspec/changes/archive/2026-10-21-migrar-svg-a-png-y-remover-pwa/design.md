# Diseño Técnico: Migración de SVG a PNG y Remoción de PWA

## Contexto

La plataforma web emoTIC ejecuta interfaces interactivas para primaria organizadas mediante módulos en `js/` y catálogos en `data/`. Anteriormente se empleaba una infraestructura PWA con Service Worker (`service-worker.js`) y `manifest.webmanifest`, así como ilustraciones en formato SVG. Dado que la plataforma se despliega como web estándar y ya cuenta con activos rasterizados transparentes en PNG, se requiere una transición limpia que evite problemas de caché y unifique los activos.

Ver `proposal.md` para la justificación general.

## Metas / No-Metas

**Metas:**
- Migrar todas las referencias de ilustraciones SVG activas a sus versiones PNG correspondientes.
- Desactivar completamente la PWA, el manifiesto y el Service Worker.
- Desregistrar de forma limpia y preventiva cualquier Service Worker activo en los navegadores de los usuarios.
- Eliminar del repositorio los 6 archivos SVG obsoletos de `assets/illustrations/`.
- Mantener las rutas que no dispongan de archivo SVG en disco sin modificaciones.

**No-Metas:**
- Modificar la lógica pedagógica, actividades curriculares o mecánicas de juego.
- Crear nuevos iconos vectoriales o editar gráficos rasterizados existentes.

## Decisiones Técnicas

### 1. Migración de Rutas de Ilustraciones a PNG
- **Decisión**: Modificar las rutas que apuntan a:
  - `assets/illustrations/lumi.svg` -> `assets/illustrations/lumi.png`
  - `assets/illustrations/timo.svg` -> `assets/illustrations/timo.png`
  - `assets/illustrations/cuy.svg` -> `assets/illustrations/cuy.png`
  - `assets/illustrations/avatar-explorador.svg` -> `assets/illustrations/avatar-explorador.png`
  - `assets/illustrations/avatar-exploradora.svg` -> `assets/illustrations/avatar-exploradora.png`
  - `assets/illustrations/avatar-fantastico.svg` -> `assets/illustrations/avatar-fantastico.png`
- **Archivos impactados**: `js/guide.js`, `js/games.js`, `js/navigation.js`, `data/activities.js`, `data/activities-g*.js`.
- **Referencias huérfanas**: Siguiendo la indicación del usuario ("si no existe déjalo como está"), las referencias sin archivo SVG físico en disco (como `gato.svg`) no se modifican.

### 2. Actualización de Iconos y Favicons
- **Decisión**: En `index.html`, actualizar las etiquetas `<link rel="icon">` y `<link rel="apple-touch-icon">` para apuntar a `./assets/illustrations/lumi.png` con tipo `image/png`.

### 3. Estrategia de Desactivación y Desregistro de PWA
- **Decisión**:
  1. En `index.html`: Eliminar la etiqueta `<link rel="manifest" ...>` y el botón de instalación `<button id="btn-install-app" ...>`.
  2. En `js/pwa.js`: Reemplazar el método `registerServiceWorker()` por un mecanismo de desregistro activo:
     ```javascript
     if ("serviceWorker" in navigator) {
       navigator.serviceWorker.getRegistrations().then(registrations => {
         for (let registration of registrations) {
           registration.unregister();
         }
       });
     }
     ```
  3. En `js/pwa.js`: Mantener el monitor de conexión en línea/fuera de línea (`setupNetworkMonitor()` y `updateNetworkUI()`), ya que aporta valor visual al usuario sin depender de Service Worker.
  4. En `js/teacher.js`: Actualizar la sección de diagnóstico para indicar que el modo PWA/Service Worker está desactivado.

### 4. Eliminación de Archivos Obsoletos
- **Decisión**: Eliminar de `assets/illustrations/` los 6 archivos: `avatar-explorador.svg`, `avatar-exploradora.svg`, `avatar-fantastico.svg`, `cuy.svg`, `lumi.svg` y `timo.svg`.

## Riesgos y Mitigaciones

- **Riesgo**: Clientes recurrentes con Service Worker previamente instalado que continúen sirviendo archivos cacheados obsoletos.
  - **Mitigación**: Implementar el desregistro automático e inmediato de todos los Service Workers registrados al cargar `js/pwa.js`.
- **Riesgo**: Rotura de estilos o escalabilidad al sustituir SVG por PNG.
  - **Mitigación**: Las clases CSS existentes (`.lumi-mini-img`, `.empathy-avatar-img`, `.timo-avatar-choice-img`) aplican dimensiones explícitas y `object-fit: contain`, garantizando que las imágenes PNG transparentes se rendericen con idéntico tamaño y proporción.
