# Propuesta: Eliminar apartado «Para familias» y depurar ilustraciones no utilizadas

## Por qué

La plataforma emoTIC actualmente incluye un botón y una sección denominada «Para familias» (biblioteca multimedia con cuentos locales y fichas imprimibles) que ya no forma parte del alcance prioritario de la aplicación enfocado en los juegos de los estudiantes y el acompañamiento docente. Además, existen 7 ilustraciones obsoletas o huérfanas en `assets/illustrations/` que consumen más de 470 KB innecesarios y sobrecargan la caché del Service Worker sin ser utilizadas en ningún juego. Esta depuración optimiza la experiencia de navegación del estudiante y reduce el peso de la plataforma.

## Qué Cambia

- **Eliminación del botón «Para familias»**: Se retira el enlace del encabezado superior flotante en `index.html`.
- **Eliminación de la pantalla de biblioteca multimedia**: Se remueve el contenedor `<section id="library-screen">` en `index.html`, así como sus scripts asociados (`js/library.js` y `data/library-data.js`).
- **Limpieza de controladores de navegación**: Se eliminan las referencias y escuchadores de `library-screen` y `nav-link-library` en `js/navigation.js` y `js/app.js`.
- **Depuración de activos gráficos no utilizados**: Se eliminan 7 archivos de `assets/illustrations/`:
  - `gato-avatar.png` (huérfano, no utilizado en juegos)
  - `gatos-emociones.png` (hoja de sprites pesada de 399 KB sin uso)
  - `nina-home.svg` (SVG legado, reemplazado por PNG)
  - `nino-home.svg` (SVG legado, reemplazado por PNG)
  - `ayuda.svg` (exclusivo de fichas imprimibles de familias)
  - `dino.svg` (exclusivo de fichas imprimibles de familias)
  - `lola-lalo.svg` (exclusivo de fichas imprimibles de familias)
- **Actualización de Service Worker y precaché**: Se actualizan `service-worker.js` (incremento a v20) y `js/teacher.js` retirando las referencias a los archivos eliminados y asegurando una descarga offline limpia.
- **Preservación explícita**: Se mantiene intacto el **Nivel 5 de los juegos** (*El bosque de las familias* con Timo), el cual es una actividad pedagógica oficial de los estudiantes.

## Capacidades

### Nuevas Capacidades
- `app-navigation`: Define la estructura y pantallas accesibles desde la barra de navegación superior (Inicio, Jugar, Mis estrellas, Modo Docente), garantizando que no existan enlaces ni pantallas huérfanas como la biblioteca para familias.

### Capacidades Modificadas
*(Ninguna especificación previa modificada)*

## Impacto

- **Interfaz de usuario**: La barra de navegación superior ahora tendrá una distribución más limpia y directa: Logo, Jugar, Mis estrellas, Contador de estrellas, Modo Docente.
- **Archivos de código y datos eliminados**: `js/library.js` y `data/library-data.js`.
- **Archivos de imagen eliminados**: 7 archivos en `assets/illustrations/`.
- **Caché y PWA**: `service-worker.js` incrementa su versión a `v20` y actualiza `ASSETS_TO_CACHE` para invalidar la caché antigua.
