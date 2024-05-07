let temperaturasRegistradas = [];

const Temperatura = {
    registrarTemperatura: async function(temperatura) {
        temperaturasRegistradas.push(temperatura);
        this.analizarTemperatura(temperatura);
        this.actualizarLocalStorage();
        this.mostrarTemperaturas();

        try {
            const ciudad = 'Nombre de la ciudad'; // Reemplaza 'Nombre de la ciudad' por la ciudad que desees
            const temperaturaObtenida = await this.obtenerClima(ciudad);
            this.registrarTemperatura(temperaturaObtenida);
        } catch (error) {
            this.mostrarAlerta(error);
        }
    },
    analizarTemperatura: function(temperatura) {
        if (temperatura <= 15) {
            this.mostrarAlerta('Hace frío, ve a cerrar las ventanas y prender la estufa.');
        } else if (temperatura > 15 && temperatura <= 23) {
            this.mostrarAlerta('Está templado, procura usar ropa cómoda y ventilar la casa.');
        } else {
            this.mostrarAlerta('Hace calor, deberías usar ropa ligera y prender ventiladores/aires acondicionados del hogar.');
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
            this.mostrarAlerta("La temperatura está en la lista.");
        } else {
            this.mostrarAlerta("La temperatura no está en la lista.");
        }
    },
    filtrarTemperaturas: function(rangoMin, rangoMax) {
        let temperaturasFiltradas = temperaturasRegistradas.filter(temp => temp >= rangoMin && temp <= rangoMax);
        this.mostrarAlerta("Temperaturas dentro del rango: " + temperaturasFiltradas.join(', '));
    },
    mostrarAlerta: function(message) {
        Swal.fire({
            icon: 'info',
            text: message,
        });
    },
    actualizarLocalStorage: function() {
        localStorage.setItem('temperaturas', JSON.stringify(temperaturasRegistradas));
    },
    obtenerClima: async function(ciudad) {
        const apiKey = 'tu_api_key_de_OpenWeatherMap'; // Reemplaza esto con tu API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error al obtener el clima. Por favor, intenta nuevamente más tarde.');
            }
            const data = await response.json();
            return data.main.temp;
        } catch (error) {
            throw new Error('Error al obtener el clima. Por favor, intenta nuevamente más tarde.');
        }
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

window.addEventListener('load', function() {
    const temperaturasGuardadas = JSON.parse(localStorage.getItem('temperaturas'));
    if (temperaturasGuardadas) {
        temperaturasRegistradas = temperaturasGuardadas;
        Temperatura.mostrarTemperaturas();
    }
});
