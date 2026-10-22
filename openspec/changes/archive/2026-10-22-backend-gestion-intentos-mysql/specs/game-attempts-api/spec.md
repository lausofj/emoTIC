# Spec Delta: game-attempts-api

## Purpose

Proporciona la interfaz de programación y la capa de persistencia en base de datos MySQL para registrar de forma anónima, consultar y gestionar los intentos realizados en los juegos educativos de emoTIC, con soporte para sincronización resiliente fuera de línea.

## ADDED Requirements

### Requirement: Registro anónimo de intentos de juego
El sistema backend SHALL exponer un punto de entrada HTTP POST que permita almacenar los intentos realizados por los estudiantes de forma completamente anónima, registrando género (niño o niña), curso o grado escolar, identificador y título de la actividad, estrellas obtenidas, puntaje, errores cometidos, duración en segundos, estado de compleción y un desglose detallado en formato JSON con las interacciones del juego.

#### Scenario: Registro exitoso de un intento completado
- **WHEN** el cliente envía una petición POST válida a `/backend/api/attempts.php` con las métricas del juego y la cabecera `X-API-Key`
- **THEN** el sistema persiste el intento en la tabla `game_attempts` de MySQL y responde con código HTTP 201 y el identificador asignado

#### Scenario: Petición sin autorización de cliente
- **WHEN** una petición de registro no incluye o contiene una cabecera `X-API-Key` inválida
- **THEN** el sistema rechaza la solicitud con código HTTP 401 Unauthorized y no persiste el registro

### Requirement: Idempotencia en sincronización diferida
El sistema SHALL aceptar un identificador único universal (UUID) por cada intento generado por el cliente. Si un intento con el mismo UUID ya fue persistido previamente, el sistema SHALL retornar una respuesta exitosa sin generar registros duplicados en la base de datos.

#### Scenario: Reintento de sincronización tras reconexión
- **WHEN** un cliente en cola offline envía un intento con un UUID que ya fue insertado con anterioridad
- **THEN** el backend reconoce el registro existente y devuelve código HTTP 200 sin duplicar la fila en MySQL

### Requirement: Consulta y filtrado seguro de intentos
El sistema backend SHALL permitir la consulta de los intentos almacenados únicamente a usuarios docentes autenticados, proveyendo capacidades de filtrado por actividad, curso, género y rango de fechas.

#### Scenario: Consulta autorizada con filtros
- **WHEN** un docente autenticado con token válido realiza una petición GET a `/backend/api/attempts.php` especificando parámetros de filtro
- **THEN** el sistema retorna una lista paginada en formato JSON con los intentos coincidentes

#### Scenario: Intento de consulta sin token de docente
- **WHEN** una petición GET a `/backend/api/attempts.php` no incluye un token de autorización Bearer válido
- **THEN** el sistema responde con código HTTP 401 Unauthorized denegando el acceso a los datos
