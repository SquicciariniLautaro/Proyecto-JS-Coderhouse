let continuar = true;
let temperaturasRegistradas = [];

const Temperatura = {
    registrarTemperatura: function(temperatura) {
        temperaturasRegistradas.push(temperatura);
        this.analizarTemperatura(temperatura);
        this.actualizarLocalStorage();
        this.mostrarTemperaturas();
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
        const temperaturasDiv = document.getElementById('temperaturas');
        temperaturasDiv.innerHTML = "Temperaturas registradas: " + temperaturasRegistradas.join(', ');

        let suma = temperaturasRegistradas.reduce((total, temp) => total + temp, 0);
        let promedio = suma / temperaturasRegistradas.length;

        const promedioDiv = document.getElementById('promedio');
        promedioDiv.innerHTML = "La temperatura promedio es: " + promedio.toFixed(2);
    },
    buscarTemperatura: function(temperaturaBuscar) {
        if (temperaturasRegistradas.includes(temperaturaBuscar)) {
            console.log("La temperatura está en la lista.");
        } else {
            console.log("La temperatura no está en la lista.");
        }
    },
    filtrarTemperaturas: function(rangoMin, rangoMax) {
        let temperaturasFiltradas = temperaturasRegistradas.filter(temp => temp >= rangoMin && temp <= rangoMax);
        console.log("Temperaturas dentro del rango: " + temperaturasFiltradas.join(', '));
    },
    frio: function() {
        console.log("Hace frío, ve a cerrar las ventanas y prender la estufa.");
    },
    templado: function() {
        console.log("Está templado, procura usar ropa cómoda y ventilar la casa.");
    },
    calor: function() {
        console.log("Hace calor, deberías usar ropa ligera y prender ventiladores/aires acondicionados del hogar.");
    },
    actualizarLocalStorage: function() {
        localStorage.setItem('temperaturas', JSON.stringify(temperaturasRegistradas));
    }
};

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    const temperaturaInput = document.getElementById('temperaturaInput');
    const temperatura = parseFloat(temperaturaInput.value);
    Temperatura.registrarTemperatura(temperatura);
    temperaturaInput.value = '';
});

document.getElementById('buscarBtn').addEventListener('click', function() {
    const temperaturaBuscar = parseFloat(document.getElementById('buscarInput').value);
    Temperatura.buscarTemperatura(temperaturaBuscar);
});

document.getElementById('filtrarBtn').addEventListener('click', function() {
    const rangoMin = parseFloat(document.getElementById('rangoMin').value);
    const rangoMax = parseFloat(document.getElementById('rangoMax').value);
    Temperatura.filtrarTemperaturas(rangoMin, rangoMax);
});

// Cargar temperaturas desde localStorage al cargar la página
window.addEventListener('load', function() {
    const temperaturasGuardadas = JSON.parse(localStorage.getItem('temperaturas'));
    if (temperaturasGuardadas) {
        temperaturasRegistradas = temperaturasGuardadas;
        Temperatura.mostrarTemperaturas();
    }
});