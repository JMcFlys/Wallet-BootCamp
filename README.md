# Billetera Digital (Proyecto Frontend)

Aplicación web de **billetera digital** que permite simular operaciones básicas como iniciar sesión, consultar saldo, realizar depósitos, enviar dinero a contactos y visualizar el historial de movimientos, utilizando `localStorage` como “backend” del lado del navegador.

## Características principales

- Login simple de usuario (simulado, sin backend real).
- Visualización de saldo actual en la vista de menú principal.
- Depósito de dinero con actualización inmediata del saldo y registro del movimiento.
- Envío de dinero a contactos guardados, con validaciones de monto y saldo disponible.
- Gestión de contactos (crear, listar, seleccionar y eliminar).
- Registro de movimientos (depósitos y envíos) almacenados en `localStorage`.
- Interfaz construida con HTML, CSS y JavaScript + jQuery.

## Estructura del proyecto

- `index.html` / `index.js`: Pantalla inicial y lógica de login/redirección.
- `menu.html` / `menu.js`: Menú principal, muestra el saldo y accesos a las demás vistas.
- `deposit.html` / `deposit.js`: Formulario para realizar depósitos y registrar el movimiento.
- `sendmoney.html` / `sendmoney.js`: Envío de dinero a contactos y gestión de la lista de contactos.
- `transactions.html` / `transaction.js`: Historial de movimientos almacenados en `localStorage`.

## Tecnologías utilizadas

- HTML5 y CSS3 para la estructura y estilos de la interfaz.
- JavaScript (ES6+) para la lógica del lado del cliente.
- jQuery para manejo del DOM y eventos.
- `localStorage` para persistencia de:
  - Saldo del usuario (`saldo`).
  - Contactos (`contactos`).
  - Movimientos (`movimientos`).

## Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
