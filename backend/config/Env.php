<?php
declare(strict_types=1);

namespace EmoTIC\Config;

/**
 * Cargador ligero y nativo de variables de entorno desde archivos .env.
 */
class Env
{
    private static bool $loaded = false;

    /**
     * Carga el archivo .env especificado o busca en ubicaciones predeterminadas.
     */
    public static function load(?string $filePath = null): void
    {
        if (self::$loaded && $filePath === null) {
            return;
        }

        if ($filePath === null) {
            $candidatePaths = [
                dirname(__DIR__) . '/.env',
                dirname(__DIR__, 2) . '/.env'
            ];
            foreach ($candidatePaths as $candidate) {
                if (file_exists($candidate) && is_readable($candidate)) {
                    $filePath = $candidate;
                    break;
                }
            }
        }

        if ($filePath === null || !file_exists($filePath) || !is_readable($filePath)) {
            return;
        }

        $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            return;
        }

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }

            // Separar clave y valor
            $parts = explode('=', $line, 2);
            if (count($parts) !== 2) {
                continue;
            }

            $key = trim($parts[0]);
            $val = trim($parts[1]);

            // Remover comillas envolventes si existen
            if (
                (str_starts_with($val, '"') && str_ends_with($val, '"')) ||
                (str_starts_with($val, "'") && str_ends_with($val, "'"))
            ) {
                $val = substr($val, 1, -1);
            }

            if (!array_key_exists($key, $_ENV)) {
                $_ENV[$key] = $val;
            }
            if (!array_key_exists($key, $_SERVER)) {
                $_SERVER[$key] = $val;
            }
            putenv("{$key}={$val}");
        }

        self::$loaded = true;
    }

    /**
     * Obtiene una variable de entorno o retorna un valor por defecto.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        self::load();

        if (array_key_exists($key, $_ENV)) {
            return $_ENV[$key];
        }
        $val = getenv($key);
        if ($val !== false) {
            return $val;
        }
        if (array_key_exists($key, $_SERVER)) {
            return $_SERVER[$key];
        }

        return $default;
    }
}
