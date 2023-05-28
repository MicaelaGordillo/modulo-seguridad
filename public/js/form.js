document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var responsable = document.getElementById("responsable").value;
    var fechaImplementacion = document.getElementById("fechaImplementacion").value;
    var descripcion = document.getElementById("descripcion").value;
    var observaciones = document.getElementById("observaciones").value;
    var tipoControl = document.querySelector('input[name="tipoControl"]:checked').value;
    var nivelImplementacion = document.querySelector('input[name="nivelImplementacion"]:checked').value;
    var periodicidad = document.getElementById("periodicidad").value;
  
    // Validación de campos
    if (nombre == "" || nombre == null || responsable == "" || responsable == null || fechaImplementacion == "" || fechaImplementacion == null || descripcion == "" || descripcion == null || observaciones == "" || observaciones == null || tipoControl == "" || tipoControl == null || nivelImplementacion == "" || nivelImplementacion == null || periodicidad == "" || periodicidad == null) {
        document.getElementById("formulario_mensaje").classList.add("formulario_mensaje-activo");
        setTimeout(() => {
            document.getElementById("formulario_mensaje").classList.remove("formulario_mensaje-activo");
        }, 3000);
    } else {
        // Guardar el registro en la lista de registros
        var controles = JSON.parse(localStorage.getItem("registros"));
        console.log(controles);
        var ultimoId = 0;
        if (controles.length > 0) {
            ultimoId = controles[controles.length - 1].id;
        }
        var control = {
            "id": ultimoId + 1,
            "nombre": nombre,
            "responsable": responsable,
            "fechaImplementacion": fechaImplementacion,
            "descripcion": descripcion,
            "observaciones": observaciones,
            "tipoControl": tipoControl,
            "nivelImplementacion": nivelImplementacion,
            "periodicidad": periodicidad
        };
        controles.push(control);
        localStorage.setItem("registros", JSON.stringify(controles));
        // Guardar los datos en el almacenamiento local
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("responsable", responsable);
        localStorage.setItem("fechaImplementacion", fechaImplementacion);
        localStorage.setItem("descripcion", descripcion);
        localStorage.setItem("observaciones", observaciones);
        localStorage.setItem("tipoControl", tipoControl);
        localStorage.setItem("nivelImplementacion", nivelImplementacion);
        localStorage.setItem("periodicidad", periodicidad);
        // Redirigir a la siguiente pantalla
        window.location.href = "view-form.html";
    }
});