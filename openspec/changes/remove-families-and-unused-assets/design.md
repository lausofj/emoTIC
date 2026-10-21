# Diseño Técnico: Eliminación del Módulo «Para familias» y Depuración de Ilustraciones

## Context

Consultar `proposal.md` para la motivación. Actualmente la plataforma emoTIC cuenta con un enrutador basado en DOM en `js/navigation.js` que conmuta pantallas mostrando u ocultando elementos `<section class="app-screen">`. La biblioteca para familias está orquestada por `js/library.js` e inyecta dinámicamente cuentos, fichas y videos definidos en `data/library-data.js`. En paralelo, la carpeta `assets/illustrations/` acumula archivos legados que ya no son referenciados por las 6 actividades principales de aprendizaje socioemocional.

## Objetivos / No-Objetivos

**Objetivos:**
- Retirar completamente la presencia en interfaz del apartado «Para familias» en `index.html`.
- Eliminar el código huérfano (`js/library.js`, `data/library-data.js`) y desacoplar los manejadores de eventos en `js/navigation.js` y `js/app.js`.
- Eliminar físicamente los 7 archivos de imagen no utilizados en `assets/illustrations/`.
- Limpiar y sincronizar la lista de precaché en `service-worker.js` e incrementar a `v20`.
- Mantener la integridad de los 6 niveles de juegos educativos y los avatares activos del estudiante.

**No-Objetivos:**
- Modificar el Nivel 5 de los juegos (*El bosque de las familias* con Timo), el cual permanece 100% activo y funcional.
- Modificar las ilustraciones de los avatares principales del estudiante (`nina-home.png`, `nino-home.png`, `avatar-display-nina.png`, `avatar-display-nino.png`).
- Modificar el sistema de almacenamiento IndexedDB ni el módulo de audio de Lumi.

## Decisiones Técnicas

### 1. Eliminación física vs. deshabilitación lógica
- **Decisión:** Eliminar completamente los archivos `js/library.js`, `data/library-data.js` y los 7 activos de imagen no utilizados, en lugar de dejarlos ocultos o comentados.
- **Razón:** Reduce la deuda técnica, aligera el repositorio y la caché PWA offline en más de 470 KB, y evita descargas redundantes en dispositivos móviles o de bajo ancho de banda.
- **Alternativa descartada:** Ocultar únicamente el botón mediante CSS (`display: none`), lo que mantendría scripts y activos descargándose inútilmente.

### 2. Tratamiento de activos dependientes de la biblioteca
- **Decisión:** Eliminar `ayuda.svg`, `dino.svg` y `lola-lalo.svg` al borrar la biblioteca para familias, ya que solo se utilizaban como plantillas imprimibles en `library-data.js`.
- **Razón:** Ningún nivel jugable activo en `data/activities.js` depende de ellos. Los personajes jugables reales (Gato, Globito, Niña/Niño de empatía, Dúo de superhéroes, Timo y Cuy) tienen sus propios recursos vectoriales y rasterizados bien definidos.

### 3. Actualización y migración de Caché PWA
- **Decisión:** Incrementar `CACHE_NAME` a `emotic-v20` en `service-worker.js`, purgar entradas inexistentes (`./assets/illustrations/gato.svg`, `./assets/illustrations/gina.svg`, `./assets/illustrations/jatron.svg`, etc.) y actualizar la versión del query string en `index.html`.
- **Razón:** Garantiza que los navegadores eliminen la caché antigua y no generen advertencias o errores 404 de recursos durante la instalación del Service Worker.

## Riesgos / Mitigaciones

- **[Riesgo]** Algún enlace o botón interno intenta llamar a `library-screen` provocando excepciones de JavaScript.  
  → **Mitigación**: Buscar todas las referencias textuales a `library-screen` y `nav-link-library` en `js/app.js` y `js/navigation.js` y retirarlas limpiamente antes de eliminar los scripts.
- **[Riesgo]** Algún juego requiera una de las ilustraciones a eliminar.  
  → **Mitigación**: La auditoría previa confirmó que los juegos de los 6 niveles utilizan exclusivamente los gatos de emociones (1), globito (2), nino-nina (3), héroes (4), timo y avatares de exploración (5), y cuy (6). Ninguno de los 7 archivos a eliminar es utilizado en las actividades.
