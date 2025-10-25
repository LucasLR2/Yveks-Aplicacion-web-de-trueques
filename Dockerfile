# Imagen base: PHP 8.2 con Apache preinstalado
FROM php:8.2-apache

# Instalar extensiones de PHP necesarias para conectarse a MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Configurar el DocumentRoot de Apache para que apunte a la carpeta 'codigo'
ENV APACHE_DOCUMENT_ROOT /var/www/html/codigo
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Exponer el puerto 80 para tráfico HTTP
EXPOSE 80
