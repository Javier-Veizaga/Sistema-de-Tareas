// Recuperar datos almacenados en localStorage
let lst = JSON.parse(localStorage.getItem("list")) || [];

// Función para renderizar los datos en la tabla
function mostrarDatos() {
    const tableBody = document.getElementById("elements");

    if (!tableBody) return; // Si no existe la tabla, salir

    // Limpiar la tabla antes de volver a llenarla
    tableBody.innerHTML = "";

    lst.forEach((item, index) => {
        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.etiqueta}</td>
                <td>${item.fecha}</td>
                <td>${item.hora}</td>
                <td>
                    
                    <button class="btn btn-sm btn-danger" onclick="eliminarRegistro(${index})">
                        Eliminar<i class="fas fa-trash-alt"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="modificarRegistro(${index})">
                        Modificar<i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Función para modificar un registro
function modificarRegistro(index) {
    // Obtener el objeto a modificar
    let evento = lst[index];

    // Pedir al usuario los nuevos valores
    const nuevaEtiqueta = prompt("Ingrese la nueva etiqueta:", evento.etiqueta);
    const nuevaFecha = prompt("Ingrese la nueva fecha:", evento.fecha);
    const nuevaHora = prompt("Ingrese la nueva hora:", evento.hora);

    // Si el usuario cancela, no se realizan cambios
    if (nuevaEtiqueta === null || nuevaFecha === null || nuevaHora === null) return;

    // Actualizar los valores en la lista
    lst[index] = { etiqueta: nuevaEtiqueta, fecha: nuevaFecha, hora: nuevaHora };

    // Guardar en localStorage
    localStorage.setItem("list", JSON.stringify(lst));

    // Actualizar la tabla
    mostrarDatos();
}

// Verificar si el formulario existe antes de asignarle el evento
const formulario = document.getElementById("miFormulario");

if (formulario) {
    formulario.addEventListener("submit", function(event) {
        alert("Elementi Guardado exitosamente")
        event.preventDefault();

        const etiqueta = document.getElementById("etiqueta").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;

        lst.push({ etiqueta, fecha, hora });

        localStorage.setItem("list", JSON.stringify(lst));

        console.log("Lista actualizada:", lst);
        mostrarDatos();

        formulario.reset();
    });
}

// Función para eliminar un registro
function eliminarRegistro(index) {
    lst.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(lst));
    mostrarDatos();
}

// Cargar los datos si estamos en read.html
if (document.getElementById("elements")) {
    mostrarDatos();
}
