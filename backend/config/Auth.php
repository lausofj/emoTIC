<?php
declare(strict_types=1);

namespace EmoTIC\Config;

require_once __DIR__ . '/Env.php';

/**
 * Módulo de autenticación y autorización stateless mediante tokens HMAC-SHA256 y API Keys.
 */
class Auth
{
    /**
     * Codifica datos en Base64 URL-safe.
     */
    public static function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Decodifica datos desde Base64 URL-safe.
     */
    public static function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }

    /**
     * Genera un token firmado con HMAC-SHA256 a partir de los datos dados.
     *
     * @param array<string, mixed> $payload
     */
    public static function generateToken(array $payload): string
    {
        Env::load();
        $secret = (string) Env::get('AUTH_SECRET', 'emotic_fallback_auth_secret_key');
        $ttl = (int) Env::get('AUTH_TOKEN_TTL', 28800);

        $now = time();
        if (!isset($payload['iat'])) {
            $payload['iat'] = $now;
        }
        if (!isset($payload['exp'])) {
            $payload['exp'] = $now + $ttl;
        }

        $payloadJson = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($payloadJson === false) {
            throw new \RuntimeException("No fue posible serializar el payload del token.");
        }

        $payloadEncoded = self::base64UrlEncode($payloadJson);
        $signature = hash_hmac('sha256', $payloadEncoded, $secret, true);
        $signatureEncoded = self::base64UrlEncode($signature);

        return "{$payloadEncoded}.{$signatureEncoded}";
    }

    /**
     * Verifica la autenticidad y vigencia de un token HMAC-SHA256.
     * Retorna el payload como arreglo asociativo si es válido, o null si es inválido/expirado.
     *
     * @return array<string, mixed>|null
     */
    public static function verifyToken(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 2) {
            return null;
        }

        [$payloadEncoded, $signatureEncoded] = $parts;

        Env::load();
        $secret = (string) Env::get('AUTH_SECRET', 'emotic_fallback_auth_secret_key');

        $expectedSignature = hash_hmac('sha256', $payloadEncoded, $secret, true);
        $providedSignature = self::base64UrlDecode($signatureEncoded);

        if (!hash_equals($expectedSignature, $providedSignature)) {
            return null;
        }

        $payloadJson = self::base64UrlDecode($payloadEncoded);
        $payload = json_decode($payloadJson, true);

        if (!is_array($payload)) {
            return null;
        }

        // Validar expiración
        if (isset($payload['exp']) && is_numeric($payload['exp'])) {
            if (time() > (int) $payload['exp']) {
                return null; // Token expirado
            }
        }

        return $payload;
    }

    /**
     * Compara la clave de API recibida con la configurada en APP_API_KEY de forma segura.
     */
    public static function verifyApiKey(?string $apiKey): bool
    {
        if ($apiKey === null || trim($apiKey) === '') {
            return false;
        }

        Env::load();
        $expectedKey = (string) Env::get('APP_API_KEY', '');
        if ($expectedKey === '') {
            return false;
        }

        return hash_equals($expectedKey, trim($apiKey));
    }

    /**
     * Extrae el Bearer token de los encabezados HTTP recibidos.
     */
    public static function getBearerToken(): ?string
    {
        $header = null;
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $header = trim($_SERVER['HTTP_AUTHORIZATION']);
        } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            $header = trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            if (isset($requestHeaders['Authorization'])) {
                $header = trim($requestHeaders['Authorization']);
            } elseif (isset($requestHeaders['authorization'])) {
                $header = trim($requestHeaders['authorization']);
            }
        }

        if ($header !== null && preg_match('/^Bearer\s+(.*)$/i', $header, $matches)) {
            return trim($matches[1]);
        }

        // Respaldo 1: Cabecera personalizada X-Teacher-Token (no eliminada por proxies ni hosts como ByetHost)
        if (isset($_SERVER['HTTP_X_TEACHER_TOKEN']) && trim($_SERVER['HTTP_X_TEACHER_TOKEN']) !== '') {
            return trim($_SERVER['HTTP_X_TEACHER_TOKEN']);
        }

        // Respaldo 2: apache_request_headers para X-Teacher-Token
        if (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            foreach (['X-Teacher-Token', 'x-teacher-token', 'X-TEACHER-TOKEN'] as $k) {
                if (isset($requestHeaders[$k]) && trim($requestHeaders[$k]) !== '') {
                    return trim($requestHeaders[$k]);
                }
            }
        }

        // Respaldo 3: Parámetro en URL o cuerpo (token / auth_token) para servidores donde Apache bloquea cabeceras
        if (isset($_GET['token']) && trim((string)$_GET['token']) !== '') {
            return trim((string)$_GET['token']);
        }
        if (isset($_GET['auth_token']) && trim((string)$_GET['auth_token']) !== '') {
            return trim((string)$_GET['auth_token']);
        }
        if (isset($_POST['token']) && trim((string)$_POST['token']) !== '') {
            return trim((string)$_POST['token']);
        }

        return null;
    }

    /**
     * Extrae la cabecera X-API-Key de los encabezados HTTP recibidos.
     */
    public static function getApiKeyHeader(): ?string
    {
        if (isset($_SERVER['HTTP_X_API_KEY'])) {
            return trim($_SERVER['HTTP_X_API_KEY']);
        }

        if (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            foreach (['X-API-Key', 'x-api-key', 'X-Api-Key'] as $key) {
                if (isset($requestHeaders[$key])) {
                    return trim($requestHeaders[$key]);
                }
            }
        }

        if (isset($_GET['api_key']) && trim((string)$_GET['api_key']) !== '') {
            return trim((string)$_GET['api_key']);
        }
        if (isset($_POST['api_key']) && trim((string)$_POST['api_key']) !== '') {
            return trim((string)$_POST['api_key']);
        }

        return null;
    }
}
