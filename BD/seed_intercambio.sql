USE dreva;

-- =============================================================
-- USUARIOS (1..34) - uno por producto para permitir calificaciones distintas
-- =============================================================
TRUNCATE TABLE Valoracion;
TRUNCATE TABLE Publica;
TRUNCATE TABLE ImagenProducto;
TRUNCATE TABLE Producto;
TRUNCATE TABLE Usuario;

INSERT INTO Usuario (id_usuario, nombre_comp, correo, contrasena, rol, ubicacion, f_nacimiento) VALUES
(1,'Usuario 1','u1@example.com',SHA2('pass1',256),'usuario','Montevideo','1990-01-01'),
(2,'Usuario 2','u2@example.com',SHA2('pass2',256),'usuario','Montevideo','1990-01-02'),
(3,'Usuario 3','u3@example.com',SHA2('pass3',256),'usuario','Montevideo','1990-01-03'),
(4,'Usuario 4','u4@example.com',SHA2('pass4',256),'usuario','Montevideo','1990-01-04'),
(5,'Usuario 5','u5@example.com',SHA2('pass5',256),'usuario','Montevideo','1990-01-05'),
(6,'Usuario 6','u6@example.com',SHA2('pass6',256),'usuario','Montevideo','1990-01-06'),
(7,'Usuario 7','u7@example.com',SHA2('pass7',256),'usuario','Montevideo','1990-01-07'),
(8,'Usuario 8','u8@example.com',SHA2('pass8',256),'usuario','Montevideo','1990-01-08'),
(9,'Usuario 9','u9@example.com',SHA2('pass9',256),'usuario','Montevideo','1990-01-09'),
(10,'Usuario 10','u10@example.com',SHA2('pass10',256),'usuario','Montevideo','1990-01-10'),
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
-- PRODUCTOS (34) usando columna nombre
-- =============================================================
INSERT INTO Producto (id_producto, nombre, estado, categoria, descripcion, f_publicacion) VALUES
(1,'Lentes retro rojos','Usado','accesorios','Lentes estilo retro color rojo. Buen estado.','2025-08-01'),
(2,'Auriculares inalámbricos','Nuevo','tecnologia','Auriculares bluetooth, buena autonomía.','2025-07-28'),
(3,'Cargador magnético','Usado','tecnologia','Cargador magnético universal.','2025-07-15'),
(4,'Proyector','Nuevo','tecnologia','Proyector portátil hogar.','2025-06-30'),
(5,'Remera Suzuki con estampado','Nuevo','ropa','Remera Suzuki original.','2025-06-22'),
(6,'Sillón naranja','Usado','hogar','Sillón un cuerpo color naranja.','2025-05-18'),
(7,'Zapatillas Adidas Aggresive','Usado','ropa','Zapatillas usadas buen estado.','2025-05-27'),
(8,'Libro The Laws of Human Nature','Nuevo','entretenimiento','Libro sobre naturaleza humana.','2025-04-10'),
(9,'Remera Illicit Bloc denim claro','Nuevo','ropa','Remera denim claro.','2025-03-12'),
(10,'Lámpara de escritorio','Usado','hogar','Lámpara LED escritorio.','2025-02-05'),
(11,'Remera blanca con estampado azul','Nuevo','ropa','Remera con estampado azul.','2025-01-20'),
(12,'Remera marrón Illicit Bloc','Nuevo','ropa','Remera marrón colección.','2024-12-11'),
(13,'Cámara fotográfica Canon','Usado','tecnologia','Cámara Canon funcional.','2024-11-10'),
(14,'Remera blanca con estampado rojo','Usado','ropa','Remera blanca estampado rojo.','2024-11-05'),
(15,'iPad mini','Usado','tecnologia','iPad mini en buen estado.','2024-10-22'),
(16,'Cámara fotográfica Sony','Usado','tecnologia','Cámara Sony con lente.','2024-10-10'),
(17,'Remera Umbro azul y blanca','Nuevo','ropa','Remera deportiva Umbro.','2024-09-25'),
(18,'AirPods','Nuevo','tecnologia','Auriculares AirPods.','2024-09-15'),
(19,'Remera negra con estampado beige vintage','Nuevo','ropa','Remera negra vintage.','2024-09-05'),
(20,'Remera Nike blanca con estampado lila','Nuevo','ropa','Remera Nike blanca lila.','2024-08-28'),
(21,'Lentes retro amarillos','Usado','accesorios','Lentes amarillos retro.','2024-08-15'),
(22,'Remera ArtTheMoment blanca','Nuevo','ropa','Remera ArtTheMoment blanca.','2024-08-01'),
(23,'Teclado Clicky verde','Usado','tecnologia','Teclado clicky verde.','2024-07-20'),
(24,'Mouse y soporte inalámbrico led','Nuevo','tecnologia','Mouse + soporte LED.','2024-07-10'),
(25,'AirPods Max negros','Usado','tecnologia','Auriculares AirPods Max.','2024-07-01'),
(26,'Samsung Galaxy Book','Usado','tecnologia','Laptop Samsung Galaxy Book.','2024-06-20'),
(27,'Bicileta rodado 27','Usado','deportes','Bicicleta rodado 27.','2024-06-10'),
(28,'Guitarra eléctrica naranja','Nuevo','tecnologia','Guitarra eléctrica naranja.','2024-05-30'),
(29,'Apple Watch con cadena','Usado','tecnologia','Apple Watch con cadena.','2024-05-15'),
(30,'Dron','Usado','tecnologia','Dron compacto funcional.','2024-05-05'),
(31,'Buzo Nike azul','Nuevo','ropa','Buzo Nike azul.','2024-04-25'),
(32,'Buzo Salomon negro','Usado','ropa','Buzo Salomon negro.','2024-04-15'),
(33,'Cinto de cuero negro','Usado','accesorios','Cinto cuero negro.','2024-04-05'),
(34,'Morral High negro','Usado','accesorios','Morral High color negro.','2024-03-28');

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
 (5,'',CURDATE(),1,34),(5,'',CURDATE(),2,34),(5,'',CURDATE(),3,34),(5,'',CURDATE(),4,34),(5,'',CURDATE(),5,34),(5,'',CURDATE(),6,34),(5,'',CURDATE(),7,34),(5,'',CURDATE(),8,34),(5,'',CURDATE(),9,34),(5,'',CURDATE(),10,34),(4,'',CURDATE(),11,34),(4,'',CURDATE(),12,34),(4,'',CURDATE(),13,34),(4,'',CURDATE(),14,34),(4,'',CURDATE(),15,34),(4,'',CURDATE(),16,34),(4,'',CURDATE(),17,34),(4,'',CURDATE(),18,34),(4,'',CURDATE(),19,34),(4,'',CURDATE(),20,34);


SET FOREIGN_KEY_CHECKS = 1;
