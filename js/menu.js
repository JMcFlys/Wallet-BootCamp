$(document).ready(function () {
    const mensaje = $('#mensaje');
    const balanceElement = $('#balance');

    // Saldo inicial
    if (!localStorage.getItem('saldo')) {
        const saldoInicial = 1424010;
        localStorage.setItem('saldo', String(saldoInicial));
    }

    function obtenerSaldo() {
        return Number(localStorage.getItem('saldo') || 0);
    }

    function actualizarSaldoEnPantalla() {
        const saldo = obtenerSaldo();
        balanceElement.text(`$${saldo.toLocaleString('es-CL')}`);
    }

    actualizarSaldoEnPantalla();

    // Función redirigir
    function redirigir(ruta, nombrePantalla) {
        mensaje.text(`Redirigiendo a ${nombrePantalla}...`).removeClass('d-none');
        setTimeout(() => window.location.href = ruta, 800);
    }

    // Funciones de botones con jquery
    $('#btnDepositar').on('click', function (e) {
        e.preventDefault();
        redirigir('deposit.html', 'Depósito');
    });

    $('#btnEnviar').on('click', function (e) {
        e.preventDefault();
        redirigir('sendmoney.html', 'Enviar dinero');
    });

    $('#btnMovimientos').on('click', function (e) {
        e.preventDefault();
        redirigir('transactions.html', 'Últimos movimientos');
    });

    $('#btnLogout').on('click', function () {
        mensaje.text('Cerrando sesión...').removeClass('d-none');
        setTimeout(() => window.location.href = 'index.html', 700);
    });
});
