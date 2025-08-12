CREATE DATABASE intercambio;

USE intercambio;

CREATE TABLE objetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    estado VARCHAR(50),
    calificacion DECIMAL(2,1),
    resenas INT,
    imagenes VARCHAR(255), -- almacena la ruta o nombre del archivo (png, jpg, jpeg, etc.)
    categorias VARCHAR(255)
);
