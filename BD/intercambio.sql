CREATE DATABASE intercambio;

USE intercambio;

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_comp VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(50),
    ubicacion VARCHAR(100),
    f_nacimiento DATE,
    intereses VARCHAR(100)
);

CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(50),
    calificacion DECIMAL(2,1),
    resenas INT,
    categoria VARCHAR(50),
    descripcion TEXT,
    f_publicacion DATE,
    preferencias VARCHAR(100)
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
    contenido TEXT,
    tipo VARCHAR(50),
    fecha DATE,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
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

