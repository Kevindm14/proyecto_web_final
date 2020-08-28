const nombre_e = document.getElementById('encuesta_nombre'),
    correo_e = document.getElementById("encuesta_correo"),
    area = document.getElementById("select_area"),
    form_e = document.getElementById("form_encuesta"),
    selectEdit = document.getElementById("selectEditENC"),
    tabla_e = document.getElementById("tabla_encuesta");

tabla_e.style.display = "none";

fetch("json/usuarios.json")
    .then(res => res.json())
    .then(data => {
        for (let key in data.areas) {
            let select = document.createElement('option')
            select.setAttribute('value', data.areas[key])
            select.innerHTML = data.areas[key]
            selectEdit.appendChild(select)
        }
    })

fetch("json/usuarios.json")
    .then(res => res.json())
    .then(data => {
        for (let key in data.areas) {
            let select = document.createElement('option')
            select.setAttribute('value', data.areas[key])
            select.innerHTML = data.areas[key]
            area.appendChild(select)
        }
    })

const users = []

form_e.addEventListener("submit", (event) => {
    event.preventDefault();

    const user_e = {
        nombre: nombre_e.value,
        correo: correo_e.value,
        area: area.value,
    }

    users.splice(0, 0, user_e);
    localStorage.setItem('tabla_encuesta', JSON.stringify(users))

    const tbody = document.querySelector('#tabla_encuesta tbody')
    const ids = JSON.parse(localStorage.getItem('tabla_encuesta'))
    const id_table = ids.length

    let fila = tbody.insertRow(0),
        id = fila.insertCell(0),
        nombre_t2 = fila.insertCell(1),
        correo_t2 = fila.insertCell(2),
        area_t2 = fila.insertCell(3),
        buton2 = fila.insertCell(4);

    id.innerHTML = id_table - 1;
    nombre_t2.innerHTML = user_e.nombre;
    correo_t2.innerHTML = user_e.correo;
    area_t2.innerHTML = user_e.area;
    buton2.innerHTML = `
        <button id="btn" onclick="editRow(this)" class="btn btn-sm btn-success"> Editar</button>
        <button id="btn" onclick="delRow(this)" class="btn btn-sm btn-danger"> Delete</button>
    `;

    tabla_e.style.display = "table"
    form_e.reset();
})

function editRow(current) {
    $('#editModal').modal('show');

    const formEdit = document.getElementById("formEdit"), 
        nombreE = document.getElementById("nombreENC"),
        correoE = document.getElementById("correeoENC"),
        areaE = document.getElementById("selectEditENC");

    formEdit.addEventListener("submit", (e) => {
        e.preventDefault();

        const tbody = document.querySelector("#tabla_encuesta tbody");
        const row = current.parentNode.parentNode.rowIndex;
        let filas = tbody.insertRow(row),
            id = filas.insertCell(0)
            nombreF = filas.insertCell(1),
            correoF = filas.insertCell(2),
            areaF = filas.insertCell(3),
            iconsAction = filas.insertCell(4);

        id.innerHTML = row-1;
        nombreF.innerHTML = nombreE.value;
        correoF.innerHTML = correoE.value;
        areaF.innerHTML = areaE.value;
        iconsAction.innerHTML = `
            <button id="btn" onclick="editRow(this)" class="btn btn-sm btn-success"> Editar</button>
            <button id="btn" onclick="delRow(this)" class="btn btn-sm btn-danger"> Borrar</button>
        `;

        let index = row - 1;

        users[index].nombre = nombreE.value;
        users[index].correo = correoE.value;
        users[index].area = areaE.value;

        formEdit.reset();
        $('#editModal').modal('toggle');
        tabla_e.deleteRow(row);
        localStorage.setItem('tabla_encuesta', JSON.stringify(users))
    })
}

function delRow(current) {
    const row = current.parentNode.parentNode.rowIndex;
    tabla_e.deleteRow(row);
    users.splice(row - 1, 1);
    localStorage.setItem('tabla_encuesta', JSON.stringify(users))
    let tam = tabla_e.rows.length;
    if (tam == 1) {
        tabla_e.style.display = "none"
    }
}
