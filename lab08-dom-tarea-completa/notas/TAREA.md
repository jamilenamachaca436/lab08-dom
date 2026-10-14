# Tarea: Mi componente interactivo

## Componente elegido

Elegí una **lista de tareas pendientes** porque es un componente que puedo utilizar para organizar mis actividades de estudio. La persona puede agregar una tarea, marcarla como terminada, reabrirla, eliminarla y filtrar la lista. Para construirla utilicé HTML, CSS y JavaScript, combinando DOM, eventos y objetos.

## Version 1: solo DOM

**Qué agregué:** preparé la estructura HTML de la lista y utilicé JavaScript para crear elementos con `createElement` y mostrarlos en la página. En esta primera versión las tareas eran ejemplos escritos en el código.

**Por qué:** primero necesitaba comprobar cómo seleccionar elementos del DOM y cómo crear nodos sin escribir cada tarea directamente en el HTML.

**Qué cambió en la página:** al cargarla aparecían tareas de ejemplo creadas desde JavaScript, pero todavía no se podía interactuar con ellas.

Código principal de la versión 1:

```js
const lista = document.querySelector("#listaTareas");
const ejemplos = ["Repasar JavaScript", "Terminar el laboratorio"];

ejemplos.forEach((descripcion) => {
  const elemento = document.createElement("li");
  elemento.textContent = descripcion;
  lista.appendChild(elemento);
});
```

## Version 2: con eventos

**Qué agregué:** incorporé un formulario para agregar tareas y botones para marcar una tarea como terminada o eliminarla. También añadí una validación para impedir que se registren descripciones vacías o demasiado cortas.

**Por qué:** quería que la página respondiera a acciones reales de la persona y que los errores se mostraran dentro de la interfaz, sin utilizar `alert`.

**Qué cambió en la página:** ahora se podía escribir una tarea y agregarla con el formulario; los botones permitían cambiar o eliminar elementos. Los eventos utilizados fueron `submit`, `click` e `input`.

Código principal de la versión 2:

```js
const formulario = document.querySelector("#formTarea");
const entrada = document.querySelector("#entradaTarea");
const lista = document.querySelector("#listaTareas");
const mensaje = document.querySelector("#mensaje");
const tareas = [];

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const descripcion = entrada.value.trim();

  if (descripcion.length < 3) {
    mensaje.textContent = "Escribe al menos 3 caracteres.";
    return;
  }

  const elemento = document.createElement("li");
  elemento.textContent = descripcion;

  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", () => elemento.remove());

  elemento.appendChild(botonEliminar);
  lista.appendChild(elemento);
  tareas.push(descripcion);
  entrada.value = "";
  mensaje.textContent = "Tarea agregada correctamente.";
});

entrada.addEventListener("input", () => {
  mensaje.textContent = "";
});
```

## Version 3: con clases y objetos

**Qué agregué:** creé la clase `Tarea`, que representa cada pendiente, con los atributos `id`, `descripcion` y `terminada`. Añadí los métodos `cambiarEstado()` y `obtenerEstado()`. La versión final también cuenta con filtros para ver todas las tareas, las pendientes o las terminadas, además de un resumen con las cantidades.

**Por qué:** al utilizar objetos, cada tarea mantiene juntos sus datos y las acciones relacionadas con ella. Esto permite trabajar con varias tareas de una forma organizada y reutilizable.

**Qué cambió en la página:** cada registro se convierte en un objeto independiente. La interfaz se vuelve a dibujar a partir de esos objetos cuando se agrega, marca, reabre, elimina o filtra una tarea.

Código principal de la versión 3:

```js
class Tarea {
  constructor(descripcion) {
    this.id = Date.now() + Math.random();
    this.descripcion = descripcion.trim();
    this.terminada = false;
  }

  cambiarEstado() {
    this.terminada = !this.terminada;
  }

  obtenerEstado() {
    return this.terminada ? "Terminada" : "Pendiente";
  }
}

const tareas = [];

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const descripcion = entrada.value.trim();

  if (descripcion.length < 3) {
    mostrarMensaje("Escribe una tarea de al menos 3 caracteres.", "error");
    return;
  }

  tareas.push(new Tarea(descripcion));
  renderizarTareas();
});
```

> El bloque anterior muestra la idea principal de la versión final. El archivo `tarea/app.js` contiene el código completo con el renderizado, los botones, los filtros y el resumen.

## Donde uso DOM, eventos y objetos

| Concepto | Parte del código final | Para qué sirve |
|---|---|---|
| DOM | `document.querySelector()` | Selecciona el formulario, los campos, los mensajes y la lista. |
| DOM | `document.createElement()` y `appendChild()` | Crea los elementos de cada tarea y los muestra en la página. |
| DOM | `textContent` y `className` | Actualiza textos y cambia la apariencia según el estado. |
| Eventos | `addEventListener("submit", ...)` | Recibe el formulario y valida la descripción antes de agregarla. |
| Eventos | `addEventListener("click", ...)` | Permite marcar, reabrir, eliminar y filtrar tareas. |
| Eventos | `addEventListener("input", ...)` | Reacciona cuando la persona modifica el texto de entrada. |
| Objetos | `class Tarea` y `new Tarea(descripcion)` | Modela cada tarea como un objeto con sus propios datos. |
| Objetos | `cambiarEstado()` y `obtenerEstado()` | Cambia y consulta el estado de una tarea. |

## Pruebas realizadas

Completar la columna de resultado obtenido después de ejecutar las pruebas en el navegador.

| Acción | Resultado esperado | Resultado obtenido | ¿Cumple? |
|---|---|---|---|
| Agregar una tarea con descripción válida, por ejemplo, “Repasar DOM” | La tarea aparece en la lista y aumenta el total. | Pendiente de comprobar en el navegador. | Pendiente |
| Enviar el formulario vacío o escribir menos de 3 caracteres | Aparece un mensaje de validación visible y no se agrega la tarea. | Pendiente de comprobar en el navegador. | Pendiente |
| Presionar “Marcar lista” | La tarea aparece como terminada y se actualizan los contadores. | Pendiente de comprobar en el navegador. | Pendiente |
| Presionar “Reabrir” | La tarea vuelve al estado pendiente. | Pendiente de comprobar en el navegador. | Pendiente |
| Presionar “Eliminar” | La tarea desaparece y se actualiza el resumen. | Pendiente de comprobar en el navegador. | Pendiente |
| Elegir el filtro “Pendientes” o “Terminadas” | Solo se muestran las tareas de la categoría seleccionada. | Pendiente de comprobar en el navegador. | Pendiente |

## Por que disene asi mi clase

Diseñé la clase `Tarea` con los atributos `id`, `descripcion` y `terminada` porque cada tarea necesita identificarse, guardar el texto que escribió el usuario y recordar si ya fue completada. El método `cambiarEstado()` permite alternar entre pendiente y terminada, mientras que `obtenerEstado()` devuelve el texto que se muestra en la interfaz. De esta manera, los datos y las acciones de una tarea quedan organizados en un mismo objeto y no necesito repetir la misma lógica para cada registro.

## Observaciones

- La validación se muestra en la página y no mediante ventanas emergentes.
- El formulario utiliza `preventDefault()` para evitar que se recargue la página al agregar una tarea.
- Las tareas se guardan en un arreglo en memoria; por eso, al recargar el navegador, se reinicia la lista.
- Antes de entregar, debo comprobar todos los casos de la tabla, revisar la consola del navegador y actualizar los resultados obtenidos con lo que realmente ocurrió.

## Conclusiones

Con este componente practiqué cómo seleccionar elementos del DOM, crear y modificar nodos y hacer que una página responda a las acciones del usuario. También comprendí mejor la diferencia entre una clase y un objeto: la clase define la estructura de una tarea y cada objeto guarda los datos de una tarea concreta. Finalmente, aprendí que validar los datos antes de agregarlos evita registros vacíos y mejora el uso de la interfaz.
