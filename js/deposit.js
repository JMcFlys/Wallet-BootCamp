$(document).ready(function () {
    const inputMonto = $('#montoDeposito');
    const btnDepositar = $('#btnDepositar');
    const mensaje = $('#mensaje');

    // Saldo
    function obtenerSaldo() {
        return Number(localStorage.getItem('saldo') || 0);
    }

    function guardarSaldo(nuevoSaldo) {
        localStorage.setItem('saldo', String(nuevoSaldo));
    }

    // Registrar movimiento
    function agregarMovimiento(tipo, descripcion, monto) {
        const movimientos = JSON.parse(localStorage.getItem('movimientos') || '[]');
        const ahora = new Date().toLocaleString('es-CL');

        movimientos.push({ tipo, descripcion, monto, fecha: ahora });
        localStorage.setItem('movimientos', JSON.stringify(movimientos));
    }

    // Botón Depositar
    btnDepositar.on('click', function () {
        const monto = Number(inputMonto.val());

        if (!monto || monto <= 0) {
            mensaje.text('Ingrese un monto válido mayor a 0.')
                .removeClass('d-none alert-success')
                .addClass('alert alert-danger mt-3');
            return;
        }

        const saldoActual = obtenerSaldo();
        const nuevoSaldo = saldoActual + monto;

        guardarSaldo(nuevoSaldo);
        agregarMovimiento('deposito', 'Depósito en cuenta', monto);

        mensaje.text(`Depósito exitoso de $${monto.toLocaleString('es-CL')}. Nuevo saldo: $${nuevoSaldo.toLocaleString('es-CL')}.`)
            .removeClass('d-none alert-danger')
            .addClass('alert alert-success mt-3');

        inputMonto.val('');

        setTimeout(() => window.location.href = 'menu.html', 4500);
    });
});
