# Delta de Especificación: Navegación de la Aplicación

## MODIFIED Requirements

### Requirement: Barra de navegación superior simplificada
El encabezado superior de la plataforma SHALL mostrar exclusivamente los enlaces a Inicio (logo), «Jugar», «Mis estrellas», el contador de estrellas acumuladas, el indicador de conexión a red, las opciones de accesibilidad y el acceso al modo «Docente». No SHALL existir ningún botón ni enlace hacia «Para familias» ni ningún botón de instalación PWA (`btn-install-app`).

#### Scenario: Visualización de enlaces en la barra superior
- **WHEN** un usuario visualiza el encabezado principal de la aplicación
- **THEN** observa las opciones principales de navegación y accesibilidad, sin enlaces a «Para familias» ni botón de instalación PWA

### Requirement: Limpieza de activos no utilizados en el catálogo de ilustraciones
El directorio `assets/illustrations/` SHALL contener exclusivamente las ilustraciones activas en formato PNG requeridas por las mecánicas de juego y avatares. Los 6 archivos vectoriales obsoletos (`avatar-explorador.svg`, `avatar-exploradora.svg`, `avatar-fantastico.svg`, `cuy.svg`, `lumi.svg`, `timo.svg`) SHALL ser eliminados del sistema de archivos, y todas las referencias activas en la aplicación SHALL apuntar a sus versiones `.png`.

#### Scenario: Verificación de activos de ilustraciones
- **WHEN** se inspecciona el directorio `assets/illustrations/` y se navega por los juegos
- **THEN** no existen los 6 archivos `.svg` obsoletos y todas las imágenes de personajes se cargan satisfactoriamente en formato PNG

## ADDED Requirements

### Requirement: Desactivación de Progressive Web App y Service Worker
La aplicación SHALL operar como una aplicación web tradicional sin infraestructura PWA ni Service Worker. El sistema SHALL desvincular el archivo de manifiesto (`manifest.webmanifest`), no registrar ningún Service Worker y desregistrar programáticamente cualquier Service Worker previamente activo en el navegador del cliente para evitar problemas de almacenamiento en caché persistente.

#### Scenario: Desregistro e inactividad de Service Worker
- **WHEN** un usuario carga o recarga la plataforma emoTIC
- **THEN** el navegador no registra ningún Service Worker, desregistra los existentes si los hubiera y la aplicación no depende de caché de Service Worker
