// Laboratorio 08: componente interactivo con DOM, eventos y objetos.

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

const formulario = document.querySelector("#formTarea");
const entrada = document.querySelector("#entradaTarea");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#listaTareas");
const totalTareas = document.querySelector("#totalTareas");
const totalPendientes = document.querySelector("#totalPendientes");
const totalTerminadas = document.querySelector("#totalTerminadas");
const botonesFiltro = document.querySelectorAll("[data-filtro]");

const tareas = [];
let filtroActual = "todas";

function mostrarMensaje(texto, tipo = "ok") {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

function actualizarResumen() {
  totalTareas.textContent = tareas.length;
  totalPendientes.textContent = tareas.filter(tarea => !tarea.terminada).length;
  totalTerminadas.textContent = tareas.filter(tarea => tarea.terminada).length;
}

function renderizarTareas() {
  lista.textContent = "";

  const tareasVisibles = tareas.filter(tarea => {
    if (filtroActual === "pendientes") return !tarea.terminada;
    if (filtroActual === "terminadas") return tarea.terminada;
    return true;
  });

  if (tareasVisibles.length === 0) {
    const vacio = document.createElement("li");
    vacio.textContent = filtroActual === "todas"
      ? "Todavía no agregaste tareas."
      : "No hay tareas en esta categoría.";
    vacio.className = "intro";
    lista.appendChild(vacio);
  }

  tareasVisibles.forEach(tarea => {
    const item = document.createElement("li");
    item.className = tarea.terminada ? "tarea terminada" : "tarea";

    const contenido = document.createElement("div");
    contenido.className = "contenido";

    const nombre = document.createElement("span");
    nombre.className = "nombre-tarea";
    nombre.textContent = tarea.descripcion;

    const estado = document.createElement("span");
    estado.className = "estado";
    estado.textContent = tarea.obtenerEstado();

    contenido.append(nombre, estado);

    const acciones = document.createElement("div");
    acciones.className = "acciones";

    const botonEstado = document.createElement("button");
    botonEstado.type = "button";
    botonEstado.className = "secondary";
    botonEstado.textContent = tarea.terminada ? "Reabrir" : "Marcar lista";
    botonEstado.addEventListener("click", () => {
      tarea.cambiarEstado();
      mostrarMensaje(`Estado actualizado: ${tarea.descripcion}`);
      renderizarTareas();
    });

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.className = "delete";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      const indice = tareas.findIndex(elemento => elemento.id === tarea.id);
      if (indice !== -1) tareas.splice(indice, 1);
      mostrarMensaje("Tarea eliminada.");
      renderizarTareas();
    });

    acciones.append(botonEstado, botonEliminar);
    item.append(contenido, acciones);
    lista.appendChild(item);
  });

  actualizarResumen();
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const descripcion = entrada.value.trim();

  if (descripcion.length < 3) {
    mostrarMensaje("Escribe una tarea de al menos 3 caracteres.", "error");
    entrada.focus();
    return;
  }

  tareas.push(new Tarea(descripcion));
  entrada.value = "";
  mostrarMensaje("Tarea agregada correctamente.");
  renderizarTareas();
  entrada.focus();
});

// Evento input: limpia el mensaje de validación mientras la persona corrige el texto.
entrada.addEventListener("input", () => {
  if (mensaje.classList.contains("error")) {
    mostrarMensaje("Puedes agregar tu tarea cuando tenga al menos 3 caracteres.");
  }
});

// Evento click: permite filtrar la lista por estado.
botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    filtroActual = boton.dataset.filtro;
    renderizarTareas();
  });
});

renderizarTareas();
