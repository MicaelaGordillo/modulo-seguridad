window.addEventListener('load', function() {
    let registros = this.localStorage.getItem("registros");
    if (registros != null) {
        registros = JSON.parse(localStorage.getItem("registros"));
        renderizarControles(registros);
    } else {
        registros = [{
            id: 1,
            nombre: "Control 1",
            responsable: "Responsable 1",
            fechaImplementacion: "2021-01-01",
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultrices ultrices, nunc nisl aliquam nunc, quis aliqua",
            observaciones: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultrices ultrices, nunc nisl aliquam nunc, quis aliqua",
            tipoControl: "1-Correctivo",
            nivelImplementacion: "1-Semiautomático",
            periodicidad: "1-Semestral"
        }];
        localStorage.setItem("registros", JSON.stringify(registros));
        renderizarControles(registros);
    }
    console.log("registros", registros);
    
    document.getElementById("btnAddControl").addEventListener("click", () => {
        window.location.href = "form.html"; 
    });

});

function renderizarControles(registros) {
    let html = '';
    
    registros.forEach(function(control){
        html += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${control.id}" aria-expanded="false" aria-controls="collapseTwo">
                    ${control.nombre}
                </button>
            </h2>
            <div id="collapse${control.id}" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <p>Responsable: ${control.responsable}</p>
                    <p>Descripción: ${control.descripcion}</p>
                    <p>Fecha de implementación: ${control.fechaImplementacion}</p>
                    <button onclick="verMas(${control.id})">Ver más</button>
                    <button onclick="eliminar(${control.id})">Eliminar</button>
                </div>
            </div>
        </div>
        `;
    });
    $('#accordionExample').html(html);
}

function verMas(id) {
    let control = JSON.parse(localStorage.getItem("registros")).find(function(control){
        return control.id == id;
    });
    localStorage.setItem("nombre", control.nombre);
    localStorage.setItem("responsable", control.responsable);
    localStorage.setItem("fechaImplementacion", control.fechaImplementacion);
    localStorage.setItem("descripcion", control.descripcion);
    localStorage.setItem("observaciones", control.observaciones);
    localStorage.setItem("tipoControl", control.tipoControl);
    localStorage.setItem("nivelImplementacion", control.nivelImplementacion);
    localStorage.setItem("periodicidad", control.periodicidad);
    window.location.href = "view-form.html";
}

function eliminar(id) {
    let registros = JSON.parse(localStorage.getItem("registros"));
    let index = registros.findIndex(function(control){
        return control.id == id;
    });
    registros.splice(index, 1);
    localStorage.setItem("registros", JSON.stringify(registros));
    renderizarControles(registros);
}

function filtros() {
    let registros = JSON.parse(localStorage.getItem("registros"));
    let tipo = document.getElementById("tipoControlFilter").value;
    let nivel = document.getElementById("nivelImplementacionFilter").value;
    let periodicidad = document.getElementById("periodicidadFilter").value;
    registros = registros.filter(function(control){
        if (tipo != "0") {
            if (nivel != "0"){
                if (periodicidad != "0") {
                    return control.tipoControl == tipo && control.nivelImplementacion == nivel && control.periodicidad == periodicidad;
                } else {
                    return control.tipoControl == tipo && control.nivelImplementacion == nivel;
                }
            } else {
                if (periodicidad != "0") {
                    return control.tipoControl == tipo && control.periodicidad == periodicidad;
                } else {
                    return control.tipoControl == tipo;
                }
            }
        } else {
            if (nivel != "0"){
                if (periodicidad != "0") {
                    return control.nivelImplementacion == nivel && control.periodicidad == periodicidad;
                } else {
                    return control.nivelImplementacion == nivel;
                }
            } else {
                if (periodicidad != "0") {
                    return control.periodicidad == periodicidad;
                } else {
                    return true;
                }
            }
        }
    });
    renderizarControles(registros);
}