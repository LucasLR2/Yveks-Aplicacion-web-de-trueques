-- Base de datos DREVA - Estructura completa actualizada
-- Fecha: 22-10-2025

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS `dreva` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dreva`;

-- --------------------------------------------------------
-- Tabla: Usuario
-- --------------------------------------------------------
CREATE TABLE `Usuario` (
    `id_usuario` INT NOT NULL AUTO_INCREMENT,
    `nombre_comp` VARCHAR(100) NOT NULL,
    `img_usuario` VARCHAR(255) DEFAULT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `rol` VARCHAR(50) DEFAULT NULL,
    `ubicacion` VARCHAR(100) DEFAULT NULL,
    `f_nacimiento` DATE DEFAULT NULL,
    `intereses` VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (`id_usuario`),
    UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: ubicacion
-- --------------------------------------------------------
CREATE TABLE `ubicacion` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) DEFAULT NULL,
    `lat` DECIMAL(10,7) DEFAULT NULL,
    `lng` DECIMAL(10,7) DEFAULT NULL,
    `place_id` VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: categoria
-- --------------------------------------------------------
CREATE TABLE `categoria` (
    `id_categoria` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `url_imagen` VARCHAR(255) NOT NULL,
    `descripcion` TEXT,
    PRIMARY KEY (`id_categoria`),
    UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar categorías predefinidas
INSERT INTO `categoria` (`nombre`, `slug`, `url_imagen`, `descripcion`) VALUES
('Tecnología', 'tecnologia', 'recursos/iconos/contorno/dispositivos/procesador.svg', 'Celulares, computadoras, consolas, accesorios y todo tipo de dispositivos electrónicos.'),
('Hogar', 'hogar', 'recursos/iconos/contorno/dispositivos/sillon.svg', 'Artículos y mobiliario para el hogar, decoración y electrodomésticos.'),
('Ropa', 'ropa', 'recursos/iconos/contorno/dispositivos/remera.svg', 'Prendas de vestir y calzado para todas las edades y estilos.'),
('Accesorios', 'accesorios', 'recursos/iconos/contorno/dispositivos/lentes.svg', 'Complementos de moda como lentes, relojes, joyas y más.'),
('Deportes', 'deportes', 'recursos/iconos/contorno/dispositivos/pelota.svg', 'Equipamiento, indumentaria y artículos deportivos para distintas disciplinas.'),
('Entretenimiento', 'entretenimiento', 'recursos/iconos/contorno/dispositivos/dado.svg', 'Juegos, música, películas, consolas y pasatiempos en general.'),
('Mascotas', 'mascotas', 'recursos/iconos/contorno/dispositivos/pata.svg', 'Productos y accesorios para el cuidado y diversión de tus mascotas.'),
('Herramientas', 'herramientas', 'recursos/iconos/contorno/dispositivos/herramientas.svg', 'Herramientas para el hogar, la construcción y proyectos de bricolaje.'),
('Servicios', 'servicios', 'recursos/iconos/contorno/dispositivos/servicio.svg', 'Ofrecé o encontrá servicios profesionales, técnicos o personales.');

-- --------------------------------------------------------
-- Tabla: Producto
-- --------------------------------------------------------
CREATE TABLE `Producto` (
    `id_producto` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `estado` VARCHAR(50) DEFAULT NULL,
    `categoria` VARCHAR(50) DEFAULT NULL,
    `f_publicacion` DATETIME DEFAULT NULL,
    `descripcion` TEXT,
    `preferencias` VARCHAR(100) DEFAULT NULL,
    `id_ubicacion` INT DEFAULT NULL,
    PRIMARY KEY (`id_producto`),
    KEY `id_ubicacion` (`id_ubicacion`),
    CONSTRAINT `Producto_ibfk_1` FOREIGN KEY (`id_ubicacion`) REFERENCES `ubicacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: ImagenProducto
-- --------------------------------------------------------
CREATE TABLE `ImagenProducto` (
    `id_imagen` INT NOT NULL AUTO_INCREMENT,
    `url_imagen` VARCHAR(255) NOT NULL,
    `id_producto` INT DEFAULT NULL,
    PRIMARY KEY (`id_imagen`),
    KEY `id_producto` (`id_producto`),
    CONSTRAINT `ImagenProducto_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: PropuestaIntercambio
-- --------------------------------------------------------
CREATE TABLE `PropuestaIntercambio` (
    `id_propuesta` INT NOT NULL AUTO_INCREMENT,
    `id_prod_solicitado` INT DEFAULT NULL,
    `id_prod_ofrecido` INT DEFAULT NULL,
    `estado` VARCHAR(50) DEFAULT NULL,
    `fecha` DATE DEFAULT NULL,
    `id_usuario` INT DEFAULT NULL,
    PRIMARY KEY (`id_propuesta`),
    KEY `id_prod_solicitado` (`id_prod_solicitado`),
    KEY `id_prod_ofrecido` (`id_prod_ofrecido`),
    KEY `id_usuario` (`id_usuario`),
    CONSTRAINT `PropuestaIntercambio_ibfk_1` FOREIGN KEY (`id_prod_solicitado`) REFERENCES `Producto` (`id_producto`),
    CONSTRAINT `PropuestaIntercambio_ibfk_2` FOREIGN KEY (`id_prod_ofrecido`) REFERENCES `Producto` (`id_producto`),
    CONSTRAINT `PropuestaIntercambio_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: Mensaje (Sistema antiguo de mensajería)
-- --------------------------------------------------------
CREATE TABLE `Mensaje` (
    `id_mensaje` INT NOT NULL AUTO_INCREMENT,
    `contenido` TEXT NOT NULL,
    `f_envio` DATETIME DEFAULT NULL,
    `id_emisor` INT DEFAULT NULL,
    `id_receptor` INT DEFAULT NULL,
    `editado` TINYINT(1) DEFAULT 0,
    `editado_en` DATETIME DEFAULT NULL,
    `responde_a` INT DEFAULT NULL,
    `responde_a_contenido` TEXT,
    `responde_a_nombre` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id_mensaje`),
    KEY `id_emisor` (`id_emisor`),
    KEY `id_receptor` (`id_receptor`),
    KEY `responde_a` (`responde_a`),
    CONSTRAINT `Mensaje_ibfk_1` FOREIGN KEY (`id_emisor`) REFERENCES `Usuario` (`id_usuario`),
    CONSTRAINT `Mensaje_ibfk_2` FOREIGN KEY (`id_receptor`) REFERENCES `Usuario` (`id_usuario`),
    CONSTRAINT `Mensaje_ibfk_3` FOREIGN KEY (`responde_a`) REFERENCES `Mensaje` (`id_mensaje`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: ChatConversacion (Sistema de chat mejorado)
-- --------------------------------------------------------
CREATE TABLE `ChatConversacion` (
    `id_conversacion` INT NOT NULL AUTO_INCREMENT,
    `id_usuario1` INT NOT NULL,
    `id_usuario2` INT NOT NULL,
    `id_producto` INT DEFAULT NULL,
    `fecha_inicio` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `ultimo_mensaje` DATETIME DEFAULT NULL,
    `ultimo_mensaje_contenido` TEXT,
    PRIMARY KEY (`id_conversacion`),
    KEY `id_usuario1` (`id_usuario1`),
    KEY `id_usuario2` (`id_usuario2`),
    KEY `id_producto` (`id_producto`),
    CONSTRAINT `ChatConversacion_ibfk_1` FOREIGN KEY (`id_usuario1`) REFERENCES `Usuario` (`id_usuario`),
    CONSTRAINT `ChatConversacion_ibfk_2` FOREIGN KEY (`id_usuario2`) REFERENCES `Usuario` (`id_usuario`),
    CONSTRAINT `ChatConversacion_ibfk_3` FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: ChatMensaje (Mensajes del sistema de chat mejorado)
-- --------------------------------------------------------
CREATE TABLE `ChatMensaje` (
    `id_mensaje` INT NOT NULL AUTO_INCREMENT,
    `id_conversacion` INT NOT NULL,
    `id_emisor` INT NOT NULL,
    `contenido` TEXT,
    `imagenes` JSON DEFAULT NULL,
    `tipo_mensaje` VARCHAR(20) DEFAULT 'texto',
    `enviado_en` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `leido` TINYINT(1) DEFAULT 0,
    `leido_en` DATETIME DEFAULT NULL,
    `eliminado_para_todos` TINYINT(1) DEFAULT 0,
    `eliminado_para_usuario` INT DEFAULT NULL,
    `editado` TINYINT(1) DEFAULT 0,
    `editado_en` DATETIME DEFAULT NULL,
    `responde_a` INT DEFAULT NULL,
    `responde_a_contenido` TEXT,
    `responde_a_nombre` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id_mensaje`),
    KEY `id_conversacion` (`id_conversacion`),
    KEY `id_emisor` (`id_emisor`),
    KEY `responde_a` (`responde_a`),
    CONSTRAINT `ChatMensaje_ibfk_1` FOREIGN KEY (`id_conversacion`) REFERENCES `ChatConversacion` (`id_conversacion`),
    CONSTRAINT `ChatMensaje_ibfk_2` FOREIGN KEY (`id_emisor`) REFERENCES `Usuario` (`id_usuario`),
    CONSTRAINT `ChatMensaje_ibfk_3` FOREIGN KEY (`responde_a`) REFERENCES `ChatMensaje` (`id_mensaje`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: Incidencia
-- --------------------------------------------------------
CREATE TABLE `Incidencia` (
    `id_incidencia` INT NOT NULL AUTO_INCREMENT,
    `fecha` DATE DEFAULT NULL,
    `estado` VARCHAR(50) DEFAULT NULL,
    `descripcion` TEXT,
    `id_usuario_repor` INT DEFAULT NULL,
    PRIMARY KEY (`id_incidencia`),
    KEY `id_usuario_repor` (`id_usuario_repor`),
    CONSTRAINT `Incidencia_ibfk_1` FOREIGN KEY (`id_usuario_repor`) REFERENCES `Usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: Valoracion
-- --------------------------------------------------------
CREATE TABLE `Valoracion` (
    `id_valoracion` INT NOT NULL AUTO_INCREMENT,
    `puntuacion` INT DEFAULT NULL,
    `comentario` TEXT,
    `fecha` DATE DEFAULT NULL,
    `id_usuario_emisor` INT DEFAULT NULL,
    `id_usuario_receptor` INT DEFAULT NULL,
    PRIMARY KEY (`id_valoracion`),
    KEY `id_usuario_emisor` (`id_usuario_emisor`),
    KEY `id_usuario_receptor` (`id_usuario_receptor`),
    CONSTRAINT `Valoracion_ibfk_1` FOREIGN KEY (`id_usuario_emisor`) REFERENCES `Usuario` (`id_usuario`),
    CONSTRAINT `Valoracion_ibfk_2` FOREIGN KEY (`id_usuario_receptor`) REFERENCES `Usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla: Notificacion
-- --------------------------------------------------------
CREATE TABLE `Notificacion` (
    `id_notificacion` INT NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(50) DEFAULT NULL,
    `titulo` VARCHAR(100) DEFAULT NULL,
    `descripcion` VARCHAR(255) DEFAULT NULL,
    `fecha` DATE DEFAULT NULL,
    `leida` TINYINT(1) DEFAULT NULL,
    `id_usuario` INT DEFAULT NULL,
    `id_referencia` INT DEFAULT NULL,
    `id_conversacion` INT DEFAULT NULL,
    PRIMARY KEY (`id_notificacion`),
    KEY `id_usuario` (`id_usuario`),
    CONSTRAINT `Notificacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla intermedia: Pertenece (Producto-Categoria)
-- --------------------------------------------------------
CREATE TABLE `Pertenece` (
    `id_producto` INT NOT NULL,
    `id_categoria` INT NOT NULL,
    PRIMARY KEY (`id_producto`, `id_categoria`),
    KEY `id_categoria` (`id_categoria`),
    CONSTRAINT `Pertenece_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`),
    CONSTRAINT `Pertenece_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla intermedia: Publica (Usuario-Producto)
-- --------------------------------------------------------
CREATE TABLE `Publica` (
    `id_usuario` INT NOT NULL,
    `id_producto` INT NOT NULL,
    PRIMARY KEY (`id_usuario`, `id_producto`),
    KEY `id_producto` (`id_producto`),
    CONSTRAINT `Publica_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`),
    CONSTRAINT `Publica_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabla intermedia: Genera (PropuestaIntercambio-Incidencia)
-- --------------------------------------------------------
CREATE TABLE `Genera` (
    `id_propuesta` INT NOT NULL,
    `id_incidencia` INT NOT NULL,
    PRIMARY KEY (`id_propuesta`, `id_incidencia`),
    KEY `id_incidencia` (`id_incidencia`),
    CONSTRAINT `Genera_ibfk_1` FOREIGN KEY (`id_propuesta`) REFERENCES `PropuestaIntercambio` (`id_propuesta`),
    CONSTRAINT `Genera_ibfk_2` FOREIGN KEY (`id_incidencia`) REFERENCES `Incidencia` (`id_incidencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;