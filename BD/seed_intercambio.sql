USE dreva;

-- =============================================================
-- LIMPIAR TABLAS PARA INSERCIÓN LIMPIA
-- =============================================================
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Genera;
TRUNCATE TABLE Valoracion;
TRUNCATE TABLE Publica;
TRUNCATE TABLE PropuestaIntercambio;
TRUNCATE TABLE Mensaje;
TRUNCATE TABLE ImagenProducto;
TRUNCATE TABLE Producto;
TRUNCATE TABLE Usuario;
SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- USUARIOS - Combinando datos únicos de ambas fuentes
-- =============================================================
INSERT INTO Usuario (id_usuario, nombre_comp, correo, contrasena, rol, ubicacion, f_nacimiento) VALUES
-- Usuarios con nombres de vendedores del JS y algunos del archivo antiguo
(1,'María González','maria.gonzalez@example.com',SHA2('123456',256),'usuario','Montevideo, Uruguay','1985-03-15'),
(2,'Carlos Rodríguez','carlos.rodriguez@example.com',SHA2('lucia789',256),'usuario','Montevideo, Uruguay','1988-07-22'),
(3,'Ana Silva','ana.silva@example.com',SHA2('admin123',256),'usuario','Montevideo, Uruguay','1992-11-08'),
(4,'Roberto Fernández','roberto.fernandez@example.com',SHA2('password1',256),'usuario','Montevideo, Uruguay','1987-04-26'),
(5,'Diego Martínez','diego.martinez@example.com',SHA2('password2',256),'usuario','Montevideo, Uruguay','1990-12-03'),
(6,'Laura Pérez','laura.perez@example.com',SHA2('password3',256),'usuario','Montevideo, Uruguay','1989-09-18'),
-- Más usuarios del JS y usuarios adicionales para completar hasta 34 productos
(7,'Fernando Suárez','fernando.suarez@example.com',SHA2('pass7',256),'usuario','Montevideo','1986-05-14'),
(8,'Patricia Morales','patricia.morales@example.com',SHA2('pass8',256),'usuario','Montevideo','1991-08-27'),
(9,'Andrés Vega','andres.vega@example.com',SHA2('pass9',256),'usuario','Montevideo','1993-02-10'),
(10,'Carmen López','carmen.lopez@example.com',SHA2('pass10',256),'usuario','Montevideo','1987-10-05'),
(11,'Usuario 11','u11@example.com',SHA2('pass11',256),'usuario','Montevideo','1990-01-11'),
(12,'Usuario 12','u12@example.com',SHA2('pass12',256),'usuario','Montevideo','1990-01-12'),
(13,'Usuario 13','u13@example.com',SHA2('pass13',256),'usuario','Montevideo','1990-01-13'),
(14,'Usuario 14','u14@example.com',SHA2('pass14',256),'usuario','Montevideo','1990-01-14'),
(15,'Usuario 15','u15@example.com',SHA2('pass15',256),'usuario','Montevideo','1990-01-15'),
(16,'Usuario 16','u16@example.com',SHA2('pass16',256),'usuario','Montevideo','1990-01-16'),
(17,'Usuario 17','u17@example.com',SHA2('pass17',256),'usuario','Montevideo','1990-01-17'),
(18,'Usuario 18','u18@example.com',SHA2('pass18',256),'usuario','Montevideo','1990-01-18'),
(19,'Usuario 19','u19@example.com',SHA2('pass19',256),'usuario','Montevideo','1990-01-19'),
(20,'Usuario 20','u20@example.com',SHA2('pass20',256),'usuario','Montevideo','1990-01-20'),
(21,'Usuario 21','u21@example.com',SHA2('pass21',256),'usuario','Montevideo','1990-01-21'),
(22,'Usuario 22','u22@example.com',SHA2('pass22',256),'usuario','Montevideo','1990-01-22'),
(23,'Usuario 23','u23@example.com',SHA2('pass23',256),'usuario','Montevideo','1990-01-23'),
(24,'Usuario 24','u24@example.com',SHA2('pass24',256),'usuario','Montevideo','1990-01-24'),
(25,'Usuario 25','u25@example.com',SHA2('pass25',256),'usuario','Montevideo','1990-01-25'),
(26,'Usuario 26','u26@example.com',SHA2('pass26',256),'usuario','Montevideo','1990-01-26'),
(27,'Usuario 27','u27@example.com',SHA2('pass27',256),'usuario','Montevideo','1990-01-27'),
(28,'Usuario 28','u28@example.com',SHA2('pass28',256),'usuario','Montevideo','1990-01-28'),
(29,'Usuario 29','u29@example.com',SHA2('pass29',256),'usuario','Montevideo','1990-01-29'),
(30,'Usuario 30','u30@example.com',SHA2('pass30',256),'usuario','Montevideo','1990-01-30'),
(31,'Usuario 31','u31@example.com',SHA2('pass31',256),'usuario','Montevideo','1990-01-31'),
(32,'Usuario 32','u32@example.com',SHA2('pass32',256),'usuario','Montevideo','1990-02-01'),
(33,'Usuario 33','u33@example.com',SHA2('pass33',256),'usuario','Montevideo','1990-02-02'),
(34,'Usuario 34','u34@example.com',SHA2('pass34',256),'usuario','Montevideo','1990-02-03');

-- =============================================================
-- UBICACIONES - Datos de coordenadas de los productos del JS
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
-- PRODUCTOS (34) - Con datos completos del JS (calificaciones calculadas dinámicamente desde Valoracion)
-- =============================================================
INSERT INTO Producto (id_producto, nombre, estado, categoria, descripcion, preferencias, f_publicacion, id_ubicacion) VALUES
-- Los primeros 10 productos con datos del JS
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
-- Productos adicionales para completar hasta 34 (con calificaciones calculadas automáticamente)
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
(27,'Bicileta rodado 27','Usado','deportes','Bicicleta rodado 27.','Casco de ciclismo,Luces LED','2024-06-10 12:20:00',27),
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
-- PUBLICA (propietario único = mismo id que producto)
-- =============================================================
INSERT INTO Publica (id_usuario, id_producto) VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(14,14),(15,15),(16,16),
(17,17),(18,18),(19,19),(20,20),(21,21),(22,22),(23,23),(24,24),(25,25),(26,26),(27,27),(28,28),(29,29),(30,30),
(31,31),(32,32),(33,33),(34,34);

-- =============================================================
-- MENSAJES - Datos del archivo antiguo
-- =============================================================
INSERT INTO Mensaje (id_mensaje, contenido, f_envio, id_emisor, id_receptor) VALUES
(1, 'Hola, estoy interesado en tu producto. ¿Está disponible?', '2025-08-11 10:12:00', 5, 2),
(2, 'Sí, sigue disponible. Podemos coordinar entrega.', '2025-08-11 10:20:00', 2, 5),
(3, 'Gracias, quedo a la espera.', '2025-08-11 10:25:00', 5, 2);

-- =============================================================
-- PROPUESTAS DE INTERCAMBIO - Datos del archivo antiguo
-- =============================================================
INSERT INTO PropuestaIntercambio (id_propuesta, id_prod_solicitado, id_prod_ofrecido, estado, fecha, id_usuario) VALUES
(1, 2, 1, 'pending', '2025-08-10', 5),
(2, 4, 3, 'accepted', '2025-07-20', 2),
(3, 7, 6, 'cancelled', '2025-06-01', 1);

-- =============================================================
-- VALORACIONES
-- Para cada usuario receptor se generan N valoraciones (resenas) con distribución de enteros que promedian el valor objetivo.
-- Notación: Target(promedio, cantidad)
-- Estrategia: usar combinación de 5/4/3/2/1 que logre el promedio exacto a una decimal.
-- =============================================================
INSERT INTO Valoracion (puntuacion, comentario, fecha, id_usuario_emisor, id_usuario_receptor) VALUES
-- 1: 4.5 (12) -> 6x5 + 6x4
(5,'',CURDATE(),2,1),(5,'',CURDATE(),3,1),(5,'',CURDATE(),4,1),(5,'',CURDATE(),5,1),(5,'',CURDATE(),6,1),(5,'',CURDATE(),7,1),
(4,'',CURDATE(),8,1),(4,'',CURDATE(),9,1),(4,'',CURDATE(),10,1),(4,'',CURDATE(),11,1),(4,'',CURDATE(),12,1),(4,'',CURDATE(),13,1),
-- 2: 4.2 (32) -> 6x5 + 20x4 + 6x3 => (30+80+18)=128 /32=4.0? necesitamos 4.2 => usar 10x5 +14x4 +8x3 -> (50+56+24)=130 /32=4.0625 aún bajo. Ajustar: 12x5 +12x4 +8x3 = (60+48+24)=132 /32=4.125; 14x5 +10x4 +8x3 = (70+40+24)=134 /32=4.1875≈4.2. Aceptamos.
 (5,'',CURDATE(),1,2),(5,'',CURDATE(),3,2),(5,'',CURDATE(),4,2),(5,'',CURDATE(),5,2),(5,'',CURDATE(),6,2),(5,'',CURDATE(),7,2),
 (5,'',CURDATE(),8,2),(5,'',CURDATE(),9,2),(5,'',CURDATE(),10,2),(5,'',CURDATE(),11,2),(5,'',CURDATE(),12,2),(5,'',CURDATE(),13,2),
 (5,'',CURDATE(),14,2),(5,'',CURDATE(),15,2),
 (4,'',CURDATE(),16,2),(4,'',CURDATE(),17,2),(4,'',CURDATE(),18,2),(4,'',CURDATE(),19,2),(4,'',CURDATE(),20,2),
 (4,'',CURDATE(),21,2),(4,'',CURDATE(),22,2),(4,'',CURDATE(),23,2),(4,'',CURDATE(),24,2),(4,'',CURDATE(),25,2),
 (4,'',CURDATE(),26,2),(4,'',CURDATE(),27,2),
 (3,'',CURDATE(),28,2),(3,'',CURDATE(),29,2),(3,'',CURDATE(),30,2),(3,'',CURDATE(),31,2),(3,'',CURDATE(),32,2),(3,'',CURDATE(),33,2),(3,'',CURDATE(),34,2),
-- 3: 4.8 (8) -> 6x5 +2x4 = (30+8)/8=4.75 aceptar aproximación
 (5,'',CURDATE(),1,3),(5,'',CURDATE(),2,3),(5,'',CURDATE(),4,3),(5,'',CURDATE(),5,3),(5,'',CURDATE(),6,3),(5,'',CURDATE(),7,3),
 (4,'',CURDATE(),8,3),(4,'',CURDATE(),9,3),
-- 4: 4.3 (15) -> 6x5 +4x4 +5x3 = (30+16+15)=61/15=4.066 ~4.1; mejorar: 5x5+7x4+3x3 = (25+28+9)=62/15=4.133; 5x5+5x4+5x3=(25+20+15)=60/15=4.0; 7x5+4x4+4x3=(35+16+12)=63/15=4.2 buena -> usar.
 (5,'',CURDATE(),1,4),(5,'',CURDATE(),2,4),(5,'',CURDATE(),3,4),(5,'',CURDATE(),5,4),(5,'',CURDATE(),6,4),(5,'',CURDATE(),7,4),(5,'',CURDATE(),8,4),
 (4,'',CURDATE(),9,4),(4,'',CURDATE(),10,4),(4,'',CURDATE(),11,4),(4,'',CURDATE(),12,4),
 (3,'',CURDATE(),13,4),(3,'',CURDATE(),14,4),(3,'',CURDATE(),15,4),(3,'',CURDATE(),16,4),
-- 5: 4.6 (23) -> Aproximación: 11x5 +8x4 +4x3 = (55+32+12)=99/23=4.304; mejor 14x5 +7x4 +2x3=(70+28+6)=104/23=4.521; 15x5 +6x4 +2x3=(75+24+6)=105/23=4.565; 16x5+5x4+2x3=(80+20+6)=106/23=4.609 ≈4.6 usar.
 (5,'',CURDATE(),1,5),(5,'',CURDATE(),2,5),(5,'',CURDATE(),3,5),(5,'',CURDATE(),4,5),(5,'',CURDATE(),6,5),(5,'',CURDATE(),7,5),(5,'',CURDATE(),8,5),(5,'',CURDATE(),9,5),(5,'',CURDATE(),10,5),(5,'',CURDATE(),11,5),(5,'',CURDATE(),12,5),(5,'',CURDATE(),13,5),(5,'',CURDATE(),14,5),(5,'',CURDATE(),15,5),(5,'',CURDATE(),16,5),
 (4,'',CURDATE(),17,5),(4,'',CURDATE(),18,5),(4,'',CURDATE(),19,5),(4,'',CURDATE(),20,5),(4,'',CURDATE(),21,5),
 (3,'',CURDATE(),22,5),(3,'',CURDATE(),23,5),
-- 6: 4.4 (18) -> 8x5 +6x4 +4x3 = (40+24+12)/18=4.22; 9x5+5x4+4x3=(45+20+12)=77/18=4.277; 10x5+4x4+4x3=(50+16+12)=78/18=4.333; 9x5+7x4+2x3=(45+28+6)=79/18=4.389≈4.4 usar
 (5,'',CURDATE(),1,6),(5,'',CURDATE(),2,6),(5,'',CURDATE(),3,6),(5,'',CURDATE(),4,6),(5,'',CURDATE(),5,6),(5,'',CURDATE(),7,6),(5,'',CURDATE(),8,6),(5,'',CURDATE(),9,6),(5,'',CURDATE(),10,6),
 (4,'',CURDATE(),11,6),(4,'',CURDATE(),12,6),(4,'',CURDATE(),13,6),(4,'',CURDATE(),14,6),(4,'',CURDATE(),15,6),(4,'',CURDATE(),16,6),(4,'',CURDATE(),17,6),
 (3,'',CURDATE(),18,6),(3,'',CURDATE(),19,6),
-- 7: 4.9 (11) -> 10x5 +1x4 =54/11=4.909 ~4.9
 (5,'',CURDATE(),1,7),(5,'',CURDATE(),2,7),(5,'',CURDATE(),3,7),(5,'',CURDATE(),4,7),(5,'',CURDATE(),5,7),(5,'',CURDATE(),6,7),(5,'',CURDATE(),8,7),(5,'',CURDATE(),9,7),(5,'',CURDATE(),10,7),(5,'',CURDATE(),11,7),(4,'',CURDATE(),12,7),
-- 8: 3.8 (5) -> 3x4 +2x3 = (12+6)/5=3.6; 2x5+1x4+2x3=(10+4+6)=20/5=4.0; 1x5+2x4+2x3=(5+8+6)=19/5=3.8 exacto
 (5,'',CURDATE(),1,8),(4,'',CURDATE(),2,8),(4,'',CURDATE(),3,8),(3,'',CURDATE(),4,8),(3,'',CURDATE(),5,8),
-- 9: 5.0 (15) -> 15x5
 (5,'',CURDATE(),1,9),(5,'',CURDATE(),2,9),(5,'',CURDATE(),3,9),(5,'',CURDATE(),4,9),(5,'',CURDATE(),5,9),(5,'',CURDATE(),6,9),(5,'',CURDATE(),7,9),(5,'',CURDATE(),8,9),(5,'',CURDATE(),10,9),(5,'',CURDATE(),11,9),(5,'',CURDATE(),12,9),(5,'',CURDATE(),13,9),(5,'',CURDATE(),14,9),(5,'',CURDATE(),15,9),(5,'',CURDATE(),16,9),
-- 10: 3.9 (7) -> 4x4 +3x3 = (16+9)=25/7=3.57; 3x5+2x4+2x3=(15+8+6)=29/7=4.14; 2x5+3x4+2x3=(10+12+6)=28/7=4.0; 1x5+4x4+2x3=(5+16+6)=27/7=3.857≈3.9 usar
 (5,'',CURDATE(),1,10),(4,'',CURDATE(),2,10),(4,'',CURDATE(),3,10),(4,'',CURDATE(),4,10),(4,'',CURDATE(),5,10),(3,'',CURDATE(),6,10),(3,'',CURDATE(),7,10),
-- 11: 1.8 (4) -> 1x3 +3x1 = (3+3)/4=1.5; 2x3 +2x1=(6+2)=8/4=2.0; 1x4+1x2+2x1=(4+2+2)=8/4=2.0; 1x4+3x1=(4+3)=7/4=1.75≈1.8 usar
 (4,'',CURDATE(),1,11),(1,'',CURDATE(),2,11),(1,'',CURDATE(),3,11),(1,'',CURDATE(),4,11),
-- 12: 5.0 (17) -> 17x5
 (5,'',CURDATE(),1,12),(5,'',CURDATE(),2,12),(5,'',CURDATE(),3,12),(5,'',CURDATE(),4,12),(5,'',CURDATE(),5,12),(5,'',CURDATE(),6,12),(5,'',CURDATE(),7,12),(5,'',CURDATE(),8,12),(5,'',CURDATE(),9,12),(5,'',CURDATE(),10,12),(5,'',CURDATE(),11,12),(5,'',CURDATE(),12,12),(5,'',CURDATE(),13,12),(5,'',CURDATE(),14,12),(5,'',CURDATE(),15,12),(5,'',CURDATE(),16,12),(5,'',CURDATE(),17,12),
-- 13: 4.8 (21) -> aprox 17x5 +4x4 =(85+16)=101/21=4.81
 (5,'',CURDATE(),1,13),(5,'',CURDATE(),2,13),(5,'',CURDATE(),3,13),(5,'',CURDATE(),4,13),(5,'',CURDATE(),5,13),(5,'',CURDATE(),6,13),(5,'',CURDATE(),7,13),(5,'',CURDATE(),8,13),(5,'',CURDATE(),9,13),(5,'',CURDATE(),10,13),(5,'',CURDATE(),11,13),(5,'',CURDATE(),12,13),(5,'',CURDATE(),13,13),(5,'',CURDATE(),14,13),(5,'',CURDATE(),15,13),(5,'',CURDATE(),16,13),(5,'',CURDATE(),17,13),(4,'',CURDATE(),18,13),(4,'',CURDATE(),19,13),(4,'',CURDATE(),20,13),(4,'',CURDATE(),21,13),
-- 14: 3.6 (13) -> 5x4 +8x3 = (20+24)=44/13=3.38; 6x4+7x3=(24+21)=45/13=3.46; 7x4+6x3=(28+18)=46/13=3.54; 8x4+5x3=(32+15)=47/13=3.615≈3.6 usar
 (4,'',CURDATE(),1,14),(4,'',CURDATE(),2,14),(4,'',CURDATE(),3,14),(4,'',CURDATE(),4,14),(4,'',CURDATE(),5,14),(4,'',CURDATE(),6,14),(4,'',CURDATE(),7,14),(4,'',CURDATE(),8,14),(3,'',CURDATE(),9,14),(3,'',CURDATE(),10,14),(3,'',CURDATE(),11,14),(3,'',CURDATE(),12,14),(3,'',CURDATE(),13,14),
-- 15: 4.7 (24) -> 17x5 +7x4 = (85+28)=113/24=4.708 ≈4.7
 (5,'',CURDATE(),1,15),(5,'',CURDATE(),2,15),(5,'',CURDATE(),3,15),(5,'',CURDATE(),4,15),(5,'',CURDATE(),5,15),(5,'',CURDATE(),6,15),(5,'',CURDATE(),7,15),(5,'',CURDATE(),8,15),(5,'',CURDATE(),9,15),(5,'',CURDATE(),10,15),(5,'',CURDATE(),11,15),(5,'',CURDATE(),12,15),(5,'',CURDATE(),13,15),(5,'',CURDATE(),14,15),(5,'',CURDATE(),15,15),(5,'',CURDATE(),16,15),(5,'',CURDATE(),17,15),(5,'',CURDATE(),18,15),(4,'',CURDATE(),19,15),(4,'',CURDATE(),20,15),(4,'',CURDATE(),21,15),(4,'',CURDATE(),22,15),(4,'',CURDATE(),23,15),(4,'',CURDATE(),24,15),
-- 16: 4.8 (19) -> 15x5 +4x4 = (75+16)=91/19=4.789 ≈4.8
 (5,'',CURDATE(),1,16),(5,'',CURDATE(),2,16),(5,'',CURDATE(),3,16),(5,'',CURDATE(),4,16),(5,'',CURDATE(),5,16),(5,'',CURDATE(),6,16),(5,'',CURDATE(),7,16),(5,'',CURDATE(),8,16),(5,'',CURDATE(),9,16),(5,'',CURDATE(),10,16),(5,'',CURDATE(),11,16),(5,'',CURDATE(),12,16),(5,'',CURDATE(),13,16),(5,'',CURDATE(),14,16),(5,'',CURDATE(),15,16),(4,'',CURDATE(),16,16),(4,'',CURDATE(),17,16),(4,'',CURDATE(),18,16),(4,'',CURDATE(),19,16),
-- 17: 4.9 (18) -> 17x5 +1x4 = (85+4)/18=4.944
 (5,'',CURDATE(),1,17),(5,'',CURDATE(),2,17),(5,'',CURDATE(),3,17),(5,'',CURDATE(),4,17),(5,'',CURDATE(),5,17),(5,'',CURDATE(),6,17),(5,'',CURDATE(),7,17),(5,'',CURDATE(),8,17),(5,'',CURDATE(),9,17),(5,'',CURDATE(),10,17),(5,'',CURDATE(),11,17),(5,'',CURDATE(),12,17),(5,'',CURDATE(),13,17),(5,'',CURDATE(),14,17),(5,'',CURDATE(),15,17),(5,'',CURDATE(),16,17),(5,'',CURDATE(),17,17),(4,'',CURDATE(),18,17),
-- 18: 4.8 (25) -> 20x5 +5x4 =(100+20)=120/25=4.8 exacto
 (5,'',CURDATE(),1,18),(5,'',CURDATE(),2,18),(5,'',CURDATE(),3,18),(5,'',CURDATE(),4,18),(5,'',CURDATE(),5,18),(5,'',CURDATE(),6,18),(5,'',CURDATE(),7,18),(5,'',CURDATE(),8,18),(5,'',CURDATE(),9,18),(5,'',CURDATE(),10,18),(5,'',CURDATE(),11,18),(5,'',CURDATE(),12,18),(5,'',CURDATE(),13,18),(5,'',CURDATE(),14,18),(5,'',CURDATE(),15,18),(5,'',CURDATE(),16,18),(5,'',CURDATE(),17,18),(5,'',CURDATE(),18,18),(5,'',CURDATE(),19,18),(5,'',CURDATE(),20,18),(4,'',CURDATE(),21,18),(4,'',CURDATE(),22,18),(4,'',CURDATE(),23,18),(4,'',CURDATE(),24,18),(4,'',CURDATE(),25,18),
-- 19: 5.0 (22) -> 22x5
 (5,'',CURDATE(),1,19),(5,'',CURDATE(),2,19),(5,'',CURDATE(),3,19),(5,'',CURDATE(),4,19),(5,'',CURDATE(),5,19),(5,'',CURDATE(),6,19),(5,'',CURDATE(),7,19),(5,'',CURDATE(),8,19),(5,'',CURDATE(),9,19),(5,'',CURDATE(),10,19),(5,'',CURDATE(),11,19),(5,'',CURDATE(),12,19),(5,'',CURDATE(),13,19),(5,'',CURDATE(),14,19),(5,'',CURDATE(),15,19),(5,'',CURDATE(),16,19),(5,'',CURDATE(),17,19),(5,'',CURDATE(),18,19),(5,'',CURDATE(),19,19),(5,'',CURDATE(),20,19),(5,'',CURDATE(),21,19),(5,'',CURDATE(),22,19),
-- 20: 4.9 (16) -> 15x5 +1x4 = (75+4)/16=4.9375≈4.9
 (5,'',CURDATE(),1,20),(5,'',CURDATE(),2,20),(5,'',CURDATE(),3,20),(5,'',CURDATE(),4,20),(5,'',CURDATE(),5,20),(5,'',CURDATE(),6,20),(5,'',CURDATE(),7,20),(5,'',CURDATE(),8,20),(5,'',CURDATE(),9,20),(5,'',CURDATE(),10,20),(5,'',CURDATE(),11,20),(5,'',CURDATE(),12,20),(5,'',CURDATE(),13,20),(5,'',CURDATE(),14,20),(5,'',CURDATE(),15,20),(4,'',CURDATE(),16,20),
-- 21: 2.7 (10) -> 7x3 +3x2=(21+6)=27/10=2.7 exacto
 (3,'',CURDATE(),1,21),(3,'',CURDATE(),2,21),(3,'',CURDATE(),3,21),(3,'',CURDATE(),4,21),(3,'',CURDATE(),5,21),(3,'',CURDATE(),6,21),(3,'',CURDATE(),7,21),(2,'',CURDATE(),8,21),(2,'',CURDATE(),9,21),(2,'',CURDATE(),10,21),
-- 22: 4.0 (9) -> 9x4? require average 4 -> 9x4 =36/9=4 exacto
 (4,'',CURDATE(),1,22),(4,'',CURDATE(),2,22),(4,'',CURDATE(),3,22),(4,'',CURDATE(),4,22),(4,'',CURDATE(),5,22),(4,'',CURDATE(),6,22),(4,'',CURDATE(),7,22),(4,'',CURDATE(),8,22),(4,'',CURDATE(),9,22),
-- 23: 5.0 (19) -> 19x5
 (5,'',CURDATE(),1,23),(5,'',CURDATE(),2,23),(5,'',CURDATE(),3,23),(5,'',CURDATE(),4,23),(5,'',CURDATE(),5,23),(5,'',CURDATE(),6,23),(5,'',CURDATE(),7,23),(5,'',CURDATE(),8,23),(5,'',CURDATE(),9,23),(5,'',CURDATE(),10,23),(5,'',CURDATE(),11,23),(5,'',CURDATE(),12,23),(5,'',CURDATE(),13,23),(5,'',CURDATE(),14,23),(5,'',CURDATE(),15,23),(5,'',CURDATE(),16,23),(5,'',CURDATE(),17,23),(5,'',CURDATE(),18,23),(5,'',CURDATE(),19,23),
-- 24: 4.2 (27) -> 10x5 +9x4 +8x3 = (50+36+24)=110/27=4.074; 11x5+9x4+7x3=(55+36+21)=112/27=4.148; 12x5+8x4+7x3=(60+32+21)=113/27=4.185≈4.2
 (5,'',CURDATE(),1,24),(5,'',CURDATE(),2,24),(5,'',CURDATE(),3,24),(5,'',CURDATE(),4,24),(5,'',CURDATE(),5,24),(5,'',CURDATE(),6,24),(5,'',CURDATE(),7,24),(5,'',CURDATE(),8,24),(5,'',CURDATE(),9,24),(5,'',CURDATE(),10,24),(5,'',CURDATE(),11,24),(5,'',CURDATE(),12,24),
 (4,'',CURDATE(),13,24),(4,'',CURDATE(),14,24),(4,'',CURDATE(),15,24),(4,'',CURDATE(),16,24),(4,'',CURDATE(),17,24),(4,'',CURDATE(),18,24),(4,'',CURDATE(),19,24),(4,'',CURDATE(),20,24),
 (3,'',CURDATE(),21,24),(3,'',CURDATE(),22,24),(3,'',CURDATE(),23,24),(3,'',CURDATE(),24,24),(3,'',CURDATE(),25,24),(3,'',CURDATE(),26,24),(3,'',CURDATE(),27,24),
-- 25: 4.5 (20) -> 10x5 +10x4
 (5,'',CURDATE(),1,25),(5,'',CURDATE(),2,25),(5,'',CURDATE(),3,25),(5,'',CURDATE(),4,25),(5,'',CURDATE(),5,25),(5,'',CURDATE(),6,25),(5,'',CURDATE(),7,25),(5,'',CURDATE(),8,25),(5,'',CURDATE(),9,25),(5,'',CURDATE(),10,25),(4,'',CURDATE(),11,25),(4,'',CURDATE(),12,25),(4,'',CURDATE(),13,25),(4,'',CURDATE(),14,25),(4,'',CURDATE(),15,25),(4,'',CURDATE(),16,25),(4,'',CURDATE(),17,25),(4,'',CURDATE(),18,25),(4,'',CURDATE(),19,25),(4,'',CURDATE(),20,25),
-- 26: 4.1 (31) -> 8x5 +11x4 +12x3 = (40+44+36)=120/31=3.87; 9x5+12x4+10x3=(45+48+30)=123/31=3.97; 10x5+12x4+9x3=(50+48+27)=125/31=4.032; 11x5+11x4+9x3=(55+44+27)=126/31=4.064; 12x5+10x4+9x3=(60+40+27)=127/31=4.097≈4.1
 (5,'',CURDATE(),1,26),(5,'',CURDATE(),2,26),(5,'',CURDATE(),3,26),(5,'',CURDATE(),4,26),(5,'',CURDATE(),5,26),(5,'',CURDATE(),6,26),(5,'',CURDATE(),7,26),(5,'',CURDATE(),8,26),(5,'',CURDATE(),9,26),(5,'',CURDATE(),10,26),(5,'',CURDATE(),11,26),(5,'',CURDATE(),12,26),
 (4,'',CURDATE(),13,26),(4,'',CURDATE(),14,26),(4,'',CURDATE(),15,26),(4,'',CURDATE(),16,26),(4,'',CURDATE(),17,26),(4,'',CURDATE(),18,26),(4,'',CURDATE(),19,26),(4,'',CURDATE(),20,26),
 (3,'',CURDATE(),21,26),(3,'',CURDATE(),22,26),(3,'',CURDATE(),23,26),(3,'',CURDATE(),24,26),(3,'',CURDATE(),25,26),(3,'',CURDATE(),26,26),(3,'',CURDATE(),27,26),(3,'',CURDATE(),28,26),(3,'',CURDATE(),29,26),
-- 27: 4.9 (23) -> 22x5 +1x4 = (110+4)/23=4.956
 (5,'',CURDATE(),1,27),(5,'',CURDATE(),2,27),(5,'',CURDATE(),3,27),(5,'',CURDATE(),4,27),(5,'',CURDATE(),5,27),(5,'',CURDATE(),6,27),(5,'',CURDATE(),7,27),(5,'',CURDATE(),8,27),(5,'',CURDATE(),9,27),(5,'',CURDATE(),10,27),(5,'',CURDATE(),11,27),(5,'',CURDATE(),12,27),(5,'',CURDATE(),13,27),(5,'',CURDATE(),14,27),(5,'',CURDATE(),15,27),(5,'',CURDATE(),16,27),(5,'',CURDATE(),17,27),(5,'',CURDATE(),18,27),(5,'',CURDATE(),19,27),(5,'',CURDATE(),20,27),(5,'',CURDATE(),21,27),(5,'',CURDATE(),22,27),(4,'',CURDATE(),23,27),
-- 28: 4.6 (15) -> 10x5 +5x4 = (50+20)/15=4.67≈4.6
 (5,'',CURDATE(),1,28),(5,'',CURDATE(),2,28),(5,'',CURDATE(),3,28),(5,'',CURDATE(),4,28),(5,'',CURDATE(),5,28),(5,'',CURDATE(),6,28),(5,'',CURDATE(),7,28),(5,'',CURDATE(),8,28),(5,'',CURDATE(),9,28),(5,'',CURDATE(),10,28),(4,'',CURDATE(),11,28),(4,'',CURDATE(),12,28),(4,'',CURDATE(),13,28),(4,'',CURDATE(),14,28),(4,'',CURDATE(),15,28),
-- 29: 3.7 (14) -> 5x4 +9x3 = (20+27)=47/14=3.357; 6x4+8x3=(24+24)=48/14=3.43; 7x4+7x3=(28+21)=49/14=3.5; 8x4+6x3=(32+18)=50/14=3.57; 9x4+5x3=(36+15)=51/14=3.64; 10x4+4x3=(40+12)=52/14=3.71≈3.7
 (4,'',CURDATE(),1,29),(4,'',CURDATE(),2,29),(4,'',CURDATE(),3,29),(4,'',CURDATE(),4,29),(4,'',CURDATE(),5,29),(4,'',CURDATE(),6,29),(4,'',CURDATE(),7,29),(4,'',CURDATE(),8,29),(4,'',CURDATE(),9,29),(4,'',CURDATE(),10,29),(3,'',CURDATE(),11,29),(3,'',CURDATE(),12,29),(3,'',CURDATE(),13,29),(3,'',CURDATE(),14,29),
-- 30: 4.0 (9) -> 9x4
 (4,'',CURDATE(),1,30),(4,'',CURDATE(),2,30),(4,'',CURDATE(),3,30),(4,'',CURDATE(),4,30),(4,'',CURDATE(),5,30),(4,'',CURDATE(),6,30),(4,'',CURDATE(),7,30),(4,'',CURDATE(),8,30),(4,'',CURDATE(),9,30),
-- 31: 5.0 (29) -> 29x5
 (5,'',CURDATE(),1,31),(5,'',CURDATE(),2,31),(5,'',CURDATE(),3,31),(5,'',CURDATE(),4,31),(5,'',CURDATE(),5,31),(5,'',CURDATE(),6,31),(5,'',CURDATE(),7,31),(5,'',CURDATE(),8,31),(5,'',CURDATE(),9,31),(5,'',CURDATE(),10,31),(5,'',CURDATE(),11,31),(5,'',CURDATE(),12,31),(5,'',CURDATE(),13,31),(5,'',CURDATE(),14,31),(5,'',CURDATE(),15,31),(5,'',CURDATE(),16,31),(5,'',CURDATE(),17,31),(5,'',CURDATE(),18,31),(5,'',CURDATE(),19,31),(5,'',CURDATE(),20,31),(5,'',CURDATE(),21,31),(5,'',CURDATE(),22,31),(5,'',CURDATE(),23,31),(5,'',CURDATE(),24,31),(5,'',CURDATE(),25,31),(5,'',CURDATE(),26,31),(5,'',CURDATE(),27,31),(5,'',CURDATE(),28,31),(5,'',CURDATE(),29,31),
-- 32: 4.4 (22) -> 9x5 +8x4 +5x3 = (45+32+15)=92/22=4.18; 10x5+7x4+5x3=(50+28+15)=93/22=4.227; 11x5+7x4+4x3=(55+28+12)=95/22=4.318; 12x5+6x4+4x3=(60+24+12)=96/22=4.364; 13x5+5x4+4x3=(65+20+12)=97/22=4.409≈4.4
 (5,'',CURDATE(),1,32),(5,'',CURDATE(),2,32),(5,'',CURDATE(),3,32),(5,'',CURDATE(),4,32),(5,'',CURDATE(),5,32),(5,'',CURDATE(),6,32),(5,'',CURDATE(),7,32),(5,'',CURDATE(),8,32),(5,'',CURDATE(),9,32),(5,'',CURDATE(),10,32),(5,'',CURDATE(),11,32),(5,'',CURDATE(),12,32),(5,'',CURDATE(),13,32),
 (4,'',CURDATE(),14,32),(4,'',CURDATE(),15,32),(4,'',CURDATE(),16,32),(4,'',CURDATE(),17,32),(4,'',CURDATE(),18,32),
 (3,'',CURDATE(),19,32),(3,'',CURDATE(),20,32),(3,'',CURDATE(),21,32),(3,'',CURDATE(),22,32),
-- 33: 2.8 (10) -> 6x3 +4x2 = (18+8)=26/10=2.6; 7x3+3x2=(21+6)=27/10=2.7; 8x3+2x2=(24+4)=28/10=2.8 exacto
 (3,'',CURDATE(),1,33),(3,'',CURDATE(),2,33),(3,'',CURDATE(),3,33),(3,'',CURDATE(),4,33),(3,'',CURDATE(),5,33),(3,'',CURDATE(),6,33),(3,'',CURDATE(),7,33),(3,'',CURDATE(),8,33),(2,'',CURDATE(),9,33),(2,'',CURDATE(),10,33),
-- 34: 4.5 (20) -> 10x5 +10x4
 (5,'',CURDATE(),1,34),(5,'',CURDATE(),2,34),(5,'',CURDATE(),3,34),(5,'',CURDATE(),4,34),(5,'',CURDATE(),5,34),(5,'',CURDATE(),6,34),(5,'',CURDATE(),7,34),(5,'',CURDATE(),8,34),(5,'',CURDATE(),9,34),(5,'',CURDATE(),10,34),(4,'',CURDATE(),11,34),(4,'',CURDATE(),12,34),(4,'',CURDATE(),13,34),(4,'',CURDATE(),14,34),(4,'',CURDATE(),15,34),(4,'',CURDATE(),16,34),(4,'',CURDATE(),17,34),(4,'',CURDATE(),18,34),(4,'',CURDATE(),19,34),(4,'',CURDATE(),20,34),
-- Valoraciones adicionales del archivo antiguo (adaptadas a las nuevas fechas)
(5,'Excelente producto y comunicación.','2025-08-12',2,1),
(4,'Todo bien, recomendado.','2025-07-22',1,4),
(3,'Producto correcto, pero llegó con retraso.','2025-06-05',6,3);

-- =============================================================
-- NOTIFICACIONES - Datos del JS
-- =============================================================
INSERT INTO Notificacion (id_notificacion, tipo, titulo, descripcion, fecha, leida, id_usuario) VALUES
(1, 'solicitud_chat', 'Solicitud de chat', 'Tienes una solicitud de chat de José Martínez', '2025-10-06', FALSE, 1),
(2, 'oferta', 'Oferta por remera adidas', 'Cristian Ramírez ofertó por tu remera adidas', '2025-10-06', FALSE, 1),
(3, 'mensaje', 'Nuevo mensaje', 'Tienes un nuevo mensaje de Roberto Pérez', '2025-10-05', FALSE, 1),
(4, 'oferta_cancelada', 'Oferta cancelada', 'Julieta González canceló su oferta por tu remera adidas', '2025-10-04', TRUE, 1),
(5, 'oferta_aceptada', 'Oferta aceptada', 'Martín Piña aceptó tu oferta para auriculares inalámbricos', '2025-08-28', TRUE, 2),
(6, 'resena', 'Nueva reseña', 'Obtuviste 5 estrellas de una reseña de Pedro López', '2025-08-28', TRUE, 2);

-- =============================================================
-- ACTIVAR FOREIGN KEY CHECKS
-- =============================================================
SET FOREIGN_KEY_CHECKS = 1;

DELETE FROM Notificacion WHERE id_usuario = 1;

-- Insertar notificaciones de prueba para el Usuario 1
INSERT INTO Notificacion (tipo, titulo, descripcion, fecha, leida, id_usuario) VALUES
-- Notificaciones NO LEÍDAS (HOY)
('solicitud_chat', 'Solicitud de chat', 'Tienes una solicitud de chat de José Martínez', DATE_SUB(NOW(), INTERVAL 20 SECOND), 0, 1),
('oferta', 'Oferta por remera adidas', 'Cristian Ramírez ofertó por tu remera adidas', DATE_SUB(NOW(), INTERVAL 4 MINUTE), 0, 1),
('mensaje', 'Nuevo mensaje', 'Tienes un nuevo mensaje de Roberto Pérez', DATE_SUB(NOW(), INTERVAL 12 HOUR), 0, 1),

-- Notificaciones LEÍDAS (ANTERIORES)
('oferta_cancelada', 'Oferta cancelada', 'Julieta González canceló su oferta por tu remera adidas', DATE_SUB(NOW(), INTERVAL 2 DAY), 1, 1),
('oferta_aceptada', 'Oferta aceptada', 'Martín Piña aceptó tu oferta para auriculares inalámbricos', DATE_SUB(NOW(), INTERVAL 8 WEEK), 1, 1),
('resena', 'Nueva reseña', 'Obtuviste 5 estrellas de una reseña de Pedro López', DATE_SUB(NOW(), INTERVAL 8 WEEK), 1, 1);

-- =============================================================
-- CONVERSACIONES DE CHAT PARA USUARIOS 11-15
-- =============================================================

-- Conversaciones entre usuarios
INSERT INTO Conversacion (id_conversacion, fecha_inicio, id_producto) VALUES
(1, '2025-10-19 08:00:00', 7),  -- Usuario 11 con Usuario 15 por Zapatillas
(2, '2025-10-18 14:30:00', NULL), -- Usuario 11 con Usuario 12
(3, '2025-10-17 10:15:00', 5),   -- Usuario 11 con Usuario 13 por Remera Suzuki
(4, '2025-10-16 16:45:00', NULL), -- Usuario 11 con Usuario 14
(5, '2025-10-15 09:20:00', 2);   -- Usuario 12 con Usuario 15 por Auriculares

-- Participantes de conversaciones
INSERT INTO Participa (id_usuario, id_conversacion, ultimo_mensaje_leido) VALUES
(11, 1, 5), (15, 1, 5),
(11, 2, 3), (12, 2, 2),
(11, 3, 4), (13, 3, 4),
(11, 4, 2), (14, 4, 2),
(12, 5, 1), (15, 5, 0);

-- Mensajes de las conversaciones
INSERT INTO Mensaje (contenido, f_envio, id_emisor, id_receptor, id_conversacion) VALUES
-- Conversación 1: Usuario 11 y 15 (Zapatillas)
('Hola, estoy interesado en tus zapatillas Adidas', '2025-10-19 08:00:00', 11, 15, 1),
('¡Hola! Sí, están disponibles. ¿Qué talla usas?', '2025-10-19 08:05:00', 15, 11, 1),
('Uso talla 42, ¿en qué estado están?', '2025-10-19 08:10:00', 11, 15, 1),
('Están en muy buen estado, poco uso. Te puedo mandar más fotos', '2025-10-19 08:12:00', 15, 11, 1),
('Genial, me interesa. ¿Dónde podemos coordinar?', '2025-10-19 08:20:00', 11, 15, 1),

-- Conversación 2: Usuario 11 y 12
('Hola, ¿cómo estás?', '2025-10-18 14:30:00', 11, 12, 2),
('Todo bien, ¿y tú?', '2025-10-18 14:35:00', 12, 11, 2),
('Escribiendo...', '2025-10-18 14:40:00', 11, 12, 2),

-- Conversación 3: Usuario 11 y 13 (Remera Suzuki)
('Me gusta tu remera Suzuki', '2025-10-17 10:15:00', 11, 13, 3),
('Gracias, es nueva con etiqueta', '2025-10-17 10:20:00', 13, 11, 3),
('¿Aceptarías un intercambio?', '2025-10-17 10:25:00', 11, 13, 3),
('Genial, quedamos en eso!', '2025-10-17 10:30:00', 13, 11, 3),

-- Conversación 4: Usuario 11 y 14
('Hola', '2025-10-16 16:45:00', 11, 14, 4),
('Una maravilla, yo creo que...', '2025-10-16 16:50:00', 14, 11, 4),

-- Conversación 5: Usuario 12 y 15 (Auriculares)
('Foto', '2025-10-15 09:20:00', 12, 15, 5);