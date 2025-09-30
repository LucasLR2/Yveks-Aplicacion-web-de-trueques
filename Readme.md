# Yveks - Aplicación Web de Trueques

## 📝 Descripción
Yveks es un proyecto escolar que busca desarrollar una plataforma web para facilitar el intercambio de bienes y servicios entre usuarios. El sistema está diseñado para fomentar una economía circular donde se promueva la reutilización de productos y se reduzca el desperdicio, ofreciendo una alternativa al consumo tradicional.

## 🎯 Objetivo
Crear una aplicación web que permita a los usuarios intercambiar artículos de manera segura y eficiente, promoviendo la economía colaborativa y el consumo responsable.

## ✨ Características Principales
- Sistema de registro y autenticación de usuarios  
- Gestión de perfiles de usuario  
- Publicación y gestión de productos para intercambio  
- Búsqueda y navegación por categorías  
- Sistema de mensajería entre usuarios  
- Propuestas de intercambio  
- Sistema de valoración y comentarios  
- Panel de administración  

---

## 📁 Estructura de Carpetas

- **codigo/**: Contiene todo el código fuente de la aplicación web organizada con el patrón **MVC (Modelo-Vista-Controlador)**.  
  - **app/**: Lógica principal de la aplicación.  
    - **controladores/**: Contienen la lógica de flujo. Deciden qué hacer según la ruta y gestionan la comunicación entre modelos y vistas.  
    - **modelos/**: Contienen las clases que representan y gestionan los datos (usuarios, productos, trueques, imágenes, etc.).  
    - **vistas/**: Contienen la interfaz de usuario (HTML con PHP). Se dividen en:  
      - **layouts/** → plantillas generales como *header, footer y menú dinámico*.  
      - **componentes/** → piezas reutilizables como *alertas, botones y modales*.  
      - **usuario/** → vistas específicas para usuarios (*login, registro, perfil*).  
      - **item/** → vistas de productos (*crear, ver, editar*).  
      - **trueque/** → vistas de los intercambios (*crear propuesta, ver detalles*).  

  - **publico/**: Carpeta accesible desde el navegador.  
    - **css/** → hojas de estilo.  
    - **js/** → scripts JavaScript y librerías (ej. jQuery).  
    - **imagenes/** → recursos gráficos.  
      - **app/** → imágenes de la aplicación (logos, iconos, ilustraciones).  
      - **usuarios/** → fotos de perfil de los usuarios.  
      - **items/** → imágenes de los productos publicados.  
    - **index.php** → punto de entrada principal de la aplicación, recibe todas las solicitudes.  

  - **configuracion/**: Contiene archivos de configuración básicos, como la conexión a la base de datos.  

  - **rutas/**: Define el mapa de URLs de la aplicación (*web.php*), conectando cada ruta con el controlador correspondiente.  

- **documentacion/**: Carpeta destinada a la documentación del proyecto. Aquí se incluyen:  
  - Documento de Especificación de Requerimientos  
  - Documento de Punto de Función del Sistema  

---

## 👥 Equipo de Desarrollo
- Alexis Sosa - [@AlexisSosaOjeda](https://github.com/AlexisSosaOjeda "Ir al perfil de GitHub")  
- Catalina Gamarra - [@CataMGR](https://github.com/CataMGR "Ir al perfil de GitHub")  
- Dahiane Martínez - [@DahianeAckerman](https://github.com/DahianeAckerman "Ir al perfil de GitHub")  
- Guillermo Reherman - [@GReherman](https://github.com/GReherman "Ir al perfil de GitHub")  
- Lucas Larraura - [@LucasLR2](https://github.com/LucasLR2 "Ir al perfil de GitHub")  

---
Proyecto en fase inicial de desarrollo.
