# Diseño Técnico: Estandarización de Zona Horaria UTC-5 (America/Bogota)

## Contexto

El sistema emoTIC almacena y procesa intentos pedagógicos en una arquitectura PHP + MySQL orientada a colegios de educación básica primaria en Colombia. Al desplegarse en servidores en la nube o compartidos (como ByetHost), la zona horaria del sistema suele estar configurada en UTC o Europa (CET/CEST), provocando que las marcas de tiempo se almacenen con varias horas de adelanto respecto al horario escolar real.

## Objetivos / No-Objetivos

**Objetivos:**
- Establecer de manera consistente y determinista la zona horaria `America/Bogota` (UTC-5) en todas las ejecuciones de PHP.
- Forzar la zona horaria de sesión en MySQL mediante `SET time_zone = '-05:00'` en la conexión PDO.
- Permitir la parametrización de la zona horaria mediante la variable de entorno `APP_TIMEZONE`.
- Asegurar que el filtrado por rangos de fecha y la visualización de reportes coincidan con el día escolar local.

**No-Objetivos:**
- No modificar el tipo de datos de las columnas existentes en MySQL (`DATETIME` y `TIMESTAMP`).
- No incorporar dependencias pesadas de manejo de fechas (como Carbon o Moment.js); se utiliza la funcionalidad nativa de PHP 8.2 y JavaScript `Intl`.

## Decisiones Técnicas

### 1. Inicialización de Zona Horaria en PHP (`Env.php` / Bootstrap)
- **Decisión**: Invocar `date_default_timezone_set(Env::get('APP_TIMEZONE', 'America/Bogota'))` inmediatamente después de cargar las variables de entorno en `Env::load()`.
- **Razón**: Garantiza que cualquier llamada a `date()`, `time()`, `strtotime()` o formateadores en cualquier archivo de la aplicación tenga la hora de Colombia de manera transparente.
- **Alternativa considerada**: Configurar `php.ini` (descartado porque en hostings compartidos como ByetHost no hay acceso de administrador al `php.ini` global).

### 2. Configuración de Sesión en MySQL con Offset Numérico
- **Decisión**: Ejecutar `SET time_zone = '-05:00'` a través de `PDO::MYSQL_ATTR_INIT_COMMAND` en [Database.php](file:///c:/xampp/htdocs/emoTIC/backend/config/Database.php).
- **Razón**: El offset numérico `'-05:00'` funciona de manera universal en cualquier servidor MySQL/MariaDB sin depender de si el hosting tiene poblada la tabla `mysql.time_zone_name`.
- **Alternativa considerada**: Usar `SET time_zone = 'America/Bogota'` (descartado porque en muchos servidores MariaDB produce error si las tablas de zona horaria no están cargadas).

### 3. Formateo Regional en el Panel Docente (`teacher.js`)
- **Decisión**: Emplear `Intl.DateTimeFormat('es-CO', { timeZone: 'America/Bogota', dateStyle: 'short', timeStyle: 'short' })` para presentar las fechas y horas en la tabla y los informes impresos.
- **Razón**: Garantiza que incluso si el navegador del docente estuviera desconfigurado, las fechas siempre se muestren en la hora de Colombia.

## Riesgos y Mitigaciones

| Riesgo | Mitigación |
| :--- | :--- |
| **Diferencias entre offset fijo y horario de verano** | Colombia no aplica horario de verano (Daylight Saving Time); UTC-5 es constante todo el año. |
| **Incompatibilidad con tablas de zonas de MySQL** | Se utiliza la especificación de desplazamiento numérico `-05:00` en lugar del nombre de la región. |
| **Intentos locales guardados antes del cambio** | Los clientes conservan el timestamp ISO original y el backend interpreta la hora de forma segura. |
