<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/Env.php';
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../config/Auth.php';
require_once __DIR__ . '/../config/Response.php';

use EmoTIC\Config\Database;
use EmoTIC\Config\Auth;
use EmoTIC\Config\Response;

Response::initCors();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'POST') {
    handlePost();
} elseif ($method === 'GET') {
    handleGet();
} else {
    Response::error("Método HTTP {$method} no permitido. Use GET o POST.", 405);
}

/**
 * Registro de intentos de juego (autorizado mediante X-API-Key).
 */
function handlePost(): void
{
    $apiKey = Auth::getApiKeyHeader();
    if (!Auth::verifyApiKey($apiKey)) {
        Response::error('Clave de API inválida o ausente en cabecera X-API-Key.', 401);
    }

    $input = Response::getJsonInput();

    // Validar campos obligatorios
    $uuid = isset($input['attempt_uuid']) ? trim((string)$input['attempt_uuid']) : '';
    $gender = isset($input['gender']) ? trim((string)$input['gender']) : '';
    $gradeLevel = isset($input['grade_level']) ? trim((string)$input['grade_level']) : '';
    $activityId = isset($input['activity_id']) ? trim((string)$input['activity_id']) : '';
    $activityTitle = isset($input['activity_title']) ? trim((string)$input['activity_title']) : '';

    if ($uuid === '') {
        // Generar UUID v4 si no fue provisto
        $uuid = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

    if (!in_array($gender, ['nino', 'nina'], true)) {
        $gender = 'nino'; // Fallback por defecto si no está especificado
    }

    if ($gradeLevel === '') {
        $gradeLevel = 'Sin curso';
    }

    if ($activityId === '') {
        Response::error('El identificador de actividad (activity_id) es obligatorio.', 400);
    }

    if ($activityTitle === '') {
        $activityTitle = $activityId;
    }

    $stars = isset($input['stars']) ? max(0, min(3, (int)$input['stars'])) : 0;
    $score = isset($input['score']) ? max(0, (int)$input['score']) : 0;
    $mistakes = isset($input['mistakes_count']) ? max(0, (int)$input['mistakes_count']) : 0;
    $duration = isset($input['duration_seconds']) ? max(0, (int)$input['duration_seconds']) : 0;
    $completed = isset($input['completed']) ? ((bool)$input['completed'] ? 1 : 0) : 1;

    $details = null;
    if (isset($input['details'])) {
        if (is_array($input['details']) || is_object($input['details'])) {
            $details = json_encode($input['details'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } elseif (is_string($input['details'])) {
            $details = $input['details'];
        }
    }

    $clientTimestamp = isset($input['client_timestamp']) && trim((string)$input['client_timestamp']) !== ''
        ? date('Y-m-d H:i:s', strtotime((string)$input['client_timestamp']) ?: time())
        : date('Y-m-d H:i:s');

    try {
        $pdo = Database::getConnection();

        // 1. Verificación de Idempotencia por UUID
        $checkStmt = $pdo->prepare('SELECT id, attempt_uuid FROM game_attempts WHERE attempt_uuid = :uuid LIMIT 1');
        $checkStmt->execute(['uuid' => $uuid]);
        $existing = $checkStmt->fetch();

        if ($existing) {
            Response::json([
                'success'      => true,
                'message'      => 'Intento ya registrado previamente (operación idempotente).',
                'id'           => (int)$existing['id'],
                'attempt_uuid' => $existing['attempt_uuid']
            ], 200);
        }

        // 2. Inserción de nuevo intento
        $sql = 'INSERT INTO game_attempts 
                (attempt_uuid, gender, grade_level, activity_id, activity_title, stars, score, mistakes_count, duration_seconds, completed, details, client_timestamp)
                VALUES 
                (:uuid, :gender, :grade, :act_id, :act_title, :stars, :score, :mistakes, :duration, :completed, :details, :ts)';
        
        $insertStmt = $pdo->prepare($sql);
        $insertStmt->execute([
            'uuid'       => $uuid,
            'gender'     => $gender,
            'grade'      => $gradeLevel,
            'act_id'     => $activityId,
            'act_title'  => $activityTitle,
            'stars'      => $stars,
            'score'      => $score,
            'mistakes'   => $mistakes,
            'duration'   => $duration,
            'completed'  => $completed,
            'details'    => $details,
            'ts'         => $clientTimestamp
        ]);

        $newId = (int)$pdo->lastInsertId();

        Response::json([
            'success'      => true,
            'message'      => 'Intento registrado exitosamente.',
            'id'           => $newId,
            'attempt_uuid' => $uuid
        ], 201);

    } catch (\Throwable $e) {
        error_log("Error en POST attempts.php: " . $e->getMessage());
        Response::error('Error al registrar el intento en el servidor.', 500);
    }
}

/**
 * Consulta y filtrado de intentos (protegido con Bearer Token de docente).
 */
function handleGet(): void
{
    $token = Auth::getBearerToken();
    if ($token === null) {
        Response::error('No autorizado. Token Bearer ausente.', 401);
    }

    $payload = Auth::verifyToken($token);
    if ($payload === null) {
        Response::error('No autorizado. Token de docente inválido o caducado.', 401);
    }

    try {
        $pdo = Database::getConnection();

        $where = [];
        $params = [];

        if (!empty($_GET['activity_id'])) {
            $where[] = 'activity_id = :activity_id';
            $params['activity_id'] = trim((string)$_GET['activity_id']);
        }

        if (!empty($_GET['grade_level'])) {
            $where[] = 'grade_level = :grade_level';
            $params['grade_level'] = trim((string)$_GET['grade_level']);
        }

        if (!empty($_GET['gender'])) {
            $where[] = 'gender = :gender';
            $params['gender'] = trim((string)$_GET['gender']);
        }

        if (!empty($_GET['date_from'])) {
            $where[] = 'client_timestamp >= :date_from';
            $params['date_from'] = trim((string)$_GET['date_from']) . ' 00:00:00';
        }

        if (!empty($_GET['date_to'])) {
            $where[] = 'client_timestamp <= :date_to';
            $params['date_to'] = trim((string)$_GET['date_to']) . ' 23:59:59';
        }

        $sql = 'SELECT id, attempt_uuid, gender, grade_level, activity_id, activity_title, 
                       stars, score, mistakes_count, duration_seconds, completed, details, 
                       client_timestamp, created_at 
                FROM game_attempts';

        if (count($where) > 0) {
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }

        $sql .= ' ORDER BY client_timestamp DESC LIMIT :limit OFFSET :offset';

        $limit = isset($_GET['limit']) ? max(1, min(500, (int)$_GET['limit'])) : 100;
        $offset = isset($_GET['offset']) ? max(0, (int)$_GET['offset']) : 0;

        $stmt = $pdo->prepare($sql);
        foreach ($params as $key => $val) {
            $stmt->bindValue(":{$key}", $val);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

        $stmt->execute();
        $rows = $stmt->fetchAll();

        // Decodificar JSON en el campo details para comodidad del cliente
        foreach ($rows as &$row) {
            $row['id'] = (int)$row['id'];
            $row['stars'] = (int)$row['stars'];
            $row['score'] = (int)$row['score'];
            $row['mistakes_count'] = (int)$row['mistakes_count'];
            $row['duration_seconds'] = (int)$row['duration_seconds'];
            $row['completed'] = (bool)$row['completed'];
            if (!empty($row['details'])) {
                $decoded = json_decode($row['details'], true);
                if ($decoded !== null) {
                    $row['details'] = $decoded;
                }
            }
        }
        unset($row);

        Response::json([
            'success' => true,
            'count'   => count($rows),
            'data'    => $rows
        ], 200);

    } catch (\Throwable $e) {
        error_log("Error en GET attempts.php: " . $e->getMessage());
        Response::error('Error al consultar los intentos en el servidor.', 500);
    }
}
