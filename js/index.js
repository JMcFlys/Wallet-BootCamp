$(document).ready(function() {
    const usuarioValido = "admin@admin.cl";
    const contraseñaValida = "12345";

    // Mensajes en consola
    
    console.log("Sistema inicializado con jQuery");
    console.log("Email válido: " + usuarioValido);

    // Manejo del formulario de login
    
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        
        const usuario = $('#email').val().trim();
        const contrasena = $('#contrasena').val();
        
        if (usuario === usuarioValido && contrasena === contraseñaValida) {
            console.log("Inicio de sesión exitoso");
            console.log("Email:", usuario);

            // Mostrar mensaje de éxito
            
            $('#mensaje').html(`
                <div class="alert alert-success" role="alert">
                    ¡Inicio de sesión exitoso, ${usuario}!
                </div>
            `);
            
            $('#loginForm')[0].reset();

            // redirigir a menu.html después de 2 segundos
            
            setTimeout(() => window.location.replace("menu.html"), 2000);
        } else {
            console.log("Error de inicio de sesión");
            console.log("Email ingresado:", usuario);

            // Mostrar mensaje de error
            
            $('#mensaje').html(`
                <div class="alert alert-danger" role="alert">
                    Usuario o contraseña incorrectos. Inténtalo de nuevo.
                </div>
            `);
        }
    });
});