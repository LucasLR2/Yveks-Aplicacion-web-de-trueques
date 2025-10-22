-- La base de datos 'dreva' ya es creada por Docker
-- CREATE DATABASE dreva;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

USE dreva;

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_comp VARCHAR(100) NOT NULL,
    img_usuario VARCHAR(255),
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(50),
    ubicacion VARCHAR(100),
    f_nacimiento DATE,
    intereses VARCHAR(100)
);

CREATE TABLE ubicacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    lat DECIMAL(10,7),
    lng DECIMAL(10,7),
    place_id VARCHAR(100)
);

CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(50),
    categoria VARCHAR(50),
    f_publicacion DATETIME,
    descripcion TEXT,
    preferencias VARCHAR(100),
    id_ubicacion INT,
    FOREIGN KEY (id_ubicacion) REFERENCES ubicacion(id)
);

CREATE TABLE ImagenProducto (
    id_imagen INT AUTO_INCREMENT PRIMARY KEY,
    url_imagen VARCHAR(255) NOT NULL,
    id_producto INT,
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE PropuestaIntercambio (
    id_propuesta INT AUTO_INCREMENT PRIMARY KEY,
    id_prod_solicitado INT,
    id_prod_ofrecido INT,
    estado VARCHAR(50),
    fecha DATE,
    id_usuario INT,
    FOREIGN KEY (id_prod_solicitado) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_prod_ofrecido) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Mensaje (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    contenido TEXT NOT NULL,
    f_envio DATETIME,
    id_emisor INT,
    id_receptor INT,
    FOREIGN KEY (id_emisor) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_receptor) REFERENCES Usuario(id_usuario)
);

CREATE TABLE ChatConversacion (
    id_conversacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario1 INT NOT NULL,
    id_usuario2 INT NOT NULL,
    id_producto INT,
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimo_mensaje DATETIME,
    ultimo_mensaje_contenido TEXT,
    FOREIGN KEY (id_usuario1) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_usuario2) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE ChatMensaje (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    id_conversacion INT NOT NULL,
    id_emisor INT NOT NULL,
    contenido TEXT NOT NULL,
    tipo_mensaje VARCHAR(20) DEFAULT 'texto',
    enviado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT 0,
    leido_en DATETIME,
    FOREIGN KEY (id_conversacion) REFERENCES ChatConversacion(id_conversacion),
    FOREIGN KEY (id_emisor) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Incidencia (
    id_incidencia INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    estado VARCHAR(50),
    descripcion TEXT,
    id_usuario_repor INT,
    FOREIGN KEY (id_usuario_repor) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Valoracion (
    id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
    puntuacion INT,
    comentario TEXT,
    fecha DATE,
    id_usuario_emisor INT,
    id_usuario_receptor INT,
    FOREIGN KEY (id_usuario_emisor) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_usuario_receptor) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Notificacion (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    titulo VARCHAR(100),
    descripcion VARCHAR(255),
    fecha DATE,
    leida BOOLEAN,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    url_imagen VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Tabla intermedia Pertenece (Producto-Categoria)
CREATE TABLE Pertenece (
    id_producto INT,
    id_categoria INT,
    PRIMARY KEY (id_producto, id_categoria),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

-- Tabla intermedia Publica (Usuario-Producto)
CREATE TABLE Publica (
    id_usuario INT,
    id_producto INT,
    PRIMARY KEY (id_usuario, id_producto),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

-- Tabla intermedia Genera (PropuestaIntercambio-Incidencia)
CREATE TABLE Genera (
    id_propuesta INT,
    id_incidencia INT,
    PRIMARY KEY (id_propuesta, id_incidencia),
    FOREIGN KEY (id_propuesta) REFERENCES PropuestaIntercambio(id_propuesta),
    FOREIGN KEY (id_incidencia) REFERENCES Incidencia(id_incidencia)
);

INSERT INTO categoria (nombre, slug, url_imagen, descripcion) VALUES
('Tecnología', 'tecnologia', 'recursos/iconos/contorno/dispositivos/procesador.svg',
 'Celulares, computadoras, consolas, accesorios y todo tipo de dispositivos electrónicos.'),
('Hogar', 'hogar', 'recursos/iconos/contorno/dispositivos/sillon.svg',
 'Artículos y mobiliario para el hogar, decoración y electrodomésticos.'),
('Ropa', 'ropa', 'recursos/iconos/contorno/dispositivos/remera.svg',
 'Prendas de vestir y calzado para todas las edades y estilos.'),
('Accesorios', 'accesorios', 'recursos/iconos/contorno/dispositivos/lentes.svg',
 'Complementos de moda como lentes, relojes, joyas y más.'),
('Deportes', 'deportes', 'recursos/iconos/contorno/dispositivos/pelota.svg',
 'Equipamiento, indumentaria y artículos deportivos para distintas disciplinas.'),
('Entretenimiento', 'entretenimiento', 'recursos/iconos/contorno/dispositivos/dado.svg',
 'Juegos, música, películas, consolas y pasatiempos en general.'),
('Mascotas', 'mascotas', 'recursos/iconos/contorno/dispositivos/pata.svg',
 'Productos y accesorios para el cuidado y diversión de tus mascotas.'),
('Herramientas', 'herramientas', 'recursos/iconos/contorno/dispositivos/herramientas.svg',
 'Herramientas para el hogar, la construcción y proyectos de bricolaje.'),
('Servicios', 'servicios', 'recursos/iconos/contorno/dispositivos/servicio.svg',
 'Ofrecé o encontrá servicios profesionales, técnicos o personales.');