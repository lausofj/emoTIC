# teacher-authentication Specification

## Purpose
Define el mecanismo de autenticación y control de acceso seguro para docentes y administradores de emoTIC, sustituyendo métodos informales por credenciales de usuario y contraseña verificadas contra la base de datos con tokens de sesión.

## Requirements

### Requirement: Autenticación de docentes mediante credenciales
El sistema backend SHALL proveer un punto de entrada HTTP POST `/backend/api/auth/login.php` que valide el nombre de usuario y contraseña contra la tabla `teachers` de MySQL, empleando verificación criptográfica de contraseñas mediante algoritmo BCrypt.

#### Scenario: Autenticación exitosa con credenciales válidas
- **WHEN** un docente envía su usuario y contraseña correctos mediante POST
- **THEN** el sistema responde con código HTTP 200, los datos básicos del docente y un token de autorización válido

#### Scenario: Rechazo por credenciales incorrectas
- **WHEN** se envían credenciales que no coinciden con ningún registro o contraseña activa
- **THEN** el sistema responde con código HTTP 401 Unauthorized y un mensaje de error descriptivo sin revelar la causa exacta

### Requirement: Emisión y validación de tokens de sesión
El sistema SHALL emitir un token firmado temporal que los clientes docentes deben incluir en la cabecera `Authorization: Bearer <token>` para acceder a las rutas de gestión y estadísticas de intentos.

#### Scenario: Validación de token en rutas protegidas
- **WHEN** se invoca un recurso protegido con un token válido y no expirado
- **THEN** el sistema autoriza la operación y procesa la solicitud

#### Scenario: Denegación por token expirado o alterado
- **WHEN** se invoca un recurso protegido con un token caducado o con firma inválida
- **THEN** el sistema responde con código HTTP 401 Unauthorized bloqueando el acceso

### Requirement: Configuración de credenciales y claves en variables de entorno
El sistema SHALL cargar las credenciales de conexión a MySQL, las llaves de seguridad y las credenciales iniciales de siembra desde un archivo de entorno `.env`, garantizando que este no forme parte del repositorio de código y suministrando un archivo `.env.example` debidamente documentado.

#### Scenario: Lectura de variables de entorno seguras
- **WHEN** la aplicación backend inicializa sus módulos
- **THEN** lee la configuración desde `.env` local sin exponer contraseñas en el código fuente
