# Diseño Técnico: Backend en PHP, MySQL y Autenticación Docente

## Contexto

El sistema emoTIC opera en un entorno XAMPP en Windows (PHP 8.2.12 y MySQL). Actualmente, el juego persiste su estado en el navegador mediante IndexedDB y LocalStorage ([db.js](file:///c:/xampp/htdocs/emoTIC/js/db.js)). Para centralizar la información pedagógica y habilitar la supervisión docente sin alterar la privacidad de los menores, se diseña un backend ligero en PHP con base de datos MySQL, desacoplado y con tolerancia a caídas de red.

## Objetivos / No-Objetivos

**Objetivos:**
- Proporcionar una API REST en PHP nativo modular y segura bajo `/backend`.
- Persistir intentos de juego en MySQL con identificación de género, curso, tiempos, errores, estrellas y detalle cualitativo JSON.
- Asegurar idempotencia mediante UUID para soportar sincronización diferida (offline-first).
- Proteger el acceso docente mediante usuario y contraseña, eliminando el reto matemático anterior.
- Gestionar credenciales mediante `.env` seguro (ignorado en Git) y documentado en `.env.example`.

**No-Objetivos:**
- No se exigirá inicio de sesión, correo electrónico ni contraseñas a los estudiantes.
- No se emplearán frameworks pesados (Laravel/Symfony) que requieran dependencias de Composer forzadas en el entorno del aula.
- No se descartará el almacenamiento local IndexedDB, el cual permanece como primera línea de defensa offline.

## Decisiones Técnicas

### 1. PHP 8.2 Nativo con PDO y Prepared Statements
- **Decisión**: Utilizar PHP estándar sin frameworks adicionales con conexión PDO MySQL.
- **Razón**: Máxima portabilidad y rendimiento directo sobre Apache/PHP en XAMPP sin pasos de compilación ni dependencias que puedan fallar en entornos escolares.
- **Alternativa considerada**: Laravel / Lumen (descartados por sobrecarga y requerimiento de Composer global en la máquina).

### 2. Cargador Nativo de Entorno (`backend/config/Env.php`)
- **Decisión**: Implementar un parser ligero de `.env` que pueble `$_ENV` y `getenv()`.
- **Razón**: Permite leer configuraciones sin necesidad de paquetes externos (`vlucas/phpdotenv`).
- **Alternativa considerada**: `parse_ini_file` simple (descartado por limitaciones con cadenas con caracteres especiales y comillas).

### 3. Modelo de Datos en MySQL (`emotic_db`)
- **Tabla `teachers`**:
  - `id INT AUTO_INCREMENT PRIMARY KEY`
  - `username VARCHAR(50) UNIQUE NOT NULL`
  - `password_hash VARCHAR(255) NOT NULL` (BCrypt mediante `password_hash()`)
  - `full_name VARCHAR(120)`
  - `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
- **Tabla `game_attempts`**:
  - `id INT AUTO_INCREMENT PRIMARY KEY`
  - `attempt_uuid VARCHAR(36) UNIQUE NOT NULL` (generado por el cliente)
  - `gender ENUM('nino', 'nina') NOT NULL`
  - `grade_level VARCHAR(50) NOT NULL` (ej. '1° Primaria')
  - `activity_id VARCHAR(50) NOT NULL` (ej. 'act-1')
  - `activity_title VARCHAR(150) NOT NULL`
  - `stars TINYINT NOT NULL DEFAULT 0`
  - `score INT NOT NULL DEFAULT 0`
  - `mistakes_count INT NOT NULL DEFAULT 0`
  - `duration_seconds INT NOT NULL DEFAULT 0`
  - `completed TINYINT(1) NOT NULL DEFAULT 1`
  - `details JSON NULL` (desglose pedagógico de elecciones y respuestas)
  - `client_timestamp DATETIME NOT NULL`
  - `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`

### 4. Seguridad y Autenticación con Tokens HMAC-SHA256
- **Decisión**: Emitir tokens de autorización firmados criptográficamente con `AUTH_SECRET` tras el login exitoso en `/backend/api/auth/login.php`.
- **Razón**: Permite validar solicitudes del docente de forma sin estado (stateless) sin depender de sesiones PHP en disco propensas a problemas de permisos.
- **Autorización de intentos**: Cabecera `X-API-Key` validada contra `APP_API_KEY` para autorizar envíos de los juegos.

### 5. Sincronización Frontend Resiliente
- **Decisión**: Modificar `emoTIC_DB.saveProgress` para encolar el intento en un almacén `pending_attempts` en IndexedDB y disparar sincronización en segundo plano con `navigator.onLine`.
- **Razón**: Garantiza que ningún intento se pierda si el estudiante juega en una tableta o computador sin internet.

### 6. Eliminación de Suma Matemática en Favor del Login
- **Decisión**: Reemplazar `checkAccess` en `js/teacher.js` y remover elementos en `navigation.js` y `app.js`.
- **Razón**: Solicitado expresamente por el usuario para brindar seguridad real al acceso pedagógico.

## Riesgos y Mitigaciones

| Riesgo | Mitigación |
| :--- | :--- |
| **Pérdida de conectividad con MySQL** | El frontend almacena intentos localmente y los reintenta automáticamente al detectar red; el juego nunca se bloquea. |
| **Exposición accidental de `.env` en Git** | Regla explícita en `.gitignore` tanto en raíz como en `backend/`; inclusión exclusiva de `.env.example` en commits. |
| **Inyección SQL o datos corruptos** | Uso estricto de sentencias preparadas (Prepared Statements con PDO) y tipado estricto de parámetros. |

## Plan de Puesta en Marcha

1. Crear script `backend/sql/schema.sql` con la definición de la base de datos `emotic_db` y el usuario docente por defecto.
2. Ejecutar el script en MySQL de XAMPP (mediante CLI o phpMyAdmin).
3. Generar `backend/.env.example` y crear el archivo local no versionado `backend/.env`.
4. Implementar las clases de configuración y los endpoints en `backend/api/`.
5. Integrar el frontend (`js/db.js`, `js/teacher.js`, `js/navigation.js`, `js/app.js`).
