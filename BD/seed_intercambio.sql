<<<<<<< HEAD
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
=======
-- DATOS COMPLETOS PARA DREVA
-- Ejecutar después de importar la estructura de base de datos
-- Fecha: 22-10-2025
>>>>>>> origin/main

USE dreva;

-- =============================================================
-- LIMPIAR TABLAS PARA INSERCIÓN LIMPIA
-- =============================================================
SET FOREIGN_KEY_CHECKS = 0;

-- Borrar datos en orden inverso a las dependencias
DELETE FROM ChatMensaje;
DELETE FROM ChatConversacion;
DELETE FROM Genera;
DELETE FROM Valoracion;
DELETE FROM Notificacion;
DELETE FROM Publica;
DELETE FROM Pertenece;
DELETE FROM PropuestaIntercambio;
DELETE FROM Mensaje;
DELETE FROM ImagenProducto;
DELETE FROM Producto;
DELETE FROM Usuario;
DELETE FROM ubicacion;

-- Reiniciar los AUTO_INCREMENT
ALTER TABLE ChatMensaje AUTO_INCREMENT = 1;
ALTER TABLE ChatConversacion AUTO_INCREMENT = 1;
ALTER TABLE Valoracion AUTO_INCREMENT = 1;
ALTER TABLE Notificacion AUTO_INCREMENT = 1;
ALTER TABLE PropuestaIntercambio AUTO_INCREMENT = 1;
ALTER TABLE Mensaje AUTO_INCREMENT = 1;
ALTER TABLE ImagenProducto AUTO_INCREMENT = 1;
ALTER TABLE Producto AUTO_INCREMENT = 1;
ALTER TABLE Usuario AUTO_INCREMENT = 1;
ALTER TABLE ubicacion AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- USUARIOS (16 usuarios: Usuario1-Usuario10 + Lucas, Alexis, Agustin, Guillermo, Catalina, Dahiane)
-- =============================================================
INSERT INTO Usuario (id_usuario, nombre_comp, correo, contrasena, rol, ubicacion, f_nacimiento) VALUES
-- Usuarios genéricos (1-10)
(1, 'Usuario1', 'usuario1@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-01-01'),
(2, 'Usuario2', 'usuario2@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-02-02'),
(3, 'Usuario3', 'usuario3@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-03-03'),
(4, 'Usuario4', 'usuario4@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-04-04'),
(5, 'Usuario5', 'usuario5@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-05-05'),
(6, 'Usuario6', 'usuario6@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-06-06'),
(7, 'Usuario7', 'usuario7@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-07-07'),
(8, 'Usuario8', 'usuario8@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-08-08'),
(9, 'Usuario9', 'usuario9@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-09-09'),
(10, 'Usuario10', 'usuario10@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1990-10-10'),
-- Usuarios con nombre (11-16)
(11, 'Lucas', 'lucas@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1995-05-15'),
(12, 'Alexis', 'alexis@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1993-08-20'),
(13, 'Agustin', 'agustin@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1992-11-08'),
(14, 'Guillermo', 'guillermo@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1994-03-25'),
(15, 'Catalina', 'catalina@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1991-07-12'),
(16, 'Dahiane', 'dahiane@dreva.com', SHA2('password123', 256), 'usuario', 'Montevideo', '1996-09-30');

-- =============================================================
-- UBICACIONES
-- =============================================================
INSERT INTO ubicacion (id, nombre, lat, lng) VALUES
(1, 'Pocitos, Montevideo', -34.9175, -56.1500),
(2, 'Ciudad Vieja, Montevideo', -34.9058, -56.2017),
(3, 'Cordón, Montevideo', -34.9011, -56.1914),
(4, 'Punta Carretas, Montevideo', -34.9217, -56.1533),
(5, 'Tres Cruces, Montevideo', -34.8941, -56.1706),
(6, 'Malvín, Montevideo', -34.8889, -56.1056),
(7, 'Buceo, Montevideo', -34.9089, -56.1389),
(8, 'Centro, Montevideo', -34.9045, -56.1917),
(9, 'Parque Rodó, Montevideo', -34.9167, -56.1639),
(10, 'Aguada, Montevideo', -34.8889, -56.1944),
(11, 'Montevideo', -34.9011, -56.1645),
(12, 'Montevideo', -34.9011, -56.1645),
(13, 'Montevideo', -34.9011, -56.1645),
(14, 'Montevideo', -34.9011, -56.1645),
(15, 'Montevideo', -34.9011, -56.1645),
(16, 'Montevideo', -34.9011, -56.1645),
(17, 'Montevideo', -34.9011, -56.1645),
(18, 'Montevideo', -34.9011, -56.1645),
(19, 'Montevideo', -34.9011, -56.1645),
(20, 'Montevideo', -34.9011, -56.1645),
(21, 'Montevideo', -34.9011, -56.1645),
(22, 'Montevideo', -34.9011, -56.1645),
(23, 'Montevideo', -34.9011, -56.1645),
(24, 'Montevideo', -34.9011, -56.1645),
(25, 'Montevideo', -34.9011, -56.1645),
(26, 'Montevideo', -34.9011, -56.1645),
(27, 'Montevideo', -34.9011, -56.1645),
(28, 'Montevideo', -34.9011, -56.1645),
(29, 'Montevideo', -34.9011, -56.1645),
(30, 'Montevideo', -34.9011, -56.1645),
(31, 'Montevideo', -34.9011, -56.1645),
(32, 'Montevideo', -34.9011, -56.1645),
(33, 'Montevideo', -34.9011, -56.1645),
(34, 'Montevideo', -34.9011, -56.1645);

-- =============================================================
-- PRODUCTOS (34 productos del documento)
-- =============================================================
INSERT INTO Producto (id_producto, nombre, estado, categoria, descripcion, preferencias, f_publicacion, id_ubicacion) VALUES
(1,'Lentes retro rojos','Usado','accesorios','Lentes de sol retro en perfecto estado. Muy cómodos y con protección UV. Ideales para el verano.','Remera estilizada,Pañuelo original,Gadget tecnológico','2025-10-04 10:30:00',1),
(2,'Auriculares inalámbricos','Nuevo','tecnologia','Auriculares Bluetooth de alta calidad. Batería de larga duración y excelente calidad de sonido.','Cargador magnético,Proyector pequeño,Powerbank','2025-10-06 14:15:00',2),
(3,'Cargador magnético','Usado','tecnologia','Cargador magnético original, funciona perfectamente. Compatible con múltiples dispositivos.','Auriculares inalámbricos,Cable USB de calidad,Powerbank','2025-10-06 09:45:00',3),
(4,'Proyector','Nuevo','tecnologia','Proyector HD portátil, ideal para presentaciones o entretenimiento en casa. Incluye cables.','Auriculares inalámbricos,Pantalla portátil,Smart TV Box','2025-10-03 16:20:00',4),
(5,'Remera Suzuki con estampado','Nuevo','ropa','Remera original Suzuki, talla M. Material de alta calidad, nunca usada.','Otra remera,Pañuelo de diseño,Gorra de moda','2025-10-05 11:00:00',5),
(6,'Sillón naranja','Usado','hogar','Sillón cómodo en buen estado, color naranja vibrante. Perfecto para sala de estar.','Sillón cómodo,Silla de oficina premium,Mueble de almacenamiento','2025-10-02 13:30:00',6),
(7,'Zapatillas Adidas Aggresive','Usado','ropa','Zapatillas Adidas en buen estado, talla 42. Muy cómodas para deportes.','Otra zapatilla deportiva,Gorra de marca,Mochila deportiva','2025-10-04 15:45:00',7),
(8,'Libro The Laws of Human Nature','Nuevo','entretenimiento','Libro nuevo, nunca leído. Excelente para desarrollo personal.','Otro libro,Cuaderno de notas,Marcadores/bolígrafos de calidad','2025-09-29 12:10:00',8),
(9,'Remera Illicit Bloc denim claro','Nuevo','ropa','Remera nueva con etiqueta, talla L. Diseño exclusivo y material premium.','Remera estampada,Pañuelo de diseño,Gorra de moda','2025-10-06 17:00:00',9),
(10,'Lámpara de escritorio','Usado','hogar','Lámpara LED ajustable, perfecta para estudiar o trabajar. Funciona perfectamente.','Lámpara LED,Organizador de escritorio,Gadget tecnológico pequeño','2025-10-01 08:20:00',10),
(11,'Remera blanca con estampado azul','Nuevo','ropa','Remera con estampado azul.','Remera casual,Accesorio de moda','2025-01-20 14:30:00',11),
(12,'Remera marrón Illicit Bloc','Nuevo','ropa','Remera marrón de la colección.','Remera de marca,Accesorio casual','2024-12-11 10:15:00',12),
(13,'Cámara fotográfica Canon','Usado','tecnologia','Cámara Canon funcional.','Lente adicional,Trípode,Memoria SD','2024-11-10 16:45:00',13),
(14,'Remera blanca con estampado rojo','Usado','ropa','Remera blanca estampado rojo.','Remera deportiva,Gorra','2024-11-05 11:20:00',14),
(15,'iPad mini','Usado','tecnologia','iPad mini en buen estado.','Funda para tablet,Stylus,Cargador','2024-10-22 13:00:00',15),
(16,'Cámara fotográfica Sony','Usado','tecnologia','Cámara Sony con lente.','Lente zoom,Batería extra,Bolso','2024-10-10 09:30:00',16),
(17,'Remera Umbro azul y blanca','Nuevo','ropa','Remera deportiva Umbro.','Short deportivo,Zapatillas','2024-09-25 15:10:00',17),
(18,'AirPods','Nuevo','tecnologia','Auriculares AirPods.','Funda protectora,Powerbank','2024-09-15 12:40:00',18),
(19,'Remera negra con estampado beige vintage','Nuevo','ropa','Remera negra vintage.','Pantalón vintage,Accesorio retro','2024-09-05 17:25:00',19),
(20,'Remera Nike blanca con estampado lila','Nuevo','ropa','Remera Nike blanca lila.','Zapatillas Nike,Short deportivo','2024-08-28 14:50:00',20),
(21,'Lentes retro amarillos','Usado','accesorios','Lentes amarillos retro.','Funda para lentes,Otro accesorio','2024-08-15 11:35:00',21),
(22,'Remera ArtTheMoment blanca','Nuevo','ropa','Remera ArtTheMoment blanca.','Remera artística,Accesorio creativo','2024-08-01 08:45:00',22),
(23,'Teclado Clicky verde','Usado','tecnologia','Teclado clicky verde.','Mouse gaming,Pad de mouse','2024-07-20 16:00:00',23),
(24,'Mouse y soporte inalámbrico led','Nuevo','tecnologia','Mouse + soporte LED.','Teclado,Auriculares gaming','2024-07-10 13:15:00',24),
(25,'AirPods Max negros','Usado','tecnologia','Auriculares AirPods Max.','Funda premium,Soporte para auriculares','2024-07-01 10:55:00',25),
(26,'Samsung Galaxy Book','Usado','tecnologia','Laptop Samsung Galaxy Book.','Mouse inalámbrico,Funda para laptop','2024-06-20 15:30:00',26),
(27,'Bicicleta rodado 27','Usado','deportes','Bicicleta rodado 27.','Casco de ciclismo,Luces LED','2024-06-10 12:20:00',27),
(28,'Guitarra eléctrica naranja','Nuevo','tecnologia','Guitarra eléctrica naranja.','Amplificador,Correa para guitarra','2024-05-30 09:10:00',28),
(29,'Apple Watch con cadena','Usado','tecnologia','Apple Watch con cadena.','Pulsera adicional,Cargador magnético','2024-05-15 14:40:00',29),
(30,'Dron','Usado','tecnologia','Dron compacto funcional.','Batería extra,Hélices de repuesto','2024-05-05 11:25:00',30),
(31,'Buzo Nike azul','Nuevo','ropa','Buzo Nike azul.','Pantalón deportivo,Zapatillas Nike','2024-04-25 16:15:00',31),
(32,'Buzo Salomon negro','Usado','ropa','Buzo Salomon negro.','Pantalón outdoor,Botas de trekking','2024-04-15 13:50:00',32),
(33,'Cinto de cuero negro','Usado','accesorios','Cinto cuero negro.','Billetera de cuero,Otro accesorio','2024-04-05 10:05:00',33),
(34,'Morral High negro','Usado','accesorios','Morral High color negro.','Billetera,Organizador de viaje','2024-03-28 17:35:00',34);

-- =============================================================
-- IMÁGENES (una por producto)
-- =============================================================
INSERT INTO ImagenProducto (url_imagen, id_producto) VALUES
('recursos/imagenes/1.jpg',1),('recursos/imagenes/2.jpg',2),('recursos/imagenes/3.jpg',3),('recursos/imagenes/4.jpg',4),
('recursos/imagenes/5.jpg',5),('recursos/imagenes/6.jpg',6),('recursos/imagenes/7.jpg',7),('recursos/imagenes/8.jpg',8),
('recursos/imagenes/9.jpg',9),('recursos/imagenes/10.jpg',10),('recursos/imagenes/11.jpg',11),('recursos/imagenes/12.jpg',12),
('recursos/imagenes/13.jpg',13),('recursos/imagenes/14.jpg',14),('recursos/imagenes/15.jpg',15),('recursos/imagenes/16.jpg',16),
('recursos/imagenes/17.jpg',17),('recursos/imagenes/18.jpg',18),('recursos/imagenes/19.jpg',19),('recursos/imagenes/20.jpg',20),
('recursos/imagenes/21.jpg',21),('recursos/imagenes/22.jpg',22),('recursos/imagenes/23.jpg',23),('recursos/imagenes/24.jpg',24),
('recursos/imagenes/25.jpg',25),('recursos/imagenes/26.jpg',26),('recursos/imagenes/27.jpg',27),('recursos/imagenes/28.jpg',28),
('recursos/imagenes/29.jpg',29),('recursos/imagenes/30.jpg',30),('recursos/imagenes/31.jpg',31),('recursos/imagenes/32.jpg',32),
('recursos/imagenes/33.jpg',33),('recursos/imagenes/34.jpg',34);

-- =============================================================
-- PUBLICA (cada producto pertenece a un usuario)
-- =============================================================
INSERT INTO Publica (id_usuario, id_producto) VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),
(11,11),(12,12),(13,13),(14,14),(15,15),(16,16),
(1,17),(2,18),(3,19),(4,20),(5,21),(6,22),(7,23),(8,24),
(9,25),(10,26),(11,27),(12,28),(13,29),(14,30),(15,31),(16,32),
(1,33),(2,34);

-- =============================================================
-- MENSAJES
-- =============================================================
INSERT INTO Mensaje (id_mensaje, contenido, f_envio, id_emisor, id_receptor) VALUES
(1, 'Hola, estoy interesado en tu producto. ¿Está disponible?', '2025-08-11 10:12:00', 5, 2),
(2, 'Sí, sigue disponible. Podemos coordinar entrega.', '2025-08-11 10:20:00', 2, 5),
(3, 'Gracias, quedo a la espera.', '2025-08-11 10:25:00', 5, 2);

-- =============================================================
-- PROPUESTAS DE INTERCAMBIO
-- =============================================================
INSERT INTO PropuestaIntercambio (id_propuesta, id_prod_solicitado, id_prod_ofrecido, estado, fecha, id_usuario) VALUES
-- Usuario 5 quiere producto 2 (de usuario 2), ofrece producto 5 (suyo)
(1, 2, 5, 'pending', '2025-08-10', 5),
-- Usuario 2 quiere producto 4 (de usuario 4), ofrece producto 2 (suyo)
(2, 4, 2, 'accepted', '2025-07-20', 2),
-- Usuario 1 quiere producto 7 (de usuario 7), ofrece producto 1 (suyo)
(3, 7, 1, 'cancelled', '2025-06-01', 1),
-- Usuario 3 quiere producto 1 (de usuario 1), ofrece producto 3 (suyo) - RECIBIDA por usuario 1
(4, 1, 3, 'pending', '2025-10-20', 3),
-- Usuario 6 quiere producto 1 (de usuario 1), ofrece producto 6 (suyo) - RECIBIDA por usuario 1
(5, 1, 6, 'accepted', '2025-10-18', 6);

-- =============================================================
-- VALORACIONES
-- =============================================================
INSERT INTO Valoracion (puntuacion, comentario, fecha, id_usuario_emisor, id_usuario_receptor) VALUES
-- Valoraciones para Usuario 1
(5,'Excelente vendedor',CURDATE(),2,1),
(5,'Muy buena comunicación',CURDATE(),3,1),
(4,'Todo bien',CURDATE(),4,1),
(5,'Recomendado',CURDATE(),5,1),
(4,'Producto como se describió',CURDATE(),6,1),
-- Valoraciones para Usuario 2
(5,'Perfecto',CURDATE(),1,2),
(4,'Buena experiencia',CURDATE(),3,2),
(5,'Muy profesional',CURDATE(),4,2),
(4,'Recomendable',CURDATE(),5,2),
-- Valoraciones para Lucas (11)
(5,'Excelente persona',CURDATE(),12,11),
(5,'Muy confiable',CURDATE(),13,11),
(4,'Todo perfecto',CURDATE(),14,11),
(5,'Súper recomendado',CURDATE(),15,11),
-- Valoraciones para Alexis (12)
(4,'Buen trato',CURDATE(),11,12),
(5,'Excelente',CURDATE(),13,12),
(5,'Muy responsable',CURDATE(),14,12),
-- Valoraciones para Agustin (13)
(5,'Perfecto intercambio',CURDATE(),11,13),
(4,'Todo bien',CURDATE(),12,13),
(5,'Muy buen vendedor',CURDATE(),14,13),
-- Valoraciones para Guillermo (14)
(5,'Excelente comunicación',CURDATE(),11,14),
(4,'Recomendado',CURDATE(),12,14),
(5,'Muy confiable',CURDATE(),13,14),
-- Valoraciones para Catalina (15)
(5,'Perfecta',CURDATE(),11,15),
(5,'Muy amable',CURDATE(),12,15),
(4,'Buena experiencia',CURDATE(),13,15),
-- Valoraciones para Dahiane (16)
(5,'Excelente vendedora',CURDATE(),11,16),
(4,'Muy responsable',CURDATE(),12,16),
(5,'Recomendada 100%',CURDATE(),13,16);

-- =============================================================
-- NOTIFICACIONES
-- =============================================================
INSERT INTO Notificacion (tipo, titulo, descripcion, fecha, leida, id_usuario) VALUES
-- Notificaciones para Lucas
('solicitud_chat', 'Solicitud de chat', 'Tienes una solicitud de chat de Alexis', '2025-10-22', 0, 11),
('oferta', 'Nueva oferta', 'Agustin ofertó por tu producto', '2025-10-22', 0, 11),
('mensaje', 'Nuevo mensaje', 'Tienes un nuevo mensaje de Catalina', '2025-10-21', 1, 11),
-- Notificaciones para Alexis
('oferta_aceptada', 'Oferta aceptada', 'Lucas aceptó tu oferta', '2025-10-20', 1, 12),
('mensaje', 'Nuevo mensaje', 'Tienes un nuevo mensaje de Guillermo', '2025-10-20', 0, 12),
-- Notificaciones para Guillermo
('resena', 'Nueva reseña', 'Recibiste una nueva valoración de 5 estrellas', '2025-10-19', 0, 14);

-- =============================================================
-- CONVERSACIONES DE CHAT
-- =============================================================
INSERT INTO ChatConversacion (id_conversacion, id_usuario1, id_usuario2, id_producto, fecha_inicio, ultimo_mensaje, ultimo_mensaje_contenido) VALUES
(1, 11, 12, 7, '2025-10-19 08:00:00', '2025-10-19 08:20:00', 'Genial, me interesa. ¿Dónde podemos coordinar?'),
(2, 11, 13, NULL, '2025-10-18 14:30:00', '2025-10-18 14:40:00', 'Escribiendo...'),
(3, 11, 14, 5, '2025-10-17 10:15:00', '2025-10-17 10:30:00', 'Genial, quedamos en eso!'),
(4, 12, 15, NULL, '2025-10-16 16:45:00', '2025-10-16 16:50:00', 'Una maravilla, yo creo que...'),
(5, 13, 16, 2, '2025-10-15 09:20:00', '2025-10-15 09:25:00', 'Foto');

-- =============================================================
-- MENSAJES DE CHAT
-- =============================================================
INSERT INTO ChatMensaje (id_conversacion, id_emisor, contenido, enviado_en, leido) VALUES
-- Conversación 1: Lucas (11) y Alexis (12)
(1, 11, 'Hola, estoy interesado en tus zapatillas Adidas', '2025-10-19 08:00:00', 1),
(1, 12, '¡Hola! Sí, están disponibles. ¿Qué talla usas?', '2025-10-19 08:05:00', 1),
(1, 11, 'Uso talla 42, ¿en qué estado están?', '2025-10-19 08:10:00', 1),
(1, 12, 'Están en muy buen estado, poco uso. Te puedo mandar más fotos', '2025-10-19 08:12:00', 1),
(1, 11, 'Genial, me interesa. ¿Dónde podemos coordinar?', '2025-10-19 08:20:00', 0),
-- Conversación 2: Lucas (11) y Agustin (13)
(2, 11, 'Hola, ¿cómo estás?', '2025-10-18 14:30:00', 1),
(2, 13, 'Todo bien, ¿y tú?', '2025-10-18 14:35:00', 1),
(2, 11, 'Escribiendo...', '2025-10-18 14:40:00', 0),
-- Conversación 3: Lucas (11) y Guillermo (14)
(3, 11, 'Me gusta tu remera Suzuki', '2025-10-17 10:15:00', 1),
(3, 14, 'Gracias, es nueva con etiqueta', '2025-10-17 10:20:00', 1),
(3, 11, '¿Aceptarías un intercambio?', '2025-10-17 10:25:00', 1),
(3, 14, 'Genial, quedamos en eso!', '2025-10-17 10:30:00', 0),
-- Conversación 4: Alexis (12) y Catalina (15)
(4, 12, 'Hola', '2025-10-16 16:45:00', 1),
(4, 15, 'Una maravilla, yo creo que...', '2025-10-16 16:50:00', 0),
-- Conversación 5: Agustin (13) y Dahiane (16)
(5, 13, 'Foto', '2025-10-15 09:20:00', 1),
(5, 16, 'Ok, te la mando', '2025-10-15 09:25:00', 0);

-- =============================================================
-- ACTIVAR FOREIGN KEY CHECKS
-- =============================================================
SET FOREIGN_KEY_CHECKS = 1;

COMMIT;