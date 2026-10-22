<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/Env.php';
require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../../config/Auth.php';
require_once __DIR__ . '/../../config/Response.php';

use EmoTIC\Config\Database;
use EmoTIC\Config\Auth;
use EmoTIC\Config\Response;

Response::initCors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Método HTTP no permitido. Use POST.', 405);
}

$input = Response::getJsonInput();
$username = isset($input['username']) ? trim((string)$input['username']) : '';
$password = isset($input['password']) ? (string)$input['password'] : '';

if ($username === '' || $password === '') {
    Response::error('El nombre de usuario y la contraseña son requeridos.', 400);
}

try {
    $pdo = Database::getConnection();
    $stmt = $pdo->prepare('SELECT id, username, password_hash, full_name FROM teachers WHERE username = :username LIMIT 1');
    $stmt->execute(['username' => $username]);
    $teacher = $stmt->fetch();

    if (!$teacher || !password_verify($password, $teacher['password_hash'])) {
        Response::error('Credenciales de acceso inválidas.', 401);
    }

    $tokenPayload = [
        'sub'       => (int) $teacher['id'],
        'username'  => $teacher['username'],
        'full_name' => $teacher['full_name'],
        'role'      => 'teacher'
    ];

    $token = Auth::generateToken($tokenPayload);

    Response::json([
        'success' => true,
        'message' => 'Autenticación exitosa.',
        'token'   => $token,
        'teacher' => [
            'id'        => (int) $teacher['id'],
            'username'  => $teacher['username'],
            'full_name' => $teacher['full_name']
        ]
    ], 200);

} catch (\Throwable $e) {
    error_log("Error en login.php: " . $e->getMessage());
    Response::error('Ocurrió un error interno en el servidor.', 500);
}
