CREATE DATABASE dreva;

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
    intereses VARCHAR(100),
    resenas INT
);

CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(50),
    calificacion DECIMAL(2,1),
    categoria VARCHAR(50),
    f_publicacion DATE,
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

CREATE TABLE ubicacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    lat DECIMAL(10,7),
    lng DECIMAL(10,7),
    place_id VARCHAR(100)

);

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    url_imagen VARCHAR(255)
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

