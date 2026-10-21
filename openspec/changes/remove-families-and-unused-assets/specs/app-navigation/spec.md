# Delta de Especificación: Navegación de la Aplicación

## Purpose

Define la navegación principal superior y las pantallas activas de la plataforma emoTIC para estudiantes y docentes, garantizando una interfaz enfocada y libre de secciones huérfanas.

## ADDED Requirements

### Requirement: Barra de navegación superior simplificada
El encabezado superior de la plataforma SHALL mostrar únicamente los enlaces de navegación a Inicio (logo), «Jugar», «Mis estrellas», el contador de estrellas acumuladas y el acceso al modo «Docente». No SHALL existir ningún botón ni enlace hacia el apartado «Para familias».

#### Scenario: Visualización de enlaces en la barra superior
- **WHEN** un usuario visualiza el encabezado principal de la aplicación
- **THEN** solo observa las opciones «Jugar», «Mis estrellas», el indicador de estrellas y el botón «Docente» sin rastro del botón «Para familias»

### Requirement: Exclusión de la pantalla de biblioteca para familias
La aplicación SHALL no contener ni renderizar la pantalla `library-screen` ni cargar los scripts asociados a la biblioteca de cuentos e imprimibles familiares (`library.js` y `library-data.js`).

#### Scenario: Intento de navegación o estado inactivo
- **WHEN** el sistema gestiona las pantallas activas mediante el enrutador
- **THEN** `library-screen` no es una pantalla registrable ni accesible en el ciclo de navegación

### Requirement: Limpieza de activos no utilizados en el catálogo de ilustraciones
El directorio `assets/illustrations/` SHALL contener exclusivamente las ilustraciones requeridas por las mecánicas de juego activas y los avatares de usuario. Los 7 archivos obsoletos o huérfanos (`gato-avatar.png`, `gatos-emociones.png`, `nina-home.svg`, `nino-home.svg`, `ayuda.svg`, `dino.svg`, `lola-lalo.svg`) SHALL ser eliminados del sistema de archivos y de la lista de recursos precacheados del Service Worker.

#### Scenario: Verificación de activos de ilustraciones
- **WHEN** se inspecciona el directorio de ilustraciones y la caché de la aplicación
- **THEN** no existen referencias ni archivos de los 7 activos eliminados y todos los juegos cargan sus ilustraciones sin errores 404
