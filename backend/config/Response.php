<?php
declare(strict_types=1);

namespace EmoTIC\Config;

/**
 * Utilidad para respuestas HTTP y configuración de cabeceras JSON/CORS.
 */
class Response
{
    /**
     * Aplica las cabeceras estándar para APIs JSON y CORS.
     */
    public static function initCors(): void
    {
        Env::load();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key, X-Teacher-Token, X-Requested-With');
        header('Content-Type: application/json; charset=UTF-8');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit(0);
        }
    }

    /**
     * Emite una respuesta JSON estructurada y finaliza la ejecución.
     *
     * @param array<string, mixed> $data
     */
    public static function json(array $data, int $statusCode = 200): void
    {
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit(0);
    }

    /**
     * Emite una respuesta de error JSON.
     */
    public static function error(string $message, int $statusCode = 400, ?array $extra = null): void
    {
        $payload = [
            'success' => false,
            'message' => $message
        ];
        if ($extra !== null) {
            $payload = array_merge($payload, $extra);
        }
        self::json($payload, $statusCode);
    }

    /**
     * Obtiene y decodifica el cuerpo de la petición HTTP (JSON o formulario).
     *
     * @return array<string, mixed>
     */
    public static function getJsonInput(): array
    {
        $raw = file_get_contents('php://input');
        if (empty($raw) && php_sapi_name() === 'cli') {
            $raw = file_get_contents('php://stdin');
        }
        if (!empty($raw)) {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }
        return $_POST;
    }
}
