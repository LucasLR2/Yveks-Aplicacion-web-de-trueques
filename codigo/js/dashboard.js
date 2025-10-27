// dashboard.js
// Se encarga de obtener la temperatura actual desde una API externa y actualizar el header
// Usa AJAX (jQuery) según el requisito del proyecto

(function($){
    if (!$) return;

    const URL_API = 'http://localhost:8082/';
    const SELECTOR_ENCABEZADO = '#header-temperatura';
    const ICONO_ENCABEZADO = '#header-temperatura-icon';
    const CIUDAD_ENCABEZADO = '#header-temperatura-city';
    const VALOR_ENCABEZADO = SELECTOR_ENCABEZADO + ' .valor';
    const INTERVALO_POLL_MS = 30000; // 30 segundos
    const TIEMPO_ESPERA_MS = 3000; // timeout de 3s (reducido desde 7s)

    function condicionAEmoji(cond) {
        if (!cond) return '☁️';
        const c = String(cond).toLowerCase();
        if (c.includes('sole') || c.includes('sol')) return '☀️';
        if (c.includes('parcial') || c.includes('nub') || c.includes('nublado') || c.includes('cloud')) return '⛅';
        if (c.includes('lluv') || c.includes('rain')) return '🌧️';
        if (c.includes('torment') || c.includes('storm')) return '⛈️';
        if (c.includes('nieve') || c.includes('snow')) return '❄️';
        return '☁️';
    }

    function actualizarEncabezado(textoTemp, ciudad, condicion) {
        const $enc = $(SELECTOR_ENCABEZADO);
        if (!$enc.length) return;
        // mostrar encabezado
        $enc.removeClass('hidden').addClass('flex');
        const $icono = $(ICONO_ENCABEZADO);
        if ($icono.length) $icono.text(condicionAEmoji(condicion));
        const $ciudad = $(CIUDAD_ENCABEZADO);
        if ($ciudad.length) $ciudad.text(ciudad || '');
        const $val = $(VALOR_ENCABEZADO);
        if ($val.length) $val.text(textoTemp);
    }

    function obtenerTemperatura() {
        // Solo proceder si el encabezado está presente
        if (!$(SELECTOR_ENCABEZADO).length) return;

        $.ajax({
            url: URL_API,
            method: 'GET',
            dataType: 'json',
            timeout: TIEMPO_ESPERA_MS,
            success: function(datos) {
                try {
                    // Forma esperada de la API ejemplo:
                    // { ciudad: "Santiago", temperatura: 25, humedad: 81, condicion: "Soleado", ultima_actualizacion: "..." }
                    const ciudad = datos && datos.ciudad ? datos.ciudad : (datos && datos.city ? datos.city : '');
                    const condicion = datos && datos.condicion ? datos.condicion : (datos && datos.condition ? datos.condition : '');
                    const t = (datos && (datos.temperatura !== undefined ? datos.temperatura : (datos.temp !== undefined ? datos.temp : datos.temperature)));
                    const textoTemp = (t !== undefined && t !== null && t !== '') ? String(t) + '°C' : 'No disponible';
                    // Actualizar encabezado
                    actualizarEncabezado(textoTemp, ciudad, condicion);
                } catch (e) {
                    actualizarEncabezado('No disponible', '', '');
                }
            },
            error: function(xhr, status, err) {
                // Mostrar mensaje temporal en el encabezado
                actualizarEncabezado('No disponible', '', '');
            }
        });
    }

    $(document).ready(function(){
        // Primera consulta
        obtenerTemperatura();
        // Consulta periódica cada INTERVALO_POLL_MS
        setInterval(obtenerTemperatura, INTERVALO_POLL_MS);
    });

})(window.jQuery);
