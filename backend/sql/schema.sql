-- ============================================================
-- emoTIC - Esquema de Base de Datos MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS `emotic_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `emotic_db`;

-- ------------------------------------------------------------
-- Tabla: teachers (Autenticación y perfil docente)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(120) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabla: game_attempts (Registro anónimo de intentos de juegos)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `game_attempts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `attempt_uuid` VARCHAR(36) NOT NULL UNIQUE,
  `gender` ENUM('nino', 'nina') NOT NULL,
  `grade_level` VARCHAR(50) NOT NULL,
  `activity_id` VARCHAR(50) NOT NULL,
  `activity_title` VARCHAR(150) NOT NULL,
  `stars` TINYINT NOT NULL DEFAULT 0,
  `score` INT NOT NULL DEFAULT 0,
  `mistakes_count` INT NOT NULL DEFAULT 0,
  `duration_seconds` INT NOT NULL DEFAULT 0,
  `completed` TINYINT(1) NOT NULL DEFAULT 1,
  `details` JSON NULL,
  `client_timestamp` DATETIME NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_attempts_activity` (`activity_id`),
  INDEX `idx_attempts_grade` (`grade_level`),
  INDEX `idx_attempts_gender` (`gender`),
  INDEX `idx_attempts_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Datos Iniciales: Docente Administrador por Defecto
-- Usuario: docente
-- Contraseña por defecto: docente123*
-- Hash: BCrypt
-- ------------------------------------------------------------
INSERT INTO `teachers` (`username`, `password_hash`, `full_name`)
VALUES (
  'docente',
  '$2y$10$Jp6RYPC2sGypKM.qIy7icubWECgohN08HirBHp5A/EWyWgb4lP0Oe',
  'Docente emoTIC'
)
ON DUPLICATE KEY UPDATE `username` = `username`;
