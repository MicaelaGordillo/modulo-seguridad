// Obtener los datos del almacenamiento local
var nombre = localStorage.getItem("nombre");
var responsable = localStorage.getItem("responsable");
var fechaImplementacion = localStorage.getItem("fechaImplementacion");
var descripcion = localStorage.getItem("descripcion");
var observaciones = localStorage.getItem("observaciones");
var tipoControl = localStorage.getItem("tipoControl");
var nivelImplementacion = localStorage.getItem("nivelImplementacion");
var periodicidad = localStorage.getItem("periodicidad");

// Mostrar los datos en la vista
window.addEventListener('load', function() {

    document.getElementById("nombre").textContent = nombre;
    document.getElementById("responsable").textContent = responsable;
    document.getElementById("fechaImplementacion").textContent = fechaImplementacion;
    document.getElementById("descripcion").textContent = descripcion;
    document.getElementById("observaciones").textContent = observaciones;
    var tipoControlSplit = tipoControl.valueOf().split("-");
    var valorTipoControl = parseInt(tipoControlSplit[0]);
    var tipoControlSelect = tipoControlSplit[1];
    document.getElementById("tipoControl").textContent = tipoControlSelect;
    var nivelImplementacionSplit = nivelImplementacion.valueOf().split("-");
    var valorNivelImplementacion = parseInt(nivelImplementacionSplit[0]);
    var nivelImplementacionSelect = nivelImplementacionSplit[1];
    document.getElementById("nivelImplementacion").textContent = nivelImplementacionSelect;
    var periodicidadSplit = periodicidad.valueOf().split("-");
    var valorPeriodicidad = parseInt(periodicidadSplit[0]);
    var periodicidadSelect = periodicidadSplit[1];
    document.getElementById("periodicidad").textContent = periodicidadSelect;
    var total = valorTipoControl + valorNivelImplementacion + valorPeriodicidad;
    console.log("Total: "+total);
    total = total*100/9;
    console.log("Porcentaje de efectividad: "+total);
    
    // Gráfica para el porcentaje de efectividad
    var efectTotal = new RadialGauge({
        renderTo: 'efectividad-total',
        width: 300,
        height: 300,
        units: "Porcentaje de efectividad",
        minValue: 0,
        maxValue: 100,
        colorValueBoxRect: "#049faa",
        colorValueBoxRectEnd: "#049faa",
        colorValueBoxBackground: "#f1fbfc",
        valueInt: 2,
        majorTicks: [
            "0",
            "20",
            "40",
            "60",
            "80",
            "100"
        ],
        minorTicks: 4,
        strokeTicks: true,
        highlights: [
            {
                "from": 0,
                "to": 20,
                "color": "#77dd77"
            },
            {
                "from": 20,
                "to": 40,
                "color": "#f9e46e"
            },
            {
                "from": 40,
                "to": 60,
                "color": "#fbc05d"
            },
            {
                "from": 60,
                "to": 80,
                "color": "#f66060"
            },
            {
                "from": 80,
                "to": 100,
                "color": "#c63637"
            }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "line",
        colorNeedle: "#007F80",
        colorNeedleEnd: "#007F80",
        needleWidth: 2,
        needleCircleSize: 3,
        colorNeedleCircleOuter: "#007F80",
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear"
    }).draw();
    efectTotal.value = total;

    document.getElementById("generatePDFButton").addEventListener("click", () => {
        const element = document.getElementById("pdfContent");
        html2pdf()
        .set({
            margin: 1,
            filename: 'efectividad-control.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 3,
                letterRendering: true
            },
            jsPDF: {
                unit: "in",
                format: "a3",
                orientation: 'portrait'
            }
        })
        .from(element)
        .save()
        .catch(err => console.log(err));
    });

    document.getElementById("aceptarButton").addEventListener("click", () => {
        window.location.href = "index.html"; 
    });
    
});