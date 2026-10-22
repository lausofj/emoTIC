# Spec Delta: game-attempts-api

## ADDED Requirements

### Requirement: Normalización temporal en zona horaria UTC-5 (America/Bogota)
El sistema backend y la base de datos MySQL SHALL operar bajo la zona horaria regional UTC-5 (`America/Bogota`), asegurando que la marca de tiempo de los intentos registrados y las marcas de auditoría se almacenen y consulten de forma consistente con la jornada escolar colombiana.

#### Scenario: Almacenamiento en zona horaria UTC-5
- **WHEN** un cliente registra un intento de juego mediante POST `/backend/api/attempts.php`
- **THEN** la fecha y hora almacenada en `client_timestamp` y `created_at` corresponde a la zona horaria UTC-5 (`America/Bogota`) independientemente de la ubicación física del servidor

#### Scenario: Filtrado docente por rango de fecha en UTC-5
- **WHEN** un docente realiza una consulta filtrando por rango de fechas (ej. `date_from` y `date_to`)
- **THEN** la evaluación de límites de inicio y fin de día se realiza tomando como base la medianoche de la zona horaria UTC-5
