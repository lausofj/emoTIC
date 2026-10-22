<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/Database.php';

use EmoTIC\Config\Database;

try {
    $pdo = Database::getConnection();
    $tzRow = $pdo->query('SELECT @@session.time_zone as tz')->fetch();
    echo "TIMEZONE_MYSQL: " . $tzRow['tz'] . PHP_EOL;
    assert($tzRow['tz'] === '-05:00', 'La zona horaria de MySQL debe ser -05:00');

    $stmt = $pdo->query('SELECT COUNT(*) as total FROM teachers');
    $row = $stmt->fetch();
    echo "CONEXION_EXITOSA: total_teachers=" . $row['total'] . PHP_EOL;
} catch (\Throwable $e) {
    echo "ERROR_CONEXION: " . $e->getMessage() . PHP_EOL;
    exit(1);
}
