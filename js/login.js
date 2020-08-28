const form = document.getElementById("form_login"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    cerrar = document.getElementById("sesion_cerrar"),
    sesion = document.getElementById("sesion"),
    nombre = document.getElementById("nombre");

cerrar.style.display = "none";

form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("../json/usuarios.json")
        .then(res => res.json())
        .then(data => {
            data.usuarios.map(element => {
                if (email.value == element.email && password.value == element.password) {
                    localStorage.setItem("sesion", email.value);
                    location.reload()
                }
            })
        })
})

const user = localStorage.getItem("sesion")

if (user != null) {
    cerrar.style.display = "block";
    sesion.style.display = "none";

    nombre.innerHTML = `<a class='nav-link' href='#'>${user}</a>`
}

function cerrarSesion() {
    localStorage.removeItem("sesion")
    cerrar.style.display = "none";
    sesion.style.display = "block";
    nombre.style.display = "none";
}