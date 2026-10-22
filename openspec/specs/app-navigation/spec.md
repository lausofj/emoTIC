# Especificación: Navegación de la Aplicación

## Purpose

Define la navegación principal superior y las pantallas activas de la plataforma emoTIC para estudiantes y docentes, garantizando una interfaz enfocada y libre de secciones huérfanas.

## Requirements

### Requirement: Barra de navegación superior simplificada
El encabezado superior de la plataforma SHALL mostrar exclusivamente los enlaces a Inicio (logo), «Jugar», «Mis estrellas», el contador de estrellas acumuladas, el indicador de conexión a red, las opciones de accesibilidad y el acceso al modo «Docente». No SHALL existir ningún botón ni enlace hacia «Para familias» ni ningún botón de instalación PWA (`btn-install-app`).

#### Scenario: Visualización de enlaces en la barra superior
- **WHEN** un usuario visualiza el encabezado principal de la aplicación
- **THEN** observa las opciones principales de navegación y accesibilidad, sin enlaces a «Para familias» ni botón de instalación PWA

### Requirement: Exclusión de la pantalla de biblioteca para familias
La aplicación SHALL no contener ni renderizar la pantalla `library-screen` ni cargar los scripts asociados a la biblioteca de cuentos e imprimibles familiares (`library.js` y `library-data.js`).

#### Scenario: Intento de navegación o estado inactivo
- **WHEN** el sistema gestiona las pantallas activas mediante el enrutador
- **THEN** `library-screen` no es una pantalla registrable ni accesible en el ciclo de navegación

### Requirement: Limpieza de activos no utilizados en el catálogo de ilustraciones
El directorio `assets/illustrations/` SHALL contener exclusivamente las ilustraciones activas en formato PNG requeridas por las mecánicas de juego y avatares. Los 6 archivos vectoriales obsoletos (`avatar-explorador.svg`, `avatar-exploradora.svg`, `avatar-fantastico.svg`, `cuy.svg`, `lumi.svg`, `timo.svg`) SHALL ser eliminados del sistema de archivos, y todas las referencias activas en la aplicación SHALL apuntar a sus versiones `.png`.

#### Scenario: Verificación de activos de ilustraciones
- **WHEN** se inspecciona el directorio `assets/illustrations/` y se navega por los juegos
- **THEN** no existen los 6 archivos `.svg` obsoletos y todas las imágenes de personajes se cargan satisfactoriamente en formato PNG

### Requirement: Desactivación de Progressive Web App y Service Worker
La aplicación SHALL operar como una aplicación web tradicional sin infraestructura PWA ni Service Worker. Los archivos residuales `manifest.webmanifest` y `service-worker.js` SHALL ser eliminados del repositorio, y el sistema SHALL desregistrar programáticamente cualquier Service Worker previamente activo en el navegador del cliente para evitar problemas de almacenamiento en caché persistente.

#### Scenario: Desregistro e inactividad de Service Worker
- **WHEN** un usuario carga o recarga la plataforma emoTIC
- **THEN** el navegador no registra ningún Service Worker, desregistra los existentes si los hubiera y la aplicación no depende de caché de Service Worker

### Requirement: Acceso docente mediante formulario de credenciales
El botón de acceso al modo «Docente» en el encabezado superior SHALL activar exclusivamente un modal de inicio de sesión seguro con campos para nombre de usuario y contraseña, eliminando cualquier verificación o reto basado en sumas u operaciones matemáticas.

#### Scenario: Apertura de modal de autenticación docente
- **WHEN** un usuario hace clic en el botón «Docente» del encabezado
- **THEN** la interfaz presenta el modal de autenticación solicitando usuario y contraseña sin requerir operaciones aritméticas

#### Scenario: Cierre de sesión y protección de navegación
- **WHEN** un docente autenticado activa la opción de cerrar sesión dentro del panel docente
- **THEN** la aplicación invalida y elimina el token de sesión local y redirige a la pantalla de bienvenida restringiendo el acceso inmediato
