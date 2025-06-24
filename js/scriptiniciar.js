let usuarios = [
    {
      id: 1,
      nombre: "Juan Perez",
      email: "juan@example.com",
      contrasena: "123456",
      fechnacimiento: "26/04/1990",
      ubicacion: "Montevideo, Uruguay",
      rol: "usuario-verificado"
    },
    {
      id: 2,
      nombre: "Lucia Fernandez",
      email: "lucia@example.com",
      contrasena: "lucia789",
      fechnacimiento: "15/08/1995",
      ubicacion: "Canelones, Uruguay",
      rol: "usuario-no-verificado"
    },
    {
      id: 3,
      nombre: "ALberto Gomez",
      email: "agomez@example.com",
      contrasena: "admin123",
      fechnacimiento: "01/01/1980",
      ubicacion: "Montevideo, Uruguay",
      rol: "moderador"
    }
];

// Combinar usuarios definidos en JS con los del localStorage (sin duplicados por email)
let usuariosGuardados = localStorage.getItem("usuarios");
let usuariosLocal = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
// Evitar duplicados por email
let emailsJS = new Set(usuarios.map(u => u.email));
let usuariosCombinados = usuarios.concat(
  usuariosLocal.filter(u => !emailsJS.has(u.email))
);
usuarios = usuariosCombinados;

document.addEventListener("DOMContentLoaded", function () {
  const anchoPantalla = window.innerWidth;

  // Usar el formulario que está visible
  const formulario =
    anchoPantalla >= 1024
      ? document.getElementById("form-login-desktop")
      : document.getElementById("form-login-mobile");

  if (!formulario) {
    console.error("No se encontró el formulario correspondiente");
    return;
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const correo = formulario.querySelector("input[type='email']").value.trim();
    const clave = formulario.querySelector("input[type='password']").value.trim();

    const usuarioValido = usuarios.find(
      (usuario) => usuario.email === correo && usuario.contrasena === clave
    );

    if (usuarioValido) {
      window.location.href = "index.html"; // Redirigir a la página principal
    } else {
      alert("Credenciales incorrectas. Por favor, verifica tu email y contraseña.");
      console.error("Credenciales incorrectas");
    }
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