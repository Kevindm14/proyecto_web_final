const productoss = document.getElementById('select_productos'),
    selectEdit = document.getElementById("selectEdit"),
    form_c = document.getElementById("form_factura"),
    cantidadf = document.getElementById("cantidad"),
    name = document.getElementById("nombre_c"),
    tarjetaf = document.getElementById("tarjeta"),
    tabla_f = document.getElementById("tabla_factura");

tabla_f.style.display = "none"

fetch("../json/usuarios.json")
    .then(res => res.json())
    .then(data => {
        for (let key in data.productos) {
            let select = document.createElement('option')
            select.setAttribute('value', data.productos[key].producto)
            select.innerHTML = data.productos[key].producto
            selectEdit.appendChild(select)
        }
    })

fetch("../json/usuarios.json")
    .then(res => res.json())
    .then(data => {
        for (let key in data.productos) {
            let select = document.createElement('option')
            select.setAttribute('value', data.productos[key].producto)
            select.innerHTML = data.productos[key].producto
            productoss.appendChild(select)
        }
    })

const compras = []

form_c.addEventListener("submit", (event) => {
    event.preventDefault();

    const nuevo = {
        producto: productoss.value,
        cantidad: cantidadf.value,
        nombre: name.value,
        tarjeta: tarjetaf.value,
    }
    
    compras.splice(0, 0, nuevo);
    localStorage.setItem('tabla_compras', JSON.stringify(compras))
    
    const tbody = document.querySelector('#tabla_factura tbody')
    const ids = JSON.parse(localStorage.getItem('tabla_compras'))
    const id_table = ids.length - 1 

    let fila = tbody.insertRow(0),
        id = fila.insertCell(0),
        producto = fila.insertCell(1),
        cantidad = fila.insertCell(2),
        nombre = fila.insertCell(3),
        tarjeta = fila.insertCell(4),
        buton = fila.insertCell(5);

    id.innerHTML = id_table;
    producto.innerHTML = nuevo.producto;
    cantidad.innerHTML = `${nuevo.cantidad}`;
    nombre.innerHTML = nuevo.nombre;
    tarjeta.innerHTML = nuevo.tarjeta;
    buton.innerHTML = `
        <button id="btn" onclick="editRow(this)" class="btn btn-sm btn-success"> Editar</button>
        <button id="btn" onclick="delRow(this)" class="btn btn-sm btn-danger"> Borrar</button>
    `;

    tabla_f.style.display = "table"
})

function editRow(current) {
    $('#editModal').modal('show');

    const formEdit = document.getElementById("formEdit");

    formEdit.addEventListener("submit", (e) => {
        
        e.preventDefault();

        const tbody = document.querySelector("#tabla_factura tbody");
        const row = current.parentNode.parentNode.rowIndex;
        let fila = tbody.insertRow(row),
            id = fila.insertCell(0),
            producto = fila.insertCell(1),
            cantidad = fila.insertCell(2),
            nombre = fila.insertCell(3),
            tarjeta = fila.insertCell(4),
            buton = fila.insertCell(5);

        const cantidadE = document.getElementById("cantidadE"),
            nombreE = document.getElementById("nombreE"),
            tarjetaE = document.getElementById("tarjetaE");

        id.innerHTML = row;
        producto.innerHTML = selectEdit.value;
        cantidad.innerHTML = cantidadE.value;
        nombre.innerHTML = nombreE.value;
        tarjeta.innerHTML = tarjetaE.value;
        buton.innerHTML = `
            <button id="btn" onclick="editRow(this)" class="btn btn-sm btn-success"> Editar</button>
            <button id="btn" onclick="delRow(this)" class="btn btn-sm btn-danger"> Borrar</button>
        `;

        let index = row - 1;

        compras[index].producto = selectEdit.value;
        compras[index].cantidad = cantidadE.value;
        compras[index].nombre = nombreE.value
        compras[index].tarjeta = tarjetaE.value

        formEdit.reset();
        $('#editModal').modal('toggle');
        tabla_f.deleteRow(row);
        localStorage.setItem('tabla_compras', JSON.stringify(compras))
    })
}

function delRow(current) {
    const row = current.parentNode.parentNode.rowIndex;
    tabla_f.deleteRow(row);
    compras.splice(row-1, 1);
    localStorage.setItem('tabla_compras', JSON.stringify(compras))

    if(tabla_f.rows.length == 1) {
        tabla_f.style.display = "none"
    }

}
