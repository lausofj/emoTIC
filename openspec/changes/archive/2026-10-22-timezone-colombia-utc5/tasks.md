# Tasks

## 1. Configuración de Zona Horaria en Entorno y Backend PHP

- [x] 1.1 Actualizar `backend/.env.example` y `backend/.env` con la variable `APP_TIMEZONE=America/Bogota`; verificar comprobando la existencia de la variable en ambos archivos.
- [x] 1.2 Actualizar `backend/config/Env.php` para invocar `date_default_timezone_set(self::get('APP_TIMEZONE', 'America/Bogota'))` durante la carga; verificar mediante script PHP que `date_default_timezone_get()` retorne `America/Bogota`.

## 2. Sincronización de Zona Horaria en Base de Datos MySQL

- [x] 2.1 Actualizar `backend/config/Database.php` para incluir `SET time_zone = '-05:00'` en `PDO::MYSQL_ATTR_INIT_COMMAND`; verificar consultando `SELECT @@session.time_zone` en MySQL para confirmar el valor `-05:00`.
- [x] 2.2 Actualizar `backend/api/attempts.php` para asegurar el procesamiento de fechas y filtros por rango (`date_from`, `date_to`) en UTC-5; verificar enviando un intento y comprobando el valor de `client_timestamp` y `created_at` en MySQL.

## 3. Formateo Regional en el Panel Docente y Verificación

- [x] 3.1 Actualizar `js/teacher.js` con un formateador explícito `Intl.DateTimeFormat('es-CO', { timeZone: 'America/Bogota', ... })` para las fechas de la tabla de intentos y el reporte de impresión; verificar validando sintaxis de `teacher.js` y formato de salida.
- [x] 3.2 Ejecutar prueba integral de verificación de zona horaria entre cliente, PHP y base de datos; verificar que las fechas no presenten desfases horarios y correspondan a UTC-5.
