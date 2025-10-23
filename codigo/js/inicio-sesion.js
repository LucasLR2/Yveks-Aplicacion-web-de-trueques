// Configuración de visibilidad de contraseña para escritorio y móvil
function configurarVisibilidadPassword(idInput, idBoton) {
    const input = document.getElementById(idInput);
    const boton = document.getElementById(idBoton);

    if (!input || !boton) return;

    boton.addEventListener('click', function () {
        const tipo = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', tipo);

        this.innerHTML = tipo === 'password'
            ? '<i class="far fa-eye-slash"></i>'
            : '<i class="far fa-eye"></i>';
    });
}

document.addEventListener('DOMContentLoaded', function () {
  configurarVisibilidadPassword('password-escritorio', 'togglePassword-escritorio');
  configurarVisibilidadPassword('password-movil', 'togglePassword-movil');

  // Listener para login por fetch (AJAX)
  const forms = document.querySelectorAll('.login-form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const correo = form.querySelector('input[name="identificador"]');
      const pass = form.querySelector('input[name="contrasena"]');
      if (!correo.value.trim() || !pass.value.trim()) {
        mostrarAlerta('Todos los campos son obligatorios.',form);
        return;
      }
      const data = new FormData(form);
      fetch('loguear.php', {
        method: 'POST',
        body: data
      })
      .then(res => res.json())
      .then(resp => {
        if (resp.success) {
          window.location.href = resp.redirect;
        } else {
          mostrarAlerta(resp.message || 'Error de autenticación.', form);
        }
      })
      .catch(() => {
        mostrarAlerta('Error de conexión con el servidor.', form);
      });
    });
  });
});

function mostrarAlerta(mensaje, contextoFormulario) {
  // Seleccionar el contenedor adecuado (mobile o desktop) en base al formulario o viewport
  let contenedor;
  if (contextoFormulario) {
    contenedor = contextoFormulario.querySelector('[id^="alerta-login-"]');
  } else {
    // Elegir según ancho
    if (window.innerWidth >= 1024) {
      contenedor = document.getElementById('alerta-login-desktop');
    } else {
      contenedor = document.getElementById('alerta-login-mobile');
    }
  }
  if (!contenedor) return;

  contenedor.textContent = mensaje;
  contenedor.style.backgroundColor = '#FEE2E2';
  contenedor.style.borderColor = '#F87171';
  contenedor.style.color = '#7F1D1D';
  contenedor.classList.remove('hidden');
  contenedor.classList.add('animate-fade');

  clearTimeout(contenedor._timeoutId);
  contenedor._timeoutId = setTimeout(() => {
    contenedor.classList.add('hidden');
  }, 5000);
}

// Animación simple vía CSS inline
if (!document.getElementById('login-alert-style')) {
  const style = document.createElement('style');
  style.id = 'login-alert-style';
  style.textContent = `.animate-fade{animation:fadeIn 0.3s ease;}@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`;
  document.head.appendChild(style);
}


window.addEventListener("DOMContentLoaded", () => {
  const diapositivas = document.getElementById('diapositivas');
  const indicadores = [
    document.getElementById('indicador-0'),
    document.getElementById('indicador-1'),
    document.getElementById('indicador-2'),
    document.getElementById('indicador-3')
  ];
  const textoTitulo = document.getElementById('texto-titulo');
  const textoSubtitulo = document.getElementById('texto-subtitulo');

  // Textos para cada diapositiva
  const textos = [
    {
      titulo: "Trueque fácil y sin vueltas",
      subtitulo: "Intercambiá lo que no usás por lo que necesitás. Sin dinero, solo comunidad."
    },
    {
      titulo: "Descubrí miles de productos",
      subtitulo: "Navegá las publicaciones y encontrá en segundos lo que buscás."
    },
    {
      titulo: "Publicá y recibí ofertas",
      subtitulo: "Subí tus productos, ofrecé varios a la vez y decidí si aceptás o no."
    },
    {
      titulo: "Chateá y concretá el trueque",
      subtitulo: "Coordina detalles directo con otros usuarios gracias al chat integrado."
    }
  ];

  let diapositivaActual = 0;
  const totalDiapositivas = 4;
  let intervalo = setInterval(siguienteDiapositiva, 5000);

  function actualizarDiapositiva() {
    diapositivas.style.transform = `translateX(-${diapositivaActual * 100}%)`;

    // Actualizar textos
    if (textoTitulo && textoSubtitulo) {
      textoTitulo.textContent = textos[diapositivaActual].titulo;
      textoSubtitulo.textContent = textos[diapositivaActual].subtitulo;
    }

    indicadores.forEach((punto, i) => {
      punto.classList.remove('bg-gray-400');
      punto.classList.add('bg-gray-300');
      if (i === diapositivaActual) {
        punto.classList.remove('bg-gray-300');
        punto.classList.add('bg-gray-400');
      }
    });
  }

  function siguienteDiapositiva() {
    diapositivaActual = (diapositivaActual + 1) % totalDiapositivas;
    actualizarDiapositiva();
  }

  window.irADiapositiva = function(indice) {
    diapositivaActual = indice;
    actualizarDiapositiva();
    clearInterval(intervalo);
    intervalo = setInterval(siguienteDiapositiva, 5000);
  };

  actualizarDiapositiva();
});