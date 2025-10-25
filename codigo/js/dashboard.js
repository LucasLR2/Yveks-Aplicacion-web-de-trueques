// dashboard.js
// Responsible for fetching current temperature from external API and updating the dashboard card
// Uses jQuery AJAX per project requirement

(function($){
    if (!$) return;

    const API_URL = 'http://localhost:8082/';
    const HEADER_SELECTOR = '#header-temperatura';
    const HEADER_ICON = '#header-temperatura-icon';
    const HEADER_CITY = '#header-temperatura-city';
    const HEADER_VALUE = HEADER_SELECTOR + ' .valor';
    const POLL_INTERVAL_MS = 30000; // 30 seconds
    const REQUEST_TIMEOUT_MS = 3000; // 3s timeout (reduced from 7s)

    function conditionToEmoji(cond) {
        if (!cond) return '☁️';
        const c = String(cond).toLowerCase();
        if (c.includes('sole') || c.includes('sol')) return '☀️';
        if (c.includes('parcial') || c.includes('nub') || c.includes('nublado') || c.includes('cloud')) return '⛅';
        if (c.includes('lluv') || c.includes('rain')) return '🌧️';
        if (c.includes('torment') || c.includes('storm')) return '⛈️';
        if (c.includes('nieve') || c.includes('snow')) return '❄️';
        return '☁️';
    }

    function safeSetHeader(tempText, city, condicion) {
        const $header = $(HEADER_SELECTOR);
        if (!$header.length) return;
        // show header
        $header.removeClass('hidden').addClass('flex');
        const $icon = $(HEADER_ICON);
        if ($icon.length) $icon.text(conditionToEmoji(condicion));
        const $city = $(HEADER_CITY);
        if ($city.length) $city.text(city || '');
        const $val = $(HEADER_VALUE);
        if ($val.length) $val.text(tempText);
    }

    function fetchTemperature() {
        // Only proceed if header present
        if (!$(HEADER_SELECTOR).length) return;

        $.ajax({
            url: API_URL,
            method: 'GET',
            dataType: 'json',
            timeout: REQUEST_TIMEOUT_MS,
            success: function(data) {
                try {
                    // Expected API shape example:
                    // { ciudad: "Santiago", temperatura: 25, humedad: 81, condicion: "Soleado", ultima_actualizacion: "..." }
                    const ciudad = data && data.ciudad ? data.ciudad : (data && data.city ? data.city : '');
                    const condicion = data && data.condicion ? data.condicion : (data && data.condition ? data.condition : '');
                    const t = (data && (data.temperatura !== undefined ? data.temperatura : (data.temp !== undefined ? data.temp : data.temperature)));
                    const tempText = (t !== undefined && t !== null && t !== '') ? String(t) + '°C' : 'No disponible';
                    // Update header
                    safeSetHeader(tempText, ciudad, condicion);
                } catch (e) {
                    safeSetHeader('No disponible', '', '');
                }
            },
            error: function(xhr, status, err) {
                // Show temporary message in header
                safeSetHeader('No disponible', '', '');
            }
        });
    }

    $(document).ready(function(){
        // Initial fetch
        fetchTemperature();
        // Poll every POLL_INTERVAL_MS
        setInterval(fetchTemperature, POLL_INTERVAL_MS);
    });

})(window.jQuery);
