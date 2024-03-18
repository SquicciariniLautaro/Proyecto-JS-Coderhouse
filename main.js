let continuar = true;
let temperaturasRegistradas = [];

while (continuar) {
    let temperatura = Number(prompt("Ingrese la temperatura de su zona."));


    temperaturasRegistradas.push(temperatura);

    if (temperatura <= 15) {
        frio();
    } else if (temperatura > 15 && temperatura <= 23) {
        templado();
    } else {
        calor();
    }

    let respuesta = prompt("¿Desea ingresar otra temperatura? (Sí/No)").toLowerCase();
    if (respuesta !== "sí" && respuesta !== "si") {
        continuar = false;
    }
}


function mostrarTemperaturas() {
    alert("Temperaturas registradas: " + temperaturasRegistradas.join(', '));
    let suma = temperaturasRegistradas.reduce((total, temp) => total + temp, 0);
    let promedio = suma / temperaturasRegistradas.length;
    alert("La temperatura promedio es: " + promedio.toFixed(2));
}


function buscarTemperatura() {
    let temperaturaBuscar = Number(prompt("Ingrese la temperatura que desea buscar: "));
    if (temperaturasRegistradas.includes(temperaturaBuscar)) {
        alert("La temperatura está en la lista.");
    } else {
        alert("La temperatura no está en la lista.");
    }
}

//
function filtrarTemperaturas() {
    let rangoMin = Number(prompt("Ingrese el límite mínimo del rango: "));
    let rangoMax = Number(prompt("Ingrese el límite máximo del rango: "));
    let temperaturasFiltradas = temperaturasRegistradas.filter(temp => temp >= rangoMin && temp <= rangoMax);
    alert("Temperaturas dentro del rango: " + temperaturasFiltradas.join(', '));
}

function frio() {
    alert("Hace frío, ve a cerrar las ventanas y prender la estufa.");
}

function templado() {
    alert("Está templado, procura usar ropa cómoda y ventilar la casa.");
}

function calor() {
    alert("Hace calor, deberías usar ropa ligera y prender ventiladores/aires acondicionados del hogar.");
}

mostrarTemperaturas();
buscarTemperatura();
filtrarTemperaturas();
