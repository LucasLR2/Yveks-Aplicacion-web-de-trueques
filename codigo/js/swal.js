// swal.js - pequeño wrapper que expone un mixin global `SwalApp` configurado para la app
(function(){
    function inicializarSwal() {
        if (typeof Swal === 'undefined') {
            // Si SweetAlert no está disponible, dejamos la referencia en null
            window.SwalApp = null;
            return;
        }
        // Reutilizar la misma configuración en toda la aplicación
        // Configuración global: usar las clases de estilos generales del proyecto
        // para los botones de confirmación y cancelación (`btn-primary`, `btn-secondary`).
        // Así SweetAlert respetará la apariencia común de la app.
        window.SwalApp = Swal.mixin({
            customClass: {
                popup: 'rounded-xl',
                confirmButton: 'btn-primary',
                cancelButton: 'btn-secondary'
            }
        });

        // Helpers reutilizables para usar en toda la app
        // Confirmación estilizada (retorna la Promise de SweetAlert)
        window.SwalApp.confirmar = function(opts = {}) {
            // opts: { title, text, html, confirmButtonText, cancelButtonText, confirmClass, cancelClass }
            const title = opts.title || '¿Estás seguro?';
            const confirmButtonText = opts.confirmButtonText || 'Aceptar';
            const cancelButtonText = opts.cancelButtonText || 'Cancelar';
            const confirmClass = opts.confirmClass || 'btn-danger';
            const cancelClass = opts.cancelClass || 'btn-secondary';

            // Construir el objeto de configuración base
            const config = {
                title: title,
                icon: opts.icon || 'warning',
                showCancelButton: true,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText,
                customClass: {
                    popup: 'rounded-xl',
                    confirmButton: confirmClass,
                    cancelButton: cancelClass
                }
            };

            // Usar html si está presente, de lo contrario usar text
            if (opts.html) {
                config.html = opts.html;
            } else {
                config.text = opts.text || '';
            }

            return window.SwalApp.fire(config);
        };

        // Toast rápido (top-end)
        window.SwalApp.toast = function(message, tipo = 'success', opts = {}) {
            return Swal.fire(Object.assign({
                toast: true,
                position: opts.position || 'top-end',
                showConfirmButton: false,
                timer: opts.timer || 3000,
                icon: tipo,
                title: message,
                customClass: { popup: 'rounded-xl' }
            }, opts));
        };

        // Alerta simple de información
        window.SwalApp.alerta = function(message, title = '', opts = {}) {
            return window.SwalApp.fire(Object.assign({
                title: title,
                html: message,
                icon: opts.icon || null,
                confirmButtonText: opts.confirmButtonText || 'Aceptar',
                customClass: { popup: 'rounded-xl', confirmButton: opts.confirmClass || 'btn-primary' }
            }, opts));
        };
    }

    // Intentar inicializar ahora; si Swal no está cargado todavía, esperar al evento load
    if (typeof Swal === 'undefined') {
        window.addEventListener('load', inicializarSwal);
    } else {
        inicializarSwal();
    }
})();

// Toast personalizado sin SweetAlert usando animate.css
window.showCustomToast = function(message, duration = 3000) {
    // Crear el elemento del toast
    const toast = document.createElement('div');
    toast.className = 'custom-toast animate__animated animate__fadeInRight';
    toast.textContent = message;
    
    // Agregar al body
    document.body.appendChild(toast);
    
    // Remover después del tiempo especificado
    setTimeout(() => {
        toast.classList.remove('animate__fadeInRight');
        toast.classList.add('animate__fadeOutRight');
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500); // Tiempo de la animación de salida
    }, duration);
};
