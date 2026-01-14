# Billetera Digital (Proyecto Frontend)

Aplicación web de **billetera digital** que permite simular operaciones básicas como iniciar sesión, consultar saldo, realizar depósitos, enviar dinero a contactos y visualizar el historial de movimientos, utilizando `localStorage` como “backend” del lado del navegador.[file:7][file:9]

## Características principales

- Login simple de usuario (simulado, sin backend real).[file:10]
- Visualización de saldo actual en la vista de menú principal.[file:10]
- Depósito de dinero con actualización inmediata del saldo y registro del movimiento.[file:9]
- Envío de dinero a contactos guardados, con validaciones de monto y saldo disponible.[file:7]
- Gestión de contactos (crear, listar, seleccionar y eliminar).[file:7]
- Registro de movimientos (depósitos y envíos) almacenados en `localStorage`.[file:7][file:9]
- Interfaz construida con HTML, CSS y JavaScript + jQuery.

## Estructura del proyecto

- `index.html` / `index.js`: Pantalla inicial y lógica de login/redirección.[file:10][file:8]
- `menu.html` / `menu.js`: Menú principal, muestra el saldo y accesos a las demás vistas.[file:4][file:6]
- `deposit.html` / `deposit.js`: Formulario para realizar depósitos y registrar el movimiento.[file:11][file:9]
- `sendmoney.html` / `sendmoney.js`: Envío de dinero a contactos y gestión de la lista de contactos.[file:1][file:7]
- `transactions.html` / `transaction.js`: Historial de movimientos almacenados en `localStorage`.[file:3][file:2]

## Tecnologías utilizadas

- HTML5 y CSS3 para la estructura y estilos de la interfaz.
- JavaScript (ES6+) para la lógica del lado del cliente.
- jQuery para manejo del DOM y eventos.[file:7][file:9]
- `localStorage` para persistencia de:
  - Saldo del usuario (`saldo`).
  - Contactos (`contactos`).
  - Movimientos (`movimientos`).[file:7][file:9]

## Cómo ejecutar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
