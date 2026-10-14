# Bitacora de JavaScript interactivo

Laboratorio 08: JavaScript Interactivo - DOM, Eventos y Objetos.
Navegador usado: Chrome

## Ejercicio 2: Seleccionar y modificar el DOM

| Instruccion | Que cambio en la pantalla | Se mantiene al recargar (Si/No) |
|-------------|---------------------------|---------------------------------|
| textContent desde la consola | El título cambia temporalmente | No |
| textContent desde app.js | El título cambia permanentemente a "Hola TECSUP" | Si |
| style.color | El título se pone de color azul | Si |
| classList.add | El párrafo obtiene fondo amarillo destacado | Si |
| createElement + appendChild | Se agrega "JavaScript" como tercer elemento de la lista | Si |

## Ejercicio 3: Evento click

| Tipo de evento | Que accion lo dispara | Cuanto suma por accion |
|----------------|-----------------------|------------------------|
| click | Un clic sencillo sobre el botón | 1 |
| dblclick | Dos clics rápidos seguidos | 1 (al hacer doble clic) |
| mouseover | Pasar el ratón por encima del botón | 1 cada vez que entra el cursor |

> `evento.type` devuelve el nombre del evento que ocurrió (ej: "click")
> `evento.target` devuelve el elemento HTML donde sucedió el evento (ej: el botón presionado)

## Ejercicio 4: Eventos input y submit

| Prueba | Que paso en la pantalla | Se recargo la pagina (Si/No) |
|--------|-------------------------|------------------------------|
| Escribir en el campo nombre | El saludo se actualiza letra por letra | No |
| Enviar sin preventDefault | Aparece el mensaje y desaparece de inmediato | Si |
| Enviar con preventDefault, correo sin @ | Muestra "Correo no valido: falta @" en rojo | No |
| Enviar con preventDefault, correo con @ | Muestra "Enviado: roseemq@gmail.com" | No |

## Ejercicio 5: Clases y objetos

| Objeto | nombre | precio | descripcion() | conDescuento(0.25) |
|--------|--------|--------|---------------|--------------------|
| laptop | Laptop | 2500 | Laptop - S/ 2500.00 | 1875.00 |
| mouse | Mouse | 45 | Mouse - S/ 45.00 | 33.75 |
| teclado | Teclado | 120 | Teclado - S/ 120.00 | 90.00 |
| monitor | Monitor | 680 | Monitor - S/ 680.00 | 510.00 |

> Ventaja: Definimos la plantilla **una sola vez** y creamos todos los productos que queramos con una sola línea cada uno. Si cambiamos la clase, todos los objetos se ven afectados automáticamente — no repetimos código.

## Ejercicio 6: DOM, eventos y objetos juntos

| Prueba | Total que muestra la pagina | Correcto (Si/No) |
|--------|-----------------------------|------------------|
| Cuaderno 12.50 | 12.50 | Si |
| + Lapicero 3.20 | 15.70 | Si |
| + Mochila 89.90 | 105.60 | Si |
| Sin Number() | No aparece el total, hay error en consola | No |

| Pieza | Linea de tu codigo donde aparece | Para que sirve |
|-------|----------------------------------|----------------|
| DOM | `document.querySelector`, `createElement`, `appendChild` | Leer y modificar lo que se ve en pantalla |
| Evento | `addEventListener("submit", ...)` | Detectar cuando el usuario envía el formulario y reaccionar |
| Objeto | `new Producto(...)`, `new Carrito()` | Guardar datos y lógica de cada producto y del carrito |