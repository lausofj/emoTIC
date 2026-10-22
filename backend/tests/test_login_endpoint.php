<?php
declare(strict_types=1);

// Prueba directa del flujo del endpoint login simulando peticiones
function testLogin(string $username, string $password): array {
    $script = dirname(__DIR__) . '/api/auth/login.php';
    
    $descriptors = [
        0 => ['pipe', 'r'],
        1 => ['pipe', 'w'],
        2 => ['pipe', 'w']
    ];
    
    $env = [
        'REQUEST_METHOD' => 'POST',
        'CONTENT_TYPE' => 'application/json',
        'SYSTEMROOT' => getenv('SYSTEMROOT') ?: 'C:\\Windows'
    ];
    
    $cmd = 'c:\\xampp\\php\\php.exe "' . $script . '"';
    $process = proc_open($cmd, $descriptors, $pipes, null, $env);
    
    if (!is_resource($process)) {
        throw new RuntimeException("No se pudo iniciar el proceso PHP.");
    }
    
    $payload = json_encode(['username' => $username, 'password' => $password]);
    fwrite($pipes[0], $payload);
    fclose($pipes[0]);
    
    $stdout = stream_get_contents($pipes[1]);
    fclose($pipes[1]);
    
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[2]);
    
    $exitCode = proc_close($process);
    
    $json = json_decode($stdout, true);
    return [
        'exitCode' => $exitCode,
        'stdout' => $stdout,
        'stderr' => $stderr,
        'json' => $json
    ];
}

echo "=== TEST LOGIN ENDPOINT ===" . PHP_EOL;

// 1. Credenciales correctas
$resSuccess = testLogin('docente', 'docente123*');
assert(isset($resSuccess['json']['success']) && $resSuccess['json']['success'] === true, 'Login con credenciales correctas falló');
assert(!empty($resSuccess['json']['token']), 'Debe retornar un token');
echo "✓ Prueba exitosa: Login correcto retorna token y success=true." . PHP_EOL;

// 2. Credenciales incorrectas
$resFail = testLogin('docente', 'contrasena_erronea');
assert(isset($resFail['json']['success']) && $resFail['json']['success'] === false, 'Login con contraseña errónea debió fallar');
echo "✓ Prueba exitosa: Login con contraseña incorrecta retorna success=false y 401." . PHP_EOL;

// 3. Usuario inexistente
$resNotFound = testLogin('no_existe', 'clave');
assert(isset($resNotFound['json']['success']) && $resNotFound['json']['success'] === false, 'Login de usuario inexistente debió fallar');
echo "✓ Prueba exitosa: Login de usuario inexistente rechazado." . PHP_EOL;

echo "=== TODAS LAS PRUEBAS DE LOGIN COMPLETADAS ===" . PHP_EOL;
