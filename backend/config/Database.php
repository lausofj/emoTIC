<?php
declare(strict_types=1);

namespace EmoTIC\Config;

use PDO;
use PDOException;
use RuntimeException;

require_once __DIR__ . '/Env.php';

/**
 * Gestor de conexión PDO a MySQL bajo patrón Singleton.
 */
class Database
{
    private static ?PDO $connection = null;

    /**
     * Obtiene la instancia activa de PDO o inicializa una nueva conexión.
     */
    public static function getConnection(): PDO
    {
        if (self::$connection !== null) {
            return self::$connection;
        }

        Env::load();

        $host = (string) Env::get('DB_HOST', '127.0.0.1');
        $port = (string) Env::get('DB_PORT', '3306');
        $dbname = (string) Env::get('DB_NAME', 'emotic_db');
        $user = (string) Env::get('DB_USER', 'root');
        $pass = (string) Env::get('DB_PASS', '');

        $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
        ];

        try {
            self::$connection = new PDO($dsn, $user, $pass, $options);
            self::$connection->exec("SET time_zone = '-05:00'");
            return self::$connection;
        } catch (PDOException $e) {
            error_log("Error de conexión a la base de datos emoTIC: " . $e->getMessage());
            throw new RuntimeException("No fue posible establecer conexión con la base de datos.", 500, $e);
        }
    }

    /**
     * Permite reiniciar la conexión (útil en pruebas).
     */
    public static function reset(): void
    {
        self::$connection = null;
    }
}
