const ciudad = document.getElementById('select_ciudad'),
    ciudadE = document.getElementById('selectEdit'),
    form_c = document.getElementById("form_contactenos"),
    nombre_f = document.getElementById("contacto_nombre"),
    telefono_f = document.getElementById("telefono"),
    correo_f = document.getElementById("correo"),
    mensaje_f = document.getElementById("mensaje"),
    tabla_f = document.getElementById("tabla_contacto");

tabla_f.style.display = "none"

fetch("../json/usuarios.json")
    .then(res => res.json())
    .then(data => {
        for (let key in data.ciudades) {
            let select = document.createElement('option')
            select.setAttribute('value', data.ciudades[key])
            select.innerHTML = data.ciudades[key]
            ciudadE.appendChild(select)
        }
    })

fetch("../json/usuarios.json")
    .then(res => res.json())
    .then(data => {
        for (let key in data.ciudades) {
            let select = document.createElement('option')
            select.setAttribute('value', data.ciudades[key])
            select.innerHTML = data.ciudades[key]
            ciudad.appendChild(select)
        }
    })

const users = []

form_c.addEventListener("submit", (event) => {
    event.preventDefault();

    const newUser = {
        nombre: nombre_f.value,
        correo: correo_f.value,
        ciudad: ciudad.value,
        telefono: telefono_f.value,
        mensaje: mensaje_f.value,
    }
    
    users.splice(0, 0, newUser);
    localStorage.setItem('tabla_contact', JSON.stringify(users))
    
    const tbody = document.querySelector('#tabla_contacto tbody')
    const ids = JSON.parse(localStorage.getItem('tabla_contact'))
    const id_table = ids.length - 1

    let fila = tbody.insertRow(0),
        id = fila.insertCell(0)
        nombre_t = fila.insertCell(1),
        correo_t = fila.insertCell(2),
        telefono_t = fila.insertCell(3),
        ciudad_t = fila.insertCell(4)
        mensaje_t = fila.insertCell(5)
        buton = fila.insertCell(6);

    id.innerHTML = id_table;
    nombre_t.innerHTML = newUser.nombre;
    correo_t.innerHTML = newUser.correo;
    telefono_t.innerHTML = newUser.telefono;
    ciudad_t.innerHTML = newUser.ciudad;
    mensaje_t.innerHTML = newUser.mensaje;
    buton.innerHTML = `
        <button id="btn" onclick="editRow(this)" class="btn btn-sm btn-success">Editar</button>
        <button id="btn" onclick="delRow(this)" class="btn btn-sm btn-danger">Borrar</button>
    `

    tabla_f.style.display = "table"
})

function editRow(current) {
    $('#editModal').modal('show');

    const formEdit = document.getElementById("formEdit"),
        nombreE = document.getElementById("nombreE"),
        correoE = document.getElementById("correoE"),
        telefonoE = document.getElementById("telefonoE"),
        mensajeE = document.getElementById("mensajeE");

    formEdit.addEventListener("submit", (e) => {
        e.preventDefault();

        const tbody = document.querySelector("#tabla_contacto tbody");
        const row = current.parentNode.parentNode.rowIndex;
        let filas = tbody.insertRow(row),
            nombre = filas.insertCell(0),
            correo = filas.insertCell(1),
            ciudad = filas.insertCell(2),
            telefono = filas.insertCell(3),
            mensaje = filas.insertCell(4),
            iconsAction = filas.insertCell(5);

        nombre.innerHTML = nombreE.value;
        correo.innerHTML = correoE.value;
        ciudad.innerHTML = ciudadE.value;
        telefono.innerHTML = telefonoE.value;
        mensaje.innerHTML = mensajeE.value;
        iconsAction.innerHTML = `
            <button id="btn" onclick="editRow(this)" class="btn btn-sm btn-success"> Editar</button>
            <button id="btn" onclick="delRow(this)" class="btn btn-sm btn-danger"> Borrar</button>
        `;

        let index = row - 1;

        users[index].nombre = nombreE.value;
        users[index].correo = correoE.value;
        users[index].ciudad = ciudadE.value;
        users[index].telefono = telefonoE.value;
        users[index].mensaje = mensajeE.value;

        formEdit.reset();
        $('#editModal').modal('toggle');
        tabla_f.deleteRow(row);
        localStorage.setItem('tabla_contact', JSON.stringify(users))
    })
}

function delRow(current) {
    const row = current.parentNode.parentNode.rowIndex;
    tabla_f.deleteRow(row);
    users.splice(row-1, 1);
    localStorage.setItem('tabla_contact', JSON.stringify(users))

    if(tabla_f.rows.length == 1) {
        tabla_f.style.display = "none"
    }
}
