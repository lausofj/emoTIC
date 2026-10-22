<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/Auth.php';
require_once __DIR__ . '/../config/Database.php';

use EmoTIC\Config\Auth;
use EmoTIC\Config\Database;

function callEndpoint(string $method, array $params = [], array $headers = [], ?array $body = null): array {
    $script = dirname(__DIR__) . '/api/attempts.php';
    
    $descriptors = [
        0 => ['pipe', 'r'],
        1 => ['pipe', 'w'],
        2 => ['pipe', 'w']
    ];
    
    $env = [
        'REQUEST_METHOD' => $method,
        'SYSTEMROOT'     => getenv('SYSTEMROOT') ?: 'C:\\Windows'
    ];
    
    if (isset($headers['X-API-Key'])) {
        $env['HTTP_X_API_KEY'] = $headers['X-API-Key'];
    }
    if (isset($headers['Authorization'])) {
        $env['HTTP_AUTHORIZATION'] = $headers['Authorization'];
    }
    if ($method === 'POST') {
        $env['CONTENT_TYPE'] = 'application/json';
    }
    
    $queryString = http_build_query($params);
    $cmd = 'c:\\xampp\\php\\php.exe "' . $script . '"';
    if ($queryString !== '') {
        $env['QUERY_STRING'] = $queryString;
        $_GET = $params; // for internal CLI if used
    }
    
    $process = proc_open($cmd, $descriptors, $pipes, null, $env);
    if (!is_resource($process)) {
        throw new RuntimeException("No se pudo iniciar el proceso PHP.");
    }
    
    if ($body !== null) {
        fwrite($pipes[0], json_encode($body));
    }
    fclose($pipes[0]);
    
    $stdout = stream_get_contents($pipes[1]);
    fclose($pipes[1]);
    
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[2]);
    
    $exitCode = proc_close($process);
    
    return [
        'exitCode' => $exitCode,
        'stdout'   => $stdout,
        'stderr'   => $stderr,
        'json'     => json_decode($stdout, true)
    ];
}

echo "=== INICIANDO PRUEBAS DE ATTEMPTS.PHP ===" . PHP_EOL;

$apiKey = 'emotic_dev_api_key_892348a7b9c1d2e3f4a5';
$testUuid = '550e8400-e29b-41d4-a716-446655440099';

// Limpiar intento previo si existía de pruebas anteriores
$pdo = Database::getConnection();
$pdo->prepare('DELETE FROM game_attempts WHERE attempt_uuid = :uuid')->execute(['uuid' => $testUuid]);

// 1. POST sin API Key -> debe ser 401
$resNoKey = callEndpoint('POST', [], [], ['activity_id' => 'act-1']);
assert(isset($resNoKey['json']['success']) && $resNoKey['json']['success'] === false, 'POST sin API Key debe fallar');
echo "✓ Prueba 1: Rechazo de POST sin API Key (401)." . PHP_EOL;

// 2. POST con API Key válida -> 201 Created
$attemptData = [
    'attempt_uuid'     => $testUuid,
    'gender'           => 'nino',
    'grade_level'      => '1° Primaria',
    'activity_id'      => 'act-1',
    'activity_title'   => 'Identifica la Emoción',
    'stars'            => 3,
    'score'            => 150,
    'mistakes_count'   => 1,
    'duration_seconds' => 45,
    'completed'        => true,
    'details'          => ['intentos_felicidad' => 1, 'intentos_tristeza' => 2],
    'client_timestamp' => date('Y-m-d H:i:s')
];
$resCreate = callEndpoint('POST', [], ['X-API-Key' => $apiKey], $attemptData);
assert(isset($resCreate['json']['success']) && $resCreate['json']['success'] === true, 'POST con API Key válida falló');
assert(isset($resCreate['json']['id']) && $resCreate['json']['id'] > 0, 'Debe devolver el id generado');
echo "✓ Prueba 2: Inserción exitosa de intento con API Key (201)." . PHP_EOL;

// 3. POST repetido con mismo UUID (Idempotencia) -> 200 OK sin duplicar
$resDuplicate = callEndpoint('POST', [], ['X-API-Key' => $apiKey], $attemptData);
assert(isset($resDuplicate['json']['success']) && $resDuplicate['json']['success'] === true, 'POST duplicado debe retornar éxito');
assert(str_contains($resDuplicate['json']['message'], 'idempotente'), 'Debe indicar que es idempotente');

$countStmt = $pdo->prepare('SELECT COUNT(*) as c FROM game_attempts WHERE attempt_uuid = :uuid');
$countStmt->execute(['uuid' => $testUuid]);
assert((int)$countStmt->fetch()['c'] === 1, 'No deben existir registros duplicados en MySQL');
echo "✓ Prueba 3: Idempotencia verificada; no se duplica registro en reintento." . PHP_EOL;

// 4. GET sin Token Bearer -> 401 Unauthorized
$resGetNoToken = callEndpoint('GET');
assert(isset($resGetNoToken['json']['success']) && $resGetNoToken['json']['success'] === false, 'GET sin token debe fallar');
echo "✓ Prueba 4: Rechazo de consulta GET sin token (401)." . PHP_EOL;

// 5. GET con Token Bearer válido -> 200 OK con arreglo de datos
$teacherToken = Auth::generateToken(['sub' => 1, 'username' => 'docente']);
$resGetWithToken = callEndpoint('GET', ['activity_id' => 'act-1'], ['Authorization' => 'Bearer ' . $teacherToken]);
assert(isset($resGetWithToken['json']['success']) && $resGetWithToken['json']['success'] === true, 'GET con token válido falló');
assert(is_array($resGetWithToken['json']['data']), 'GET debe devolver lista de intentos');
assert(count($resGetWithToken['json']['data']) >= 1, 'Debe incluir al menos el intento recién creado');
echo "✓ Prueba 5: Consulta autorizada con token y filtro retornó datos correctamente." . PHP_EOL;

echo "=== TODAS LAS PRUEBAS DE ATTEMPTS SUPERADAS ===" . PHP_EOL;
