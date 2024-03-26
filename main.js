let continuar = true;
let temperaturasRegistradas = [];

const Temperatura = {
    registrarTemperatura: function(temperatura) {
        temperaturasRegistradas.push(temperatura);
        this.analizarTemperatura(temperatura);
    },
    analizarTemperatura: function(temperatura) {
        if (temperatura <= 15) {
            this.frio();
        } else if (temperatura > 15 && temperatura <= 23) {
            this.templado();
        } else {
            this.calor();
        }
    },
    mostrarTemperaturas: function() {
        alert("Temperaturas registradas: " + temperaturasRegistradas.join(', '));
        let suma = temperaturasRegistradas.reduce((total, temp) => total + temp, 0);
        let promedio = suma / temperaturasRegistradas.length;
        alert("La temperatura promedio es: " + promedio.toFixed(2));
    },
    buscarTemperatura: function() {
        let temperaturaBuscar = Number(prompt("Ingrese la temperatura que desea buscar: "));
        if (temperaturasRegistradas.includes(temperaturaBuscar)) {
            alert("La temperatura está en la lista.");
        } else {
            alert("La temperatura no está en la lista.");
        }
    },
    filtrarTemperaturas: function() {
        let rangoMin = Number(prompt("Ingrese el límite mínimo del rango: "));
        let rangoMax = Number(prompt("Ingrese el límite máximo del rango: "));
        let temperaturasFiltradas = temperaturasRegistradas.filter(temp => temp >= rangoMin && temp <= rangoMax);
        alert("Temperaturas dentro del rango: " + temperaturasFiltradas.join(', '));
    },
    frio: function() {
        alert("Hace frío, ve a cerrar las ventanas y prender la estufa.");
    },
    templado: function() {
        alert("Está templado, procura usar ropa cómoda y ventilar la casa.");
    },
    calor: function() {
        alert("Hace calor, deberías usar ropa ligera y prender ventiladores/aires acondicionados del hogar.");
    }
};

while (continuar) {
    let temperatura = Number(prompt("Ingrese la temperatura de su zona."));
    Temperatura.registrarTemperatura(temperatura);

    let respuesta = prompt("¿Desea ingresar otra temperatura? (Sí/No)").toLowerCase();
    if (respuesta !== "sí" && respuesta !== "si") {
        continuar = false;
    }
}

Temperatura.mostrarTemperaturas();
Temperatura.buscarTemperatura();
Temperatura.filtrarTemperaturas();
