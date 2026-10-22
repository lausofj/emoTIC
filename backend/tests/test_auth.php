<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/Auth.php';

use EmoTIC\Config\Auth;

echo "=== INICIANDO PRUEBAS DE AUTENTICACION ===" . PHP_EOL;

// 1. Generación y validación de token válido
$token = Auth::generateToken(['sub' => 1, 'username' => 'docente']);
$payload = Auth::verifyToken($token);
assert($payload !== null, 'El token válido debería verificarse correctamente');
assert($payload['username'] === 'docente', 'El username debe coincidir');
echo "✓ Prueba 1 superada: Generación y verificación de token válido." . PHP_EOL;

// 2. Token alterado (manipulación de payload)
$parts = explode('.', $token);
$tamperedToken = $parts[0] . 'x.' . $parts[1];
$tamperedPayload = Auth::verifyToken($tamperedToken);
assert($tamperedPayload === null, 'Un token alterado debe ser rechazado');
echo "✓ Prueba 2 superada: Rechazo de token con firma alterada." . PHP_EOL;

// 3. Token expirado
$expiredToken = Auth::generateToken(['sub' => 1, 'username' => 'docente', 'exp' => time() - 3600]);
$expiredPayload = Auth::verifyToken($expiredToken);
assert($expiredPayload === null, 'Un token expirado debe ser rechazado');
echo "✓ Prueba 3 superada: Rechazo de token expirado." . PHP_EOL;

// 4. Verificación de API Key
$validKey = 'emotic_dev_api_key_892348a7b9c1d2e3f4a5';
assert(Auth::verifyApiKey($validKey) === true, 'API Key correcta debe ser aceptada');
assert(Auth::verifyApiKey('clave_incorrecta') === false, 'API Key incorrecta debe ser rechazada');
assert(Auth::verifyApiKey(null) === false, 'API Key nula debe ser rechazada');
echo "✓ Prueba 4 superada: Verificación de API Key." . PHP_EOL;

echo "=== TODAS LAS PRUEBAS DE AUTH SUPERADAS CON ÉXITO ===" . PHP_EOL;
