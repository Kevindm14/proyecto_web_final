const formulas = document.getElementById("formulas"),
    figuras = document.getElementById("figuras"),
    sumit = document.getElementById("sumit"),
    inputs = document.getElementById("inputs");


const divCuadrado = `
    <input type='text' id='lados' placeholder='Valor de los lados' class='form-control my-3'>
`

const div = `
    <input type='text' id='base' placeholder='Base' class='form-control my-3'>
    <input type='text' id='altura' placeholder='Altura' class='form-control my-3'>
`

const div2 = `
    <input type='text' id='base2' placeholder='Base' class='form-control my-3'>
    <input type='text' id='altura2' placeholder='Altura' class='form-control my-3'>
`

const divRombo = `
    <input type='text' id='dMayor' placeholder='Diagonal Mayor' class='form-control my-3'>
    <input type='text' id='dMenor' placeholder='Diagonal Menor' class='form-control my-3'>
`
const mostrar = document.getElementById("mostrar");

const tablaFormulas = document.getElementById("TablaDatos");

tablaFormulas.style.display = "none";

const areas = []

fetch("../json/usuarios.json")
    .then(res => res.json())
    .then(data => {
        for (let key in data.figuras) {
            let select = document.createElement('option')
            select.setAttribute('value', data.figuras[key])
            select.innerHTML = data.figuras[key]
            figuras.appendChild(select)
        }
    })

figuras.addEventListener("change", (e) => {
    const value = e.target.value

    inputs.style.display = "block";
    switch (value) {
        case "cuadrado":
            inputs.innerHTML = divCuadrado;
            sumit.disabled = false

            formulas.addEventListener("submit", (e) => {
                e.preventDefault();
            
                let lados =+ document.getElementById("lados").value;
                let area = lados * 4
                const figura = {
                    nombreFigura: value,
                    area: area,
                }

                areas.splice(0, 0, figura)
                localStorage.setItem('figuras', JSON.stringify(areas))

                const tbody = document.querySelector('#TablaDatos tbody')
                
                let fila = tbody.insertRow(0),
                    nombre = fila.insertCell(0),
                    areat = fila.insertCell(1),
                    buton = fila.insertCell(2);

                nombre.innerHTML = figura.nombreFigura;
                areat.innerHTML = figura.area;
                
                buton.innerHTML = `
                    <button id="btn" onclick="editRow(this)" class="btn btn-sm btn-success">Editar</button>
                    <button id="btn" onclick="delRow(this)" class="btn btn-sm btn-danger">Borrar</button>
                `;

                tablaFormulas.style.display = "table";
                formulas.reset();
            })
            
        break;
        case "triangulo":
            inputs.innerHTML = div;
            sumit.disabled = false

            formulas.addEventListener("submit", (e) => {
                e.preventDefault();
            
                let base = document.getElementById("base"),
                    altura = document.getElementById("altura");
                
                let base2 =+ base.value,
                    altura2 =+ altura.value;

                let area = (base2 * altura2) / 2
                const figura = {
                    nombreFigura: value,
                    area: area,
                }

                areas.splice(0, 0, figura)
                localStorage.setItem('figuras', JSON.stringify(areas))
                
                const tbody = document.querySelector('#TablaDatos tbody')
                
                let fila = tbody.insertRow(0),
                    nombre = fila.insertCell(0),
                    areat = fila.insertCell(1),
                    buton = fila.insertCell(2);

                nombre.innerHTML = figura.nombreFigura;
                areat.innerHTML = figura.area;
                buton.innerHTML = '<button id="btn" onclick="delRow(this)" class="btn btn-sm btn-danger">Borrar</button>'

                tablaFormulas.style.display = "table";
            })
            
        break;
        case "rectangulo":
            inputs.innerHTML = div2;
            sumit.disabled = false

            formulas.addEventListener("submit", (e) => {
                e.preventDefault();
            
                let base = document.getElementById("base2"),
                    altura = document.getElementById("altura2");
                
                let base2 =+ base.value,
                    altura2 =+ altura.value;
            
                let area = base2 * altura2
                const figura = {
                    nombreFigura: value,
                    area: area,
                }

                areas.splice(0, 0, figura)
                localStorage.setItem('figuras', JSON.stringify(areas))

                const tbody = document.querySelector('#TablaDatos tbody')
                
                let fila = tbody.insertRow(0),
                    nombre = fila.insertCell(0),
                    areat = fila.insertCell(1),
                    buton = fila.insertCell(2);

                nombre.innerHTML = figura.nombreFigura;
                areat.innerHTML = figura.area;
                buton.innerHTML = '<button id="btn" onclick="delRow(this)" class="btn btn-sm btn-danger">Borrar</button>'

                tablaFormulas.style.display = "table";
            })
            
        break;
        default:
            inputs.style.display = "none";
            sumit.disabled = true;
    }
})

function delRow(current) {
    const row = current.parentNode.parentNode.rowIndex;
    document.getElementById("TablaDatos").deleteRow(row);
    areas.splice(row-1, 1);
    localStorage.setItem('figuras', JSON.stringify(areas))

    if(tablaFormulas.rows.length == 1) {
        tablaFormulas.style.display = "none"
    }
}