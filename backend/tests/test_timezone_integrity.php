<?php
/**
 * Test integral de verificación de zona horaria UTC-5 (America/Bogota)
 * Valida sincronización entre PHP, Base de Datos MySQL y marcas temporales.
 */

require_once __DIR__ . '/../config/Env.php';
require_once __DIR__ . '/../config/Database.php';

use EmoTIC\Config\Env;
use EmoTIC\Config\Database;

Env::load();

header('Content-Type: text/plain; charset=utf-8');

echo "=== TEST DE INTEGRIDAD REGIONAL UTC-5 (America/Bogota) ===\n\n";

$allPassed = true;

// 1. Verificar PHP Timezone
$appTz = Env::get('APP_TIMEZONE');
$phpTz = date_default_timezone_get();
echo "1. PHP APP_TIMEZONE: $appTz\n";
echo "   date_default_timezone_get(): $phpTz\n";
if ($phpTz === 'America/Bogota') {
    echo "   [OK] PHP está configurado en America/Bogota\n\n";
} else {
    echo "   [FAIL] PHP no está en America/Bogota\n\n";
    $allPassed = false;
}

// 2. Verificar MySQL Session Timezone
$pdo = Database::getConnection();
$stmtTz = $pdo->query("SELECT @@session.time_zone AS session_tz, NOW() AS db_now, UTC_TIMESTAMP() AS db_utc");
$rowTz = $stmtTz->fetch(PDO::FETCH_ASSOC);

echo "2. MySQL @@session.time_zone: " . $rowTz['session_tz'] . "\n";
echo "   MySQL NOW(): " . $rowTz['db_now'] . "\n";
echo "   MySQL UTC_TIMESTAMP(): " . $rowTz['db_utc'] . "\n";

if ($rowTz['session_tz'] === '-05:00') {
    echo "   [OK] La sesión de MySQL tiene time_zone = '-05:00'\n\n";
} else {
    echo "   [FAIL] La sesión de MySQL tiene: " . $rowTz['session_tz'] . "\n\n";
    $allPassed = false;
}

// 3. Comparar PHP now vs MySQL now
$phpNow = date('Y-m-d H:i:s');
$phpTimestamp = time();
$dbTimestamp = strtotime($rowTz['db_now']);
$diffSeconds = abs($phpTimestamp - $dbTimestamp);

echo "3. PHP now: $phpNow\n";
echo "   DB now:  " . $rowTz['db_now'] . "\n";
echo "   Diferencia en segundos: $diffSeconds s\n";

if ($diffSeconds <= 2) {
    echo "   [OK] PHP y MySQL están sincronizados en la misma hora local (<= 2s de desfase)\n\n";
} else {
    echo "   [FAIL] Desfase detectado entre PHP y MySQL: $diffSeconds s\n\n";
    $allPassed = false;
}

// 4. Verificar desfase contra UTC (debe ser exactamente 5 horas = 18000s)
$utcTimestamp = strtotime($rowTz['db_utc']);
$colombiaDiffFromUtc = $utcTimestamp - $dbTimestamp;
echo "4. Desfase de DB respecto a UTC: " . ($colombiaDiffFromUtc / 3600) . " horas ($colombiaDiffFromUtc segundos)\n";
if ($colombiaDiffFromUtc === 18000) {
    echo "   [OK] El desfase con UTC es exactamente de 5 horas (UTC-5)\n\n";
} else {
    echo "   [FAIL] El desfase con UTC no es 18000 segundos: $colombiaDiffFromUtc\n\n";
    $allPassed = false;
}

if ($allPassed) {
    echo "=== RESULTADO FINAL: TODAS LAS PRUEBAS DE ZONA HORARIA SUPERADAS CON ÉXITO ===\n";
    exit(0);
} else {
    echo "=== RESULTADO FINAL: HUBO FALLOS EN LAS PRUEBAS ===\n";
    exit(1);
}
