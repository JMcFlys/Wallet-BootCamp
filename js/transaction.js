$(document).ready(function () {
    const listaMovimientos = $('#listaMovimientos');
    const filtroTipo = $('#filtroTipo');

    // Obtener movimientos desde localStorage
    function obtenerMovimientos() {
        return JSON.parse(localStorage.getItem('movimientos') || '[]');
    }

    function getTipoTransaccion(tipo) {
        const tipos = {
            'compra': 'Compra',
            'deposito': 'Depósito', 
            'envio': 'Transferencia enviada',        
            'transferencia_recibida': 'Transferencia recibida'
        };
        return tipos[tipo] || tipo;
    }

    // Mostrar últimos movimientos según filtro
    function mostrarUltimosMovimientos(filtro = 'todos') {
        const movimientos = obtenerMovimientos().slice().reverse();
        listaMovimientos.empty();

        let movimientosFiltrados = movimientos;
        if (filtro !== 'todos') {
            movimientosFiltrados = movimientos.filter(m => m.tipo === filtro);
        }

        if (movimientosFiltrados.length === 0) {
            listaMovimientos.html(`<li class="list-group-item text-center text-muted">No hay ${filtro === 'todos' ? 'movimientos' : getTipoTransaccion(filtro)} aún.</li>`);
            return;
        }

        movimientosFiltrados.forEach(mov => {
            const esDeposito = mov.tipo === 'deposito' || mov.tipo === 'transferencia_recibida';
            const signo = esDeposito ? '+' : '-';
            const claseColor = esDeposito ? 'text-success' : 'text-danger';

            const li = $(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <div><strong>${getTipoTransaccion(mov.tipo)}:</strong> ${mov.descripcion}</div>
                        <small class="text-muted">${mov.fecha}</small>
                    </div>
                    <span class="${claseColor} fw-bold">${signo}$${Number(mov.monto).toLocaleString('es-CL')}</span>
                </li>
            `);
            listaMovimientos.append(li);
        });
    }

    // Evento filtro
    filtroTipo.on('change', function() {
        mostrarUltimosMovimientos($(this).val());
    });

    // Inicializar lista
    mostrarUltimosMovimientos();
});
