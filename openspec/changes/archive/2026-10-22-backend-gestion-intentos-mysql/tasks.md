# Tasks

## 1. Configuración de Base de Datos y Entorno Seguro

- [x] 1.1 Crear el script SQL `backend/sql/schema.sql` con las tablas `teachers` y `game_attempts`, índices de consulta y docente inicial por defecto; verificar validando sintaxis de creación de tablas e inserción en MySQL.
- [x] 1.2 Configurar `backend/.env.example`, generar el archivo local `backend/.env` y actualizar `.gitignore` para resguardar credenciales de base de datos y llaves de API; verificar que `git status` ignore `backend/.env`.
- [x] 1.3 Implementar las clases `backend/config/Env.php` (lector de variables de entorno) y `backend/config/Database.php` (conexión PDO Singleton a MySQL con manejo de errores); verificar mediante un script de prueba de conexión a la base de datos `emotic_db`.

## 2. Autenticación y Autorización de Docentes

- [x] 2.1 Implementar el módulo `backend/config/Auth.php` para emisión y validación de tokens de sesión HMAC-SHA256 y verificación de llaves de API (`X-API-Key`); verificar ejecutando pruebas de generación, firma válida, expiración y firma alterada.
- [x] 2.2 Implementar el endpoint POST `backend/api/auth/login.php` que verifique credenciales contra la tabla `teachers` con `password_verify` y retorne el token de autorización; verificar enviando credenciales correctas (código 200 con token) e incorrectas (código 401).

## 3. API REST para Persistencia y Consulta de Intentos

- [x] 3.1 Implementar el endpoint POST `backend/api/attempts.php` para registrar intentos anónimos de juegos con validación de `X-API-Key`, almacenamiento de métricas (género, grado, errores, duración, estrellas, detalles JSON) y soporte de idempotencia por `attempt_uuid`; verificar enviando un intento nuevo (201 Created) y reintentando el mismo UUID (200 OK sin duplicar registro).
- [x] 3.2 Implementar el endpoint GET `backend/api/attempts.php` protegido con token Bearer de docente para listar y filtrar intentos por actividad, curso, género y fecha; verificar consultando sin token (401 Unauthorized) y con token de docente válido (200 OK con arreglo JSON de intentos).

## 4. Integración Frontend y Sincronización Offline-First

- [x] 4.1 Actualizar `js/db.js` para incorporar el almacén `pending_attempts` en IndexedDB, generación de UUID por intento y rutina de sincronización en segundo plano con `backend/api/attempts.php` al detectar conectividad; verificar encolando un intento sin conexión y comprobando su despacho automático al reconectar.
- [x] 4.2 Actualizar `js/games.js` para asegurar que el registro de intento incluya los metadatos de género, grado escolar y desglose cualitativo al invocar el guardado de progreso; verificar completando una actividad y comprobando el objeto generado.

## 5. Renovación de Navegación y Panel Docente

- [x] 5.1 Eliminar el desafío de suma matemática en `index.html`, `js/navigation.js`, `js/app.js` y `js/teacher.js`, reemplazándolo por el modal de login con campos de usuario y contraseña; verificar haciendo clic en «Docente» y constatando la apertura del formulario de credenciales.
- [x] 5.2 Actualizar `js/teacher.js` para gestionar el flujo de inicio de sesión docente (envío al endpoint `/login.php`, guardado de token en `sessionStorage`/`localStorage`), cierre de sesión e integración de los filtros y tabla de intentos consumiendo `backend/api/attempts.php`; verificar visualizando los registros persistidos en la base de datos tras iniciar sesión.

## 6. Verificación Integral y Pruebas E2E

- [x] 6.1 Ejecutar prueba integral del flujo completo (jugar actividad -> registro local e inserción en MySQL -> login docente con credenciales -> visualización filtrada en el panel docente); verificar consistencia de datos entre base de datos MySQL e interfaz de usuario.
