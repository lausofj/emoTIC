# Propuesta: Backend en PHP y Persistencia MySQL para Intentos de Juegos y Autenticación Docente

## Por qué

Actualmente, emoTIC almacena el progreso de las actividades únicamente a nivel local en el navegador del dispositivo (IndexedDB / LocalStorage). Para que los docentes puedan realizar seguimiento formativo, evaluar el impacto pedagógico y consolidar estadísticas por curso y género, se requiere una aplicación backend en PHP con base de datos MySQL que reciba y gestione cada intento de los juegos de forma persistente y resiliente (offline-first). Asimismo, se requiere proteger el acceso al panel docente mediante credenciales de usuario y contraseña (eliminando el reto temporal de suma matemática) y resguardar las credenciales en un archivo de entorno `.env` no versionado con su respectiva plantilla `.env.example`.

## Qué Cambia

- **Nuevo Backend en PHP (`/backend`)**: Creación de una arquitectura ligera y modular en PHP 8.2 nativo con PDO para MySQL, sin dependencias externas pesadas.
- **Gestión y Registro de Intentos Anónimos**: Endpoints para persistir cada intento de juego registrando género (niño/niña), curso/grado escolar, estrellas, puntos, errores, duración en segundos, estado de compleción y detalles socioemocionales cualitativos en JSON.
- **Autenticación y Autorización Docente**: Reemplazo de la verificación matemática por un login con usuario y contraseña respaldado en la tabla `teachers` con contraseñas hasheadas (BCrypt) y tokens de autorización para consultar intentos y estadísticas.
- **Configuración Segura de Entorno**: Almacenamiento de credenciales de base de datos y llaves de API en `backend/.env`, excluido en `.gitignore`, acompañado de `backend/.env.example`.
- **Integración Frontend y Offline-First**: Adaptación en `js/db.js`, `js/games.js` y `js/teacher.js` para sincronizar intentos en segundo plano manteniendo operatividad fuera de línea.
- **Eliminación del Reto Matemático**: Supresión del desafío matemático en `teacher.js`, `navigation.js` y `app.js` en favor del modal de inicio de sesión docente.

## Capacidades

### Nuevas Capacidades
- `game-attempts-api`: Servicio backend en PHP y persistencia en MySQL para el registro anónimo y la consulta filtrada de intentos de juegos con soporte offline-first.
- `teacher-authentication`: Sistema de autenticación con usuario y contraseña para docentes, emisión de tokens de autorización y control de acceso a reportes y métricas.

### Capacidades Modificadas
- `app-navigation`: Actualización de la barra de navegación y los accesos al área docente para invocar el flujo de inicio de sesión en lugar del desafío de operaciones matemáticas.

## Impacto

- **Estructura del Proyecto**: Nueva carpeta `/backend` con submódulos `config/`, `api/`, `sql/` y plantillas de entorno.
- **Base de Datos**: Nueva base de datos MySQL `emotic_db` con tablas `teachers` y `game_attempts`.
- **Frontend**: Modificaciones en `js/teacher.js`, `js/navigation.js`, `js/app.js` y `js/db.js` para conectarse a la API del backend.
- **Repositorio Git**: Creación/actualización de `.gitignore` para salvaguardar credenciales.
