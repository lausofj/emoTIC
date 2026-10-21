# Tareas de Implementación

## 1. Desacoplamiento de la Interfaz y Navegación

- [ ] 1.1 Eliminar el botón `<button id="nav-link-library">Para familias</button>` de la barra de navegación en `index.html` y verificar que la barra muestre únicamente Jugar, Mis estrellas, Estrellas y Docente.
- [ ] 1.2 Eliminar el contenedor `<section id="library-screen">` y las etiquetas `<script>` de `library-data.js` y `library.js` en `index.html`.
- [ ] 1.3 Eliminar los manejadores y referencias a `library-screen` y `nav-link-library` en `js/navigation.js` y `js/app.js`, verificando que no se disparen errores en consola al navegar entre Inicio, Jugar y Docente.

## 2. Eliminación de Módulos Huérfanos de Código y Datos

- [ ] 2.1 Eliminar el archivo `js/library.js` del sistema de archivos y verificar su ausencia.
- [ ] 2.2 Eliminar el archivo `data/library-data.js` del sistema de archivos y verificar su ausencia.

## 3. Depuración de Ilustraciones No Utilizadas

- [ ] 3.1 Eliminar los 7 archivos huérfanos de `assets/illustrations/` (`gato-avatar.png`, `gatos-emociones.png`, `nina-home.svg`, `nino-home.svg`, `ayuda.svg`, `dino.svg`, `lola-lalo.svg`).
- [ ] 3.2 Verificar que el directorio `assets/illustrations/` mantenga intactas todas las imágenes requeridas por los 6 niveles jugables y los avatares activos.

## 4. Actualización de Caché PWA y Verificación

- [ ] 4.1 Actualizar `service-worker.js` incrementando `CACHE_NAME` a `emotic-v20` y retirando las referencias a `library.js`, `library-data.js`, las 7 ilustraciones eliminadas y las entradas obsoletas.
- [ ] 4.2 Actualizar la lista de precaché en `js/teacher.js` para reflejar la eliminación de los archivos.
- [ ] 4.3 Probar la navegación general y el correcto funcionamiento de los juegos en el navegador, asegurando que no se generen errores 404 ni excepciones en consola.
