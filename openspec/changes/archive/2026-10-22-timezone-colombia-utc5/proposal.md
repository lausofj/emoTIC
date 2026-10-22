# Propuesta: Configuración Regional UTC-5 (America/Bogota) para Intentos y Reportes

## Por qué

Actualmente, los registros de intentos de los juegos y las consultas pedagógicas en emoTIC no tienen configurada explícitamente una zona horaria en el backend ni en la base de datos MySQL. En servidores de producción o hostings remotos (como ByetHost o servidores en la nube) cuya hora predeterminada es UTC o europea (CET/CEST), las fechas de los intentos se desfasaban entre 5 y 7 horas respecto a la jornada escolar de los colegios en Colombia. Establecer de forma uniforme la zona horaria regional UTC-5 (`America/Bogota`) en PHP, MySQL y la presentación docente garantiza que las horas de juego, filtros por fecha e informes imprimibles reflejen con exactitud el horario escolar colombiano.

## Qué Cambia

- **Zona Horaria en Backend PHP**: Establecimiento de la zona horaria predeterminada `America/Bogota` (UTC-5) en el inicio del backend (`Env.php`, `Database.php`, `Response.php`).
- **Sincronización de Zona Horaria en MySQL**: Configuración de la sesión de PDO con `SET time_zone = '-05:00'` para asegurar que `CURRENT_TIMESTAMP` y las funciones de fecha en MySQL almacenen y consulten horas en UTC-5, independientemente de la ubicación física del servidor.
- **Variable de Entorno `APP_TIMEZONE`**: Inclusión de `APP_TIMEZONE=America/Bogota` en `.env.example` y `.env` para permitir configuración declarativa.
- **Formateo Regional en el Panel Docente**: Presentación de las marcas de tiempo en `teacher.js` formateadas con localización colombiana (`es-CO` y zona horaria `America/Bogota`), evitando discrepancias visuales al visualizar o imprimir informes.

## Capacidades

### Nuevas Capacidades
*(Ninguna; se refinan capacidades existentes).*

### Capacidades Modificadas
- `game-attempts-api`: Adición del requisito de registro, almacenamiento y filtrado temporal consistente bajo la zona horaria UTC-5 (`America/Bogota`).

## Impacto

- **Backend**: [backend/config/Env.php](file:///c:/xampp/htdocs/emoTIC/backend/config/Env.php), [backend/config/Database.php](file:///c:/xampp/htdocs/emoTIC/backend/config/Database.php), [backend/api/attempts.php](file:///c:/xampp/htdocs/emoTIC/backend/api/attempts.php).
- **Entorno**: [backend/.env.example](file:///c:/xampp/htdocs/emoTIC/backend/.env.example) y `backend/.env`.
- **Frontend**: [js/teacher.js](file:///c:/xampp/htdocs/emoTIC/js/teacher.js).
- **Base de Datos**: Sesiones PDO de MySQL sincronizadas en `-05:00`.
