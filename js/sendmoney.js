$(document).ready(function () {
    const contactList = $('#contactList');
    const btnGuardar = $('#btnGuardarContacto');
    const formNuevoContacto = $('#formNuevoContacto');
    const btnEnviarDinero = $('#btnEnviarDinero');
    const btnEliminarContacto = $('#btnEliminarContacto');
    const montoInput = $('#montoEnviar');
    const mensaje = $('#mensaje');
    let contactoSeleccionado = null;


    // Ocultos iniciales
    btnEnviarDinero.hide();
    btnEliminarContacto.hide();

    // Saldo en localStorage
    function obtenerSaldo() { return Number(localStorage.getItem('saldo') || 0); }
    function guardarSaldo(nuevoSaldo) { localStorage.setItem('saldo', String(nuevoSaldo)); }

    // Contactos
    function obtenerContactos() {
        const data = localStorage.getItem('contactos');
        return data ? JSON.parse(data) : [];
    }
    function guardarContactos(contactos) {
        localStorage.setItem('contactos', JSON.stringify(contactos));
    }

    // Render contactos 
    function renderContactos() {
        const contactos = obtenerContactos();
        contactList.empty();
        contactos.forEach(c => {
            const li = $(`<li class="list-group-item contact-item" data-contacto="${c.nombre}">
                <div class="contact-info">
                    <span class="contact-name">${c.nombre}</span><br>
                    <span class="contact-details">CBU: ${c.cbu} | Alias: ${c.alias} | Banco: ${c.banco}</span>
                </div>
            </li>`);
            contactList.append(li);
        });
    }

    // Buscar contactos 
    $('#buscarContacto').on('input', function() {
        const termino = $(this).val().trim().toLowerCase();
        const contactos = obtenerContactos();
        contactList.empty();
        
        if (!termino) {
            renderContactos();
            $('#textoTransferir').text('Buscar Contacto:');
            return;
        }
        
        const filtrados = contactos.filter(c => 
            c.nombre.toLowerCase().includes(termino) || 
            c.alias.toLowerCase().includes(termino)
        );
        
        if (filtrados.length === 0) {
            contactList.append('<li class="list-group-item text-muted text-center">No encontrados</li>');
        } else {
            filtrados.forEach(c => {
                const li = $(`<li class="list-group-item contact-item" data-contacto="${c.nombre}">
                    <div class="contact-info">
                        <span class="contact-name">${c.nombre}</span><br>
                        <span class="contact-details">CBU: ${c.cbu} | Alias: ${c.alias} | Banco: ${c.banco}</span>
                    </div>
                </li>`);
                contactList.append(li);
            });
            $('#textoTransferir').text(`Resultados para "${termino}" (${filtrados.length})`);
        }
    });

    // Contactos iniciales
    if (!localStorage.getItem('contactos')) {
        guardarContactos([
            { nombre: 'Juan Pérez', cbu: '000123456789', alias: 'juanperez.bci', banco: 'BCI' },
            { nombre: 'María González', cbu: '000987654321', alias: 'mariagonza.cl', banco: 'BancoEstado' }
        ]);
    }
    renderContactos();

    // Guardar nuevo contacto
    btnGuardar.on('click', function () {
        const nombre = $('#nombreContacto').val().trim();
        const cbu = $('#cbuContacto').val().trim();
        const alias = $('#aliasContacto').val().trim();
        const banco = $('#bancoContacto').val().trim();

        const nombrePartes = nombre.split(/\s+/);
        if (!nombre || nombrePartes.length < 2) {
            alert('Favor Ingresar Nombre y Apellido (ej: "Juanita Perez")');
            $('#nombreContacto').focus();
            return;
        }

        if (!cbu || cbu.length < 8) {
            alert('Número de CBU: mínimo 8 caracteres requeridos');
            $('#cbuContacto').focus();
            return;
        }

        if (!alias || !banco) {
            alert('Completa Alias y Banco');
            return;
        }

        const contactos = obtenerContactos();
        contactos.push({ nombre, cbu, alias, banco });
        guardarContactos(contactos);
        renderContactos();

        const modal = bootstrap.Modal.getInstance($('#modalNuevoContacto')[0]);
        if (modal) modal.hide();
        formNuevoContacto[0].reset();
    });

        $('#cbuContacto').on('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});

    // Seleccionar contacto 
    contactList.on('click', '.contact-item', function () {
        $('.contact-item').removeClass('active');
        $(this).addClass('active');
        contactoSeleccionado = $(this).data('contacto');
        const contacto = obtenerContactos().find(c => c.nombre === contactoSeleccionado);
        mensaje.text(`Seleccionado: ${contactoSeleccionado} (${contacto ? contacto.banco : ''})`)
            .removeClass('d-none alert-danger alert-success alert-warning')
            .addClass('alert alert-info mt-3');
        btnEnviarDinero.show();
        btnEliminarContacto.show();
    });

    // Eliminar contacto seleccionado 
    btnEliminarContacto.on('click', function () {
        if (!contactoSeleccionado) {
            mensaje.text('Selecciona un contacto primero.')
                .removeClass('d-none alert-success alert-info')
                .addClass('alert alert-warning mt-3');
            return;
        }

        if (confirm(`¿Está seguro que desea eliminar el contacto "${contactoSeleccionado}"?`)) {
            let contactos = obtenerContactos();
            contactos = contactos.filter(c => c.nombre !== contactoSeleccionado);
            guardarContactos(contactos);
            renderContactos();
            
            mensaje.text(`Contacto "${contactoSeleccionado}" eliminado correctamente.`)
                .removeClass('d-none alert-danger alert-warning alert-info')
                .addClass('alert alert-success mt-3');
            
            contactoSeleccionado = null;
            btnEnviarDinero.hide();
            btnEliminarContacto.hide();
            $('.contact-item').removeClass('active');
        }
    });

    // Registrar movimiento
    function agregarMovimiento(tipo, descripcion, monto) {
        const movimientos = JSON.parse(localStorage.getItem('movimientos') || '[]');
        const ahora = new Date().toLocaleString('es-CL');
        movimientos.push({ tipo, descripcion, monto, fecha: ahora });
        localStorage.setItem('movimientos', JSON.stringify(movimientos));
    }

    // Enviar dinero
    btnEnviarDinero.on('click', function () {
        const monto = Number(montoInput.val());

        if (!contactoSeleccionado) {
            mensaje.text('Selecciona un contacto de la lista.')
                .removeClass('d-none alert-success')
                .addClass('alert alert-warning mt-3');
            return;
        }

        if (!monto || monto <= 0) {
            mensaje.text('Ingrese un monto válido mayor a 0.')
                .removeClass('d-none alert-success')
                .addClass('alert alert-danger mt-3');
            return;
        }

        const saldoActual = obtenerSaldo();
        if (monto > saldoActual) {
            mensaje.text(`Saldo insuficiente. Saldo actual: $${saldoActual.toLocaleString('es-CL')}.`)
                .removeClass('d-none alert-success')
                .addClass('alert alert-warning mt-3');
            return;
        }

        const nuevoSaldo = saldoActual - monto;
        guardarSaldo(nuevoSaldo);
        agregarMovimiento('envio', `Transferencia a ${contactoSeleccionado}`, monto);

        mensaje.text(`Transferencia a ${contactoSeleccionado} por $${monto.toLocaleString('es-CL')} realizada. Nuevo saldo: $${nuevoSaldo.toLocaleString('es-CL')}.`)
            .removeClass('d-none alert-danger alert-warning')
            .addClass('alert alert-success mt-3');

        montoInput.val('');
        btnEnviarDinero.hide();
        btnEliminarContacto.hide();
        setTimeout(() => window.location.href = 'menu.html', 4500);
    });
});
