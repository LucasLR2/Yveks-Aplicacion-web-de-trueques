const usuarios = [
    {
      id: 1,
      nombre: "Juan Perez",
      email: "juan@example.com",
      contrasena: "123456",
    }
  ];

document.addEventListener('DOMContentLoaded', () => {
  const formulariosRegistro = [
    document.querySelector('.form-registro-movil'),
    document.getElementById('form-registro-desktop')
  ];

  formulariosRegistro.forEach(formulario => {
    if (!formulario) return;

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();

      // Detectar si es móvil o escritorio
      const esMovil = this.classList.contains('form-registro-movil');

      const nombreInput = document.getElementById(esMovil ? 'nombre-movil' : 'nombre-escritorio');
      const emailInput = document.getElementById(esMovil ? 'email-movil' : 'email-escritorio');
      const contrasenaInput = document.getElementById(esMovil ? 'password-movil' : 'password-escritorio');
      const terminosCheck = document.getElementById(esMovil ? 'terminos-movil' : 'terminos-escritorio');

      const nombre = nombreInput.value.trim();
      const email = emailInput.value.trim();
      const contrasena = contrasenaInput.value;

      // Obtener usuarios existentes o inicializar
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Crear nuevo usuario con id incremental
      const nuevoUsuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
        nombre,
        email,
        contrasena
      };

      // Agregar usuario y guardar en localStorage
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      window.location.href = "index.html" // Redirigir a la página principal
      formulario.reset();
    });
  });
});


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
    // Configurar visibilidad para desktop
    configurarVisibilidadPassword('password-escritorio', 'togglePassword-escritorio');

    // Configurar visibilidad para móvil
    configurarVisibilidadPassword('password-movil', 'togglePassword-movil');
});


window.addEventListener("DOMContentLoaded", () => {
  const diapositivas = document.getElementById('diapositivas');
  const indicadores = [
    document.getElementById('indicador-0'),
    document.getElementById('indicador-1'),
    document.getElementById('indicador-2')
  ];

  let diapositivaActual = 0;
  const totalDiapositivas = 3;
  let intervalo = setInterval(siguienteDiapositiva, 5000);

  function actualizarDiapositiva() {
    diapositivas.style.transform = `translateX(-${diapositivaActual * 100}%)`;

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